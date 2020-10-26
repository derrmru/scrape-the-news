const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Data = require('./models/data')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

require('dotenv').config()
const tools = require('./update')

const cors = require('cors')
app.use(cors())

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true , useUnifiedTopology: true});

    const db = mongoose.connection; 

    //db.on('error', console.error.bind(console, 'connect error: '));
    db.once('open',  () => {//connect to database
      
      //run this task every day at 08:00 - scraping the news sources
      app.get('/cron', (req, res) => {
        tools.update(db);
        res.sendStatus(200)
      });

      //Homepage - Todays News
      app.get('/', (req, res) => {
        return tools.findToday(res, db)
      })

      //API - search data by words
      app.post ('/datasearch', (req, res) => {
        console.log(req.body)

        Data.find({ scrape_date: { $gte: req.body.startDate, $lte: req.body.endDate } }, (err, docs) => {
          err && console.log(err)
          res.json(docs)
        })
      })

      app.listen(process.env.PORT || 3000, function(){
        console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
      
})

db.on('close', () => {
    db.removeAllListeners();
});