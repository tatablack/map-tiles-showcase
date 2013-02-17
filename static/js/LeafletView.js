mp.LeafletView = Backbone.View.extend({
    el: '#maps',

    options: {
        tileProviders: [
            {
                name: 'OpenStreetMap',
                urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                options: {
                    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            {
                name: 'cloudmade',
                urlTemplate: 'http://{s}.tile.cloudmade.com/YOUR_CLOUDMADE_API_KEY/997/256/{z}/{x}/{y}.png',
                options: {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
                }
            },
            {
                name: 'bing',
                plugin: 'Bing',
                arg: 'YOUR_BING_API_KEY'
            },
            {
                name: 'MapQuestOpen',
                urlTemplate: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
                options: {
                    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    subdomains: '1234'
                }
            },
            {
                name: 'EsriWorldStreetMap',
                urlTemplate: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                options: {
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                }
            },
            {
                name: 'googlev3',
                plugin: 'Google',
                arg: 'ROADMAP'
            }
        ],

        defaultCoordinates: [52.34888, 4.91755],
        circleCoordinates: [52.34926, 4.91755],
        defaultZoomLevel: 11,

        defaultIcon: L.icon({
            iconUrl: '/images/mp.png',
            iconRetinaUrl: '/images/mp.png',
            iconSize: [32, 32],
            iconAnchor: [16, 30],
            popupAnchor: [-3, -35],
            shadowUrl: '/images/mp.png',
            shadowRetinaUrl: '/images/mp.png',
            shadowSize: [32, 32],
            shadowAnchor: [16, 31]
        })
    },

    initialize: function () {
        this.maps = [];
        this.loadMaps();
    },

    getMaps: function() {
        return this.maps;
    },

    loadMaps: function () {
        _.each(this.options.tileProviders, function(tileProvider) {
            try {
                this.$el.prepend('<div id="' + tileProvider.name + '"  class="map" title="' + tileProvider.name + '"></div>');

                var currentMap = L.map(tileProvider.name).setView(this.options.defaultCoordinates, this.options.defaultZoomLevel);

                if (tileProvider.plugin) {
                    currentMap.addLayer(new L[tileProvider.plugin](tileProvider.arg));
                } else {
                    L.tileLayer(tileProvider.urlTemplate, tileProvider.options).addTo(currentMap);
                }

                $.getJSON('/js/fakedata.json', _.bind(this.addMarkerData, this));

                /*
                L.circle(this.options.circleCoordinates, 80, {
                    color: '#21479C',
                    fillColor: '#F2B479',
                    fillOpacity: 0.5
                }).addTo(currentMap);

                L.marker(this.options.defaultCoordinates, { icon: this.options.defaultIcon }).addTo(currentMap);
                */

                this.maps.push(currentMap);
            } catch(err) {
                console.error(err.message);
            }
        }, this);
    },

    addMarkerData: function(data) {
        var markersCount = data.length;

        _.each(this.maps, function(map) {
            var markers = [];

            for(var i = 0; i < markersCount; i++) {
                markers[i] = L.marker(data[i].coordinates,  { icon: this.options.defaultIcon }).bindPopup(data[i].title);
            }

            var ads = new L.MarkerClusterGroup({ spiderfyDistanceMultiplier: 2 });
            ads.addLayers(markers);
            map.addLayer(ads);
        }, this)
    }
});

