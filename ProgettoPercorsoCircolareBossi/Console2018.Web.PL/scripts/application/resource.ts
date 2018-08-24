import { webApiUri } from './shared'

//#region Classes
class Resource {
    public ID: number;
    public UserName: string;
    public Name: string;
    public Surname: string;
    public IsAvaiable: boolean;
    public IsCp: boolean;
}
//#endregion


//#region Variables
//const webApiUri: string = 'http://localhost:53141/api';
let retrievedResources: Resource[] = [];
//#endregion


//#region Code
$(document).ready(() => {
    //retrieve all Resources
    let resources: Resource[] = GetResources();
    PrintResources(resources);
});

function GetResources(): Resource[] {
    let tmp: Resource[] = [];

    $.getJSON(webApiUri + '/resource')
        .done(function (resources: Resource[]) {
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

function PrintResources(resources: Resource[]): void {
    $.each(resources, (key, item: Resource) => {
        $('#grid').append('<li>' + item.ID + ' ' + item.Name + ' ' + item.Surname + '</li>');
    });
    
}

function GetResource(id: number): Resource {
    let tmp: Resource = null;

    $.getJSON(webApiUri + '/resource/' + id)
        .done(function (res: Resource) {
            tmp = res;    
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resource ' + id);
        });

    return tmp;
}

//endregion