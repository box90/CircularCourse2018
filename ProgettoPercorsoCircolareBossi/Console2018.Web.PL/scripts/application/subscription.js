"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
//#region Class
var Subscription = /** @class */ (function () {
    function Subscription() {
    }
    return Subscription;
}());
//#endregion
//#region Variables
var retrievedSubscriptions = [];
//#endregion
//#Region Code
function GetSubscriptions() {
    var tmp = [];
    $.getJSON(shared_1.webApiUri + '/subscriprion')
        .done(function (courses) {
        tmp = courses;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Subscriptions');
    });
    return tmp;
}
function GetSubscription(id) {
    var tmp = null;
    $.getJSON(shared_1.webApiUri + '/subscription/' + id)
        .done(function (res) {
        tmp = res;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Subscription ' + id);
    });
    return tmp;
}
//#endregion
//# sourceMappingURL=subscription.js.map