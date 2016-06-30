/**
 * Created by bernardo.hijuelos on 4/18/16.
 */


(function () {
    'use strict';

    angular
        .module('LoginApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService','$cookieStore'];
    function LoginController($rootScope, $scope, $location, AuthenticationService, $cookieStore) {
        var vm = this;

        vm.login = login;
        vm.logout=logout;
       
        function login() {
            AuthenticationService.ClearCredentials();
            AuthenticationService.Login(vm.username, vm.password)
                .then(function (response) {
                    if (response.success == false || response.success != undefined) {
                        vm.loginError = true;
                        vm.loginErrorMsg = "Incorrect Username/Password. Please try again.";
                    } else {
                        AuthenticationService.SetCredentials(response);
                        vm.user = $rootScope.globals.currentUser;
                        $scope.user = $rootScope.globals.currentUser;
                        $cookieStore.put('globals', $rootScope.globals);
                        vm.loginError = false;
                        vm.loginErrorMsg = "";
                        $location.path('/dashboard/register');
                    }
                }, function (error) {
                    vm.loginError = true;
                    vm.loginErrorMsg = "Incorrect Username/Password. Please try again.";

                });
        };
        function logout() {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        }
    }

})();
