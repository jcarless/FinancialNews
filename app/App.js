var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;

var routes = require('./config/routes');

// point our app to config/routes for client side routing
ReactDOM.render(

<Router>{routes}</Router>,
    document.getElementById('app')
);