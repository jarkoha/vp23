const http = require("http");
const datetimeValue = require("./dateTimeET");

http.createServer(function(req, res){    //req = request, res = response/result
    res.writeHead(200, {"Content-type": "text-html"});
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Jarl Koha, veebiproge 2023</title><link rel="stylesheet" href="main.css"></head><body>');
    res.write('<h1 class="myname">Jarl Koha</h1><p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p>');
    res.write('<hr></body></html>');
    res.write(datetimeValue.dateETFormatted() + '<br>' + datetimeValue.timeFormatted())
    console.log("Keegi vaatab!");
    //valmis, saada ära
    return res.end();
}).listen(5134);

//rinde 5100
//jarkoha 5134
//terminalis peab panema node'i käima, ctrl+C paneb kinni
//timeFormatted