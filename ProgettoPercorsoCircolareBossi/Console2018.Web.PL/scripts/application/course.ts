import { webApiUri} from './shared'

//#region Classes
class Course {
    public ID: number;
    public Title: string;
    public Description: string;
    public RefYear: number;
    public StartDate: Date;
    public EndDate: Date;
    public IsCircular: boolean;
    public ID_Coordinator: number;
}
//#endregion

//#region Variables
let retrievedCourses: Course[] = [];
//#endregion

//#Region Code
function GetCourses(): Course[] {
    let tmp: Course[] = [];

    $.getJSON(webApiUri + '/course')
        .done(function (courses: Course[]) {
            tmp = courses;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Courses');
        });

    return tmp;
}

function GetCourse(id: number): Course {
    let tmp: Course = null;

    $.getJSON(webApiUri + '/course/' + id)
        .done(function (res: Course) {
            tmp = res;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Course ' + id);
        });

    return tmp;
}


function createCourse(): void {
    $.ajax({
        type: "POST",
        url: webApiUri + '/course/insert',
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

function updateCourse(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUri + '/course/update',
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



function deleteCourse(courseId: number): void {
    if (!confirm('Remove Course?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/course/remove/?id=' + courseId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetCourses();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error has occurred while deleting Course " + courseId);
    });
}


//#endregion