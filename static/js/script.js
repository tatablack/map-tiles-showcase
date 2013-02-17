$(document).ready(function () {
    var socket = io.connect();

    $('#sender').bind('click', function () {
        socket.emit('message', 'Message Sent on ' + new Date());
    });

    socket.on('server_message', function (data) {
        $('#receiver').append('<li>' + data + '</li>');
    });

    var mapView = new mp.LeafletView();

    $('#global-zoom-in').click(_.bind(function() {
        _.each(mapView.getMaps(), function(map) {
            map.zoomIn();
        });
    }, this));

    $('#global-zoom-out').click(_.bind(function() {
        _.each(mapView.getMaps(), function(map) {
            map.zoomOut();
        });
    }, this));

    $('#global-zoom-reset').click(_.bind(function() {
        _.each(mapView.getMaps(), function(map) {
            map.setView(mapView.options.defaultCoordinates, mapView.options.defaultZoomLevel);
        });
    }, this));
});