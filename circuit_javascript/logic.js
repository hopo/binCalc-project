module.exports = logic;

function AND(ia, ib){
	if(ia === 1 && ib === 1){
		return 1;
	}else{
		return 0;
	}	
};	

function OR(ia, ib){
	if(ia === 0 && ib === 0){
		return 0;
	}else{
		return 1;
	}	
};

function NAND(ia, ib){
	if(ia === 1 && ib === 1){
		return 0;
	}else{
		return 1;
	}	
};

function NOR(ia, ib){
	if(ia === 0 && ib === 0){
		return 1;
	}else{
		return 0;
	}	
};

// var and = AND()
// 	,or = OR()
// 	,nand = NAND()
// 	,nor = NOR()
// 	,xor = AND(or, nand);