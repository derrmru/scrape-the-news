const Data = require('./models/data')
const puppeteer = require('puppeteer')
const mongoose = require('mongoose')

const tools = require('./functions/methods')

require('dotenv').config()

module.exports = {
  update: async (db) => {

        console.log('connected') //notify connected to database

        browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        });//open headless chrome

          //BBC SCRAPE/**************************************************** */
            const bbcPage = await browser.newPage();
            await bbcPage.goto('https://www.bbc.com/news')

                //today, Schema reference
                const today = await new Date().toISOString().split('T')[0];

                //text from each article summary on frontpage
                const bbcText = await bbcPage.evaluate(() => Array.from(document.querySelectorAll('.nw-c-promo-summary'), element => element.textContent));
                
                //headline from each article on frontpage
                const bbcHeadings = await bbcPage.evaluate(() => Array.from(document.querySelectorAll('.gs-c-promo-heading'), element => element.textContent));

                //create json file from scrape
                const bbcResult = {};
                const bbcWordCount = {};

                //compile the json file using headline as key, text as value
                await bbcHeadings.forEach((heading, i) => {
                    const nBbcHeading = heading.split('.').join("");

                    //update result
                    bbcResult[nBbcHeading] = bbcText[i];

                    //count words
                    const hBbcWords = heading.split(' ');
                    hBbcWords.map(x => {
                        let y = x.split('$').join("").split('.').join('');
                        y = tools.capIt(tools.removePunctuation(y));
                        
                        if (tools.filterWords(y)) {
                          bbcWordCount[y] ? 
                            bbcWordCount[y] = (bbcWordCount[y] + 1) : 
                              bbcWordCount[y] = 1;
                        }
                    });

                })

                //create bbc instance of Data Schema
                const bbc = await Data.create({
                  scrape_date: today,
                  source: 'BBC', 
                  result: bbcResult,
                  wordcount: bbcWordCount
                })
                await bbc.save()//save the item
                console.log('BBC done')


                //CNN SCRAPE/**************************************************** */
                const cnnPage = await browser.newPage();
                await cnnPage.goto('https://edition.cnn.com/')

                //text from each article summary on frontpage
                const cnnText = await cnnPage.evaluate(() => Array.from(document.querySelectorAll('.cd__description'), element => element.textContent));
                
                //headline from each article on frontpage
                const cnnHeadings = await cnnPage.evaluate(() => Array.from(document.querySelectorAll('.cd__headline-text'), element => element.textContent));

                //create json file from scrape
                const cnnResult = {};
                const cnnWordCount = {};

                //compile the json file using headline as key, text as value
                await cnnHeadings.forEach((heading, i) => {
                    const nCnnHeading = heading.split('.').join("");

                    //update result
                    cnnResult[nCnnHeading] = cnnText[i];

                    //count words
                    const hCnnWords = heading.split(' ');
                    hCnnWords.map(x => {
                        let y = x.split('$').join("").split('.').join('');
                        y = tools.capIt(tools.removePunctuation(y));
                        
                        if (tools.filterWords(y)) {
                          cnnWordCount[y] ? 
                            cnnWordCount[y] = (cnnWordCount[y] + 1) : 
                              cnnWordCount[y] = 1;
                        }
                    });

                })

                //create CNN instance of Data Schema
                const cnn = await Data.create({
                  scrape_date: today,
                  source: 'CNN', 
                  result: cnnResult,
                  wordcount: cnnWordCount
                })
                await cnn.save()//save the item
                console.log('CNN \
              done')


                //EURO NEWS SCRAPE/**************************************************** */
                const euroPage = await browser.newPage();
                await euroPage.goto('https://www.euronews.com/')

                //text from each article summary on frontpage
                const euroText = await euroPage.evaluate(() => Array.from(document.querySelectorAll('.m-object__description__link'), element => element.textContent));
                
                //headline from each article on frontpage
                const euroHeadings = await euroPage.evaluate(() => Array.from(document.querySelectorAll('.m-object__title__link'), element => element.textContent));

                //create json file from scrape
                const euroResult = {};
                const euroWordCount = {};

                //compile the json file using headline as key, text as value
                await euroHeadings.forEach((heading, i) => {
                    const nEuroHeading = heading.split('.').join("");

                    //update result
                    euroResult[nEuroHeading] = euroText[i];

                    //count words
                    const hEuroWords = heading.split(' ');
                    hEuroWords.map(x => {
                        let y = x.split('$').join("").split('.').join('');
                        y = tools.capIt(tools.removePunctuation(y));
                        
                        if (tools.filterWords(y)) {
                          euroWordCount[y] ? 
                            euroWordCount[y] = (euroWordCount[y] + 1) : 
                              euroWordCount[y] = 1;
                        }
                    });

                })

                //create bbc instance of Data Schema
                const euro = await Data.create({
                  scrape_date: today,
                  source: 'EURO NEWS', 
                  result: euroResult,
                  wordcount: euroWordCount
                })
                await euro.save()//save the item
                console.log('Euro News done')


                //ALJAZEERA NEWS SCRAPE/**************************************************** */
                const aljPage = await browser.newPage();
                await aljPage.goto('https://www.aljazeera.com/')

                //text from each article summary on frontpage
                const aljText = await aljPage.evaluate(() => Array.from(document.querySelectorAll('.article-card__excerpt'), element => element.textContent));
                
                //headline from each article on frontpage
                const aljHeadings = await aljPage.evaluate(() => Array.from(document.querySelectorAll('.article-card__title'), element => element.textContent));

                //create json file from scrape
                const aljResult = {};
                const aljWordCount = {};

                //compile the json file using headline as key, text as value
                await aljHeadings.forEach((heading, i) => {
                    const nAljHeading = heading.split('.').join("");

                    //update result
                    aljResult[nAljHeading] = aljText[i];

                    //count words
                    const hAljWords = heading.split(' ');
                    hAljWords.map(x => {
                        let y = x.split('$').join("").split('.').join('');
                        y = tools.capIt(tools.removePunctuation(y));
                        
                        if (tools.filterWords(y)) {
                          aljWordCount[y] ? 
                            aljWordCount[y] = (aljWordCount[y] + 1) : 
                              aljWordCount[y] = 1;
                        }
                    });

                })

                //create bbc instance of Data Schema
                const alj = await Data.create({
                  scrape_date: today,
                  source: 'ALJAZEERA', 
                  result: aljResult,
                  wordcount: aljWordCount
                })
                await alj.save()//save the item
                console.log('Aljazeera done')


            await browser.close();

  },
  findToday: (res, db) => {
        console.log('search initiated') //notify connected to database

        Data.find({ scrape_date: new Date().toISOString().split('T')[0] }, (err, docs) => {
          err && console.log(err)
          return res.json(docs)
        })
      
        return console.log('search complete and sent')
    
  }
}