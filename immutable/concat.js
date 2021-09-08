const {List}=require("immutable")
var prevState=[1,2,3]
var arr=[4,5,6]
var list1=List(prevState)
list2=list1.concat(arr)
console.log(list2.toJS())
