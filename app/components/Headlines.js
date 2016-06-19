var React = require('react');
var Router = require('react-router');
var Article = require('./Article');
var helpers = require('../utils/helpers');



var Headlines = React.createClass({

    getInitialState: function(){
        return {
            savedArticles: ""
        }
    },

    componentDidMount: function(){

        helpers.getSaved()
            .then(function(articleData){
                this.setState({
                    savedArticles: articleData.data
                });
                console.log("saved results", articleData.data);
            }.bind(this))
    },

    render: function(){

        if (this.state.savedArticles == "") {
            return(

                <li className="list-group-item">

                    <h3>
                        <span><em>Save your first article...</em></span>
                    </h3>

                </li>

            )
        }

        else {

            var articles = this.state.savedArticles.map(function(article, index){

                return(

                    <div key={index}>

                        <a href='#/Article' role="button" className="list-group-item">{article.title}</a>


                    </div>
                )

            }.bind(this))

        }

        return(
            <div className="main-container">
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Headlines</h3>
                        </div>
                        <div className="panel-body">
                            <div className="list-group">
                                {articles}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
});

// Export the module back to the route
module.exports = Headlines;