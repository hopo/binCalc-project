function toBin(n){
  var bin = n.toString(2);
  return bin;
}

console.log('bin: '+toBin(14));

console.log('AND: ', 1 & 1); // AND
console.log('OR:  ', 1 | 1); // OR
console.log('XOR: ', 1 ^ 1); // XOR
console.log(~ 1); // NOT
