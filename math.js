let arr = [,,,]
console.log(arr.length);
let arr2 = [1,2,3,4,5];
const arr3 = arr2.slice(1,10);
console.log(arr3);
const arr4 = arr2.splice(1,10);
console.log(arr2);

function x(){
    for(var i=0;i<=5;i++){
        function close(x){
            setTimeout(() => {
              console.log(x);
            },x * 1000);
        }
        close(i);
    }
}
x();