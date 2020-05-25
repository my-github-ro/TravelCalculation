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


//autocomplet-box form
var url= "http://dev.virtualearth.net/REST/v1/Locations";

$(document).ready(function () {
    $("#example1,#example2").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: url,
                dataType: "jsonp",
                data: {
                    key: key,
                    q: request.term
                },
                jsonp: "jsonp",
                success: function (data) {
                    var result = data.resourceSets[0];
                    if (result) {
                        if (result.estimatedTotal > 0) {
                            response($.map(result.resources, function (item) {
                                return {
                                    data: item,
                                    label: item.name ,
                                    value: item.name
                                }
                            }));
                        }
                    }
                }
            });
        },
        minLength: 1
    });
});


var global = {City1:"", City2:"" ,Consumption:"", Combustible:""};
var url2= 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=';

function dataForm(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}
dataForm('send', function () {
    global.City1 = document.getElementById("example1").value;
    global.City2 = document.getElementById("example2").value;
    global.Consumption = document.getElementById("example3").value;
    global.Combustible = document.getElementById("combustible").value;

    document.getElementById("img").src = url2 + 'Pucioasa,WA;64;1&wp.1=Targoviste,WA;66;2&key=' + key;

});