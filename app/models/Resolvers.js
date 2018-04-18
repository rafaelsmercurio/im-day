const Connection = require("./Connection");

class Resolvers extends Connection{

	constructor(){
		super();
		this.schema = this.mongoose.Schema({
			name : String
		});
			this.model = this.connection.model("Resolvers", this.schema);
	}

}

module.exports = Resolvers;