import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import  connectRedis  from 'connect-redis';

export type People = {
    id: number,
    name: string,
}[];

const app = express();
const RedisStore = connectRedis(session);
let redisClient = new Redis();


declare module 'express-session' {
    export interface SessionData {
        views?: number;
    }
}


app.use(session({
    store:  new RedisStore({ client: redisClient, prefix: 'myapp:' }),
    secret:"your-secret-key",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 2*60*60*1000}
}));

app.get("/people", (req, res) => {
    redisClient.get("people", (err, data) => {
        if(err) throw err;
        if(data) {
            console.log("Fetching data from the cache");
            //If data is in the cache, send it to the client
            res.send(JSON.parse(data));
            
        } else {
            //If data is not in the cache, fetch it from the database and send it to the client
            console.log("Fetching data from the database");
            
            const people = [
                {id: 1, name: "John"},
                {id: 2, name: "Doe"},
                {id: 3, name: "Jane"},
            ];
            redisClient.setex("people",3600, JSON.stringify(people));
            //send fetched data to the client//setinterval to make it seem like the api takes more time than it does
            // setInterval(() => {
                
            //     res.send(people);
            // }, 1000);

            res.send(people);

        }
    });
   
});


app.get("/people/:id", async (req, res) => {
    const id = req.params.id;


    //Check if the data is in the cache ie. Redis
    await redisClient.hgetall(`people?id=${id}`, async (err, data) => {
        if(err) throw err;
        if(data !== null) {
            //If data is in the cache, send it to the client
            console.log("Fetching data from the cache");
            res.send(data);
        } else {
            //If data is not in the cache, fetch it from the database and send it to the client
            console.log("Fetching data from the database");
            const person = {  id: id, name: "John" };
            await redisClient.hmset(`people?id=${id}`, person);
            res.send(person);
        }
    });
});

//example route to check if session is working
app.get("/checksession", (req, res) => {
    if (req.session.views) {
    
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge! / 1000) + 's</p>');
        res.end();
    } else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!');
    }
}) ; 

app.listen(3000, () => {
    console.log("Server started on port 3000");
});