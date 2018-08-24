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
//#endregion