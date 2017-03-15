'use strict';

const fs = require('fs');
const https = require('https');

console.log("Running plugin search...");
var plugin_arr = fs.readFileSync('plugins.txt').toString().split("\n");
console.log("Got "+plugin_arr.length+" entries to search");

asyncSearch(plugin_arr, function(err,data) {
    var filename = 'output/OUTPUT-'+(new Date().toISOString())+'.json';
    fs.writeFile(filename, JSON.stringify(data, null, 4));
    console.log('Saved output to file "'+filename+'"');
});

function asyncSearch(arr, callback, data) {
    data = (typeof data == 'undefined' ? [] : data)
    var item = arr.shift();
    console.log("Running search for plugin: "+item);

    https.get('https://wpvulndb.com/api/v2/plugins/'+item, (res) => {
        if(res.statusCode == 200)
        {
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                data.push(JSON.parse(body));

                if(arr.length <=0)
                {
                    callback(null, data);
                }
                else{
                    asyncSearch(arr, callback, data);
                }
            });
        }
        else
        {
            var obj = {}; obj[item] = {error: true, statusCode: res.statusCode};
            data.push(obj);

            if(arr.length <=0)
            {
                callback(null, data);
            }
            else{
                asyncSearch(arr, callback, data);
            }
        }
    }).on('error', (e) => {

        var obj = {}; obj[item] = {error: true, trace: e.toString()};
        data.push(obj);

        if(arr.length <=0)
        {
            callback(null, data);
        }
        else{
            asyncSearch(arr, callback, data);
        }

    });
}