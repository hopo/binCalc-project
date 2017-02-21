
function AND(ia, ib){
	var and; 
	if(ia === 1 && ib === 1){
		and = 1;
	}else{
		and = 0;
	};
	return and;
};	

function OR(ia, ib){
	var or;
	if(ia === 0 && ib === 0){
		or = 0;
	}else{
		or = 1;
	};
	return or;	
};

function NAND(ia, ib){
	var nand;
	if(ia === 1 && ib === 1){
		nand = 0;
	}else{
		nand = 1;
	};
	return nand;

};

function NOR(ia, ib){
	if(ia === 0 && ib === 0){
		nor = 1;
	}else{
		nor = 0;
	};
	return nor;
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

set(1, 0);
