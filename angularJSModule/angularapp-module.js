/**
 * @ngdoc overview
 * @name App.peripheralPorts
 * @description
 * Module peripheralPorts.
 */
(function () {
    'use strict';
    angular.module('App.peripheralPorts', [
    	'ui.grid',
        'App.branchPeriferalConnector',
        'App.branchP4EclipseConnector',
        'proteo.invocation-service',
        'App.branchP4EclipseUtils',
        'App.spaTempStorage'
    ]);
}());

