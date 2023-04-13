"use strict";

function loadJSON(filePath, callback) {
    var XMLObj = new XMLHttpRequest();
    XMLObj.open('GET', filePath, true);
    XMLObj.onreadystatechange = function () {
        if (XMLObj.readyState === 4 && XMLObj.status === 200) {
            var myArr = JSON.parse(this.responseText);
            callback(myArr);
        }
    };
    XMLObj.send();
}


function processJSON(bigJSON){

    function getAgesRecursive(person){

        if(!person.friends){//if person has no friends..
            if(person.age){//and person has age..
                return {num:1, age: person.age};//return person's age
            }
            else{//else, return zeroes
                return {num:0, age: 0};
            }
        }
        else{//if person has friends..
            if(person.isCore){   //if it's the core element, set it's age to zero and don't count it as a person
                var friendsSummary = {num:0, age:0};
            }
            else{//otherwise, count person's age and add 1 to people count
                var friendsSummary = {num:1, age:person.age};
            }
            for(var friend of person.friends){//then add friends amount and total age
                var friendParams = getAgesRecursive(friend);
                friendsSummary.num += friendParams.num;
                friendsSummary.age += friendParams.age;
            }
            return friendsSummary;//return sum of person's age and age of his friends along with people count
        }


    }

    var fixedBigJSON = {friends:bigJSON, name:"core", age:0, isCore:1};//creating the core element

    var totals = getAgesRecursive(fixedBigJSON);//counting total amount of people and total age

    console.log(totals.age / totals.num);//count medium age of all people


}


loadJSON("data.json", processJSON);//execute the function using data from data.json
