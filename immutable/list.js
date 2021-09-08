const {List}=require('immutable')
let prestate=['111','222','333']
let arr1=List(prestate)
// console.log(arr1);
let arr2=arr1.splice(1,1)  // List结构所有的方法 跟之前的数组方法是类似的
// console.log(arr1,arr2);

let newstate=arr2.toJS()
console.log(prestate,newstate);
