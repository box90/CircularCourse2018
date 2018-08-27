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
function createSubscription() {
    $.ajax({
        type: "POST",
        url: shared_1.webApiUri + '/subscription/insert',
        contentType: 'application/json',
        data: JSON.stringify({
        /*
        UserTitleId: $('#select-user-titles').val(),
        Username: $('#user-username').val(),
        Surname: $('#user-surname').val(),
        Name: $('#user-name').val()
        */
        //inserire i campi del form dei dettagli della risorsa
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetSubscriptions();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Subscription");
    });
}
function updateSubscription() {
    $.ajax({
        type: "PUT",
        url: shared_1.webApiUri + '/subscription/update',
        contentType: 'application/json',
        data: JSON.stringify({
        //inserire i campi del form dei dettagli della risorsa
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetSubscriptions();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Subscription");
    });
}
function deleteSubscription(resourceId) {
    if (!confirm('Remove Subscription?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: shared_1.webApiUri + '/subscription/remove/?id=' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetSubscriptions();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Subscription " + resourceId);
    });
}
//#endregion
//# sourceMappingURL=subscription.js.map