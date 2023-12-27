const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');


//above mentioned modules are core moudles and 
//below one is own created module.

const replacer = require('./modules/replacer');

//http provides networking capability like acting as http server

// const replacer = (template, element) => {
//     let output = template.replace(/{%PRODUCTNAME%}/g, element.productName);
//     output = template.replace(/{%IMAGE%}/g, element.image);
//     output = template.replace(/{%PRICE%}/g, element.price);
//     output = template.replace(/{%QUANTITY%}/g, element.quantity);
//     output = template.replace(/{%NUTRIENTS%}/g, element.nutrients);
//     output = template.replace(/{%FROM%}/g,element.from);
//     output = template.replace(/{%NUTRIENTS%}/g,element.nutrients);
//     output = template.replace(/{%ID%}/g, element.id);
//     if(!element.organic){
//         output = template.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     }
//     output = template.replace(/{%DESCRIPTION%}/g, element.description);

//     return output;

// }
// const replacer = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);
    
//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
//   }

const tempOverview = fs.readFileSync(`./templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-Card.html`, 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map(ele => slugify(ele.productName, {
    lower : true
}));

console.log(slugs);

console.log(slugify('Fresh Avocados', {lower : true}));


const server = http.createServer((req,res) => {
    const { query, pathname } = url.parse(req.url, true);
    // const pathName = req.url;

    //overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
          'Content-type': 'text/html'
        });
    
        const cardsHtml = dataObject.map(el => replacer(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    
        }



    //product
    else if(pathname === '/product'){
        res.writeHead(200, {'Content-type' : 'text/html'})
        const product = dataObject[query.id];
        const output = replacer(tempProduct, product);
        res.end(output);
    }

    //api
    else if(pathname === '/api'){
        res.writeHead(200, {
            'Content-type' : 'application/json'
        });
       res.end(data);
    }
    

    //not found
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html', 
            'my-own-header' : 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }

    // res.end('Hello from the server!');
});

//everytime new request hits the server the callback function in there in argument of createServer method
//will be fired.
//call back functions will have access to req object which have all kind of stuff like request url, and a bunch of other stuff
//and response object gives us many tools to deal with the response .end is one of them

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});
//when request was send under nodejs one event was fired which somehow 
//made the callbackfunction in server to execute
//request was send by hitting the url which in this case is local host url on port 8000


//in 