// IIFE: immediately-invoked function expression
(function () {
    'use strict';

    describe('peripheralPortsService test', peripheralPortsService);

    function peripheralPortsService() {
        var log, serviceInvocation, peripheralPortsService, branchP4EclipseServices, spaTempStorageService;

        function myBeforeEach(param) {

            //mock another modules
            console.log('-- peripheralPortsService test--');
            angular.module('App.branchP4IdandV', []);
            angular.module('App.branchP4EclipseConnector', []);
            angular.module('App.branchP4EclipseUtils', []);
            angular.module('App.spaTempStorage', []);
            module('App.peripheralPorts', peripheralPorts);
            // load the module
            // angular.mock.module('App.branchMiddlewareDesktopSpaTeller', branchMiddlewareDesktopSpaTeller);
            module('App.peripheralPorts', peripheralPorts);

            function peripheralPorts($provide) {

                // create a new object that will act as the mock service

                var spaTempStorageServiceMock = {
                    returnFlow: ''
                   
                }
                var branchP4EclipseServicesMock = {
                    closeOperationP4: '',
                    openOperationEbranch: '',
                    runEB: param

                }

                $provide.constant('APP_CONFIG', {});
                $provide.constant('SERVICE_INVOCATION_CONFIG', {});
                $provide.constant('TSB_LOGGING_CONFIG', {});
                $provide.constant('AUDIT_CONFIG', {});
                $provide.value('branchP4EclipseServices', branchP4EclipseServicesMock);
                //$provide.value('peripheralPortsService', peripheralPortsServiceMock);
                $provide.value('spaTempStorageService', spaTempStorageServiceMock);

            }

            // inject and save into a var the controller
            inject(function ($log, _peripheralPortsService_, _branchP4EclipseServices_, _spaTempStorageService_) {
                console.log('-- inject--');
                // exports the services to variables
                log = $log;

                peripheralPortsService = _peripheralPortsService_;
                branchP4EclipseServices = _branchP4EclipseServices_;
                spaTempStorageService = _spaTempStorageService_;

                // create the mock functions

                // functions of the $log
                function debugMock() {}

                // function of the serviceInvocation
                function callServiceMock() {}

                // spy the original methods and call the mock methods

                //functions of the $log
                spyOn(log, 'debug')
                    .and.callFake(debugMock);

                //functions of the branchP4EclipseServices
                spyOn(branchP4EclipseServices, 'openOperationEbranch')
                    .and.callFake(callServiceMock);

                spyOn(spaTempStorageService, 'returnFlow')
                    .and.callFake(callServiceMock);

                spyOn(branchP4EclipseServices, 'closeOperationP4')
                    .and.callFake(callServiceMock);



            }); // $inject
        } // beforeEach

        // getGlobalConfig its
        it('calls EB operation',
            callEBOperation);

        it('calls P4  close operation',
            closeProteo);

        it('calls EB close operation',
            closeEbranch);
        // function test of the getGlobalConfig()
        function callEBOperation() {
            myBeforeEach();
            peripheralPortsService.openEbranchOperation();
            expect(branchP4EclipseServices.openOperationEbranch)
                .toHaveBeenCalled();
        }

        function closeProteo() {
            myBeforeEach();
            peripheralPortsService.closetab();
            expect(spaTempStorageService.returnFlow)
                .toHaveBeenCalled();
        }

        function closeEbranch() {
            myBeforeEach(true);
            peripheralPortsService.closetab();

            expect(branchP4EclipseServices.closeOperationP4)
                .toHaveBeenCalled();
        }
    }
}());

