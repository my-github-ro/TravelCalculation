
window.onload = function() {

    var City1 = "Targoviste";
    var City2 = "Bucuresti";
    document.getElementById('result').src = 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + City1 +
        ',WA;64;1&wp.1=' + City2 + ',WA;66;2&mapSize=400,650&optmz=distance&key=AjUW9ZYC-mBKc73TLIDkPAPyGC-3MKFkCg4e0TwirOkYdcSY29TbFk39EOEYQEjg';

}