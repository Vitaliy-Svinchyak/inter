;
(function () {
    'use strict';
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'textAngular',
        'ngCookies',
    ]).config(['$mdThemingProvider',
        function ($mdThemingProvider) {

            // $mdThemingProvider.definePalette('fiolet', {
            //     '50': '#532E57',
            //     '100': '#532E57',
            //     '200': '#532E57',
            //     '300': '#532E57',
            //     '400': '#532E57',
            //     '500': '#532E57',
            //     '600': '#532E57',
            //     '700': '#532E57',
            //     '800': '#532E57',
            //     '900': '#532E57',
            //     'A100': '#ffffff',
            //     'A200': '#8e8e8e',
            //     'A400': '#8e8e8e',
            //     'A700': '#8e8e8e',
            //     'contrastDefaultColor': 'light',
            //     'contrastLightColors': ['70', 'A200'],
            // });
            //
            // $mdThemingProvider.theme('default')
            //     .primaryPalette('fiolet')
            //     .accentPalette('grey');

        }
    ]).constant("$MD_THEME_CSS", "");

})();