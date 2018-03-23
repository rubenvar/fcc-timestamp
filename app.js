const express = require('express');

const index = 'index.html';
let app = express();
let locale = "en-us";

// if it's the main page
app.get('/', (req, res) => {
    res.sendFile(index, { root: 'public' });
})

// if there is something after /
app.get('/:date', (req, res) => {
    //res.sendFile(index, {
    //    root: 'public'
    //});
    let par = req.params.date;
    res.end(handlePar(par));
});

function printResult(v1, v2) {
    let obj = {
        "unix": v1,
        "natural": v2
    }
    let json = JSON.stringify(obj);
    // return document.querySelector('body').innerHTML = json; arreglar
    return console.log(json);
}
function datesFromUnix(d) {
    console.log('it is a number!');
    let unix = new Date(Number(d) * 1000); // multiply by 1000 to get ms from input in secs
    let month = unix.toLocaleString(locale, {month: 'long'});
    let natural = month + ' ' + unix.getDate() + ', ' + unix.getFullYear();
    printResult(d, natural);
}
function datesFromNat(d) {
    console.log('it is a text!');
    // crear las fechas
    let unix = '';
    let natural = d;
    printResult(unix, natural);
}
function handlePar(p) {
    // crear unos regex que funcionen
    let unixRegex = /\d/;
    let natRegex = /[a-z]/;

    if (unixRegex.test(p)) {
        datesFromUnix(p);
    } else if (natRegex.test(p)) {
        datesFromNat(p);
    } else {
        printResult(null, null);
    }
}

// Start the server
app.listen(1337, "localhost");
