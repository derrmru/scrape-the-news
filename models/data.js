const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema (
    {
        scrape_date: {type: String},
        source: {type: String},
        result: {type: Object},
        wordcount: {type: Object}
    }
);

module.exports = mongoose.model('Data', dataSchema);