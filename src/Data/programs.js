const createReferenceInterface = require("./createReferenceInterface");

const data = require("./json/programs.min.json")
    .map(i => {

        if (i.display_names.length > 1){ throw new Error("Program with multiple names")}
        return {
            id: i.uri,
            label: i.display_names[0]
        }

    });


module.exports = createReferenceInterface(data, "programs" );