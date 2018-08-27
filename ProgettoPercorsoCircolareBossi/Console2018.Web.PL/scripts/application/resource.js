"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
//#region Classes
var Resource = /** @class */ (function () {
    function Resource() {
    }
    return Resource;
}());
//#endregion
//#region Variables
//const webApiUri: string = 'http://localhost:53141/api';
var retrievedResources = [];
//#endregion
//#region Code
$(document).ready(function () {
    //retrieve all Resources
    var resources = GetResources();
    PrintResources(resources);
});
function GetResources() {
    var tmp = [];
    $.getJSON(shared_1.webApiUri + '/resource')
        .done(function (resources) {
        tmp = resources;
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while loading Resources');
    });
    return tmp;
}
/**
 * /$.each(userTitles, (key, item: UserTitle) => {
       $('#list-of-user-titles').append('<li class="list-group-item">' + formatUserTitle(item) + '<a style="margin-left:5px;" href="#" onclick="viewUserTitleDetails(' + item.Id + ')">(View)</a><a style="margin-left:5px;" href="#" onclick="updateUserTitle(' + item.Id + ');">(Update)</a><a style="margin-left:5px;" href="#" onclick="deleteUserTitle(' + item.Id + ');">(Delete)</a></li>');
       $('#select-user-titles').append('<option value="' + item.Id + '">' + item.Description + '</option>');
   });
 */
/*
 $('#grid').grid({
    dataSource: data,
    uiLibrary: 'bootstrap',
    columns: [
      { field: 'ID', width: 32 },
      { field: 'Name', sortable: true },
      { field: 'PlaceOfBirth', title: 'Place Of Birth', sortable: true },
      { title: '', field: 'Edit', width: 34, type: 'icon', icon: 'glyphicon-pencil', tooltip: 'Edit', events: { 'click': Edit } },
                    { title: '', field: 'Delete', width: 34, type: 'icon', icon: 'glyphicon-remove', tooltip: 'Delete', events: { 'click': Delete } }
    ],
    pager: { limit: 5 }
  });
 */
function PrintResources(resources) {
    $.each(resources, function (key, item) {
        $('#grid').append('<li>' + item.ID + ' ' + item.Name + ' ' + item.Surname + '</li>');
    });
}
function GetResource(id) {
    var tmp = null;
    $.getJSON(shared_1.webApiUri + '/resource/' + id)
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
        url: shared_1.webApiUri + '/resource/insert',
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
        url: shared_1.webApiUri + '/resource/update',
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
        url: shared_1.webApiUri + '/resource/remove/?id=' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Resource " + resourceId);
    });
}
//#endregion
//# sourceMappingURL=resource.js.map