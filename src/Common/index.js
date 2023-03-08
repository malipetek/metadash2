var unidecode = require('unidecode');

function normalizeString(term) {
    return unidecode((term||"").toLowerCase().trim());
}

// replace the keys in a dictionary with something else
function replaceKeys(dictObj, keyMap) {
    var ret = {}
    for (var k in dictObj) {
        ret[keyMap[k]] = dictObj[k];
    }
    return ret;
}

module.exports = {
    normalizeString,
    replaceKeys,
}