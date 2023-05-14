const http= require('http');

const data= JSON.stringify({
    username:'Nikhil'
})

const options={
    hostname: 'localhost',
    port:8080,
    path: '/users',
    method:'POST',
    headers: {
        'content-type': 'application/json',
        'content-length':data.length
        
    }
}

const request= http.request(
    options,
    (response)=>{
        console.log(response.statusCode);
        console.log(response.headers)

        response.on('data',(chunk)=>{
            console.log(chunk.toString( ))
        })
    }
);

request.on('error',(err)=>{
    console.log(err);
})
request.write(data);
request.end();