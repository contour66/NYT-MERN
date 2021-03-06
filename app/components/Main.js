// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Article = require("./children/Article");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this Article state variable
  getInitialState: function() {
    return { term: "", results: "", article: [] };
  },

  // The moment the page renders get the Article
  componentDidMount: function() {
    // Get the latest Article.
    helpers.getArticle().then(function(response) {
     console.log(response);
      if (response !== this.state.article) {
        console.log("Article", response.data);
        this.setState({ article: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the article
    helpers.runQuery(this.state.term).then(function(data) {
  
        console.log("Data here ", data);  

        // After we've received the result... then post the search term to our Article.
        helpers.postArticle(this.state.term).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated Article
          helpers.getArticle().then(function(response) {
            console.log("Current Article", response.data);

            console.log("Article", response.data);

            this.setState({ Article: response.data });

          }.bind(this));
        }.bind(this));
      
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ term: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">NY Times Article Search</h2>
            <p className="text-center">
              <em>Enter an article title and date to search for relevant articles</em>
            </p>
          </div>

          <div className="col-md-12">

            <Form setTerm={this.setTerm} />

          </div>

         
        </div>

        <div className="row">

          <Article article={this.state.article} />

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
