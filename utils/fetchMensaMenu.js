const axios = require("axios");

async function getMenu(date){
    let resultsObject = {};
    let fetchURL = "http://localhost:3001/";
    if(date){
        fetchURL += `?date=${date}`;
    }

    await axios.get(fetchURL)
    .then(data => {
        resultsObject = {
            error: false,
            menuData: data.data
        }
    })
    .catch(err => {
        if(err.response){
            resultsObject = {
                error: true,
                menuData: undefined
            }
        }
    });

    return resultsObject;
}

module.exports.getMenu = getMenu;