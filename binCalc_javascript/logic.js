function AND(ia, ib){
	if(ia === 1 && ib === 1){
		return 1;
	}else{
		return 0;
	};	return and;
};

function OR(ia, ib){
	if(ia === 0 && ib === 0){
		return 0;
	}else{
		return 1;
	};
};

function NAND(ia, ib){
	if(ia === 1 && ib === 1){
		return 0;
	}else{
		return 1;
	};
};

function NOR(ia, ib){
	if(ia === 0 && ib === 0){
		return 1;
	}else{
		return 0;
	};
};

function XOR(ia, ib){
	var or = OR(ia, ib);
	var nand = NAND(ia, ib);
	var xor = AND(or, nand);
	return xor;
};

function set(ia, ib){
	console.log('('+ia+', '+ib+')');
	console.log('AND : ', AND(ia, ib));
	console.log('OR  : ', OR(ia, ib));
	console.log('NAND: ', NAND(ia, ib));
	console.log('NOR : ', NOR(ia, ib));
	console.log('XOR : ', XOR(ia, ib));
};

module.exports={
	AND : AND,
	OR : OR,
	NAND : NAND,
	NOR : NOR,
	XOR : XOR,
	set : set

}
