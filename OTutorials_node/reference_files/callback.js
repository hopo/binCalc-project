arr=[3,1,9,4,7];
function cb(v1,v2){console.log(v1,v2);return v2-v1;};arr.sort(cb);
//arr.sort(function(v1,v2){console.log(v1,v2);return v2-v1;});
console.log(arr);
