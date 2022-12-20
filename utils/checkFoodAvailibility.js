const MENU_URL = "https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/mensa_moltke/";
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getMenu(){
    const pageHTML = await axios.get(MENU_URL)
    .then(data => {
        const dom = new JSDOM(data.data);
        let allRows = dom.window.document.querySelector("tbody").querySelectorAll("tr.mensatype_rows");
        let foodRows = [...allRows].filter(row => row.queriSelector('td.mensatype').textContent == 'Gut & Günstig')[0];
        return (foodRows.queriSelector('td.mensadata table tbody tr').textContent);

        //Get Info from view-source:https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/mensa_adenauerring/
        //oder dem link selbst und dann lesen lernen und alle essen namen einfangen

        //The code is documenttation enough
        let koeriRow = [...allRows].filter(row => row.querySelector('td.mensatype').textContent == 'Gut & Günstig')[0];
        return (koeriRow.querySelector('td.mensadata table tbody tr').childNodes.length == 2);
    });
}

module.exports.checkKoeri = getMenu;