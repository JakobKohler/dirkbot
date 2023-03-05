//const MENU_URL = "https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/mensa_moltke/";
const axios = require("axios");

async function getMenu(){
    let resultsObject = {};
    await axios.get("http://localhost:5000/koeristatus")
    .then(data => {
        resultsObject = {
            error: false,
            koeri: data.data.koeriOpen
        }
    })
    .catch(err => {
        if(err.response){
            resultsObject = {
                error: true,
                koeri: undefined
            }
        }
    });

    return resultsObject;
}

module.exports.checkKoeri = getMenu;