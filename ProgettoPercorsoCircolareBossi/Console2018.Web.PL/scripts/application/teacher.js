"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
//#region Class
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    return Teacher;
}());
//#endregion
//#region Variables
var retrievedTeachers = [];
//#endregion
//#Region Code
function GetTeachers() {
    var tmp = [];
    $.getJSON(shared_1.webApiUri + '/teacher')
        .done(function (courses) {
        tmp = courses;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Teachers');
    });
    return tmp;
}
function GetTeacher(id) {
    var tmp = null;
    $.getJSON(shared_1.webApiUri + '/teacher/' + id)
        .done(function (res) {
        tmp = res;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Teacher ' + id);
    });
    return tmp;
}
//#endregion
//# sourceMappingURL=teacher.js.map