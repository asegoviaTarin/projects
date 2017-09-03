// IIFE: immediately-invoked function expression
(function () {
    'use strict';

    describe('Unit: peripheralPorts test', peripheralPortsTest);
    var branchPeriferalServices, peripheralPortsService;
    var scope, log, controller, q, rootScope;
    var promise = {
        "voucherResponse": {
            "expectedPort": "",
            "status": "connected",
            "currentPort": null
        },
        "finalcialPrinterResponse": {
            "status": "Wrong port",
            "expectedPort": "COM2",
            "port": "COM3"
        },
        "chipAndPin": {
            "currentPort": "COM4:",
            "status": "Right port",
            "expectedPort": "COM4:"
        },
        "recyclerFTPort": "COM1",
        'getPorts': {
            'data': '',
            'status': 'OK'
        },
        'closeOperation': {
            'data': '',
            'status': 'OK'
        },
        'openOperation': {
            'data': {
                'retcode': ''
            },
            'status': 'OK'
        },

        'RETCODE': '1'

    };

    function peripheralPortsTest() {

        //Call tests
        it('Close tab', closeWindow);
        it('Get ports', getPorts);
        it('Call eBranch operation with error', openEbranchCatch);
        it('Call eBranch whitout response', openEbranchNoData);
    

    }

    function peripheralPortsBeforeEach(myPromise) {
        console.log('-- peripheralPortsBeforeEach--');
        angular.module('App.branchP4IdandV', []);
        angular.module('App.branchP4EclipseConnector', []);
        angular.module('App.branchP4EclipseUtils', []);
        angular.module('App.spaTempStorage', []);
        module('App.peripheralPorts', peripheralPorts);

        function peripheralPorts($provide, $translateProvider) {
            var branchPeriferalServicesMock2 = {
                getPorts: ''
            }
            var peripheralPortsServiceMock2 = {
                closetab: '',
                openEbranchOperation: ''

            }

            $provide.constant('APP_CONFIG', {});
            $provide.constant('SERVICE_INVOCATION_CONFIG', {});
            $provide.constant('TSB_LOGGING_CONFIG', {});
            $provide.constant('AUDIT_CONFIG', {});
            $provide.value('branchPeriferalServices', branchPeriferalServicesMock2);
            $provide.value('peripheralPortsService', peripheralPortsServiceMock2);

            //Mock translate
            function customLoader($q) {
                console.log('-- init customLoader--');
                return function () {
                    var deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                };
            }

            $provide.factory('customLoader', customLoader);
            $translateProvider.useLoader('customLoader');

        };

        inject(function peripheralPortsInject($controller, $log, $rootScope, $q, _peripheralPortsService_, _branchPeriferalServices_) {
                console.log('-- init peripheralPortsInject--');

                rootScope = $rootScope.$new();
                q = $q;
                peripheralPortsService = _peripheralPortsService_;
                branchPeriferalServices = _branchPeriferalServices_;
                log = $log;

                function closeTabMock() {}

                function errorMock() {}

                spyOn(peripheralPortsService, 'closetab')
                    .and.callFake(closeTabMock);

                spyOn(log, 'error')
                    .and.callFake(errorMock);

                function getPortsMock() {
                    var defer = $q.defer();

                    if (myPromise.getPorts.status === 'OK') {
                        defer.resolve(myPromise);
                    } else {

                        defer.reject();
                    }
                    return defer.promise;
                }

                spyOn(peripheralPortsService, 'openEbranchOperation')
                    .and.callFake(openEbranchOperationMock);

                function openEbranchOperationMock() {
                    var defer = $q.defer();
                    if (myPromise.openOperation.status === 'OK') {
                        console.debug(myPromise.openOperation);
                        defer.resolve(myPromise);
                    } else {
                        defer.reject();
                    }
                    return defer.promise;
                }

                spyOn(branchPeriferalServices, 'getPorts')
                    .and.callFake(getPortsMock);

                controller = $controller('peripheralPortsController', {
                    $scope: rootScope,
                    peripheralPortsService: _peripheralPortsService_,
                    branchPeriferalServices: _branchPeriferalServices_

                }); // $controller
                console.log('-- END CONTROLLER--');
            }) //end inject

    } //end before each

    function closeWindow() {
        console.log('close window start');
        peripheralPortsBeforeEach(promise);
        controller.returnToFlow();
        rootScope.$apply();
        expect(peripheralPortsService.closetab)
            .toHaveBeenCalled();

    }

    function getPorts() {
        console.log('getPorts start');
        var myTestPromise = angular.copy(promise);
        myTestPromise.getPorts.status = 'ko';
        peripheralPortsBeforeEach(myTestPromise);
        controller.getPorts();
        rootScope.$apply();
        expect(branchPeriferalServices.getPorts)
            .toHaveBeenCalled();

    }

    function openEbranchCatch() {
        console.log('openEbranchCatch start');
        var myTestPromise = angular.copy(promise);
        myTestPromise.openOperation.status = 'ko';
        peripheralPortsBeforeEach(myTestPromise);
        controller.getPorts();
        rootScope.$apply();
        expect(branchPeriferalServices.getPorts)
            .toHaveBeenCalled();

    }

    function openEbranchNoData() {
        console.log('openEbranchNoData start');
        var myTestPromise = angular.copy(promise);
        myTestPromise.RETCODE = 1;
        myTestPromise.recyclerFTPort = "";
        peripheralPortsBeforeEach(myTestPromise);
        controller.getPorts();
        rootScope.$apply();
        expect(branchPeriferalServices.getPorts)
            .toHaveBeenCalled();

    }

}());

