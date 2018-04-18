const express = require("express");
const mongoose = require("mongoose");
const Constants = require("../Constants");
 
class Connection{
		constructor(){
				this.mongoose = mongoose;
				this.connection = mongoose.createConnection(Constants.DB_PATH, {
					
					promiseLibrary : require("bluebird")

				});
		}
}
module.exports = Connection;