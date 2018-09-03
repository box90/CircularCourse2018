//import { webApiUri } from './shared'

//#region Class
class Subscription {
    public ID: number;
    public ID_Resource: number;
    public ID_Subscription: number;
    public ID_CP: number;
    public StartTime: Date;
    public MaxDate: Date;
    public IsAdmitter: boolean;
    public Notes: string;
}

//#endregion

//#region Variables
const webApiUriSub: string = 'http://localhost:53141/api/subscription';
let retrievedSubscriptions: Subscription[] = [];
//#endregion

//#Region Code
function GetSubscriptions(): Subscription[] {
    let tmp: Subscription[] = [];

    $.getJSON(webApiUri + '/subscriprion')
        .done(function (courses: Subscription[]) {
            tmp = courses;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Subscriptions');
        });

    return tmp;
}

function GetSubscription(id: number): Subscription {
    let tmp: Subscription = null;

    $.getJSON(webApiUri + '/subscription/' + id)
        .done(function (res: Subscription) {
            tmp = res;
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while loading Subscription ' + id);
        });

    return tmp;
}

function createSubscription(): void {
    $.ajax({
        type: "POST",
        url: webApiUri + '/subscription/insert',
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
        alert("An error has occurred while creating Subscription");
    });
}

function updateSubscription(): void {
    $.ajax({
        type: "PUT", //controllare se PUT
        url: webApiUri + '/subscription/update',
        contentType: 'application/json',
        data: JSON.stringify({
            //inserire i campi del form dei dettagli della risorsa
        })
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetSubscriptions();
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
        url: webApiUri + '/subscription/remove/?id=' + resourceId,
        contentType: 'application/json'
    }).done(function (data) {
        //console.log(JSON.stringify(data));
        this.GetSubscriptions();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error has occurred while deleting Subscription " + resourceId);
    });
}


//#endregion