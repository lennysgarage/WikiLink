const fetch = require("node-fetch");

let url = "https://en.wikipedia.org/w/api.php";

const params = {
    action: "query",
    format: "json",
    generator: "random",
    prop: "extracts",
    exlimit: "8",
    exintro: "1",
    explaintext: "1",
    grnnamespace: "0",
    grnlimit: "8"
};
url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});


async function WikiContents() {
    let contents = "", pageid = "", title = "";
    

    let data = await grabWikiContents();
    let randPage = Math.floor(Math.random() * 8);
    contents = data[randPage].content;
    pageid = data[randPage].pageid;
    title = data[randPage].title;

    if (data[randPage].content.length < 300) {
        let maxLength = 0;
        for (const page of data) {
            if (page.content.length > maxLength) {
                maxLength = page.content.length;
                contents = page.content;
                pageid = page.pageid;
                title = page.title;
            }
        }
    }

    return {
        content: contents,
        pageid: pageid,
        title: title,
    };
}


async function grabWikiContents() {

    let response;
    try {
        response = await fetch(url);
    } catch(err) {
        console.error('Error on fetching url', err);
    }
    
    let data;
    try {
        data = await response.json();
    } catch(err) {
        console.error('Error on parsing string', err);
    }

    let arrPages = [];
    let keyValuePairs = Object.keys(data.query.pages);
    for(let i = 0; i < keyValuePairs.length; i++) {
        let pageid = keyValuePairs[i];
        let title = data.query.pages[pageid].title;
        let content = JSON.stringify(data.query.pages[pageid].extract);
        arrPages.push({
            content: content.substring(1,content.length-1).replace(/(\\n)+|(\s+)|(\W+)/g, "-"),
            pageid: pageid,
            title: title,
        });
    }

    return arrPages;
}


module.exports.WikiContents = WikiContents;
// Basic testing code 
// async function main() {
//      grabWikiContents().then(content => console.log(content));
// }

// main().catch(console.error);