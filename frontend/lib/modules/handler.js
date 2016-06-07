var qwest = require('qwest');


var Handler = new function(){

    this.sendTask = function(data){
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
