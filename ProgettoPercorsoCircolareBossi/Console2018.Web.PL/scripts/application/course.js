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
    PopulateDropdownResource();
});
//#endregion
//#Region API
function GetCourses() {
    var tmp = [];
    $.getJSON(webApiUriCourse, function (courses) {
        tmp = courses;
        $('#grid tbody').empty();
        $.each(courses, function (i, elem) {
            $('#grid').append('<tr>' + PrintCourse(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#loader').hide();
        $('#resume').show();
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Courses\n' + err + "\n" + jqXHR.responseText);
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
            $('#selectBox').val(tmp.ID_Coordinator);
        }
    })
        .done(function (data) {
        $('#updateButton').prop('disabled', false);
        $('#deleteButton').prop('disabled', false);
        $('#modalTeachingListButton').prop('disabled', false);
        $('#selectBox').prop('disabled', false);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Course ' + id + '\n' + err + "\n" + jqXHR.responseText);
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
            //ID_Coordinator: $('#idCoordinatorCreate').val(),
            ID_Coordinator: $('#selectBoxCreate').val(),
            IsCircular: $('#circularCreate').prop('checked')
        })
    }).done(function (data) {
        _selfPageCourse.CleanAllCoursePage();
        _selfPageCourse.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert('An error has occurred while creating Course\n' + errorThrown + "\n" + jqXHR.responseText);
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
            //ID_Coordinator: $('#idCoordinator').val()
            ID_Coordinator: $('#selectBox').val()
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        _selfPageCourse.CleanAllCoursePage();
        _selfPageCourse.GetCourses();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert('An error has occurred while updating Course\n' + errorThrown + "\n" + jqXHR.responseText);
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
        alert("An error has occurred while deleting Course " + courseId + '\n' + errorThrown + "\n" + jqXHR.responseText);
    });
}
//API SUBSCRIPTION
function modalCreateSubscription() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:53141/api/subscription/insert',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: '',
            ID_Course: $('#idCourse4Sub').val(),
            ID_Resource: $('#selectBoxR4Sub').val(),
            ID_CP: $('#selectBoxCP4Sub').val(),
            StartDate: $('#startDate4Sub').val(),
            MaxEndDate: '',
            IsAdmitted: $('#admitted4Sub').prop('checked'),
            Notes: $('#notes4Sub').val()
        })
    })
        .done(function (data) {
        _selfPageCourse.CleanAllCoursePage();
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Subscription");
    });
}
//API TEACHER
function ModalTeacherOfCourse(idCourse) {
    var tmp = [];
    $.getJSON('http://localhost:53141/api/teacher/course/' + idCourse, function (teachers) {
        tmp = teachers;
        $('#gridTeachModal tbody').empty();
        $.each(teachers, function (i, elem) {
            $('#gridTeachModal').append('<tr>' + PrintTeacher(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#IDCourseParameter4T').text(idCourse);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Courses');
    });
    return tmp;
}
function modalCreateTeachingOfCourse() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:53141/api/teacher/insert',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: '',
            ID_Resource: $('#selectBoxResources4Teach').val(),
            ID_Course: $('#idCourse4Teach').val(),
            Notes: $('#notes4Teach').val()
        })
    })
        .done(function (data) {
        _selfPageCourse.CleanAllCoursePage();
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert('An error has occurred while creating Teaching\n' + errorThrown + "\n" + jqXHR.responseText);
    });
}
//#endregion
//#region OtherFunctions
function PrintCourse(item) {
    var circular;
    var result;
    if (item.IsCircular) {
        circular = 'checked';
    }
    else {
        circular = 'unchecked';
    }
    result = '<td class="toBeFound" onclick="ClickDetailsCourse(this);">' + item.ID.toString() + '</td>' + '<td>' + item.Title + '</td>' + '<td>' + item.RefYear.toString() + '</td>' + '<td><input type="checkbox" ' + circular + ' disabled></td><td>' + AppendModalButton(item.ID) + '</td>';
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
    $('#selectBox').prop('disabled', true);
    //button
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
    $('#modalTeachingListButton').prop('disabled', true);
    //modalCreate
    $('#titleCourseCreate').val('');
    $('#descriptionCourseCreate').val('');
    $('#yearCourseCreate').val('');
    $('#startDateCreate').val('');
    $('#endDateCreate').val('');
    $('#idCoordinatorCreate').val('');
    $('#circularCreate').prop('checked', false);
    //modalCreateSub
    $('#idCourse4Sub').val('');
    $('#selectBoxR4Sub').val('');
    $('#selectBoxCP4Sub').val('');
    $('#startDate4Sub').val('');
    $('#admitted4Sub').prop('checked', false);
    $('#notes4Sub').val('');
    //modalCreateTeach
    $('#idCourse4Teach').val('');
    $('#notes4Teach').val('');
}
function PopulateDropdownResource() {
    var values = [];
    $.getJSON('http://localhost:53141/api/resource', function (resources) {
        values = resources;
        var option = '';
        var optionCreate = '';
        var optionSubscription = '';
        var optionTeacher = '';
        $.each(values, function (i, elem) {
            if (values[i].IsAvaiable) {
                option += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
                optionCreate += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
            }
            else {
                option += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
            }
            //add Cp list for Modal Subscription
            if (values[i].IsCP) {
                optionSubscription += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
            }
            //add Teacher list for Modal Teaching
            if (values[i].IsTeacher) {
                optionTeacher += '<option value="' + values[i].ID + '">' + values[i].Name + ' ' + values[i].Surname + '</option>';
            }
        });
        $('#selectBox').append(option);
        $('#selectBoxCreate').append(optionCreate);
        //append options for Modal SubscriptionCreate
        $('#selectBoxR4Sub').append(option);
        $('#selectBoxCP4Sub').append(optionSubscription);
        //append options for Modal TeachingCreate
        $('#selectBoxResources4Teach').append(optionTeacher);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
}
function PopulateListOfSubscriptionsModal(idCourse) {
    $.getJSON('http://localhost:53141/api/subscription' + '/course/' + idCourse, function (subscriptionsMixed) {
        // values = subscriptionsMixed;
        $('#gridSubscriptionModal').empty();
        $.each(subscriptionsMixed, function (i, elem) {
            $('#gridSubscriptionModal').append('<tr>' + PrintSubMixed4Modal(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#IDCourseParameter').text(idCourse);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Subscriptions');
    });
}
function AppendModalButton(id) {
    var code;
    code = '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#ModalSubscriptionList" onclick="PopulateListOfSubscriptionsModal(' + id + ');">...</button>';
    return code;
}
function PrintSubMixed4Modal(elem) {
    var admitted;
    var result;
    if (elem.IsAdmitted) {
        admitted = 'checked';
    }
    else {
        admitted = 'unchecked';
    }
    result = '<td>' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td>' + elem.StartDate.toString().substring(0, elem.StartDate.toString().indexOf('T')) + '</td>' + '<td>' + elem.MaxEndDate.toString().substring(0, elem.MaxEndDate.toString().indexOf('T')) + '<td><input type="checkbox" ' + admitted + ' disabled></td>';
    return result;
}
function PassIDCourseParameter() {
    var idC = $('#IDCourseParameter').text();
    $('#idCourse4Sub').val(Number(idC));
}
function PassIDCourseParameter4Teach() {
    var idC = $('#IDCourseParameter4T').text();
    $('#idCourse4Teach').val(Number(idC));
}
function PrintTeacher(elem) {
    var res = '';
    res = '<td>' + elem.ID + '</td><td> ' + elem.CourseModel.Title + '</td>' + '<td> ' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td> ' + elem.Notes + '</td>';
    return res;
}
//#endregion
//# sourceMappingURL=course.js.map