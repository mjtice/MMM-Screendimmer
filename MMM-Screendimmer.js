Module.register("MMM-Screendimmer",{
    // Default module config.
    defaults: {
        path_to_backlight: '/sys/class/backlight/rpi_backlight/brightness',
        query_interval: 30000,
        sunrise: 25, /*top edge of the sun appears on the horizon*/
        sunriseEnd: 120, /*bottom edge of the sun touches the horizon*/
        solarNoon: 120, /*sun is in the highest position*/
        sunsetStart: 90, /*bottom edge of the sun touches the horizon*/
        sunset: 25, /*sun disappears below the horizon, evening civil twilight starts*/
        night: 18, /*dark enough for astronomical observations*/
        nightEnd: 25, /*morning astronomical twilight starts*/
    },

   start: function() {
        self = this;
        Log.info('Starting module: ' + this.name);
        this.sendSocketNotification('INIT', this.config);
    },
});
