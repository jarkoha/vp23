const semesterBegin = new Date("08/28/2023");
const semesterEnd = new Date("01/28/2024");
const today = new Date();

const semesterLength = function(){
    let semLength = Math.floor((semesterEnd.getTime() - semesterBegin.getTime())/(1000*60*60*24));
    return semLength;
}

const semesterLasted = function(){
    let semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime())/(1000*60*60*24));
    return semesterLastedFor;
}

const semesterEnding = function(){
    let semesterEndingIn = Math.floor((semesterEnd.getTime() - today.getTime())/(1000*60*60*24));
    return semesterEndingIn;
}
//let semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime())/(1000*60*60*24));
//let semesterEndingIn = Math.floor((semesterEnd.getTime() - today.getTime())/(1000*60*60*24));

const semesterStatus = function(){
    let semStatus = "Error 1"; 
    if (semesterBegin > today && semesterEnd > today) {
        semStatus = "2023/2024 õppeaasta sügissemester pole veel alanud.";
    } else if (semesterBegin <= today && semesterEnd >= today){
        semStatus = "Semester on käimas ja möödas on " + semesterLasted() + " päeva. Järele on jäänud " + semesterEnding() + " päeva.";
    } else if (semesterBegin < today && semesterEnd < today) {
        semStatus = "Semester on läbi.";
    } else {
        semStatus = "Error 2";
    }
    return semStatus;
}


module.exports = {semesterLength: semesterLength, semesterLasted: semesterLasted, semesterEnding: semesterEnding, semesterStatus: semesterStatus};
//console.log(semesterLength());
//console.log(semesterBegin);
//console.log(semesterEnd);
//console.log(semesterLasted());
//console.log(semesterEnding());
//console.log(semesterStatus());