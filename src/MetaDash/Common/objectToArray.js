export default function (obj){
    obj = obj || [];
    return Object.keys(obj).map(k=>obj[k]);
}