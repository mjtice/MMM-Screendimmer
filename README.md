# MMM-Screendimmer
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project.  Change the brightness of your Raspberry Pi 7" display based on solar events.

## Installation
Run these commands at the root of your magic mirror install.

```shell
cd modules
git clone https://github.com/mjtice/MMM-Screendimmer
cd MMM-Screendimmer
npm install
```

Typically only root can write to the backlight file.  You'll need to allow world-writeable permissions on the file.
```shell
sudo vi /etc/udev/rules.d/backlight-permissions.rules
```
Paste the following.
```shell
SUBSYSTEM=="backlight",RUN+="/bin/chmod 666 /sys/class/backlight/%k/brightness /sys/class/backlight/%k/bl_power"
```
Reload udev rules (or just reboot)
```shell
sudo udevadm control --reload-rules
```

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
{
    module: 'MMM-Screendimmer',
    config: {
        latitude: 34.0000,
        longitude: -75.0000
        // See below for additional configurable options
    }
}
```

### Configuration options
option | type | default | description
--- | --- | --- | ---
`morning` | `int` | 25 | time between dawn and sunriseEnd.
`day` | `int` | 120 | time between sunriseEnd and sunsetStart.
`evening` | `int` | 90 | time between sunsetStart and dusk.
`night` | `int` | 18 | time between dusk and dawn.
`path_to_backlight` | `str` | '/sys/class/backlight/rpi_backlight/brightness' | where to write the backlight value.
`query_interval` | `int` | 30000 | how frequently to query for the current solar position.
`debug` | 'bool' | false | debugging flag
`latitude` | 'float' | none | no default, will fail without your latitude/longitude in config.
`longitude` | 'float' | none | no default, will fail without your latitude/longitude in config.
