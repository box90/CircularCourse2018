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
function createCourse() {
    $.ajax({
        type: "POST",
        url: shared_1.webApiUri + '/course/insert',
        contentType: 'application/json',
        data: JSON.stringify({
        /*
        UserTitleId: $('#select-user-titles').val(),
        Username: $('#user-username').val(),
        Surname: $('#user-surname').val(),
        Name: $('#user-name').val()
        */
        //inserire i campi del form dei dettagli del corso
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Course");
    });
}
function updateCourse() {
    $.ajax({
        type: "PUT",
        url: shared_1.webApiUri + '/course/update',
        contentType: 'application/json',
        data: JSON.stringify({
        //inserire i campi del form dei dettagli del corso
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Course");
    });
}
function deleteCourse(courseId) {
    if (!confirm('Remove Course?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: shared_1.webApiUri + '/course/remove/?id=' + courseId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Course " + courseId);
    });
}
//#endregion
//# sourceMappingURL=course.js.map