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
let _self = this;
//#endregion


//#region Code
$(document).ready(() => {
    //retrieve all Resources
    //$('#grid').empty();
    $('#loader').show();
    $('#resume').hide();
    CleanAll();
    GetResources();
});
//#endregion

//#region API

//getALL
function GetResources(): void {
    $.getJSON(webApiUri + '/resource', function (resources: Resource[]) {
        $('#grid tbody').empty();
        $.each(resources, (i, elem: Resource) => {
            $('#grid').append('<tr onclick="ClickDetails(this);">' + PrintResource(elem) + '</tr>');
        });
        
    })
    .done(function (data) {
        $('#loader').hide();
        $('#resume').show();
    })
    .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resources');
        });
    
}

//getByID
function GetResource(id: number): Resource {
    let tmp: Resource = new Resource();

    $.getJSON(webApiUri + '/resource/' + id, function (res: string) {
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
        .done(function (data) {
            $('#updateButton').prop('disabled', false);
            $('#deleteButton').prop('disabled', false);
    })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Resource ' + id);
    });

    return tmp;
}

//Post
function createResource(): void {
    $.ajax({
        type: "POST",
        url: webApiUri + '/resource/insert',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $('#idCreate').val(),
            Name: $('#nameCreate').val(),
            Surname: $('#surnameCreate').val(),
            IsAvaiable: $('#avaiableCreate').prop('checked'),
            IsCp: $('#cpCreate').prop('checked')
        })
    }).done(function (data) {
        //$('#ModalCreate').modal('hide');
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while creating Resource");
    });
}

//Update
function updateResource(): void {
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
        _self.CleanAll();
        _self.GetResources();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while updating Resource");
    });
}

//Delese
function DeleteResource(resourceId: number): void {
    if (!confirm('Remove Resource?')) {
        return;
    }
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/resource/remove/' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        _self.CleanAll();
        _self.GetResources();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error has occurred while deleting Resource " + resourceId);
    });
}

//#endregion



//#region OtherFunctions
function PrintResource(item: Resource): string {
    let result: string = '<td class="toBeFound">' + item.ID.toString() + '</td>' + '<td>' + item.Name + '</td>' + '<td>' + item.Surname + '</td>';
    return result;
}

function ClickDetails(x: HTMLTableRowElement): void {
    var row = $(x).closest("tr");    // Find the row
    var id = row.find(".toBeFound").text(); // Find the text
    //alert(id);
    GetResource(Number(id));
}

function CleanAll(): void {
    //Clean Form
    $('#id').val("");
    $('#username').val("");
    $('#name').val("");
    $('#surname').val("");
    $('#avaiable').prop('checked', false);
    $('#cp').prop('checked', false);
    //Disable Buttons
    $('#updateButton').prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
    //Clean Modal
    $('#idCreate').val("");
    $('#nameCreate').val("");
    $('#surnameCreate').val("");
    $('#avaiableCreate').prop('checked', false);
    $('#cpCreate').prop('checked', false);
}
//#endregion