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
const webApiUriCourse: string = 'http://localhost:53141/api/course';
let _selfPageCourse = this;
//#endregion


//#Region Code
$(document).ready(() => {
    //retrieve all Courses
    $('#loader').show();
    $('#resume').hide();
    CleanAllCoursePage();
    GetCourses();
    PopulateDropdownResource();
});
//#endregion

//#Region API
function GetCourses(): Course[] {
    let tmp: Course[] = [];

    $.getJSON(webApiUriCourse, function (courses: Course[]) {
        tmp = courses;
        $('#grid tbody').empty();
        $.each(courses, (i, elem: Course) => {
            $('#grid').append('<tr>' + PrintCourse(elem) + '</tr>');
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

function GetCourse(id: number): Course {
    let tmp: Course = new Course();

    $.getJSON(webApiUriCourse + '/' + id, function (res: string) {
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
            $('#selectBox').prop('disabled', false);

        })
    .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Course ' + id);
    });

    return tmp;
}


function createCourse(): void {
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
        alert("An error has occurred while creating Course");
    });
}

function updateCourse(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUriCourse + '/update',
        contentType: 'application/json',
        data: JSON.stringify({
            ID:$('#idCourse').val(),
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
            alert("An error has occurred while updating Course");
    });
}


function deleteCourse(courseId: number): void {
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

//API SUBSCRIPTION
function modalCreateSubscription(): void {
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
        
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Subscription");
    });
}
//#endregion


//#region OtherFunctions
function PrintCourse(item: Course): string {
    let circular: string;
    let result: string;

    if (item.IsCircular) {
        circular = 'checked';
    }
    else {
        circular = 'unchecked';
    }

    result = '<td class="toBeFound" onclick="ClickDetailsCourse(this);">' + item.ID.toString() + '</td>' + '<td>' + item.Title + '</td>' + '<td>' + item.RefYear.toString() + '</td>' + '<td><input type="checkbox" ' + circular + ' disabled></td><td>' + AppendModalButton(item.ID) + '</td>';
    return result;
}

function ClickDetailsCourse(x: HTMLTableRowElement): void {
    var row = $(x).closest("tr");    // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetCourse(Number(id));
}

function CleanAllCoursePage(): void {
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
    //modalCreate
    $('#titleCourseCreate').val('');
    $('#descriptionCourseCreate').val('');
    $('#yearCourseCreate').val('');
    $('#startDateCreate').val('');
    $('#endDateCreate').val('');
    $('#idCoordinatorCreate').val('');
    $('#circularCreate').prop('checked', false);
}


function PopulateDropdownResource(): void {
    let values: Resource[] = [];

    $.getJSON('http://localhost:53141/api/resource', function (resources: Resource[]) {
        values = resources;
        var option = '';
        var optionCreate = '';
        var optionSubscription = '';
        $.each(values, (i, elem: Resource) => {
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
           
        });
        $('#selectBox').append(option);
        $('#selectBoxCreate').append(optionCreate);
        //append options for Modal SubscriptionCreate
        $('#selectBoxR4Sub').append(option);
        $('#selectBoxCP4Sub').append(optionSubscription);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });  
}

function PopulateListOfSubscriptionsModal(idCourse: number): void {
    $.getJSON('http://localhost:53141/api/subscription' + '/course/' + idCourse, function (subscriptionsMixed: SubscriptionMixed[]) {
       // values = subscriptionsMixed;
        $('#gridSubscriptionModal').empty();
        $.each(subscriptionsMixed, (i, elem: SubscriptionMixed) => {
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

function AppendModalButton(id: number): string {
    let code: string;

    code = '<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#ModalSubscriptionList" onclick="PopulateListOfSubscriptionsModal(' + id + ');">...</button>';

    return code;
}

function PrintSubMixed4Modal(elem: SubscriptionMixed): string {
    let admitted: string;
    let result: string;

    if (elem.IsAdmitted) {
        admitted = 'checked';
    }
    else {
        admitted = 'unchecked';
    }

    result = '<td class="toBeFound" hidden>' + elem.ID + '</td>' + '<td>' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td>' + elem.StartDate.toString().substring(0, elem.StartDate.toString().indexOf('T')) + '</td>' + '<td>' + elem.MaxEndDate.toString().substring(0, elem.MaxEndDate.toString().indexOf('T')) + '<td><input type="checkbox" ' + admitted + ' disabled></td>';
    return result;
}

function PassIDCourseParameter(): void{
    var idC = $('#IDCourseParameter').text();
    $('#idCourse4Sub').val(Number(idC));
}
//#endregion