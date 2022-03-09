const http = require("http");



const hostname = '127.0.0.1';  
const port = 3030;  
   
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');  
  res.end('Hello World !!\n' + req.url);  
  requestListener(req, res)
});
   
server.listen(port, hostname, () => {  
  console.log(`Server running at http://${hostname}:${port}/`);  
 // requestListener();
});  

const requestListener = function (req, res) {
    switch(req.url){
        case "/" : 
          res.writeHead(200);
          res.end("Default response");
          break;
        
        case "/sens/droite" :
          break;
        case "/sens/gauche" :
          break;
        case "/vitesse/plus" :
          break;
        case "/vitesse/moins" :
          break;

    }
}

https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client