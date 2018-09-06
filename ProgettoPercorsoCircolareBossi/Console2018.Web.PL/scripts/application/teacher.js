//import { webApiUri } from './shared'
//#region Class
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    return Teacher;
}());
var TeacherMixed = /** @class */ (function () {
    function TeacherMixed() {
    }
    return TeacherMixed;
}());
//#endregion
//#region Variables
var webApiUriTeacher = 'http://localhost:53141/api/teacher';
var retrievedTeachers = [];
//#endregion
//#Region API
function GetTeachers() {
    var tmp = [];
    $.getJSON(webApiUriTeacher)
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
    $.getJSON(webApiUriTeacher + '/' + id)
        .done(function (res) {
        tmp = res;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Teacher ' + id);
    });
    return tmp;
}
function createTeacher() {
    $.ajax({
        type: "POST",
        url: webApiUriTeacher + '/insert',
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
        this.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Teacher");
    });
}
function updateTeacher() {
    $.ajax({
        type: "PUT",
        url: webApiUriTeacher + '/update',
        contentType: 'application/json',
        data: JSON.stringify({
        //inserire i campi del form dei dettagli della risorsa
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Teacher");
    });
}
function deleteTeacher(resourceId) {
    if (!confirm('Remove Teacher?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUriTeacher + '/remove/' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Teacher " + resourceId);
    });
}
//#endregion
//#Region otherFunctions
//#endregion
//# sourceMappingURL=teacher.js.map