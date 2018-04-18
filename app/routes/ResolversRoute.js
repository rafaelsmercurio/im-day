const express = require("express");
const Resolvers = require("../models/Resolvers");
const bodyParser = require("body-parser");
const ObjectID = require("bson-objectid");

class ResolverRoute {
		constructor(){
				this.resolvers = new Resolvers();
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
			let name = req.body.name;
			this.resolvers.model.create({
				name : name 
			})
			.then(data => res.json({
				data : data
			})).catch(error => {
				console.error("err :", error);
				res.json({message: `Não foi possível criar o usuário: ${error}`})
			})

		}

		remove(req, res){
			let id = req.body.id;
			this.resolvers.model.remove({
				_id : ObjectID(id)
			})
			.then(data => res.json({data : data}))
			.catch(error => {
				console.error("err :", error);
				res.json({message: `Não foi possível remover o usuário: ${error}`})
			})
		}

		list(req, res){
			this.resolvers.model.find({})
			.then(data => res.json({data : data}))
			.catch( data => res.json({message : `Não foi possivel listar os valores: ${error}`}))	
		}
}
module.exports = new ResolverRoute().router;