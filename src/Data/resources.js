const { getRecordingYear } = require("./getRecordingYear");
const { normalizeString } = require("../Common");
const { getGender } = require("./getGender");
/**
 * all - return an array containing all records.
 *       This can be accomplished by calling .query
 *       without any parameters
 *         
 */
const __all = require("./json/index.8.min.json");
const all = () => __all;

let filters = {};

filters.resourceContainsAllItems = (itemField, itemFilters) => {
    return r => {
        for (let i = 0; i < itemFilters.length; i++) {
            let item = itemFilters[i];
            if (r[itemField].indexOf(item.id) < 0) return false;
        }
        return true;
    }
}

filters.resourceContainsAllSubjects = subjects => { return filters.resourceContainsAllItems("subject_refs", subjects) }

filters.resourceContainsAllInterviewers = interviewers => { return filters.resourceContainsAllItems("interviewers", interviewers) }

filters.resourceContainsAllPrograms = programs => { return filters.resourceContainsAllItems("programs", programs) }

filters.resourceContainsOnlyPrograms = programs => {
    return r => {
        if (programs.length < 1) { return true; } // don't filter if it's not set
        if (r.programs.length > 1 || r.programs.length < 1) { return false }
        if (r.programs[0] === programs[0].id) { return true }
        return false;
    }
}

// TODO - eventually, I should just make all of the filters into factories 
//        like this one, so the function is declared once per query 
let filterBirthPlacesFactory = options => {
 
    if (!options 
        || !options.birthplaces
        || (options.birthplaces || []).length < 1){ 
            return () => true 
        }

    return r => {
        let place = options.birthplaces[0];

        // these two should always match
        if ((r.birth_place_cities || []).length !== (r.birth_place_countries || []).length) { return false }

        for (let j = 0; j < (r.birth_place_cities || []).length; j++) {
    
            let city = r.birth_place_cities[j],
                country = r.birth_place_countries[j];
            //if (!city || !country ){ return false}
            if (normalizeString(country) !== normalizeString(place.country)) return false;

            if (place.city){
                //console.log("There's a city to filter", place)
                // if there's a city, limit by that as well
                if (normalizeString(city) !== normalizeString(place.city.split(",")[0])) return false;
            } //else { console.log("there's no city required", city, country, place.city, place.country, place) }

            return true;
        }

        return false;
    }

}

filters.getResources = options => {

    let filterBirthPlaces = filterBirthPlacesFactory(options)
    // just skip the iteration if no args are passed
    if (!options) { return all; }

    // function validRecordingYear(r){
    //     const yr = getRecordingYear(r);
    //     if (!options.filters){ return true}
    //     if (!options.filters.dateRanges){ return true}
    //     if (!options.filters.dateRanges.recording){ return true}
    //     if (yr < options.filters.dateRanges[0]){ return false}
    //     if (yr > options.filters.dateRanges[1]){ return false}
    //     return true;

    // }
    
    return r => {

        // filter by selected subject
        if (!filters.resourceContainsAllSubjects(options.subjects || [])(r)) { return false }

        // TODO - filter by gender
        if ((options.gender || []).length > 0 && (options.gender || []).length < 3) {
            if (options.gender.indexOf(getGender(r)) < 0) { return }
        }

        // TODO - filter by year of recording
        if (options.dateRanges
            && options.dateRanges.recording) {
            const recordingYear = getRecordingYear(r);
            if (recordingYear < options.dateRanges.recording[0]
                || recordingYear > options.dateRanges.recording[1]
                || !recordingYear) { return false }

        } else { 
            // console.log("Skipping recording year filter")
    }

        // TODO - filter by year of birth
        if (options.dateRanges && options.dateRanges.birth) {
            const birthYears = r.birth_years || [];
            if (!birthYears.reduce((curr, next) => {
                if (!curr) { return false }
                if (!options) { return true };
                if (!options.dateRanges) { return true };
                if (!options.dateRanges.birth) { return true }
                if (next < options.dateRanges.birth[0] || next > options.dateRanges.birth[1]) { return false }
                return true;
            }, true)) { return false }

        } else { 
            // console.log("Skipping birth year filter")
        }

        if (! filterBirthPlaces(r)){ return false}
        // if ((options.birthplaces || []).length > 0) {
            
        //     let place = options.birthplaces[0];

        //     for (let j = 0; j < (r.birth_place_cities || []).length; j++) {

        //         if ((r.birth_place_cities || []).length !== (r.birth_place_countries || []).length) { return false }
        //         let city = r.birth_place_cities[j],
        //             country = r.birth_place_countries[j];
        //         if (normalizeString(country) !== normalizeString(place.country)) return false;
        //         if (place.city){
        //             // if there's a city, limit by that as well
        //             if (normalizeString(city) !== normalizeString(place.city.split(",")[0])) return false;
        //         }
        //         console.log("match", place, city, country)


        //     }
        // }

        // TODO - filter by affiliate program
        // if (!filters.resourceContainsAllPrograms(options.programs || [])(r)) { return false }
        if (!filters.resourceContainsOnlyPrograms(options.programs || [])(r)) { return false }

        // TODO - filter by interviewer
        if (!filters.resourceContainsAllInterviewers(options.interviewers || [])(r)) { return false }

        // TODO - in future, support multiple languages
        if (options.language
            && options.language.length === 1
            && r.language !== options.language[0].id) { return false }

        // if it passes everything, return true
        return true;

    }
}

/**
 * 
 * query - filter resources based on options object. All options elements
 *         are represented as string arrays. All filters are ANDed together,
 *         so filtering by Men + Women would only (ideally) return testimony
 *         with at least two subjects, a man and a woman.
 * 
 * @param {object} options - {
 *                     subjectIDs:Array<String> - ArchivesSpace subject refs to include,
 *                         gender:Array<String> - genders ("Women","Men") to include,
 *                  recordingYear:Array<String> - [minYear, maxYear]
 *                      birthYear:Array<String> - [minYear, maxYear]
 *              affiliatePrograms:Array<String> - ArchivesSpace agent refs of programs
 *                   interviewers:Array<String> - ArchivesSpace agent refs of interviewers
 *                      languages:Array<String> - list of languages to include
 * 
 * }
 */
// let query = options => all().filter(filters.getResources(options))

function query(options){
    if (!options){ return all()}
    return all().filter(filters.getResources(options));
}

module.exports = { all, query }