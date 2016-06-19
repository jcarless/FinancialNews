var axios = require('axios');


var helpers = {

    getSaved: function(){

        return axios.get('/api/headlines')
            .then(function(results){
                console.log("axios results", results);
                return results;
            })
    }
};

module.exports = helpers;