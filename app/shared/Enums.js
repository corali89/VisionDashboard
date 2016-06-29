/**
 * Created by corali.triana on 5/9/2016.
 */

(function() {
    'use strict';
    var app = angular.module('MainApp');

    app.service('Enums', function () {
        this.GuestStatus = {
            PENDING: 1,
            APPROVED: 2,
            REJECTED: 3,
            BLACKLISTED: 4
        };

        Object.freeze(this.GuestStatus);
    })

})();