//import * as SHARED from './shared'

//#region Classes
class Resource {
    public ID: number;
    public UserName: string;
    public Name: string;
    public Surname: string;
    public IsAvaiable: boolean;
    public IsCP: boolean;
    public IsTeacher: boolean;
}
//#endregion


//#region Variables
const webApiUri: string = 'http://localhost:53141/api';
//let webApiUri: string = SHARED.webApiUri;
let _self = this;
//#endregion


//#region Code
$(document).ready(() => {
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
function GetResources(): Resource[] {
    let tmp: Resource[] = [];

    $.getJSON(webApiUri + '/resource', function (resources: Resource[]) {
        tmp = resources;
        $('#grid tbody').empty();
        $.each(resources, (i, elem: Resource) => {
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
function GetResource(id: number): Resource {
    let tmp: Resource = new Resource();

    $.getJSON(webApiUri + '/resource/' + id, function (res: string) {
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
function createResource(): void {
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
        //$('#ModalCreate').modal('hide');
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Resource");
    });
}

//Update
function updateResource(): void {
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
function DeleteResource(resourceId: number): void {
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
function ModalTeacherOfResource(idResource: number): TeacherMixed[] {
    let tmp: TeacherMixed[] = [];

    $.getJSON('http://localhost:53141/api/teacher/resource/' + idResource, function (teachers: TeacherMixed[]) {
        tmp = teachers;
        $('#gridTeachModal tbody').empty();
        $.each(teachers, (i, elem: TeacherMixed) => {
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

function modalCreateTeachingOfResource(): void {
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
function PrintResource(item: Resource): string {
    let result: string = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Name + '</td>' + '<td>' + item.Surname + '</td>';
    return result;
}

function ClickDetails(x: HTMLTableRowElement): void {
    var row = $(x).closest("tr");    // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetResource(Number(id));
}

function CleanAll(): void {
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

function PrintTeaching(elem: TeacherMixed): string {
    let res: string = '';
    res = '<td>' + elem.ID + '</td><td> ' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td>' + elem.CourseModel.Title + '</td>' + '<td> ' + elem.Notes + '</td>';
    return res;
}

function PopulateDropdownCourses(): void {
    let values: Course[] = [];

    $.getJSON('http://localhost:53141/api/course', function (course: Course[]) {
        values = course;
        var option = '';
        $.each(values, (i, elem: Course) => {
            option += '<option value="' + values[i].ID + '">' + values[i].Title + ' (Anno: ' + values[i].RefYear.toString() + ')</option>';
            
        });
        $('#selectBoxCourse4Teach').append(option);
    })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resources');
        });
}

function PassIDResourceParameter(): void {
    var idC = $('#IDResourceParameter4T').text();
    $('#idResource4Teach').val(Number(idC));
}

//#endregion