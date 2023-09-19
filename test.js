var a
var modFound = false;
while(!modFound){
    a = Math.floor(Math.random() * 495)
    if(a % 15 === 0){
        modFound = true
    }
}
console.log(a)