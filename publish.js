
var ghpages = require('gh-pages');
const yargs = require('yargs');

function publish(to){

    ghpages.publish('build', 
    {
        remote:to
    },
    function(err) {
        if (err){ console.error("Error deploying to " + to); process.exit(1)}
        if (!err){ console.log(`Successfully deployed to remote '${to}'!`)}
    });
}

function main(){

    const argv = yargs.command("publish", "Deploy this app to github pages",{
        
    })
    .option('remote', {
        description: "name of remote repo to publish to",
        default: "origin",
        type: "string"
    })
    .help()
    .argv;

    publish(argv.remote)

}

main();
