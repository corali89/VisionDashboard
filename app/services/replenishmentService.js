/**
 * Created by corali.triana on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('ReplenishmentApp')
        .service('ReplenishmentService', ReplenishmentService);

    ReplenishmentService.$inject = [ '$http','ApiUrls'];
    function ReplenishmentService( $http, ApiUrls) {

        this.getMostPopularsBySku= getMostPopularsBySku;
        this.getMostPopularsByStyle= getMostPopularsByStyle;
        this.getStoresReportByDate=getStoresReportByDate;

        function getMostPopularsBySku() {
            return $http.get(ApiUrls.getMostPopularsBySkuUrl)
                .then(handleSuccess,handleError);
        };
        function getMostPopularsByStyle() {
            return $http.get(ApiUrls.getMostPopularsByStyleUrl)
                .then(handleSuccess,handleError);
        };
        function getStoresReportByDate() {
            return $http.get(ApiUrls.getStoreReportByDate)
                .then(handleSuccess,handleError);
        };
        function handleError(error) {
            console.log("Magic Leap- Error " + error);
            return [];
        };
        function handleSuccess(response) {
            return response.data;
        };
    }
})();
