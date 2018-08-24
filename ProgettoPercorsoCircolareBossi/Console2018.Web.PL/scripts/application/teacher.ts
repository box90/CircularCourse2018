import { webApiUri } from './shared'

//#region Class
class Teacher {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public Notes: string;
}

//#endregion

//#region Variables
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
//#endregion