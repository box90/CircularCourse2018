//import { webApiUri } from './shared'

//#region Class
class Teacher {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public Notes: string;
}

//#endregion

//#region Variables
const webApiUriTeacher: string = 'http://localhost:53141/api/teacher';
let retrievedTeachers: Teacher[] = [];
//#endregion

//#Region Code
function GetTeachers(): Teacher[] {
    let tmp: Teacher[] = [];

    $.getJSON(webApiUri + '/teacher')
        .done(function (courses: Teacher[]) {
            tmp = courses;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Teachers');
        });

    return tmp;
}

function GetTeacher(id: number): Teacher {
    let tmp: Teacher = null;

    $.getJSON(webApiUri + '/teacher/' + id)
        .done(function (res: Teacher) {
            tmp = res;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Teacher ' + id);
        });

    return tmp;
}


function createTeacher(): void {
    $.ajax({
        type: "POST",
        url: webApiUri + '/teacher/insert',
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

function updateTeacher(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUri + '/teacher/update',
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


function deleteTeacher(resourceId: number): void {
    if (!confirm('Remove Teacher?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/teacher/remove/?id=' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetTeachers();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Teacher " + resourceId);
    });
}

//#endregion