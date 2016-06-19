var React = require('react');
var Router = require('react-router');

var Headlines = require('./Headlines');


// Create the Main component
var Main = React.createClass({

    render: function(){

        return(
            <div className="main-container">

                <div className="container">
                    <div className="row">
                        <div className="jumbotron">
                            <h1>The Financial News</h1>
                            <p>View articles from CNBC</p>
                            <div>
                                <a href="#/Headlines" className="btn btn-primary btn-lg" role="button">Home</a>
                                <a href="/scrape" className="btn btn-primary btn-lg" role="button">Update</a>
                            </div>
                        </div>
                    </div>

                        {this.props.children}

                </div>

            </div>
        )
    }
});

module.exports = Main;