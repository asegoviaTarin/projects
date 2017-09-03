(function () {
    'use strict';
    angular.module('App.peripheralPorts')

    .factory('peripheralPortsService',
        function ($log, branchP4EclipseServices, spaTempStorageService) {

            $log.debug('peripheralPortsService loading');

            var factory = {};
            factory.openEbranchOperation = openEbranchOperation; 
            factory.closetab = closetab;

            function openEbranchOperation () {

                return branchP4EclipseServices.openOperationEbranch('ELST00', {});
            };

            function closetab () {
             
                if (branchP4EclipseServices.runEB === true) {
                    branchP4EclipseServices.closeOperationP4('PEPO01');
                } else {
                    spaTempStorageService.returnFlow();
                }
            };

            return factory;
        }
    );
}());

