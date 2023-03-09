
import * as resources from "./resources";
import * as subjects from "./subjects";
import * as interviewers from "./interviewers";
import * as programs from "./programs";
import { getRecordingYear } from "./getRecordingYear";
import { getGender } from "./getGender";

/**
 * 
 * getData - given an options object,
 *           return the counts of specified meta
 *           field values
 * 
 */
function getData(options) {

    let ret = {
        // implemented
        "subjects": {},
        "languages": {},
        "birthYears": {},
        "interviewers": {},
        "gender": {
            men: { label: "Men", count: 0 },
            women: { label: "Women", count: 0 },
            both: { label: "Both", count: 0 }
        },
        "programs": {},

        // not implemented
        "recordingYears": {},
        // "birthCities": {},
        // "birthCountries": {},
        "birthPlaces": {},
        "birthCities": {},
        "birthCountries": {}

    }

    // let subj = [];

    function incr(retKey, item) {
        if (!(item.id in ret[retKey])) {
            ret[retKey][item.id] = { ...item, count: 0 };
        }
        ret[retKey][item.id].count += 1;
    }

    var res = resources.query(options || {});

    function birthPlaces(r) {
        let ret = []
        const cityCount = (r.birth_place_cities || []).length;
        const countryCount = (r.birth_place_countries || []).length;
        if (cityCount < 1 || cityCount !== countryCount) { return [] }
        for (var i = 0; i < cityCount; i++) {
            const city = r.birth_place_cities[i] || "",
                country = r.birth_place_countries[i] || "";
            ret.push(`${city},${country}|${country}`);
        }
        return ret;
    }

    res = res.map(r => { return { ...r, birthPlaces: birthPlaces(r) } });

    res.forEach(r => {

        // count occurrences of each subject
        (r.subject_refs || []).forEach(s => { incr("subjects", subjects.byID(s)) });

        // count the number of records with both men and women
        const genderItem = { id: getGender(r).toLowerCase() };
        // console.log("gender", genderItem)
        incr("gender", genderItem);
        // if (r.subject_refs.indexOf(MEN_SUBJECT) >= 0 && r.subject_refs.indexOf(WOMEN_SUBJECT) >= 0){ ret.gender.both.count += 1 }

        // count occurrences of each birth year
        if (r.birth_years && r.birth_years.length === 1) {
            incr("birthYears", { label: r.birth_years[0], id: r.birth_years[0] })
        }

        // count occurrences of each language
        incr("languages", { label: r.language, id: r.language });

        // // count occurrences of each birth city/country pair
        r.birthPlaces.forEach(place => {
            const city = place.split("|")[0],
                country = place.split("|")[1];

            incr("birthPlaces", {
                label: place,
                id: place,
                city,
                country
            });
            incr("birthCities", {
                label: city,
                id: city,
            });
            incr("birthCountries", {
                label: country,
                id: country,
            })

        });


        // count occurrences of each recording year
        const ryear = getRecordingYear(r);
        incr("recordingYears", { label: ryear, id: ryear });

        // count occurrences of each affiliate program
        (r.programs || []).forEach(i => { incr("programs", programs.byID(i)) });

        // count occurences of each interviewer
        (r.interviewers || []).forEach(i => { incr("interviewers", interviewers.byID(i)) })

    });

    // ret.gender.men = (ret.subjects[MEN_SUBJECT] || 0) 
    // ret.gender.women = (ret.subjects[WOMEN_SUBJECT] || 0 )
    // ret.gender.men.count -= ret.gender.both.count || 0 ;
    // ret.gender.women.count -= ret.gender.both.count;


    const returnValue = {
        resources: res,
        subjects: undefined,
        summaryData: ret
    };

    return returnValue;

}

export {
    getData,
    resources,
    interviewers,
    subjects,
    programs,

    getRecordingYear
};