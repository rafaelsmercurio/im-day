const express = require('express');
const ResolverRoute = require('./routes/ResolversRoute');
const IncidentsRoute = require('./routes/IncidentsRoute');
const bodyParser = require("body-parser");
class Index {
	constructor() {
		this.express = express();
		this.init();
	}

	init(){
		this.express.use(bodyParser.json());
		this.express.use("/resolvers", ResolverRoute);
		this.express.use("/incidents", IncidentsRoute);
	this.express.listen(3000, () => console.log('Example app listening on port 3000!'));
	}

}
new Index();