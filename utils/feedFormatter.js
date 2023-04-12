
function format(feed) {
    
    //Sort items via Date
    feed.items.sort((a, b) => {
        return 'desc' === 'asc'
            ? new Date(a.isoDate) - new Date(b.isoDate)         // Oldest first
            : new Date(b.isoDate) - new Date(a.isoDate);        // Newest first
        });

    //Format the Items
    feed.items.forEach(item => {
        //delete item.contentSnippet;                           //Für weniger bloat, aber lieber drin lassen
        //delete item.guid;                                     //falls in der Zukunft mal verwendet
        //delete item.enclosure;
        for (let itemKey in item) {
            text = item[itemKey];
            text = text.replace(/\s+/g, " ");                   //Remove unneccesary spaces
            //Delete anything else unwanted
            //Delete any remaining <[]> HTML Elements
            text = text.replace(/<[^>]+>/g, "");

            item[itemKey] = text;
        }
    })

    return feed;
}

module.exports = { format };