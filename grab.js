const fetch = require("node-fetch");

let url = "https://en.wikipedia.org/w/api.php";

const params = {
    action: "query",
    format: "json",
    generator: "random",
    prop: "extracts",
    exlimit: "1",
    exintro: "1",
    explaintext: "1",
    grnnamespace: "0",
    grnlimit: "1"
};
url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});


async function graby() {
    let contents = "";
    while(contents.length < 300) {
        contents = await grabWikiContents();
    }
    return contents;
}


function grabWikiContents() {

    return fetch(url)
        .then(response => response.json())
        .then(commits => {
            let key;
            for(key in commits.query.pages) {
                if(commits.query.pages.hasOwnProperty(key)) {
                    let content = JSON.stringify(commits.query.pages[key].extract);
                    return content.substring(1,content.length-1).replace(/(\\n)|(\s+|["`\^<>{|}]+)/g, "-");
                    // We substring to remove quotation marks at beginning and end
                }
            }
        })
        .catch(console.error);
}


module.exports.grabWikiContents = graby;
// Basic testing code 
// async function main() {
//      graby().then(content => console.log(content));
// }

// main().catch(console.error);