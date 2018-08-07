//#region Classes
class Resource {
    public ID: number;
    public UserNamr: string;
    public Name: string;
    public Surname: string;
    public IsAvaiable: boolean;
    public IsCp: boolean;
}
//#endregion


//#region Variables
const webApiUri: string = 'http://localhost:53141/api';
let retrievedResources: Resource[] = [];
//#endregion


//#region Code
$(document).ready(() => {
    //retrieve all Resources
    let resources: Resource[] = this.GetResources();

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