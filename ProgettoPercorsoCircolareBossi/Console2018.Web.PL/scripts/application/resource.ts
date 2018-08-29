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
    //$('#grid').empty();
    GetResources();
    //PrintResources(resources);
});

function GetResources(): void {
    $.getJSON(webApiUri + '/resource', function (resources: Resource[]) {
        $('#grid').empty();
        $.each(resources, (i, elem: Resource) => {
            $('#grid').append('<tr onclick="ClickResource(this);">' + PrintResource(elem) + '</tr>');
        });
        
    })
    .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resources');
        });
}

function PrintResource(item: Resource): string {
    let result: string = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Name + '</td>' + '<td>' + item.Surname + '</td>';
    return result;
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

function ClickResource(x: HTMLTableRowElement): void {
    var $row = $(x).closest("tr");    // Find the row
    var $text = $row.find(".toBeFound").text(); // Find the text

    alert($text);
}
//#endregion