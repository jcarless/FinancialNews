var React = require('react');
var Router = require('react-router');
var Article = require('./Article');


var Search = React.createClass({

    /*Here we set the initial state variables (this allows us to propagate the variables for maniuplation by the children components*/
    /*Also note the "resuls" state. This will be where we hold the data from our results*/
    getInitialState: function(){
        return {
            queryTerm: "",
            startYear: "",
            endYear: "",
            results: {}
        }
    },

    /*Render the function. Note how we deploy both the Query and the Results*/
    render: function(){

        return(

            <div className="main-container">

                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Headlines</h3>
                        </div>
                        <div className="panel-body">
                            <div className="list-group">
                                <a href='#/Article' role="button" className="list-group-item">test</a>
                                <a role="button" className="list-group-item">test</a>
                                <a role="button" className="list-group-item">test</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
});

// Export the module back to the route
module.exports = Search;