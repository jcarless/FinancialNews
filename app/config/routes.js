var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute	= Router.IndexRoute;

var Main = require('../components/Main');
var Headlines = require('../components/Headlines');
var Article = require('../components/Article');


module.exports = (

    /*High level component is the Main component*/
    <Route path='/' component={Main}>

        <Route path='Headlines' component={Headlines} />
        <Route path='Article' component={Article} />


        <IndexRoute component={Headlines} />

    </Route>


);