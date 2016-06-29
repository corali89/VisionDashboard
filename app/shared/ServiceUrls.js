/**
 * Created by bernardo.hijuelos on 4/18/16.
 */

'use strict';
var app = angular.module('MainApp');

app.service('ApiUrls', function () {

    var env = 'staging';

    var baseDevIp = 'localhost:9080';
    var baseProdIpAT = '10.10.11.65:8080';
    var baseProdIpPR = 'sgsdevdashboard:8080';
    var baseProdIpVH = '192.168.1.127';
    var baseDevIPAccountServices="localhost:8080";

    //var ip = (env == 'dev') ? baseDevIp : baseProdIp;
    var baseAssetTrackerApiUrl = 'http://'+baseProdIpAT+'/AssetTrackerApi/api/assets/';
    var basePreRegistrationApiUrl = 'http://'+baseProdIpPR+'/PreRegistrationApi/api/visitor/';
    var baseVisitorHistoryApiUrl = 'http://'+baseProdIpVH+'/VisitorApi/api/Visitor/';
    var baseDevJavaLDAPServer='http://'+baseDevIPAccountServices+'/';

    this.loginUrl = baseDevJavaLDAPServer + 'authenticateUser';

    this.getFlipCardsUrl = baseAssetTrackerApiUrl + 'productTotals';
    this.getAllEventsUrl = baseAssetTrackerApiUrl + 'assetState';
    this.getAssetHistoryUrl = baseAssetTrackerApiUrl + 'assetHistory';
    this.GetAllOwnersUrl=baseAssetTrackerApiUrl+'getAvailableOwners';
    this.updateAssetsOwnerUrl =baseAssetTrackerApiUrl+'assignAssetOwner';

    this.getGuestForStatusUrl = basePreRegistrationApiUrl + 'getVisitors';
    this.getGuestForHostAndStatusUrl = basePreRegistrationApiUrl + 'getVisitorsForHostAndStatus';
    this.getGuestForHostUrl = basePreRegistrationApiUrl + 'getVisitorsForUser';
    this.getVisitorsCreatedByDelegateUrl=basePreRegistrationApiUrl+'getVisitorsCreatedByDelegate';
    this.getAllVisitorsUrl=basePreRegistrationApiUrl+'getAllVisitors';
    this.updateVisitStatusUrl = basePreRegistrationApiUrl + 'updateVisitStatus';
    this.createVisitUrl = basePreRegistrationApiUrl + 'createVisitInstance';
    this.getLocationsUrl= basePreRegistrationApiUrl + 'getLocations';
    this.getPurposeUrl= basePreRegistrationApiUrl + 'getVisitPurposes';
    this.getRolesUrl= basePreRegistrationApiUrl + 'getRoles';
    this.getVIPsUrl= basePreRegistrationApiUrl + 'getUserData';
    this.getTotalsByStateGroupsUrl=basePreRegistrationApiUrl+ 'getVisitStatusTotals';
    this.getUserIdByEmailUrl=basePreRegistrationApiUrl+ 'userEmail';
    this.getUserIdByUsernameUrl=basePreRegistrationApiUrl+ 'username';

    this.getGuestByLocationUrl=baseVisitorHistoryApiUrl+'VisitorsHistorical';
    this.getTotalsByLocationsUrl=baseVisitorHistoryApiUrl+'TotalVisitsByLocation';

});

app.service('AppUrlPath', function () {
    this.basePath = 'SGSDashboard/index.html';
});
