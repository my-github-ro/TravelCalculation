import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import BingMaps from 'ol/source/BingMaps';
import {Tile as TileLayer} from 'ol/layer';
import Geocoder from '../search_location/ol-geocoder';


var key = "AjUW9ZYC-mBKc73TLIDkPAPyGC-3MKFkCg4e0TwirOkYdcSY29TbFk39EOEYQEjg";
var styles = [
    'RoadOnDemand','Aerial','AerialWithLabelsOnDemand','CanvasDark','OrdnanceSurvey'
];
var layers = [];
var i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
    layers.push(new TileLayer({
        visible: false,
        preload: Infinity,
        source: new BingMaps({
            key:key,
            imagerySet: styles[i]
        })
    }));
}

var view = new View({
    projection: 'EPSG:4326',
    center: [26.103086, 44.434826],
    zoom: 13
});

// add Map
var map = new Map({
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

//add search location
var geocoder = new Geocoder('nominatim',{
    provider: 'bing',
    key: key,
    lang: 'ro-RO',
    targetType: 'text-input',
    limit: 2,
    autoCompleteMinLength: 2,
});
geocoder.on('addresschosen', function () {
    window.setTimeout(function () {
        view.setZoom(13);
    }, 1000);
});
map.addControl(geocoder);

var global ={City1:"", City2 :"",Consumption:"", Combustible:""};

function dataForm(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}
dataForm('send', function () {
    global.City1 = document.getElementById("example1").value;
    global.City2 = document.getElementById("example2").value;
    global.Consumption = document.getElementById("example3").value;
    global.Combustible = document.getElementById("combustible").value;
});