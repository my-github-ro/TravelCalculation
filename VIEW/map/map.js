var key = "AjUW9ZYC-mBKc73TLIDkPAPyGC-3MKFkCg4e0TwirOkYdcSY29TbFk39EOEYQEjg";

 // style map
var styles = [
    'RoadOnDemand','Aerial','AerialWithLabelsOnDemand','CanvasDark','OrdnanceSurvey'
];
var layers = [];
var i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
    layers.push(new ol.layer.Tile({
        visible: false,
        preload: Infinity,
        source: new ol.source.BingMaps({
            key:key,
            imagerySet: styles[i]
        })
    }));
}
var view = new ol.View({
    projection: 'EPSG:4326',
    center: [26.103086, 44.434826],
    zoom: 13
});

// add Map
var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: view
});

var select = document.getElementById('layer-select');
function onChange() {
    var style = select.value;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        layers[i].setVisible(styles[i] === style);
    }
}
select.addEventListener('change', onChange);
onChange();

//send form results, result directory
function Result() {
var global = {City1:document.getElementById("example1").value,
              City2:document.getElementById("example2").value ,
              Consumption:document.getElementById("example3").value,
              Combustible:document.getElementById("combustible").value
            };

    localStorage.setItem("myValue",JSON.stringify(global));
    window.location.href = "./result/result.js";
}