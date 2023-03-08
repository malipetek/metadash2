//import {subjects, filterSubjectHeadings} from "./subjects";
var Subjects = require("./subjects");

var { resources } = require("./resources");

test('There are a lot of subject headings', () => {
    expect(Subjects.subjects.length).toBeGreaterThan(5000);
});

test('subjects.filter with empty terms can return all subjects', () => {
    expect(Subjects.filter(Subjects.filters.subjectContainsAllTerms([])).length)
    .toEqual(Subjects.subjects.length)
});

test('subjects.filter with "women" returns 3 results', () => {
    expect(Subjects.filter(Subjects.filters.subjectContainsAllTerms(["women"])).length)
    .toEqual(3)
});

test('subjects.filter with "germany" returns less than the full subject list', () => {
    expect(Subjects.filter(Subjects.filters.subjectContainsAllTerms(["germany"])).length)
    .toBeLessThan(Subjects.subjects.length)
});



