/**
 * Created by corali.triana on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('MainApp')
        .factory('ReplenishmentService', ReplenishmentService);

    ReplenishmentService.$inject = [ '$http','ApiUrls'];
    function ReplenishmentService( $http, ApiUrls) {
        var service = {};

        // service.MostSoldStyle = MostSoldStyle;
        // service.MostSoldSku = MostSoldSku;
        service.getTotals=getTotals;
        return service;

        function MostSoldSku() {
            return $http.get('')
                .then(handleSuccess,handleError);
        };
        function getTotals() {
            return $http.get(ApiUrls.loginUrl)
                .then(handleSuccess,function () {
                    return [
                        {
                            sku:"aASDWEDDEW",
                            style: "Casual",
                            daily: "27",
                            weekly:"760",
                            monthly:"2689"
                        },
                        {
                            sku:"aASDWEDDEW",
                            style: "Casual",
                            daily: "27",
                            weekly:"760",
                            monthly:"2689"
                        },
                        {
                            sku:"aASDWEDDEW",
                            style: "Casual",
                            daily: "27",
                            weekly:"760",
                            monthly:"2689"
                        },
                        {
                            sku:"aASDWEDDEW",
                            style: "Casual",
                            daily: "27",
                            weekly:"760",
                            monthly:"2689"
                        }
                    ];
                });

        }


        function handleSuccess(res) {
            return res.data;
        };
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        };
    }
})();
