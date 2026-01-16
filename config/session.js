const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const sessionConfig = session(
  {
  name:"sid",
  secret:process.env.SECRET_KEY,     
  resave: false,                   
  saveUninitialized: false,  
  
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    collection:"sessions",
    ttl: 60 * 60 * 24 * 30
  }),

  cookie: { 
    httpOnly:true,
    maxAge:1000 * 60 * 60 * 24 * 30
   },
  })



  module.exports = sessionConfig;