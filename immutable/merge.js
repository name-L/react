const {Map}=require('immutable')

var preatate={
    a:1,
    roleState:false
}
var obj2={
    roleState:true
}
var map1=Map(preatate)
var map2=map1.merge(obj2)
console.log(map1,map2);
console.log(map2.toJS());

