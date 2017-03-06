var str = "GoodMorning-Gil-Dong"
var s1 = str.substring(12), // 시작값만 주어지면 그 위치부터 끝까지 추출
    s2 = str.substring(12, 15); // 시작값위치부터 끝값-1 위치까지 추출(끝값위치의 문자는 포함하지않음)
console.log("substring(12):", s1);
console.log("substring(12,15):", s2);

var s3 = str.charAt(12) // 12번째 문자1개만 반환한다
console.log("charAt(12):", s3);

var str2 = "banana";
var a1 = str2.indexOf('a'); // 맨 처음값의 위치를 찾음
console.log("indexOf('a'):", a1);

var str3 = "총 비용은 - $45.76";
var a2 = str3.indexOf("$45.76"); // 문자열이 시작하는 위치를 찾음
console.log(a2);
