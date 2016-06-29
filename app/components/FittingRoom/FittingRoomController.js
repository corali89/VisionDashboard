/**
 * Created by corali.triana on 6/27/2016.
 */
(function(){
    'use strict';
    angular.module('FittingRoomApp') .controller('FittingRoomController',FittingRoomController);

    FittingRoomController.$inject=['$scope'];
    function FittingRoomController($scope) {
        $scope.chartOptions=[];
        $scope.data=[];
        for (var i=0;i<5;i++) {
            $scope.chartOptions[i] =
            {
                chart: {
                    type: "lineChart",
                    height: 300,
                    useInteractiveGuideline: true,
                    dispatch: {},
                    xAxis: {
                        axisLabel: "Months"
                    },
                    yAxis: {
                        axisLabel: "Team size",
                    }
                }
            };

            $scope.data[i] =  [{
                "key" : "Monthly",
                values : [{
                    "x" : 1,
                    "y" : 6,
                    "color" : 'blue'
                }, {
                    "x" : 2,
                    "y" : 10,
                    "color" : 'red'
                }
                ]
            }
            ];
        }
        /*Random Data Generator */
        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e',  //color - optional: choose your own line color.
                    strokeWidth: 2,
                    area: true
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c',
                    area: true
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };
    };
})();