/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class Logger {

        constructor($log) {
            this.$log = $log;
        }

        log(e, t) {
            let n, r;
            switch (t) {
                case "error":
                    n = "color: red",
                        r = "background: red; color: white";
                    break;
                case "success":
                    n = "color: green",
                        r = "background: green; color: white";
                    break;
                default:
                    n = "color: blue;",
                        r = "background: #000; color: #fff";
            }
            let a = new Date;
            this.$log.debug("%c[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n);
        }
    }

    angular.module('app').factory('Logger', ['$log',
        Logger])
})();