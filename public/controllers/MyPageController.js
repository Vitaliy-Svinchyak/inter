/**
 * Created by opiru on 07.11.2016.
 */

;(function () {
    'use strict';

    class MyPageController {

        constructor($mdSidenav) {
            this.$mdSidenav = $mdSidenav;
        }

        openMenu() {
            this.$mdSidenav('left').toggle();
        }
    }

    angular.module('app').controller('MyPageController', ['$mdSidenav',
        MyPageController])
})();