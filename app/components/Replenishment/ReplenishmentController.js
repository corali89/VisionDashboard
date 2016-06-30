
(function() {
    'use strict';
    angular.module('ReplenishmentApp',['nvd3'])
        .controller('ReplenishmentController', ReplenishmentController);
    ReplenishmentController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'DTColumnBuilder','ReplenishmentService','$compile'];

    function ReplenishmentController($scope,$rootScope, DTOptionsBuilder, DTColumnBuilder,ReplenishmentService,$compile) {


        $scope.optionsByStyle = [];
        $scope.dataByStyle = [];

        $scope.optionsBySku = [];
        $scope.dataBySku = [];
        (function initController(){
            ReplenishmentService.getMostPopularsBySku().then(
                function (response) {
                    $.each(response, function (index, element) {
                        $scope.optionsBySku[index] = {
                            chart: {
                                type: 'pieChart',
                                height: 300,
                                donut: true,
                                x: function (d) {
                                    return d.key;
                                },
                                y: function (d) {
                                    return d.y;
                                },
                                showLabels: true,
                                duration: 500,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 70,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }, title: {
                                enable: true,
                                text: element.store_name
                            },
                        };
                        $scope.dataBySku[index] = element.data;
                    });
                }
            );

            ReplenishmentService.getMostPopularsByStyle().then(
                function (response) {
                    $.each(response, function (index, element) {
                        $scope.optionsByStyle[index] = {
                            chart: {
                                type: 'pieChart',
                                height: 300,
                                donut: true,
                                x: function (d) {
                                    return d.key;
                                },
                                y: function (d) {
                                    return d.y;
                                },
                                showLabels: true,
                                duration: 500,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 70,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }, title: {
                                enable: true,
                                text: element.store_name
                            },
                        };
                        $scope.dataByStyle[index] = element.data;
                    });
                }
            );


            if ($rootScope.IsManager) {
                $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                    return ReplenishmentService.getStoresReportByDate(null);
                }).withOption('createdRow', createdRow)
                    .withOption('order', [])
                    .withPaginationType('full_numbers')
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('sku').withTitle('SKU'),
                    DTColumnBuilder.newColumn('style').withTitle('Style'),
                    DTColumnBuilder.newColumn('daily').withTitle('Daily'),
                    DTColumnBuilder.newColumn('weekly').withTitle('Weekly'),
                    DTColumnBuilder.newColumn('monthly').withTitle('Monthly')
                ];

            }
        })();
        
        
        function createdRow(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        }
    };

})();