"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
//#region Classes
var Course = /** @class */ (function () {
    function Course() {
    }
    return Course;
}());
//#endregion
//#region Variables
var retrievedCourses = [];
//#endregion
//#Region Code
function GetCourses() {
    var tmp = [];
    $.getJSON(shared_1.webApiUri + '/course')
        .done(function (courses) {
        tmp = courses;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Courses');
    });
    return tmp;
}
function GetCourse(id) {
    var tmp = null;
    $.getJSON(shared_1.webApiUri + '/course/' + id)
        .done(function (res) {
        tmp = res;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Course ' + id);
    });
    return tmp;
}
//#endregion
//# sourceMappingURL=course.js.map