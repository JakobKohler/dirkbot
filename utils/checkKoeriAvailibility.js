const MENU_URL = "https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/mensa_moltke/";
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getMenu(){
    let koeri = false;
    await axios.get(MENU_URL).then(data => {
        koeri =  data.data.includes("Kalbsbratwurst")
    });

    return koeri;
}

module.exports.checkKoeri = getMenu;