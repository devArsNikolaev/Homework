"use strict";

function loadJSON(callback) {
    var XMLObj = new XMLHttpRequest();
    XMLObj.open('GET', 'data.json', true);
    XMLObj.onreadystatechange = function () {
        if (XMLObj.readyState === 4 && XMLObj.status === 200) {
            var myArr = JSON.parse(this.responseText);
            callback(myArr);
            a1 = myArr;
        }
    };
    XMLObj.send();
}


function processJSON(bigJSON){

    function getAgesRecursive(person){

        if(!person.friends){
            if(person.age){
                return {num:1, age: person.age};
            }
            else{
                return {num:0, age: 0};
            }
        }
        else{
            if(person.isCore){   
                var friendsSummary = {num:0, age:0};
            }
            else{
                var friendsSummary = {num:1, age:person.age};
            }
            for(var friend of person.friends){
                
                var friendParams = getAgesRecursive(friend);
                friendsSummary.num += friendParams.num;
                friendsSummary.age += friendParams.age;
                console.log(friend);
                console.log(friendParams);
                console.log(friendsSummary);
            }
            return friendsSummary;
        }


    }

    var fixedBigJSON = {friends:bigJSON, name:"core", age:0, isCore:1};

    var totals = getAgesRecursive(fixedBigJSON);

    console.log(totals.age / totals.num);


}


loadJSON(processJSON);
