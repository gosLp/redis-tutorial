import express from 'express';
import session from 'express-session';


const app = express();


app.use(session({
    // store: new RedisStore({}),
    secret:"your-secret-key",
    resave: false,
    saveUninitialized: false,
}));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});