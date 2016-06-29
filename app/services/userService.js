(function () {
    'use strict';

    angular
        .module('MainApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'ApiUrls'];
    function UserService($http, ApiUrls) {
        var service = {};

        // service.GetAll = GetAll;
        // service.GetById = GetById;
        service.GetUserIdByUsername = GetUserIdByUsername;
        // service.Create = Create;
        // service.Update = Update;
        // service.Delete = Delete;
        service.GetByUserNameAndPassword=GetByUserNameAndPassword;
        service.GetUserIdByEmail=GetUserIdByEmail;

        return service;

        // function GetAll() {
        //     return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        // }
        //
        // function GetById(id) {
        //     return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        // }

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
                .then(handleSuccess,handleError("Error getting user by username and password"));
        }

        // function Create(user) {
        //     return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        // }
        //
        // function Update(user) {
        //     return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        // }
        //
        // function Delete(id) {
        //     return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        //}

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
