"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
//#region Classes
var Resource = /** @class */ (function () {
    function Resource() {
    }
    return Resource;
}());
//#endregion
//#region Variables
var webApiUri = 'http://localhost:53141/api';
var retrievedResources = [];
//#endregion
//#region Code
$(document).ready(function () {
    //retrieve all Resources
    var resources = _this.GetResources();
});
function GetResources() {
    var tmp = [];
    $.getJSON(webApiUri + '/resource')
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
    //$.each(resources, (key, item: Resource) => {        });
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
//endregion
//# sourceMappingURL=resource.js.map