
(function() {
    'use strict';
    angular.module('ReplenishmentApp',['nvd3'])
        .controller('ReplenishmentController', ReplenishmentController);
    ReplenishmentController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'DTColumnBuilder','ReplenishmentService','$compile'];

    function ReplenishmentController($scope,$rootScope, DTOptionsBuilder, DTColumnBuilder,ReplenishmentService,$compile) {

        var responsebySku = [
            {
                store_name: "Macys (Dolphin Mall)",
                data: [
                    {
                        key: "Dress",
                        y: 5
                    },
                    {
                        key: "Pants",
                        y: 2
                    },
                    {
                        key: "Heels",
                        y: 9
                    },
                    {
                        key: "Seven",
                        y: 5
                    }
                ]
            },
            {
                store_name: "Macys (Dadeland Mall)",
                data: [
                    {
                        key: "Dress",
                        y: 10
                    },
                    {
                        key: "Laptop",
                        y: 20
                    },
                    {
                        key: "Heel",
                        y: 9
                    },
                    {
                        key: "Pen",
                        y: 5
                    }
                ]
            },
            {
                store_name: "Macys (Pembroke lakes Mall)",
                data: [
                    {
                        key: "Dress",
                        y: 15
                    },
                    {
                        key: "Bag",
                        y: 10
                    },
                    {
                        key: "Panties",
                        y: 3
                    },
                    {
                        key: "Seven",
                        y: 4
                    }
                ]
            },
            {
                store_name: "Macys (Fort Lauderdale Mall)",
                data: [
                    {
                        key: "Dress",
                        y: 15
                    },
                    {
                        key: "Postit",
                        y: 10
                    },
                    {
                        key: "Beer",
                        y: 3
                    },
                    {
                        key: "Cigatters",
                        y: 4
                    }
                ]
            }
        ];
        $scope.options = [];
        $scope.data = [];
        $.each(responsebySku, function (index, element) {
            $scope.options[index] = {
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
            $scope.data[index] = element.data;
        });

        if ($rootScope.IsManager) {
            $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                return ReplenishmentService.getTotals(null);
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
        function createdRow(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        }
    };

})();