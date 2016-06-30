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
                       return response;
                    },
                    function (error) {
                        return {success: false, message: error};}
                )
        }

        function SetCredentials(ldapUser) {

                    $rootScope.IsOwner = false;
                    $rootScope.IsRegionalManager = false;
                    $rootScope.IsManager = false;
                    var user = {
                        username: ldapUser.userName,
                        name: ldapUser.name,
                        email: ldapUser.email,
                        avatarUrl: 'assets/images/johndoe.png'
                    }
                    if (ldapUser.groups=="Owners") {
                        user.role = "Owner";
                        $rootScope.IsOwner = true;
                        $cookieStore.put('IsOwner', true);
                    }
                    else if (ldapUser.groups=="RegionalManagers") {
                        user.role = "Regional Manager";
                        $rootScope.IsRegionalManager = true;
                        $cookieStore.put('IsRegionalManager', true);
                    }
                    else if (ldapUser.groups=="Managers") {
                        user.role = "Manager";
                        $rootScope.IsManager = true;
                        $cookieStore.put('IsManager', true);
                    }
                    $rootScope.globals = {currentUser: user};

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            // $cookieStore.put('globals', $rootScope.globals);
            // $cookieStore.put('IsOwner', $rootScope.IsOwner);
            // $cookieStore.put('IsRegionalManager', $rootScope.IsRegionalManager);
            // $cookieStore.put('IsManager', $rootScope.IsManager);
        }
        // function IsOwner(ldapUser) {
        //     if(ldapUser.groups=="Owners"){
        //         return true;}
        //     else return false;
        // }
        // function IsManager(ldapUser) {
        //     if(ldapUser.groups=="Managers")
        //         return true;
        //     else return false;
        // }
        // function IsRegionalManager(ldapUser) {
        //     if(ldapUser.groups=="RegionalManagers")
        //         return true;
        //     else return false;
        // }
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