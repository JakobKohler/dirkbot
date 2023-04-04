
function format(text) {
    text = text.replace(/\s+/g, " "); //Remove unneccesary spaces

    //Delete anything else unwanted

    //Delete any remaining <[]> HTML Elements
    text = text.replace(/<[^>]+>/g, "");
    return text;
}

module.exports = { format };