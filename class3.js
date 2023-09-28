const firstName = "Jarl";
const lastName = "Koha";
const datetimeValue = require("./dateTimeET");
const fs = require("fs");
//let folkWisdom = "";

fs.readFile("txtfiles/vanasonad.txt", "utf8", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        //console.log(data);
        //folkWisdom = data;
        onScreen(data); //saada andmed alumisse onscreen funktsiooni
    }
}); //readFile lõppeb

const onScreen = function(folkWisdom) {  //võtab vastu onscreen funktsiooni data ja annab sellele nime ning hiljem kasutab seda, et kuvada
    console.log("Programmi autor on: " + firstName + " " + lastName + ".");
    console.log("Täna on tõesti " + datetimeValue.dateETFormatted());
    //console.log(folkWisdom);
    let folkWisdoms = folkWisdom.split(";");
    //console.log(folkWisdoms);  näitab kõiki vanasõnu eraldi real roheliselt masiivina
    //console.log(folkWisdoms.length); näitab masiivi pikkuse
    //console.log("Tänane tarkus: " + folkWisdoms[Math.floor(Math.random() * folkWisdoms.length)]);     //floor ümardab alla poole alati
    // kõige tavalisem for tsükkel (for loop)
    for (let i = 0; i < folkWisdoms.length; i ++) {   //i ++ (++) liidab ühe otsa, (--) lahutab ühe maha i +=5 liidab 5 juurde
        console.log("Vanasõna nr " + (i + 1) + ': "' + folkWisdoms[i] + '"');
    }  

    console.log("Kell on " + datetimeValue.timeFormatted());
    console.log("Praegu on " + datetimeValue.timeOfDayET() + ".");
    //console.log(datetimeValue.monthsET);
}


//let dateETNow = dateValue.dateETFormatted();

//console.log("Täna on " + dateETNow);


