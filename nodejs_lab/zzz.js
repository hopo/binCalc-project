var fs = require('fs');
 
var contents = fs.readFileSync('./secrets', 'utf8');
console.log(contents);