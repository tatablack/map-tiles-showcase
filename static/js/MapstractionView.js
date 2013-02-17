mp.MapsView = Backbone.View.extend({
    el: 'body',

    options: {
        tileProviders: ['googlev3', 'openlayers', 'openmq', 'leaflet'],
        defaultZoomLevel: 14
    },

    initialize: function () {
        //this.loadLibraries();
        //_.delay(_.bind(this.loadMaps, this), 5000);
        this.loadMaps();
    },

    loadLibraries: function() {
        var s = document.createElement("script");
        s.type = "application/javascript";
        s.src = 'https://raw.github.com/mapstraction/mxn/master/source/mxn.js?(' + this.options.tileProviders.join() + ')';
        // Use any selector
        $("head").append(s);

        //this.$el.append('<script src="https://raw.github.com/mapstraction/mxn/master/source/mxn.js?(' + this.options.tileProviders.join() + ')"></script>');
    },

    loadMaps: function () {
        _.each(this.options.tileProviders, function(tileProvider) {
            try {
                this.$el.append('<div id="' + tileProvider + '"  class="map"></div>');

                this.map = new mxn.Mapstraction(tileProvider, tileProvider);
                this.map.addSmallControls();
                this.map.enableScrollWheelZoom();
                this.map.setCenterAndZoom(this.getDefaultPosition(), this.options.defaultZoomLevel);
            } catch(err) {
                console.error(err.message);
            }
        }, this);
    },

    getDefaultPosition: function() {
        return new mxn.LatLonPoint(52.34908, 4.91732);
    }
});

