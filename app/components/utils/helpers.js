// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var authKey = "b42b86f685504459a9daa5ea80a81382";
var APIURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="
// var searchTerm = "";
// var numResults = 0;
var startYear = "19000101";
var endYear = "20170601";


var articleCounter = 0;

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to nyt.
  runQuery: function(data) {
  console.log(data);
  var queryURL = APIURL + authKey + "&sort=newest"; 
   if (data === "" || undefined) {
      queryURL += "&q=history";
    } else {
      queryURL += "&q=" + encodeURI(data);
    }
    queryURL += "&begin_date=" + startYear + "&end_date=" + endYear;
    return axios.get(queryURL)
      .then((response)=>{
        var body = response.data.response.docs;
        console.log(body);
      });
      // .catch((error) =>{
      //   console.log(error);
      // });
  },
  
  getArticle: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(article) {
    return axios.post("/api", { article: article});
  }
};

// We export the API helper
module.exports = helper;
