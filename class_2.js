const firstName = "Jarl";
const lastName = "Koha";

console.log("Programmi autor on: " + firstName + " " + lastName + ".");

function dateETFormatted(){
    const monthNamesET = ["Jaanuar", "Veebruar", "Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"];
    //console.log(monthNamesET[1]);
    let timeNow = new Date();
    //console.log(timeNow);
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    let yearNow = timeNow.getFullYear();
    //let dateET = dateNow + "." + (monthNamesET + 1) + "." + yearNow;
    let dateET = dateNow + "." + monthNamesET[monthNow] + " " + yearNow;
    return dateET;
}

let dateETNow = dateETFormatted();

console.log("Täna on " + dateETNow);
console.log("Täna on tõesti " + dateETFormatted());