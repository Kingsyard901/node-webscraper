const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('website_links.csv');

//Write Headers
writeStream.write('Data scraped from the Website \n');

request('https://norralaconsulting.se/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('a').each((i, el) => {
            const link = $(el)
            .attr('href');

            // Write Row To CSV
            writeStream.write(`${link} \n`);

            console.log(link);
        })
        console.log('Scraping data done...');
    }
});