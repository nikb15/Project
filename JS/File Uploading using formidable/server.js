const http = require('http');
const services = require('D:/Languages/JS/node_learning/HTTP_Node/services.js')
const port = 8080;
const server = http.createServer()
const url = require('url');
/*This is different method and its shows different module fo fiding the data in which format is it */
const textbody = require("body");
const  jsonBody= require("body/json");
const formidable = require("formidable")
const fs = require("fs"); // this is used to show your html apge
const { config } = require('process');
const { error } = require('console');


server.on('request', (req, res) => {
    /*
    const body =[]
    req.on('data',(chunk)=>{
       body.push(chunk);
    }).on('end',()=>{
        const parseJSON=JSON.parse(Buffer.concat(body));
        const userName = parseJSON[0]['userName']
        console.log(userName)
        server.createUser(userName )
    })
    The above line of cody will be taken care by the json body method which will be responsible to pass onn the json 
    */
   const passedUrl = url.parse(req.url,true);
   
   //console.log(passedUrl)
    if(req.method==='GET' && passedUrl.pathname ==='/metadata')
    {
        //console.log(passedUrl)
        const{id}= passedUrl.query;
        console.log(id)
        const metadata =services.fetchImageMetadata(id)
        res.setHeader('Content-Type', 'application/json');
        res.statusCode=200
        const seralizeJson = JSON.stringify(metadata)
        res.write(seralizeJson);
        res.end();
    
    }else if(req.method==='POST' && passedUrl.pathname ==='/users')
    {
        jsonBody(req,res,(err,body)=>{
            // thiss i m doing bcz request comes in piece and i want tit to be coming in one whole thing
            if(err){
                console.log(err);
            }else{
                console.log(body);
                services.createUser(body['username']);
            }
        });
    }else if(req.method==='POST' && passedUrl.pathname ==='/upload')
    {
        const form = new formidable.IncomingForm({
            uploadDir:__dirname,
            keepExtensions: 'true',
            multiples:true,
            maxFileSize:5*1024*1024
        });
        

        /*
        form.parse(req,(err,fields, files)=>{
            //field == key value pair 
            //Files will be file parameter 
            /*
            console.log('\n fields: ')
            console.log( fields)
            console.log('\n files: ')
            console.log( files)
            The above line of code will help you telling the type of file its and then name of file as well
          
         if(err){
            console.log(err);
            res.statusCode=500;
            res.end('Error!!!')
         }
         console.log(__dirname)
            res.statusCode=200;
            res.end("Success")
        })*/

        form.parse(req)
        .on('fileBegin',(name,feild)=>{
            console.log('Our Upload started');
        }).on('file',(name,value)=>{
            console.log('File received')
            console.log(name,value)
        }).on('progress',(bytesReceived,bytesExpected)=>{
            console.log(bytesReceived+'/'+bytesExpected)
        }).on('error',err=>{
            console.log(err)
            req.resume()
        }).on('aborted',()=>{
            console.error('Request aborted by the user')
        }).on('end',()=>{
            console.log('Done- request fully recived');
            res.end('Success')
        });
    }
    
    
    else{
       fs.createReadStream("D:/Languages/JS/node_learning/HTTP_Node/index.html").pipe(res);
        // the above line will help you in redirecting your code to the html if the url is not ddirected to desired path 
    }
})

server.listen(port);

