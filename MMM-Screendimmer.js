Module.register("MMM-Screendimmer",{
    // Default module config.
    defaults: {
        path_to_backlight: '/sys/class/backlight/rpi_backlight/brightness',
        query_interval: 30000,
        morning: 25,
        day: 120,
        evening: 90,
        night: 18,
        debug: false,
    },

   start: function() {
        self = this;
        Log.info('Starting module: ' + this.name);
        this.sendSocketNotification('INIT', this.config);
    },
});
