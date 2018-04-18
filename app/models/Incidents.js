const Connection = require("./Connection");

class Incidents extends Connection{

		constructor(){
			super();
			this.schema = this.mongoose.Schema({
				resolver : String,
				title : String,
				description : String,
				date : Date
			});
			this.model = this.connection.model("Incidents", this.schema);
		}
}

module.exports = Incidents;