//import { webApiUri} from './shared'
//#region Classes
var Course = /** @class */ (function () {
    function Course() {
    }
    return Course;
}());
//#endregion
//#region Variables
var webApiUriCourse = 'http://localhost:53141/api/course';
var _selfPageCourse = this;
//#endregion
//#Region Code
$(document).ready(function () {
    //retrieve all Courses
    $('#loader').show();
    $('#resume').hide();
    //CleanAllCoursePage();
    GetCourses();
});
//#endregion
//#Region API
function GetCourses() {
    var tmp = [];
    $.getJSON(webApiUriCourse, function (courses) {
        tmp = courses;
        $('#grid tbody').empty();
        $.each(courses, function (i, elem) {
            $('#grid').append('<tr onclick="ClickDetailsCourse(this);">' + PrintCourse(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#loader').hide();
        $('#resume').show();
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Courses');
    });
    return tmp;
}
function GetCourse(id) {
    var tmp = new Course();
    $.getJSON(webApiUriCourse + '/' + id, function (res) {
        tmp = JSON.parse(res);
        //var startD = tmp.StartDate.getTime().toString() + '-' + tmp.StartDate.getMonth().toString() + '-' + tmp.StartDate.getDate().toString();
        //var endD = tmp.EndDate.getTime().toString() + '-' + tmp.EndDate.getMonth().toString() + '-' + tmp.EndDate.getDate().toString();
        if (tmp != null) {
            $('#idCourse').val(tmp.ID);
            $('#titleCourse').val(tmp.Title);
            $('#descriptionCourse').val(tmp.Description);
            $('#yearCourse').val(tmp.RefYear);
            //$('#startDate').val(startD);
            //$('#endDate').val(endD);
            $('#idCoordinator').val(tmp.ID_Coordinator);
            $('#circular').prop('checked', tmp.IsCircular);
        }
    })
        .done(function (data) { })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Course ' + id);
    });
    return tmp;
}
function createCourse() {
    $.ajax({
        type: "POST",
        url: webApiUriCourse + '/insert',
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
        url: webApiUriCourse + '/update',
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
        url: webApiUriCourse + '/remove/' + courseId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Course " + courseId);
    });
}
//#endregion
//#region OtherFunctions
function PrintCourse(item) {
    var result = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Title + '</td>' + '<td>' + item.RefYear.toString() + '</td>';
    return result;
}
function ClickDetailsCourse(x) {
    var row = $(x).closest("tr"); // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetCourse(Number(id));
}
function CleanAllCoursePage() {
    $('#idCourse').val("");
    $('#titleCourse').val("");
    $('#descriptionCourse').val("");
    $('#yearCourse').val("");
    $('#startDate').val("");
    $('#endDate').val("");
    $('#idCoordinator').val("");
    $('#circular').prop('checked', false);
}
//#endregion
//# sourceMappingURL=course.js.map