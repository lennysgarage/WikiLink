const fetch = require("node-fetch");

async function graby() {
    let contents = "";
    while(contents.length < 3) {
        contents = await grabWikiContents();
    }
    return contents;
}


function grabWikiContents() {

    return fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&prop=extracts&exlimit=max&explaintext&exintro")
        .then(response => response.json())
        .then(commits => {
            let key;
            for(key in commits.query.pages) {
                if(commits.query.pages.hasOwnProperty(key)) {
                    return JSON.stringify(commits.query.pages[key].extract).substring(1, 201).replaceAll(" ", "-");
                }
            }
        });
}


module.exports.grabWikiContents = graby;
// async function main() {
//     graby().then(content => console.log(content));
// }

// main().catch(console.error);