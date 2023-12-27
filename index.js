const fs = require('fs');

//Blocking synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is all we know about abocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Writing succesfull!!');


// const hello = "hello world";
// console.log(hello);
//utf-8 is used for reading english text in there in file that is called file encoding
//nodejs is build across callbacks in order to facilitate asynchronous behaviour as soon as one thing finishes it starts execution 
//for the next function in its call back.


//Non-Blocking asybchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });

// console.log('Will read file!!');

//as soon as the readFile is called it will start execution without blocking the execution of rest of the code
//that is the next statements in the code will continue to execute without waiting for this readfile statement to complete
//and once it gets completed it will print the result or will do whatever it was suppossed to do

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//    if(err) return console.log('Error!');

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=> {
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', (err) => {
                console.log("Your file has been written!!");
            });
        });
    });
}); 

console.log("Something is being done in background!!!");


