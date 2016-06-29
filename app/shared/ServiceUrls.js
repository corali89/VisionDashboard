/**
 * Created by bernardo.hijuelos on 4/18/16.
 */

'use strict';
var app = angular.module('MainApp');

app.service('ApiUrls', function () {

    var baseProdIpPR = 'sgsdevdashboard:8080';
    var baseDevIPAccountServices="localhost:8080";

    var basePreRegistrationApiUrl = 'http://'+baseProdIpPR+'/PreRegistrationApi/api/visitor/';
    var baseDevJavaLDAPServer='http://'+baseDevIPAccountServices+'/';

    this.loginUrl = baseDevJavaLDAPServer + 'authenticateUser';
    this.getUserIdByEmailUrl=basePreRegistrationApiUrl+ 'userEmail';
    this.getUserIdByUsernameUrl=basePreRegistrationApiUrl+ 'username';


});

app.service('AppUrlPath', function () {
    this.basePath = 'SGSDashboard/index.html';
});
