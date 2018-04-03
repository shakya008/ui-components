
const SEPARATOR: string = ':';
const REGEX: string = '(:[A-Za-z]*)';
export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const slice = Array.prototype.slice;

/**
* This function form the actual url from the template url
* Ex: var t_url = '/api/user/:id, config = {id: 1234}'
* var a_url = '/api/user/1234'
* @param { string } templateUrl: template URL
* @param { Object } config : Configation object which has replacement for template url
* @return { string } return actual url string
*/
export function formTemplateUrl(templateUrl: string, config: Object = {}) {
    const re: RegExp = new RegExp(REGEX, 'g');
    let templateList: Array<string> = templateUrl.match(re);
    let params: URLSearchParams = new URLSearchParams();
    let searchOp: string = '';
    for (let key in config) {
        if (hasOwnProperty.call(config, key)) {
            if ( templateList && templateList.indexOf(SEPARATOR + key) >= 0) {
                templateUrl = templateUrl.replace(SEPARATOR + key, config[key]);
            } else {
                params.set(key, config[key]);
                searchOp = '?';
            }
        }
    }
    /*
     * Remove extra template variable if present
     */
     templateList = templateUrl.match(re);
     if (templateList) {
         for (let i = 0; i < templateList.length; i++) {
             templateUrl = templateUrl.replace(templateList[i], '');
         }
     }
     /* remove extra backslass if added due to remove of extra template params */
     templateUrl = templateUrl.replace(/\/{1,}/g, '/');
     templateUrl = templateUrl.replace(/\.$/, '');
     templateUrl = templateUrl.replace(/\/$/, '');
     return templateUrl + searchOp + params.toString();
 }

 export function getValueIn(obj, path: Array<any>) {
     let value = obj;
    path = path || [];
    for (let i = 0; i < path.length; i++) {
        if (typeof value !== 'object') {
            throw new Error('Expected Object or Array but found: ' + value );
        }
        value = value && value[path[i]];
    }
    return value;
}