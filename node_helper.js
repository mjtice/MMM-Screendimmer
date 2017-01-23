/* Magic Mirror
 * Module: MMM-Screendimmer
 */

var SunCalc = require('suncalc');
var fs = require('fs');

module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-Screendimmer helper started ...');
  },

  query_sun: function(config) {
    var self = this;
    try {
        if (typeof config.latitude === 'undefined') { throw "Missing latitude configuration"; }
        if (typeof config.longitude === 'undefined') { throw "Missing longitude configuration"; }
        setInterval(function(){ 
            var local_time = Date.now();
            var sunrisePos = SunCalc.getTimes(local_time, config.latitude, config.longitude);
            if (local_time >= sunrisePos['sunrise'] && local_time < sunrisePos['sunriseEnd']) {
                self.writeBacklight(config.path_to_backlight,config.sunrise);
            }
            if (local_time >= sunrisePos['sunriseEnd'] && local_time < sunrisePos['solarNoon']) {
                self.writeBacklight(config.path_to_backlight,config.sunriseEnd);
            }
            if (local_time >= sunrisePos['solarNoon'] && local_time < sunrisePos['sunsetStart']) {
                self.writeBacklight(config.path_to_backlight,config.sunsetStart);
            }
            if (local_time >= sunrisePos['sunset'] && local_time < sunrisePos['night']) {
                self.writeBacklight(config.path_to_backlight,config.sunset);
            }
            if (local_time >= sunrisePos['night'] && local_time < sunrisePos['nightEnd']) {
                self.writeBacklight(config.path_to_backlight,config.night);
            }
            if (local_time >= sunrisePos['nightEnd'] && local_time < sunrisePos['sunrise']) {
                self.writeBacklight(config.path_to_backlight,config.nightEnd);
            }
        }, config.query_interval);
    }
    catch(err) {
        console.log(err);
    }

  },

  // Write the values to the backlight
  writeBacklight: function(backlight_file, value) {
      fs.writeFile(backlight_file, value, function(err) {
          if(err) {
              throw(err);
          }
      }); 
  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
      if (notification === 'INIT') {
          this.query_sun(payload);
      }
  }

});
