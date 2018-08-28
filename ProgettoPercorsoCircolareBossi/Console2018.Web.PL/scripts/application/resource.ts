//import * as SHARED from './shared'

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
const webApiUri: string = 'http://localhost:53141/api';
//let webApiUri: string = SHARED.webApiUri;
let retrievedResources: Resource[] = [];
//#endregion


//#region Code
$(document).ready(() => {
    //retrieve all Resources
    GetResources();
    //PrintResources(resources);
});

function GetResources(): void {
    let tmp: Resource[];

    $.getJSON(webApiUri + '/resource', function (resources: Resource[]) {
        tmp = resources;
        
        $.each(resources, (i, elem: Resource) => {
            $('#grid > tbody:last-child').append('<tr>' + PrintResource(elem) + '</tr>');
        });
        
    })
    .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resources');
        });
}

function PrintResource(item: Resource): string {
    return item.ID.toString() + ' ' + item.Name.toString() + ' ' + item.Surname.toString();   
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

function createResource(): void {
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

function updateResource(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
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


function deleteResource(resourceId: number): void {
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


//#endregion