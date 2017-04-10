function sum(a, b){
	return 'sum(): '+a+b
}

function psum(a, b){
	console.log('psum: '+a+b);
}

if (!global.is_checking){
	sum(4, 7);
	psum(4, 7);
};
