const http = require("http");
const fs = require("fs");



const server = http.createServer((req, res) => {
    const url = req.url;

    //Read CSS
    if(url.indexOf('.css') != -1){
        fs.readFile(__dirname + '/public/main.css', (err, data) => {
            if(err) console.log(err);
            res.writeHead(200, {'Content-type': 'text/css'});
            res.write(data);
            res.end();
        });
    }

    //Root path
    if(url === '/'){
        const home = fs.readFileSync(`${__dirname}/main.html`, 'utf-8');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(home);
    }
});


server.listen(process.env.PORT || 4000, () => {
    console.log("Server listening...");
});
