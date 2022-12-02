const { logEvent } = require("./logger")


const errorHandler = (err,req,res,next) => {
    logEvent(`${err.name}: ${err.message}\t ${req.method}\t ${err.url}\t  ${req.headers.origin}`,"errLog.txt");
    console.log(err.stack);
    const status = res.statusCode ? res.statusCode : 500; // server error
    res.status(status)
    res.json({message: err.message})
}

module.exports = errorHandler