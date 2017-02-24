// 10진수 2진수로 전환
function toBin(n){
  var bin = n.toString(2);
  return bin;
}

console.log('bin: '+toBin(15));

// logic
console.log('AND: ', 1 & 1); // AND
console.log('OR:  ', 1 | 1); // OR
console.log('XOR: ', 1 ^ 1); // XOR
// console.log(~ 1); // NOT

// 2진수 10진수로 전환
console.log(parseInt("1111", 2));
