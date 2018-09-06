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
var _selfTeachPage = this;
//#endregion
//#Region Code
$(document).ready(function () {
    $('#loader').show();
    $('#resume').hide();
    CleanAllTeachingPage();
    GetTeachers();
});
//#endregion
//#Region API
function GetTeachers() {
    var tmp = [];
    $.getJSON(webApiUriTeacher, function (teaching) {
        tmp = teaching;
        $('#grid tbody').empty();
        $.each(teaching, function (i, elem) {
            $('#grid').append('<tr onclick="ClickDetailsT(this);">' + PrintTeachingT(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#loader').hide();
        $('#resume').show();
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Teachers');
    });
    return tmp;
}
function GetTeacher(id) {
    var tmp = null;
    $.getJSON(webApiUriTeacher + '/' + id, function (res) {
        tmp = JSON.parse(res);
        if (tmp != null) {
            $('#idTeaching').val(tmp.ID);
            $('#idResource').val(tmp.ID_Resource);
            $('#idCourse').val(tmp.ID_Course);
            $('#titleCourse').val(tmp.CourseModel.Title);
            $('#nameResource').val(tmp.ResourceModel.Name + ' ' + tmp.ResourceModel.Surname);
            $('#notesTeach').val(tmp.Notes);
        }
    })
        .done(function (data) {
        $('#updateButton').prop('disabled', false);
        $('#deleteButton').prop('disabled', false);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Teacher ' + id);
    });
    return tmp;
}
function updateTeacher() {
    $.ajax({
        type: "PUT",
        url: webApiUriTeacher + '/update',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $('#idTeaching').val(),
            ID_Resource: $('#idResource').val(),
            ID_Course: $('#idCourse').val(),
            Notes: $('#notesTeach').val()
        })
    }).done(function (data) {
        _selfTeachPage.CleanAllTeachingPage();
        _selfTeachPage.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Teacher");
    });
}
function deleteTeacher(teachingId) {
    if (!confirm('Remove Teaching?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUriTeacher + '/remove/' + teachingId,
        contentType: 'application/json'
    }).done(function (data) {
        _selfTeachPage.CleanAllTeachingPage();
        _selfTeachPage.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Teaching " + teachingId);
    });
}
//#endregion
//#Region otherFunctions
function PrintTeachingT(elem) {
    var res = '';
    res = '<td class="toBeFound">' + elem.ID + '</td><td>' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td><td>' + elem.CourseModel.Title + '</td>';
    return res;
}
function ClickDetailsT(x) {
    var row = $(x).closest("tr"); // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetTeacher(Number(id));
}
function CleanAllTeachingPage() {
    $('#idTeaching').val('');
    $('#titleCourse').val('');
    $('#nameResource').val('');
    $('#notesTeach').val('');
    //buttons
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
}
//#endregion
//# sourceMappingURL=teacher.js.map