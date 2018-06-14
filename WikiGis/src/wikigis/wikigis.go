package main

import (
	"net/http"
	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"wikigis/wikipedia"
	"encoding/json"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/wiki-info", wikiInfo).Queries("q", "{query}").Methods("GET")

	log.Println("🌐 Listen on 0.0.0.0:8081")
	err := http.ListenAndServe(":8081", handlers.CORS()(r))
	if err != nil {
		log.Fatalf("Web server failed to start \n%s\n", err)
	}
}

func wikiInfo(w http.ResponseWriter, r *http.Request) {
	log.Printf("Request %s START ", r.URL)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	param := mux.Vars(r)
	query := param["query"]

	data, err := wikipedia.FetchAll(query)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	jData, err := json.Marshal(data)
	if err != nil {
		panic(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(jData)
	log.Printf("Request %s DONE ", r.URL)
}