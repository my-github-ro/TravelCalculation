var global =JSON.parse(localStorage.getItem("myValue"));
var resetValue =0;
localStorage.setItem("myValue", resetValue);

var City1 = global.City1;
var City2 = global.City2;
var Consuption = global.Consumption;
var Combustible = global.Combustible;

var key = "AjUW9ZYC-mBKc73TLIDkPAPyGC-3MKFkCg4e0TwirOkYdcSY29TbFk39EOEYQEjg";
var xml ="http://dev.virtualearth.net/REST/V1/Routes/Driving?o=xml&wp.0="+City1+"&wp.1="+City2+"&avoid=ferry&optimize=distance&key="+key;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        fctResult(this);
    }
};
xhttp.open("GET", xml, true);
xhttp.send();

function fctResult(xml) {
    //map 1 response XML
    var xmlDoc = xml.responseXML;
    var distance = xmlDoc.getElementsByTagName("TravelDistance")[0].childNodes[0];
    var duration = xmlDoc.getElementsByTagName("TravelDuration")[0].childNodes[0];

    var ResultDistance = Math.round(distance.nodeValue)
    var TimeDuration = Math.round(duration.nodeValue / 60);
    var TotalConsuption = Math.round(Consuption * distance.nodeValue)/100;
    //add results map
    document.getElementById('map1').src = 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + City1 +
        ',WA;64;1&wp.1=' + City2 + ',WA;66;2&avoid=ferry&mapSize=400,300&optmz=distance&key='+key;
    document.getElementById("result-start").innerHTML = City1;
    document.getElementById("result-stop").innerHTML = City2;
    document.getElementById("result-distance").innerHTML = ResultDistance;
    document.getElementById("result-duration").innerHTML = TimeDuration;
    document.getElementById("result-totalConsuption").innerHTML = TotalConsuption.toFixed(2);

        // add results map 2
    document.getElementById('map2').src = 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + City1 +
        ',WA;64;1&wp.1=' + City2 + ',WA;66;2&avoid=ferry&mapSize=400,300&optmz=time&key='+key;
    document.getElementById("result2-start").innerHTML = City1;
    document.getElementById("result2-stop").innerHTML = City2;
};