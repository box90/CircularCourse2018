﻿//#region Class
class Subscription {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public ID_CP: number;
    public StartDate: Date;
    public MaxEndDate: Date;
    public IsAdmitted: boolean;
    public Notes: string;
}

class SubscriptionMixed {
    public ID: number;
    public ID_Resource: number;
    public ID_Course: number;
    public ID_CP: number;
    public StartDate: Date;
    public MaxEndDate: Date;
    public IsAdmitted: boolean;
    public Notes: string;
    public CourseModel: Course;
    public ResourceModel: Resource;
    public CpModel: Resource;
}
//#endregion

//#region Variables
const webApiUriSub: string = 'http://localhost:53141/api/subscription';
let _selfSubPage = this;
//#endregion


//#Region Code
$(document).ready(() => {
    //retrieve all Courses
    $('#loader').show();
    $('#resume').hide();
    CleanAllSubPage();
    LoadAll();
    //PopulateDropdown();
});
//#endregion


//#Region API
function LoadAll(): SubscriptionMixed[] {
    let tmp: SubscriptionMixed[] = [];

    $.getJSON(webApiUriSub + '/all', function (subscriptionsMixed: SubscriptionMixed[]) {
        tmp = subscriptionsMixed;
        $('#grid').empty();
        $.each(subscriptionsMixed, (i, elem: SubscriptionMixed) => {
            $('#grid').append('<tr onclick="ClickDetailsSub(this)">' + PrintSubMixed(elem) + '</tr>');
        });
    })
        .done(function (data) {
            $('#loader').hide();
            $('#resume').show();
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Subscriptions\n' + err + "\n" + jqXHR.responseText);
        });

    return tmp;

}

function GetSubscriptions(): Subscription[] {
    let tmp: Subscription[] = [];

    $.getJSON(webApiUriSub,function (subscriptions: Subscription[]) {
        tmp = subscriptions;
        $.each(subscriptions, (i, elem: Subscription) => {
            //CALL  API_COURSE - API_RESOURCE

            $('#grid').append('<tr onclick="">' + PrintSub(elem) + '</tr>');
        });
    })
        .done(function (data) {
            $('#loader').hide();
            $('#resume').show();
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Subscriptions\n' + err + "\n" + jqXHR.responseText);
        });

    return tmp;
}

function GetSubscriptionMixed(id: number): SubscriptionMixed {
    let tmp: SubscriptionMixed = null;

    $.getJSON(webApiUriSub + '/all/' + id,function (res: string) {
            tmp = JSON.parse(res);
            if (tmp != null) {
                $('#idSub').val(id);
                $('#idCourse').val(tmp.ID_Course);
                $('#titleCourse').val(tmp.CourseModel.Title);
                $('#idResource').val(tmp.ID_Resource);
                $('#nameResource').val(tmp.ResourceModel.Name + ' ' + tmp.ResourceModel.Surname);
                $('#idCP').val(tmp.ID_CP);
                $('#nameCp').val(tmp.CpModel.Name + ' ' + tmp.CpModel.Surname);
                $('#startDate').val(tmp.StartDate.toString().substring(0, tmp.StartDate.toString().indexOf('T')));
                $('#maxEndDate').val(tmp.MaxEndDate.toString().substring(0, tmp.MaxEndDate.toString().indexOf('T')));
                $('#notes').val(tmp.Notes);
                $('#admitted').prop('checked', tmp.IsAdmitted);
            }
    })
        .done(function (data) {
            $('#updateButton').prop('disabled', false);
            $('#deleteButton').prop('disabled', false);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Subscription ' + id + '\n' + err + "\n" + jqXHR.responseText);
        });

    return tmp;
}

function createSubscription(): void {
    $.ajax({
        type: "POST",
        url: webApiUriSub + '/insert',
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
        this.GetSubscriptions();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert('An error has occurred while creating Subscription\n' + errorThrown + "\n" + jqXHR.responseText);
    });
}

function updateSubscription(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUriSub + '/update',
        contentType: 'application/json',
        data: JSON.stringify({
            ID:$('#idSub').val(),
            ID_Course: $('#idCourse').val(),
            ID_Resource: $('#idResource').val(),
            ID_CP: $('#idCP').val(),
            StartDate:$('#startDate').val(),
            MaxEndDate:'',
            IsAdmitted: $('#admitted').prop('checked'),
            Notes: $('#notes').val()
        })
    }).done(function (data) {
        _selfSubPage.CleanAllSubPage();
        _selfSubPage.LoadAll();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Subscription");
    });
}


function deleteSubscription(resourceId: number): void {
    if (!confirm('Remove Subscription?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUriSub + '/remove/' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        _selfSubPage.CleanAllSubPage();
        _selfSubPage.LoadAll();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Subscription " + resourceId + '\n' + errorThrown + "\n" + jqXHR.responseText);
    });
}
//#endregion


//#Region other functions
function PrintSub(elem: Subscription): string {
    let admitted: string;
    let result: string;

    if (elem.IsAdmitted) {
        admitted = 'checked';
    }
    else {
        admitted = 'unchecked';
    }

    result = '<td class="toBeFound">' + elem.ID_Course + '</td>' + '<td>' + elem.ID_Resource + '</td>' + '<td>' + elem.StartDate.toString().substring(0, elem.StartDate.toString().indexOf('T')) + '</td>' + '<td><input type="checkbox" ' + admitted + ' disabled></td>';
    return result;

}

function PrintSubMixed(elem: SubscriptionMixed): string {
    let admitted: string;
    let result: string;

    if (elem.IsAdmitted) {
        admitted = 'checked';
    }
    else {
        admitted = 'unchecked';
    }

    result = '<td class="toBeFound" hidden>' + elem.ID + '</td>' + '<td>' + elem.CourseModel.Title + '</td>' + '<td>' + (elem.ResourceModel.Name + ' ' + elem.ResourceModel.Surname) + '</td>' + '<td>' + elem.StartDate.toString().substring(0, elem.StartDate.toString().indexOf('T')) + '</td>' + '<td><input type="checkbox" ' + admitted + ' disabled></td>';
    return result;
}

function ClickDetailsSub(x: HTMLTableRowElement): void {
    var row = $(x).closest("tr");    // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetSubscriptionMixed(Number(id));
}

function CleanAllSubPage(): void {
    $('#idSub').val('');
    $('#idCourse').val('');
    $('#titleCourse').val('');
    $('#idResource').val('');
    $('#nameResource').val('');
    $('#idCp').val('');
    $('#nameCp').val('');
    $('#startDate').val('');
    $('#maxEndDate').val('');
    $('#notes').val('');
    $('#admitted').prop('checked', false);
    //buttons
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
}
//#endregion