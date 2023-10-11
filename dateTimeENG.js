const dateENGFormatted = function(){
    let dateNow = new Date();
    return (dateNow.getMonth()+1) + '/' + dateNow.getDate() + '/' + dateNow.getFullYear();
}

console.log(dateENGFormatted());

//ekspordin kõik asjad
module.exports = {dateENGFormatted: dateENGFormatted};