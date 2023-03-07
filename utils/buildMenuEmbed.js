const spacerField = {
    name: '\u200b',
    value: '',
    inline: false,
}

function createMenuEmbed(menuJSON){
    console.log(menuJSON);
    const planDate = getDayFromObject(menuJSON.date);
    let menuEmbedObject = {
        title: `${menuJSON.name}`,
        description: `Menu for ${planDate}`,
        fields: [spacerField],
        color: 0xb089ff,
        thumbnail: {
            url: "https://cdn.discordapp.com/attachments/1039892483439607959/1082260400948658196/image.png"
        }
    }

    for(let i = 0; i < menuJSON.lines.length; i++){
        const currentLine = menuJSON.lines[i];
        const isOpenString = (currentLine.meals.length == 0) ? 'Closed' : '' 
        const headerField = {
            value: isOpenString,
            name: `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ ${currentLine.name} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`
        }

        if(currentLine.name == '[Kœri]werk'){
            headerField.name = `⎯⎯⎯⎯⎯⎯⎯♡⎯⎯⎯⎯⎯⎯⎯ ${currentLine.name} ⎯⎯⎯⎯⎯⎯⎯♡⎯⎯⎯⎯⎯⎯⎯`;
        }

        menuEmbedObject.fields.push(headerField);

        

        for (let j = 0; j < currentLine.meals.length; j++) {
            const currentMeal = currentLine.meals[j];
            const mealField = {
                inline: true,
                name: currentMeal.name,
                value: currentMeal.price

            }

            menuEmbedObject.fields.push(mealField);  
        }

        if(i < menuJSON.lines.length - 1){
            menuEmbedObject.fields.push(spacerField);
        }
    }

    return menuEmbedObject;
}

function getDayFromObject(date){
    return `${("0" + date.day).slice(-2)}.${("0" + date.month + 1).slice(-2)}.${date.year}`;
}

module.exports.createMenuEmbed = createMenuEmbed;