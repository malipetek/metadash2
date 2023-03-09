/**
 * Common functionality for interface for items referenced from the index,
 *      chiefly, the "subjects" and "interviewers"
 */

module.exports = function(data, indexField) {
    // let ret = {};

    /**
     * Data api - designed to replaced in-place with a backend API
     */
    const { normalizeString } = require("../Common");
    const resources = require("./resources");

    let __byID = {}

    const all = () => data;

    all().forEach(r => __byID[r.id] = r);

    const byID = id => __byID[id];

    let filters = {};

    filters.itemContainsAllTerms = function (terms) {
        terms = terms || [];
        return function (item) {
            for (let i = 0; i < terms.length; i++) {
                let term = terms[i];
                if (normalizeString(item.label).indexOf(normalizeString(term)) < 0) return false;
            }
            return true;
        }
    };

    /**
     * 
     * search - return only subjects that contain all of the strings
     *          in terms. Comparison is case-insensitive and ignores
     *          most special characters and diacritics (via unidecode)
     * 
     * @param {Array<String>} terms 
     */
    function search (terms) {

        let ret = [];
        terms = terms || [];

        (resources.query() || []).forEach(r => {
            (r[indexField] || []).forEach(s => {
                if (!(filters.itemContainsAllTerms(terms)(byID(s)))) { return false }
                if (ret.indexOf(byID(s)) < 0) ret.push(byID(s))
            });
        });

        return ret
    }

    return {byID, search}
}