(function () {
    'use strict';
    angular.module('App.peripheralPorts')
        .controller('peripheralPortsController',
            function ($log, branchPeriferalServices, peripheralPortsService) {
                $log.debug('peripheralPortsController loading');
                var vmPeripheralPorts = this;
                /*****VARIABLES***/
                var RECYCLER = 0;
                var FINANCIALPRINTER = 1;
                var VOUCHERREADER = 2;
                var CHIPANDPIN = 3;
                vmPeripheralPorts.recyclerPortFT = '';
                vmPeripheralPorts.ports = {};
                var initGrid = [{
                    PERIPHERAL: 'RECYCLER',
                    EXPECTEDPORT: '',
                    CURRENTPORT: '',
                    STATUS: ''
                }, {
                    PERIPHERAL: 'FINANCIAL PRINTER',
                    EXPECTEDPORT: '',
                    CURRENTPORT: '',
                    STATUS: ''
                }, {
                    PERIPHERAL: 'VOUCHER READER',
                    EXPECTEDPORT: '',
                    CURRENTPORT: '',
                    STATUS: ''
                }, {
                    PERIPHERAL: 'CHIP & PIN',
                    EXPECTEDPORT: '',
                    CURRENTPORT: '',
                    STATUS: ''
                }];
                vmPeripheralPorts.columns = [{
                    field: 'PERIPHERAL',
                    width: '20%'
                }, {
                    field: 'EXPECTEDPORT',
                    displayName: 'Expected Port',
                    width: '25%'
                }, {
                    field: 'CURRENTPORT',
                    displayName: 'Current Port',
                    width: '20%'
                }, {
                    field: 'STATUS'
                }];
                vmPeripheralPorts.gridOptions = {
                    data: initGrid,
                    enableHorizontalScrollbar: 0,
                    enableVerticalScrollbar: 0,
                    columnDefs: vmPeripheralPorts.columns
                };
                vmPeripheralPorts.returnToFlow = function () {
                    peripheralPortsService.closetab();

                };
                //vmPeripheralPorts.dll = {};
                //vmPeripheralPorts.mockResponse = {"native":"1.0","chipAndPin":"6.0","perihperals":"1.0","cheque":"1.0","printer":"1.0"} 

                vmPeripheralPorts.dllValues = function () {
                    branchPeriferalServices.urlValue()
                    .then(
                            function (response) {
                              //  alert(JSON.stringify(response))
                                if (response !== undefined && response !== '' && response !== null) {
                                  vmPeripheralPorts.dll = response.dllVersion;

                                }
                            }
                        )
                        .catch(function (e) {
                            alert('e')
                             vmPeripheralPorts.dll = undefined;
                            alert('error' + JSON.stringify(e));
                            console.log(e);
                        });

                };

                 vmPeripheralPorts.dllValues();



                vmPeripheralPorts.getPorts = function () {
                    branchPeriferalServices.getPorts()
                        .then(
                            function (response) {
                                if (response !== undefined && response !== '' && response !== null) {
                                    vmPeripheralPorts.recyclerPortFT = response.recyclerFTPort;
                                    evaluatePorts(response);
                                    getRecyclerState();
                                }
                            }
                        )
                        .catch(function (e) {
                            console.log(e);
                        });
                };

                function getRecyclerState() {
                    var retcode = -1;
                    peripheralPortsService.openEbranchOperation()
                        .then(
                            function (data) {
                                if (data !== undefined && data !== '' && data !== null) {
                                    retcode = data.RETCODE;
                                } else {

                                    $log.debug('Can not retrive RECYCLER status');
                                }

                                evaluateStatus(retcode);
                                updateStatusColStyle();
                            }
                        )
                        .catch(function (e) {
                            evaluateStatus(retcode);
                            console.log(e);
                        });
                }

                function evaluateStatus(state) {

                    if (vmPeripheralPorts.recyclerPortFT === '' || vmPeripheralPorts.recyclerPortFT === '(NULL)') {
                        if (state >= 0) {
                            vmPeripheralPorts.gridOptions.data[RECYCLER].STATUS = 'Connected';
                        } else {
                            vmPeripheralPorts.gridOptions.data[RECYCLER].STATUS = 'Not connected';
                        }
                        vmPeripheralPorts.gridOptions.data[RECYCLER].CURRENTPORT = '';
                        vmPeripheralPorts.gridOptions.data[RECYCLER].EXPECTEDPORT = 'Cannot retrieve from technical file';
                    }
                    //Port from FT retrieve successfull
                    else {
                        if (state < 0) {
                            vmPeripheralPorts.gridOptions.data[RECYCLER].STATUS = 'Not connected';
                            vmPeripheralPorts.gridOptions.data[RECYCLER].CURRENTPORT = '-';
                        } else {
                            vmPeripheralPorts.gridOptions.data[RECYCLER].STATUS = 'Right port';
                            vmPeripheralPorts.gridOptions.data[RECYCLER].CURRENTPORT = vmPeripheralPorts.gridOptions.data[RECYCLER].EXPECTEDPORT;
                        }
                    }
                }

                function updateStatusColStyle() {

                    vmPeripheralPorts.gridOptions.columnDefs = vmPeripheralPorts.columns = [{
                        field: 'PERIPHERAL',
                        width: '20%'
                    }, {
                        field: 'EXPECTEDPORT',
                        displayName: 'Expected Port',
                        width: '25%'
                    }, {
                        field: 'CURRENTPORT',
                        displayName: 'Current Port',
                        width: '20%'
                    }, {
                        field: 'STATUS',
                        cellClass: function (grid, row, col) {
                            var val = grid.getCellValue(row, col);
                            if (val === 'Wrong port' || val === 'Not connected') {
                                return 'red';
                            } else if (val === 'Connected' || val === 'Right port') {
                                return 'green';
                            }
                        }
                    }];

                }

                function evaluatePorts(response) {
                    vmPeripheralPorts.gridOptions.data[VOUCHERREADER].EXPECTEDPORT = response.voucherResponse.expectedPort;
                    vmPeripheralPorts.gridOptions.data[VOUCHERREADER].CURRENTPORT = response.voucherResponse.currentPort;
                    vmPeripheralPorts.gridOptions.data[VOUCHERREADER].STATUS = response.voucherResponse.status;
                    vmPeripheralPorts.gridOptions.data[FINANCIALPRINTER].EXPECTEDPORT = response.finalcialPrinterResponse.expectedPort;
                    vmPeripheralPorts.gridOptions.data[FINANCIALPRINTER].CURRENTPORT = response.finalcialPrinterResponse.port;
                    vmPeripheralPorts.gridOptions.data[FINANCIALPRINTER].STATUS = response.finalcialPrinterResponse.status;
                    vmPeripheralPorts.gridOptions.data[CHIPANDPIN].EXPECTEDPORT = response.chipAndPin.expectedPort;
                    vmPeripheralPorts.gridOptions.data[CHIPANDPIN].CURRENTPORT = response.chipAndPin.currentPort;
                    vmPeripheralPorts.gridOptions.data[CHIPANDPIN].STATUS = response.chipAndPin.status;
                    vmPeripheralPorts.gridOptions.data[RECYCLER].EXPECTEDPORT = response.recyclerFTPort;
                }
                /*****INIT***/
              //  vmPeripheralPorts.getPorts();
            });
}());

