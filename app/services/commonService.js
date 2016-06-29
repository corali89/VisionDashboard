/**
 * Created by corali.triana on 4/29/2016.
 */
(function() {
    'use strict';
    angular.module('MainApp').service('commonService', commonService);
    commonService.$inject = ['$http', 'ApiUrls'];
    
    function commonService($http, ApiUrls) {

       
        function handleError(error) {
            console.log("Vision- Error " + error);
            return [];
        }
        function handleSuccess(response) {
            return response.data;
        }
    }
})();
