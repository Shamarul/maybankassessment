import Api from '../../configs/Api';

/*----- Call AutoComplete -----
    action: GET
    params: googleApiKey[String], parameter[String]
*/
export async function _getAutoComplete(body, props) {
    let request = await fetch([Api.GOOGLE_MAP, 'autocomplete', 'json?key='+props.googleApiKey+'&input='+props.parameter, ].join('/'), body);
    let responseJSON;
    try {
        let getBody = await request.json();
        responseJSON = {httpstatus: request.status, ...getBody};
    } catch(err) {
        responseJSON = {httpstatus: request.status};
    }
    return responseJSON;
}

/*----- Call AutoComplete -----
    action: GET
    params: googleApiKey[String], placeId[String]
*/
export async function _getPlaceDetail(body, props) {
    let request = await fetch([Api.GOOGLE_MAP, 'details', 'json?key='+props.googleApiKey+'&place_id='+props.placeId, ].join('/'), body);
    let responseJSON;
    try {
        let getBody = await request.json();
        responseJSON = {httpstatus: request.status, ...getBody};
    } catch(err) {
        responseJSON = {httpstatus: request.status};
    }
    return responseJSON;
}