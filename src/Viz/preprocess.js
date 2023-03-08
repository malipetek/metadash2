/**
 * 
 * return a sorted array that's ready for use in a bar chart
 * group items beyond maxItems together as "other"
 * format each item as {label:number, value:number}
 * 
 * @param {*} obj 
 * @param {*} maxItems 
 */
export default function (obj, maxItems, valueField){

    var keys = Object.keys(obj)

    keys = keys.sort(function(key1, key2){ 
        return obj[key1][valueField] < obj[key2][valueField]? 1 : -1;
    })

    return keys.map((v, i, arr)=>{
        var k = arr[i];
        return{...obj[k],
        }}).slice(0,maxItems || 5)

}