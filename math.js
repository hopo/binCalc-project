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

// String str = "goodmorning-kil-dong"
// String s1 = str.substring(12) ; // kil-dong // 시작값만 주어지면 그 위치부터 끝까지 추출
// String s2 = str.substring(12,15); //kil // 시작값위치부터 끝값-1 위치까지 추출(끝값위치의 문자는 포함하지않음)
// char 문자열변수 = 문자열.charAt(12) // k // 12번째 문자1개만 반환한다
// String str2 = "banana";
// int a1 = str2.indexOf('a'); // 1 // 맨 처음값의 위치를 찾음
// String str3 = "총 비용은 $45.76";
// int a2 = str3.indexOf("$45.76"); // 6 // 문자열이 시작하는 위치를 찾음


var str = "HowToMake";
console.log(str.charAt(5));
