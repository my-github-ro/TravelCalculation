//transfer variables from the map.js file to the result.js
var global =JSON.parse(localStorage.getItem("myValue"));
var resetValue =0;
localStorage.setItem("myValue", resetValue);

var City1 = global.City1;
var City2 = global.City2;
var Combustible = global.Combustible;
var Consuption = global.Consumption;
var price;

    if(Combustible ==="benzine")
        price = 4.20;
    else if(Combustible === "diesel")
        price = 4.42;
    else if(Combustible ==="gas")
        price = 2.55;

    
//add map
function loadMap() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'),{
        zoom: 10
    });
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
        directionsManager.setRequestOptions({
            routeMode: Microsoft.Maps.Directions.RouteMode.driving
        });

        //Create waypoints to route between.
        var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: City1});
        directionsManager.addWaypoint(seattleWaypoint);
        var workWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: City2 });
        directionsManager.addWaypoint(workWaypoint);

        //add info panel
        directionsManager.setRenderOptions({ itineraryContainer: '#printoutPanel' });
        //Add event handlers to directions manager.
        Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', directionsUpdated);
        //Calculate directions.
        directionsManager.calculateDirections();
    });
}

function directionsUpdated(e) {
    //Get the current route index.
    var routeIdx = directionsManager.getRequestOptions().routeIndex;

    //Get the distance of the route, rounded to 2 decimal places.
    var distance = Math.round(e.routeSummary[routeIdx].distance * 100)/100;


    //Get the distance units used to calculate the route.
    var units = directionsManager.getRequestOptions().distanceUnit;
    var Units = '';

    if (units === Microsoft.Maps.Directions.DistanceUnit.km)
        Units = 'km'

    var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);
    var Consuption_map = Math.round(Consuption * distance)/100;
    var Cost_map =  (price * Consuption_map).toFixed(2);


    document.getElementById("result-start").innerHTML = City1;
    document.getElementById("result-stop").innerHTML = City2;

    document.getElementById('distance_map').innerHTML = distance;
    document.getElementById("duration_map").innerHTML = time;
    document.getElementById("consuption_map").innerHTML = Consuption_map;
    document.getElementById("cost_map").innerHTML = Cost_map;
}

