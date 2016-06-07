var qwest = require('qwest');


var Handler = new function(){

    this.sendTask = function(data){
        // var fd = new FormData();
        // for (var key in from) fd.append(key, from[key])
        // for (var key in to) fd.append(key, to[key])
        return qwest.map("POST", '/api/v1/count_steps', data)
        .then(function(xhr, response) {
            console.log('work')
            return response
        })
        .catch(function(xhr, response) {
            return response
        })
    }

}

module.exports = Handler;
