var AND=function(ia, ib){
	if(ia === 1 && ib === 1){
		return 1;
	}else{
		return 0;
	}	
}

var OR=function(ia, ib){
	if(ia === 0 && ib === 0){
		return 0;
	}else{
		return 1;
	}	
}

var NAND=function(ia, ib){
	if(ia === 1 && ib === 1){
		return 0;
	}else{
		return 1;
	}	
}

var NOR=function(ia, ib){
	if(ia === 0 && ib === 0){
		return 1;
	}else{
		return 0;
	}	
}

var XOR=function(){
	var or = OR();
	var nand = NAND();
	var x = AND(or, nand);
	return x
}

var ia = 0, ib = 0;

console.log('AND', AND());
console.log('OR', OR());
console.log('NAND', NAND());
console.log('NOR', NOR());
console.log('XOR', XOR());
