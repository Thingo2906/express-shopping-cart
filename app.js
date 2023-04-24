const express = require('express');
const ExpressError = require('./expressError');
const app = express();
const cartRoute = require('./routes/shoppingCart');
// To tell express to parse request body for json type
app.use(express.json());

// To access all the routes in shoppingCart.js
app.use('/items', cartRoute)

// error handler for 404
app.use(function(req, res, next){
    return new ExpressError("Not found!", 404)
})
// general error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {
        message: err.message,
        status: status
      }
    });
});
  
module.exports = app;