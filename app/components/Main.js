// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

var Headlines = require('./Headlines');


// Create the Main component
var Main = React.createClass({

    render: function(){

        return(
            /*We can only render a single div. So we need to group everything inside of this main-container one*/
            <div className="main-container">

                <div className="container">
                    <div className="row">
                        <div className="jumbotron">
                            <h1>The Financial News Notebook</h1>
                            <p>Take notes on CNBC headlines</p>
                            <div>
                                <a href="#/Headlines" className="btn btn-primary btn-lg" role="button">Home</a>
                                <a href="/" className="btn btn-primary btn-lg" role="button">Update</a>
                            </div>
                        </div>
                    </div>

                        {this.props.children}

                </div>

            </div>
        )
    }
});

// Export the module back to the route
module.exports = Main;