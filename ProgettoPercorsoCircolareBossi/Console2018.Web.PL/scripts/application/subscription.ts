import { webApiUri } from './shared'

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
//#endregion