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

    }
}