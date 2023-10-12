const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const querystring = require('querystring');
const datetimeValue = require("./dateTimeET");
const semesterInfo = require ("./semesterInfo");
const dateENGValue = require("./dateTimeENG");

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Jarl Koha, veebiproge 2023</title><link rel="stylesheet" href="main.css">\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">';
const pageBody = '\n\t<h1 class="myname">Jarl Koha</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.\n\t</p>';
const pageTime = '\n\t<p>Lehe avamise hetkel oli kuupäev ' + datetimeValue.dateETFormatted() + ' ja kellaeg ' + datetimeValue.timeFormatted() + '\n</p>';   
const pageFoot = '\n\t<hr>\n</body>\n</html>';
const tluPhoto = '\n\t<img src="tlu_38.jpg" alt="TLU foto">'



http.createServer(function(req, res){    //req = request, res = response/result
    let currentURL = url.parse(req.url, true);
    //console.log(currentURL);
    if(req.method === 'POST'){
        //res.end('Tuligi POST');
		collectRequestData(req, result => {
            let notice = '<p>Sisestatud andmetega tehti midagi!</p>';
            //console.log(result);
            //kirjutame andmeid tekstifaili
            fs.open('public/log.txt','a', (err, file)=>{
                if (err) {
                    throw err;
                    nameAddedNotice(res, noptice);
                } else {
                    fs.appendFile('public/log.txt', result.firstNameInput + ',' + result.lastNameInput + ',' + dateENGValue.dateENGFormatted() + ';', (err)=> {
                        if (err) {
                            throw err;
                            notice = '<p>Sisestatud andmete salvestamine ebaõnnestus</p>';
                            nameAddedNotice(res, notice);
                        } else {
                            console.log('Faili kirjutati.')
                            notice = '<p>Sisestatud andmete salvestamine õnnestus!</p>';
                            nameAddedNotice(res, notice);
                        }
                    });
                    /*fs.close(file, (err) => {
                        if (err) {
                            throw err;
                        }
                    });*/
                }
            });
			//res.end(result.firstNameInput);
			//res.end('Tuligi POST!');
		});
    }
    else if (currentURL.pathname === "/"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<p><a href = "addname">Lisa oma nimi</a></p>');
        res.write('\n\t<p><a href = "semesterprogress">Semestri kulg</a></p>');
        res.write('\n\t<p><a href = "tluphoto">Foto</a></p>');
        res.write('\n\t<p><a href = "andmed">Sisestatud nimed</a></p>');
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
        res.write('<form method="POST">\n\t<lable for="firstNameInput">Eesnimi: </lable>\n\t<input type="text" name="firstNameInput" id="firstnameInput" placeholder="Sinu eesnimi ...">\n\t<br>\n\t<lable for="lastNameInput">Perekonnanimi: </lable> <!--for väärtus on id väärtus >-->\n\t<input type="text" name="lastNameInput" id="lastNameInput" placeholder="Sinu perekonnanimi ...">\n\t<br>\n\t<input type="submit" name="nameSubmit" value="Salvesta">\n\t</form>');
        res.write('\n\t<p><a href = "/">Esilehele</a></p>');
        res.write(pageFoot);
        res.write(pageTime);
        return res.end();
    }

    else if (currentURL.pathname === "/addnameresult"){
        res.writeHead(200, {"Content-type": "text-html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<h2>Nimi lisatud!</h2>');
        res.write('\n\t<p><a href = "/">Esilehele</a></p>');
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
        res.write('\n\t<p><a href = "/">Esilehele</a></p>');
        //res.write('\n\t<p>Edaspidi lisame siia asju</p>');
        res.write(pageFoot);
        res.write(pageTime);
        return res.end();
    }

    else if (currentURL.pathname === "/tluphoto"){
        //loeme kataloogist fotode nimekirja ja loosime ühe pildi
        let htmlOut = '\n\t<p>Pilti ei saa näidata!</p>';
        let listOutput = '';
        fs.readdir('public/tluphotos', (err, fileList)=>{
            if (err) {
                throw err;
                tluPhotoPage(res, htmlOut, listOutput);
            } else {
                //console.log(fileList);
                let photoNum = Math.floor(Math.random() * fileList.length);
                htmlOut = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
                listOutput = '\n\t<ul>';
				for (fileName of fileList){
					listOutput += '\n\t\t<li>' + fileName + '</li>';
				}
				listOutput += '\n\t</ul>';
                //console.log(htmlOut);
                //console.log(listOutput);
                tluPhotoPage(res, htmlOut, listOutput);
            }
        });
    }

    else if (currentURL.pathname === "/andmed"){
        //loeme kataloogist fotode nimekirja ja loosime ühe pildi
        let listAndmedOut = '\n\t<p>Kahjuks ühtegi nime ei leitud</p>';
        fs.readFile('public/log.txt', "utf-8", (err, data) =>{
            if (err) {
                throw err;
                andmedPage(res, listAndmedOut);
            } else {
                /*let allData = data.split(";");
                listAndmedOut = '\n\t<ul>';
                for (let i = 0; i < allData.length; i++){
                    listAndmedOut += '\n\t\t<li>' + allData[i] + '</li>';
                }
                listAndmedOut += '\n\t</ul>';
                andmedPage(res, listAndmedOut);
            }
        });
    }*/
                let allData = data.split(";");
                let allNames = [];
				listAndmedOut = '\n\t<ul>';
				for (person of allData){
					allNames.push(person.split(',')); 
				}
				//console.log(allNames);
				for (person of allNames){
					if(person[0]){   //küsib kas masiivi viimasel elemendil on nimi või mitte ja teeb ainult siis list itemi
						listAndmedOut += '\n\t\t<li>' + person[0] + ' ' + person[1] + ', salvestatud: ' + person[2] + '</li>';
					}
				}
				listAndmedOut += '\n\t</ul>'
				andmedPage(res, listAndmedOut);
			}
		});
	}
                

    //else if (currentURL.pathname === "/tlu_38.jpg"){
    else if (path.extname(currentURL.pathname) === ".jpg"){
        console.log(path.extname(currentURL.pathname));
        let tluPhotoPath = path.join(__dirname, "public", "tluphotos");
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

    else {
        res.end("Error 404");
    }
    //valmis, saada ära
}).listen(5134);

function tluPhotoPage(res, htmlOut, listOutput) {
    res.writeHead(200, {"Content-type": "text-html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody);
    res.write(htmlOut);
    if (listOutput != '') {
        res.write(listOutput);
    }
    res.write('\n\t<p><a href = "/">Esilehele</a></p>');
    res.write(pageFoot);
    res.write(pageTime);
    return res.end();
}

function nameAddedNotice(res, notice){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write('\n\t<h2>Palun lisa oma nimi</h2>');
	res.write('\n\t' + notice);
	res.write('\n\t <p><a href="/addname">Sisestame järgmise nime</a>!</p>');
	res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
	res.write(pageFoot);
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}

function andmedPage(res, listAndmedOut) {
    res.writeHead(200, {"Content-type": "text-html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody);
    if (listAndmedOut != '') {
        res.write(listAndmedOut);
    }
    res.write('\n\t<p><a href = "/">Esilehele</a></p>');
    res.write(pageFoot);
    res.write(pageTime);
    return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}

//rinde 5100
//jarkoha 5134
//terminalis peab panema node'i käima, ctrl+C paneb kinni
//timeFormatted