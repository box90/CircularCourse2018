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
var retrievedResources = [];
//#endregion
//#region Code
$(document).ready(function () {
    //retrieve all Resources
    //$('#grid').empty();
    $('#loader').show();
    $('#resume').hide();
    GetResources();
    $('#loader').hide();
    $('#resume').show();
});
//#endregion
//#region API
//getALL
function GetResources() {
    $.getJSON(webApiUri + '/resource', function (resources) {
        $('#grid tbody').empty();
        $.each(resources, function (i, elem) {
            $('#grid').append('<tr onclick="ClickDetails(this);">' + PrintResource(elem) + '</tr>');
        });
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
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
            $('#cp').prop('checked', tmp.IsCp);
        }
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resource ' + id);
    });
    return tmp;
}
//Post
function createResource() {
    $.ajax({
        type: "POST",
        url: webApiUri + '/resource/insert',
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
        this.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Resource");
    });
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
            IsCp: $('#cp').prop('checked')
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetResources();
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
        //console.log(JSON.stringify(data));
        this.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Resource " + resourceId);
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
//#endregion
//# sourceMappingURL=resource.js.map