//import * as SHARED from './shared'
//#region Classes
var Resource = /** @class */ (function () {
    function Resource() {
    }
    return Resource;
}());
//#endregion
//#region Variables
var webApiUri = 'http://localhost:53141/api';
//let webApiUri: string = SHARED.webApiUri;
var _self = this;
//#endregion
//#region Code
$(document).ready(function () {
    //retrieve all Resources
    //$('#grid').empty();
    $('#loader').show();
    $('#resume').hide();
    CleanAll();
    GetResources();
    PopulateDropdownCourses();
});
//#endregion
//#region API
//getALL
function GetResources() {
    var tmp = [];
    $.getJSON(webApiUri + '/resource', function (resources) {
        tmp = resources;
        $('#grid tbody').empty();
        $.each(resources, function (i, elem) {
            $('#grid').append('<tr onclick="ClickDetails(this);">' + PrintResource(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#loader').hide();
        $('#resume').show();
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
    return tmp;
}
//getByID
function GetResource(id) {
    var tmp = new Resource();
    $.getJSON(webApiUri + '/resource/' + id, function (res) {
        tmp = JSON.parse(res);
        if (tmp != null) {
            $('#id').val(tmp.ID.toString());
            $('#username').val(tmp.UserName);
            $('#name').val(tmp.Name);
            $('#surname').val(tmp.Surname);
            $('#avaiable').prop('checked', tmp.IsAvaiable);
            $('#cp').prop('checked', tmp.IsCP);
            $('#teacher').prop('checked', tmp.IsTeacher);
        }
    })
        .done(function (data) {
        $('#updateButton').prop('disabled', false);
        $('#deleteButton').prop('disabled', false);
        if (tmp.IsTeacher) {
            $('#modalTeachingListButton').prop('disabled', false);
        }
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resource ' + id);
    });
    return tmp;
}
//Post
function createResource() {
    //var myForm = <HTMLFormElement>(document.getElementById('formResourceCreate'));
    //
    //if (!myForm[0].checkValidity()) {
    //    $('#submitCreate').click();
    //}
    //else {
    $.ajax({
        type: "POST",
        url: webApiUri + '/resource/insert',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $('#idCreate').val(),
            Name: $('#nameCreate').val(),
            Surname: $('#surnameCreate').val(),
            IsAvaiable: $('#avaiableCreate').prop('checked'),
            IsCp: $('#cpCreate').prop('checked'),
            IsTeacher: $('#teacherCreate').prop('checked')
        })
    }).done(function (data) {
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Resource\n" + errorThrown);
    });
    //}
}
//Update
function updateResource() {
    $.ajax({
        type: "PUT",
        url: webApiUri + '/resource/update',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $('#id').val(),
            UserName: $('#username').val(),
            Name: $('#name').val(),
            Surname: $('#surname').val(),
            IsAvaiable: $('#avaiable').prop('checked'),
            IsCP: $('#cp').prop('checked'),
            IsTeacher: $('#teacher').prop('checked')
        })
    }).done(function (data) {
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Resource");
    });
}
//Delese
function DeleteResource(resourceId) {
    if (!confirm('Remove Resource?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/resource/remove/' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Resource " + resourceId);
    });
}
//API TEACHER
function ModalTeacherOfResource(idResource) {
    var tmp = [];
    $.getJSON('http://localhost:53141/api/teacher/resource/' + idResource, function (teachers) {
        tmp = teachers;
        $('#gridTeachModal tbody').empty();
        $.each(teachers, function (i, elem) {
            $('#gridTeachModal').append('<tr>' + PrintTeaching(elem) + '</tr>');
        });
    })
        .done(function (data) {
        $('#IDResourceParameter4T').text($('#id').val().toString());
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Courses');
    });
    return tmp;
}
function modalCreateTeachingOfResource() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:53141/api/teacher/insert',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: '',
            ID_Resource: $('#idResource4Teach').val(),
            ID_Course: $('#selectBoxCourse4Teach').val(),
            Notes: $('#notes4Teach').val()
        })
    })
        .done(function (data) {
        _self.CleanAll();
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Teaching");
    });
}
//#endregion
//#region OtherFunctions
function PrintResource(item) {
    var result = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Name + '</td>' + '<td>' + item.Surname + '</td>';
    return result;
}
function ClickDetails(x) {
    var row = $(x).closest("tr"); // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetResource(Number(id));
}
function CleanAll() {
    //Clean Form
    $('#id').val("");
    $('#username').val("");
    $('#name').val("");
    $('#surname').val("");
    $('#avaiable').prop('checked', false);
    $('#cp').prop('checked', false);
    $('#teacher').prop('checked', false);
    //Disable Buttons
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
    $('#modalTeachingListButton').prop('disabled', true);
    //Clean Modal
    $('#idCreate').val("");
    $('#nameCreate').val("");
    $('#surnameCreate').val("");
    $('#avaiableCreate').prop('checked', false);
    $('#cpCreate').prop('checked', false);
    $('#teacherCreate').prop('checked', false);
    //clean modal CreateTeaching
    $('#selectBoxCourse4Teach').val('');
    $('#idCourse4Teach').val('');
    $('#notes4Teach').val('');
}
function PrintTeaching(elem) {
    var res = '';
    res = '<td>' + elem.ID + '</td><td> ' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td>' + elem.CourseModel.Title + '</td>' + '<td> ' + elem.Notes + '</td>';
    return res;
}
function PopulateDropdownCourses() {
    var values = [];
    $.getJSON('http://localhost:53141/api/course', function (course) {
        values = course;
        var option = '';
        $.each(values, function (i, elem) {
            option += '<option value="' + values[i].ID + '">' + values[i].Title + ' (Anno: ' + values[i].RefYear.toString() + ')</option>';
        });
        $('#selectBoxCourse4Teach').append(option);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
}
function PassIDResourceParameter() {
    var idC = $('#IDResourceParameter4T').text();
    $('#idResource4Teach').val(Number(idC));
}
//#endregion
//# sourceMappingURL=resource.js.map