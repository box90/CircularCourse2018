//import { webApiUri } from './shared'

//#region Class
class Teacher {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public Notes: string;
}

class TeacherMixed {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public Notes: string;
    public ResourceModel: Resource;
    public CourseModel: Course;
}
//#endregion

//#region Variables
const webApiUriTeacher: string = 'http://localhost:53141/api/teacher';
let _selfTeachPage = this;
//#endregion

//#Region Code
$(document).ready(() => {
    $('#loader').show();
    $('#resume').hide();
    CleanAllTeachingPage();
    GetTeachers();
});
//#endregion


//#Region API
function GetTeachers(): TeacherMixed[] {
    let tmp: TeacherMixed[] = [];

    $.getJSON(webApiUriTeacher,function (teaching: TeacherMixed[]) {
        tmp = teaching;
        $('#grid tbody').empty();
        $.each(teaching, (i, elem: TeacherMixed) => {
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

function GetTeacher(id: number): TeacherMixed {
    let tmp: TeacherMixed = null;

    $.getJSON(webApiUriTeacher + '/' + id, function (res: string) {
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

function updateTeacher(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUriTeacher + '/update',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $('#idTeaching').val(),
            ID_Resource:$('#idResource').val(),
            ID_Course: $('#idCourse').val(),
            Notes: $('#notesTeach').val()
        })
    }).done(function (data) {
        _selfTeachPage.CleanAllTeachingPage();
        _selfTeachPage.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Teacher" );
    });
}


function deleteTeacher(teachingId: number): void {
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
function PrintTeachingT(elem: TeacherMixed): string {
    var res: string = '';
    res = '<td class="toBeFound">' + elem.ID + '</td><td>' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td><td>' + elem.CourseModel.Title + '</td>';
    return res;
}

function ClickDetailsT(x: HTMLTableRowElement): void {
    var row = $(x).closest("tr");    // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetTeacher(Number(id));
}

function CleanAllTeachingPage(): void {
    $('#idTeaching').val('');
    $('#titleCourse').val('');
    $('#nameResource').val('');
    $('#notesTeach').val('');
    //buttons
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
}
//#endregion