const staticStuff = require("./static");

function getGender(resource){
    const men = (resource.subject_refs || []).indexOf(staticStuff.MEN_SUBJECT) >= 0,
    women = (resource.subject_refs || []).indexOf(staticStuff.WOMEN_SUBJECT) >= 0,
    both = men && women;

    if (both){ return "Both" }
    else if (women){ return "Women" }
    else if (men){ return "Men" }
    return "Unknown"

}

export { getGender }