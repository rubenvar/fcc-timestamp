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
    let par = req.params.date; 
    let result = handlePar(par);
    // returns JSON object, easy!
    res.json(result);
});

// create the object with the data
function printResult(v1, v2) {
    let obj = { unix: v1, natural: v2 }
    return obj;
}
function natFromUnix(date) {
    let unix = new Date(date * 1000); // multiply by 1000 to get ms from input in secs
    let month = unix.toLocaleString(locale, {month: 'long'});
    let natural = month + ' ' + unix.getDate() + ', ' + unix.getFullYear();
    return natural;
}
function unixFromNat(date) {
    // crear las fechas
    let dateObj = new Date(date);
    let unix = dateObj.getTime();
    return (unix / 1000);
}
function handlePar(param) {
    // crear unos regex que funcionen
    let unixRegex = /\D/;
    let unix = null;
    let nat = null;

    if (!unixRegex.test(param)) {
        console.log('it is a number value');
        unix = Number(param);
        nat = natFromUnix(param);
    } else {
        console.log('it is a text value...');
        let temp = unixFromNat(param);
        if (!unixRegex.test(temp)) {
            console.log('and it is valid');
            unix = temp;
            nat = param;
        }
    }

    return printResult(unix, nat);
}

// Start the server
app.listen(1337, "localhost");
