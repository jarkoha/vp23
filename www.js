const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const datetimeValue = require("./dateTimeET");
const semesterInfo = require ("./semesterInfo");

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Jarl Koha, veebiproge 2023</title><link rel="stylesheet" href="main.css">\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">';
const pageBody = '\n\t<h1 class="myname">Jarl Koha</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.\n\t</p>';
const pageTime = '\n\t<p>Lehe avamise hetkel oli kuupäev ' + datetimeValue.dateETFormatted() + ' ja kellaeg ' + datetimeValue.timeFormatted() + '\n</p>';   
const pageFoot = '\n\t<hr>\n</body>\n</html>';
    const tluPhoto = '\n\t<img src="tlu_38.jpg" alt="TLU foto">'



http.createServer(function(req, res){    //req = request, res = response/result
    let currentURL = url.parse(req.url, true);
    //console.log(currentURL);
    if (currentURL.pathname === "/"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<p><a href = "addname">Lisa oma nimi</a></p>');
        res.write('\n\t<p><a href = "semesterprogress">Semestri kulg</a></p>');
        res.write('\n\t<p><a href = "tluphoto">Foto</a></p>');
        res.write(pageFoot);
        res.write(pageTime);
        //res.write('\n<p>Lehe avamise hetkel oli kuupäev ' + datetimeValue.dateETFormatted() + ' ja kellaeg ' + datetimeValue.timeFormatted() + '\n</p>');
        //console.log("Keegi vaatab!");
        return res.end();
    }

    else if (currentURL.pathname === "/addname"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi</h2>');
        res.write('\n\t<p>Edaspidi lisame siia asju</p>');
        res.write(pageFoot);
        res.write(pageTime);
        return res.end();
    }

    else if (currentURL.pathname === "/semesterprogress"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<h2>Semestri info</h2>');
        if (semesterInfo.semesterLength() >= semesterInfo.semesterLasted()) {
            res.write('\n\t<p><meter min="0" max=' + semesterInfo.semesterLength() + ' value=' + semesterInfo.semesterLasted()+ '></meter><br>');
        } else {
            res.write('\n\t\n<p>Tekkis probleem andmete kuvamisel.<br></p>');
        }
        res.write(semesterInfo.semesterStatus());
        //res.write('\n\t<p>Edaspidi lisame siia asju</p>');
        res.write(pageFoot);
        res.write(pageTime);
        return res.end();
    }

    else if (currentURL.pathname === "/tluphoto"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(tluPhoto);
        res.write(pageBody);
        res.write(pageFoot);
        res.write(pageTime);
        return res.end();
    }

    else if (currentURL.pathname === "/banner.png"){
        console.log("Tahame pilti.");
        let bannerPath = path.join(__dirname, "public", "banner");
        console.log(bannerPath + currentURL.pathname);
        fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, {"Content-type": "image/png"});
                res.end(data);
            }
        });
    }

    else if (currentURL.pathname === "/tlu_38.jpg"){
        console.log("Tahame pilti.");
        let tluPhotoPath = path.join(__dirname, "public", "tluphotos/");
        console.log(tluPhotoPath + currentURL.pathname);
        fs.readFile(tluPhotoPath + currentURL.pathname, (err, data)=>{
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, {"Content-type": "image/jpg"});
                res.end(data);
            }
        });
    }

    else {
        res.end("Error 404");
    }
    //valmis, saada ära
}).listen(5134);

//rinde 5100
//jarkoha 5134
//terminalis peab panema node'i käima, ctrl+C paneb kinni
//timeFormatted