function arrcheck(arr, n){
	if(n in arr){
		console.log('check');
	}else if(!(n in arr)){
		console.log('unknown!');
	};
};

var arr = [1, 2, 3, 4];
var n = 5

if(!global.is_checking){
	arrcheck(arr, n)
}
