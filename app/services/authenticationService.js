(function () {
    'use strict';

    angular
        .module('MainApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = [ '$cookieStore', '$rootScope', 'UserService'];
    function AuthenticationService( $cookieStore, $rootScope, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password) {
            return UserService.GetByUserNameAndPassword(username,password)
                .then(
                    function (response) {
                        if (response.email==null)
                            return {success: false, message: "User not found"};
                        else return response;
                    },
                    function (error) {
                        return {success: false, message: error};}
                )
        }

        function SetCredentials(ldapUser) {
            return UserService.GetUserIdByEmail(ldapUser.email).then(
                function (response) {
                    $rootScope.IsOwner = false;
                    $rootScope.IsRegionalManager = false;
                    $rootScope.IsManager = false;
                    var user = {
                        userId:response.userId,
                        username: ldapUser.userName,
                        name: ldapUser.name,
                        email: ldapUser.email,
                        avatarUrl: 'assets/images/johndoe.png'
                    }
                    if (IsOwner(ldapUser)) {
                        user.role = "Owner";
                        $rootScope.IsOwner = true;
                        $cookieStore.put('IsOwner', true);
                    }
                    else if (IsRegionalManager(ldapUser)) {
                        user.role = "Regional Manager";
                        $rootScope.IsRegionalManager = true;
                        $cookieStore.put('IsRegionalManager', true);
                    }
                    else if (IsManager(ldapUser)) {
                        user.role = "Manager";
                        $rootScope.IsManager = true;
                        $cookieStore.put('IsManager', true);
                    }
                    $rootScope.globals = {currentUser: user};
                }
            );
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            // $cookieStore.put('globals', $rootScope.globals);
            // $cookieStore.put('IsOwner', $rootScope.IsOwner);
            // $cookieStore.put('IsRegionalManager', $rootScope.IsRegionalManager);
            // $cookieStore.put('IsManager', $rootScope.IsManager);
        }
        function IsOwner(user) {
            if(user.groups.indexOf("Owners")==0){
                return true;}
            else return false;
        }
        function IsManager(user) {
            if(user.groups.indexOf("Managers")==0)
                return true;
            else return false;
        }
        function IsRegionalManager(user) {
            if(user.groups.indexOf("RegionalManagers")==0)
                return true;
            else return false;
        }
        function ClearCredentials() {
            $rootScope.globals = {};
            $rootScope.IsOwner= {};
            $rootScope.IsRegionalManager= {};
            $rootScope.IsManager= {};
            
            $cookieStore.remove('globals');
            $cookieStore.remove('IsOwner');
            $cookieStore.remove('IsRegionalManager');
            $cookieStore.remove('IsManager');
            //$http.defaults.headers.common.Authorization = 'Basic';
        }
    }
})();