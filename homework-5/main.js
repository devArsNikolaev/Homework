"use strict";
function every(array, checker){
    var arrayMatches = true
    
    for(var item of array){
        if(checker(item) === false){
            arrayMatches = false;
            break;
        }
    }

    return arrayMatches;
}

var testArray = [1, -2, 3, 4, 5, 6];
var testChecker = function(item){
    if (item>0){
        return true;
    }
    else{
        return false;
    }
}

console.log(testArray);

if(every(testArray, testChecker)){
    console.log("array matches");
}
else{
    console.log("array doesen't match");
}
