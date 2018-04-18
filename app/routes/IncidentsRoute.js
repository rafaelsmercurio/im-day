const express = require("express");
const bodyParser = require("body-parser");
const ObjectID = require("bson-objectid");
const Incidents = require("../models/Incidents");
const moment = require("moment");

class IncidentsRoute{
	constructor(){
			this.incidents = new Incidents();
			this.router = express.Router();
			this.parserUrlencoded = bodyParser.urlencoded({extended : false});
			this.init();
	}

	init(){
		this.router.route("/save")
		.post(this.parserUrlencoded, this.save.bind(this));
		this.router.route("/list").get(this.list.bind(this));
		this.router.route("/remove").post(this.parserUrlencoded, this.remove.bind(this));
	}
	
	save(req, res){
		console.log("req.body", req.body)
		let resolver = req.body.resolver;
		let title = req.body.title;
		let description = req.body.description;
		let date = req.body.date;
		this.incidents.model.create({
			resolver : resolver,
			title : title,
			description : description,
			date : moment(date)
		})
		.then(data => res.json({data : data})).catch(error =>{
			console.error("err :", error);
			res.json({message: `Não foi possível criar o usuário: ${error}`})
		})
	}
		remove(req, res){
			let id = req.body.id;
			console.log("id", id);
			this.incidents.model.deleteOne({_id : ObjectID(id)
			}).then(data => res.json({data : data}))
				.catch(error => {
					console.error("err :", error);
					res.json({message: `não foi possível remover o usuário: ${error}`})
				})
		}

		list(req, res){
			this.incidents.model.find({})
			.then(data => res.json({data : data}))
			.catch(data => res.json({message : `não foi possível listar os valores: ${error}`}))
		}
}
module.exports = new IncidentsRoute().router;