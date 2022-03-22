const http = require("http");



const hostname = '127.0.0.1';  
const port = 3030;  
   
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');  
  requestListener(req, res)
}).listen(port, hostname, () => {  
  console.log(`Server running at http://${hostname}:${port}/`);  
});  


const requestListener = function (req, res) {
  //console.log( req )
  if (req.method === 'POST') {
    console.log(req.body)
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
        console.log('chunk',chunk) // convert Buffer to string
    });
    req.on('end', () => {
        console.log('body' , body.toString("utf8"));
        res.end('ok');
    });
}
    switch(req.url){
        case "/" : 
          res.writeHead(200);
          res.end("Default response"+req.body);
          //console.log(req.body);
          break;
        case "/sens/droite" :
          res.end("Sens droite");
          break;
        case "/sens/gauche" :
          break;
        case "/vitesse/plus" :
          break;
        case "/vitesse/moins" :
          break;

    }
}

//stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client