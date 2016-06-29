/**
 * Created by corali.triana on 6/1/2016.
 */

'use strict';
var app = angular.module('MainApp');

app.service('Messages', function () {
    var vm=this;
    vm.confirmApproveGuest="Are you sure you want to accept this guest?";
    vm.confirmRejectGuest="Are you sure you want to reject this guest?";
    vm.confirmApproveGuests="Are you sure you want to accept these guests?";
    vm.confirmRejectGuests="Are you sure you want to reject these guests?";

    vm.confirmCreateGuest="Are you sure you want to invite this guest?";
    
    vm.headerApproveGuest="Approve Guest";
    vm.headerRejectGuest="Reject Guest";
    vm.headerApproveGuests="Approve Guests";
    vm.headerRejectGuests="Reject Guests";
});