var qwest = require('qwest');


var Handler = new function(){

    this.sendTask = function(task){
        var fd = new FormData();
        for (var key in task) fd.append(key, task[key])
        var url = "http"

        qwest.map("POST", url, fd, {
            dataType: "formdata"
        })
        .then(function(xhr, response) {
            console.log('xhr', xhr, 'response', response)
        })
        .catch(function(xhr, response) {
            console.log('error', xhr, response);
        })
    }

}

module.exports = Handler;
