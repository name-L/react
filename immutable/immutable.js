const {Map} =require("immutable")
// 利用Map 可以吧一个普通对象 转换成immutable对象
let prevState={
    name:'lele',
    age:100
}
let map1=Map(prevState)
console.log(map1);
let map2=map1.set("name","xiaoming")
// console.log(map1,map2)
let newstate=map2.toJS() // 把immutable 对象转换成普通对象

console.log(prevState);
console.log(newstate);


