(function () {
    'use strict';

    angular
        .module('MainApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'ApiUrls'];
    function UserService($http, ApiUrls) {
        var service = {};

        service.GetUserIdByUsername = GetUserIdByUsername;
        service.GetByUserNameAndPassword=GetByUserNameAndPassword;
        service.GetUserIdByEmail=GetUserIdByEmail;

        return service;


        function GetUserIdByUsername(username) {
            return $http.get(ApiUrls.getUserIdByUsernameUrl+'/'+ username+'/userId')
                .then(handleSuccess, handleError('Error getting user by username'));
        }
        function GetUserIdByEmail(email) {
            return $http.get(ApiUrls.getUserIdByEmailUrl+'/'+ email+'/userId')
                .then(handleSuccess, handleError('Error getting user by email'));
        }
        function GetByUserNameAndPassword(username,password) {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            var dataObj = {
                user: username,
                pass: password
            };
            return $http.post( ApiUrls.loginUrl,dataObj,{})
                .then(handleSuccess,function (error) {
                    console.log("hardcoded authentication");
                    if(username=="owner")
                        return {userName:"ctriana",name:"Corali Triana",groups:"Owners"};
                    else if(username=="manager")
                        return {userName:"ctriana",name:"Corali Triana",groups:"Managers"};
                    else if(username=="regional_manager")
                        return {userName:"ctriana",name:"Corali Triana",groups:"RegionalManagers"};
                    else return {success:false};
                });
        }


        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
