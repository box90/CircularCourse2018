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
    GetResources();
    //PrintResources(resources);
});
function GetResources() {
    $.getJSON(webApiUri + '/resource', function (resources) {
        $('#grid').empty();
        $.each(resources, function (i, elem) {
            $('#grid').append('<tr onclick="ClickResource(this);">' + PrintResource(elem) + '</tr>');
        });
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
}
function PrintResource(item) {
    var result = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Name + '</td>' + '<td>' + item.Surname + '</td>';
    return result;
}
function GetResource(id) {
    var tmp = null;
    $.getJSON(webApiUri + '/resource/' + id)
        .done(function (res) {
        tmp = res;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resource ' + id);
    });
    return tmp;
}
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
function updateResource() {
    $.ajax({
        type: "PUT",
        url: webApiUri + '/resource/update',
        contentType: 'application/json',
        data: JSON.stringify({
        //inserire i campi del form dei dettagli della risorsa
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Resource");
    });
}
function deleteResource(resourceId) {
    if (!confirm('Remove Resource?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/resource/remove/?id=' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Resource " + resourceId);
    });
}
function ClickResource(x) {
    var $row = $(x).closest("tr"); // Find the row
    var $text = $row.find(".toBeFound").text(); // Find the text
    alert($text);
}
//#endregion
//# sourceMappingURL=resource.js.map