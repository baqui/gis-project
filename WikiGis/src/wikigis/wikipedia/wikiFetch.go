package wikipedia

import (
	"net/http"
	"io/ioutil"
	"strings"
	"regexp"
	"log"
	"errors"
)

func FetchAll(query string) (*wikiInfo, error) {
	var bytes []byte
	for {
		resp, _ := http.Get("https://pl.wikipedia.org/wiki/" + query + "?action=raw&redirects")
		bytes, _ = ioutil.ReadAll(resp.Body)

		// #REDIRECT
		if resp.ContentLength <= 100 {
			body := string(bytes)
			if strings.HasPrefix(body, "#REDIRECT") {
				log.Println("Redirect ", body)
				re := regexp.MustCompile(`\[\[(.+)\]\]`)
				match := re.FindStringSubmatch(body)
				if len(match) != 0 {
					query = match[1]
					continue
				}
			}
		}
		resp.Body.Close()
		if resp.StatusCode == http.StatusNotFound {
			return nil, errors.New("Not Found")
		}
		break
	}
	body := string(bytes)

	re := regexp.MustCompile(`(?U)\[\[Plik:.+\]\]`)
	body = re.ReplaceAllString(body, "")

	// replace [[ link |
	re = regexp.MustCompile(`(?U)\[\[.+\|`)
	body = re.ReplaceAllString(body, "")
	// replace ]]
	re = regexp.MustCompile(`(?U)(\[\[|\]\])`)
	body = re.ReplaceAllString(body, "")

	re = regexp.MustCompile(`(?U)(''')(.+)'''`)
	body = re.ReplaceAllString(body, "<strong>$2</strong>")

	data := &wikiInfo{
		Name: getMatched(body, `(?m)^ *\|nazwa *= *(.*)$`),
		Level: getMatched(body, `(?m)^ *\|jednostka *= *(.*)$`),
		Iso31662: getMatched(body, `(?m)^ *\|ISO 3166-2 *= *(.*)$`),
		Capital: getMatched(body, `(?m)^ *\|stolica *= *(.*)$`),
		Voivode: getMatched(body, `(?m)^ *\|wojewoda *= *(.*)$`),
		RegionalCouncilPlace: getMatched(body, `(?m)^ *\|siedziba sejmiku *= *(.*)$`),
		Marshal: getMatched(body, `(?m)^ *\|marszałek *= *(.*)$`),
		Area: getMatched(body, `(?m)^ *\|powierzchnia *= *([0-9]+[0-9\s]*([\,|\.](\s*[0-9]){2,4})?).*$`),
		Population: getMatched(body, `(?m)^ *\|liczba ludności *= *([0-9]+[0-9\s]*([\,|\.](\s*[0-9]){2,4})?).*$`),
		Density: getMatched(body, `(?m)^ *\|gęstość zaludnienia *= *([0-9]+[0-9\s]*([\,|\.](\s*[0-9]){2,4})?).*$`),
		Urbanization: getMatched(body, `(?m)^ *\|urbanizacja *= *([0-9]+[0-9\s]*([\,|\.](\s*[0-9]){2,4})?).*$`),
		RegistrationPlate: getMatched(body, `(?m)^ *\|tablice rejestracyjne *= *(.*)$`),
		ShortDescription: getMatched(body, `\n\}{2}\n([\s\S]*?)==`),
	}

	if fname := getMatched(body, `(?m)^ *\|herb *= (.*)$`); fname != "" {
		data.Emblem = "https://pl.wikipedia.org/wiki/Plik:" + fname
	}
	if fname := getMatched(body, `(?m)^ *\|flaga *= (.*)$`); fname != "" {
		data.Flag = "https://pl.wikipedia.org/wiki/Plik:" + fname
	}


	re = regexp.MustCompile(`(?U)(\n)`)
	data.ShortDescription = re.ReplaceAllString(data.ShortDescription, "<br />")

	 //replace {{nowrap| smth }}
	re = regexp.MustCompile(`(?U)(\{\{.+\||\}\})`)
	data.ShortDescription = re.ReplaceAllString(data.ShortDescription, "")

	// <ref
	re = regexp.MustCompile(`(?U)\<ref.+\<\/ref\>`)
	data.ShortDescription = re.ReplaceAllString(data.ShortDescription, "")


	return data, nil
}

func getMatched(string, matched string) (subString string) {
	re := regexp.MustCompile(matched)
	match := re.FindStringSubmatch(string)
	if len(match) != 0 {
		subString = match[1]
	}

	return subString
}
