const {v4: uuid} = require("express")
const fs = require("fs");
const fsPromises = require("fs").promises
const path = require("path")


const logEvent = async (message,logfilename) => {
    const logItem = `${new Date().toString()} \t ${uuid} ${message} \n` 
    try {
        if(!fs.existsSync(path.join(__dirname,"..","logs"))){
            await fsPromises.mkdir(path.join(__dirname,"..","logs"))
        }

        await fsPromises.appendFile(path.join(__dirname,"..","logs",logfilename),logItem)
        
    } catch (error) {
        console.log(error)
    }
}

const logger = (req,res,next) => {
    const message = `${req.method}\t ${req.url}\t ${req.headers.origin} ${req.path} \n`
    logEvent(message,"reqLog.txt")
    console.log(message)
    next()
}

module.exports = {logger, logEvent}
