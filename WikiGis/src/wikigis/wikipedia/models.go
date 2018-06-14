package wikipedia

type wikiInfo struct {
	Name	string `json:"name"`
	Emblem	string `json:"emblem"`
	Flag 	string `json:"flag"`
	Level	string `json:"level"`
	Iso31662 string `json:"iso_3166-2"`
	Capital string `json:"capital"`
	Voivode string `json:"voivode"`
	VoivodePlace string `json:"voivode_place"`
	RegionalCouncilPlace string `json:"regional_council_place"`
	Marshal string `json:"marshal"`
	Area string `json:"area"`
	Population string `json:"population"`
	Density string `json:"density"`
	Urbanization string `json:"urbanization"`
	RegistrationPlate string `json:"registration_plate"`
	
	ShortDescription string `json:"short_description"`
}

type linkImageTitle struct {
	Title string `json:"title"`
	Img   string `json:"img"`
}