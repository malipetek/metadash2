export default function (arr){
    let obj = []
    arr.forEach(item=>obj[item.id] = item)
    return obj
}