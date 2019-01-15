const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv');
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type' : 'application/x-www-form-urlencoded'
};


// file header
writeStream.write(`Product,Image,brand,Title,ActivePrice,OriginalPrice \n`);
url = "https://www.sotostore.com/en/6/footwear?orderBy=Published"

request( {url:url, headers:headers}, (error, response, html)=> {

    if(!error && response.statusCode==200)
    {
        // console.log(html)
        const $ = cheerio.load(html)

        $('.card').each((i, value) =>{

            const link = "https://www.sotostore.com"

            const productLink =  link+ $(value).find('.card-image-link').attr('href');
            const imageLink = link + $(value).find('.card-img').attr('data-src');
            const brand = $(value).find('.card-brand').text().trim()
            const title = $(value).find('.card-title').text().trim()
            const activePrice = $(value).find('.active-price').text().trim()
            const originalPrice = $(value).find('.original-price').text().trim()
            const brandUpper = brand.charAt(0).toUpperCase() + brand.slice(1);

            console.log(productLink , imageLink,brand, title, activePrice, originalPrice)


            // write to csv

            writeStream.write(`${productLink}, ${imageLink}, ${brandUpper}, ${title}, ${activePrice}, ${originalPrice} \n`);


            // const item = $(value).text();
            // console.log(item.trim());


        });

    }
    else {
        console.log("error occured")
    }
})