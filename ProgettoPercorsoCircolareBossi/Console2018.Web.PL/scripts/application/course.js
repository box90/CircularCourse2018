//import { Resource } from "./resource";
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
    CleanAllCoursePage();
    GetCourses();
    PopulateDropdown();
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
        var startD = tmp.StartDate.toString().substring(0, tmp.StartDate.toString().indexOf('T'));
        var endD = tmp.EndDate.toString().substring(0, tmp.EndDate.toString().indexOf('T'));
        if (tmp != null) {
            $('#idCourse').val(tmp.ID);
            $('#titleCourse').val(tmp.Title);
            $('#descriptionCourse').val(tmp.Description);
            $('#yearCourse').val(tmp.RefYear);
            $('#startDate').val(startD);
            $('#endDate').val(endD);
            $('#idCoordinator').val(tmp.ID_Coordinator);
            $('#circular').prop('checked', tmp.IsCircular);
        }
    })
        .done(function (data) {
        $('#updateButton').prop('disabled', false);
        $('#deleteButton').prop('disabled', false);
    })
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
            Title: $('#titleCourseCreate').val(),
            Description: $('#descriptionCourseCreate').val(),
            RefYear: $('#yearCourseCreate').val(),
            StartDate: $('#startDateCreate').val(),
            EndDate: $('#endDateCreate').val(),
            ID_Coordinator: $('#idCoordinatorCreate').val(),
            IsCircular: $('#circularCreate').prop('checked')
        })
    }).done(function (data) {
        _selfPageCourse.CleanAllCoursePage();
        _selfPageCourse.GetCourses();
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
            ID: $('#idCourse').val(),
            Title: $('#titleCourse').val(),
            Description: $('#descriptionCourse').val(),
            RefYear: $('#yearCourse').val(),
            StartDate: $('#startDate').val(),
            EndDate: $('#endDate').val(),
            IsCircular: $('#circular').prop('checked'),
            ID_Coordinator: $('#idCoordinator').val()
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        _selfPageCourse.CleanAllCoursePage();
        _selfPageCourse.GetCourses();
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
        _selfPageCourse.CleanAllCoursePage();
        _selfPageCourse.GetCourses();
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
    //button
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
    //modalCreate
    $('#titleCourseCreate').val('');
    $('#descriptionCourseCreate').val('');
    $('#yearCourseCreate').val('');
    $('#startDateCreate').val('');
    $('#endDateCreate').val('');
    $('#idCoordinatorCreate').val('');
    $('#circularCreate').prop('checked', false);
}
function PopulateDropdown() {
    var values = [];
    $.getJSON('http://localhost:53141/api/resource', function (resources) {
        values = resources;
        var option = '';
        $.each(values, function (i, elem) {
            option += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
        });
        $('#selectBox').append(option);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
}
//#endregion
//# sourceMappingURL=course.js.map