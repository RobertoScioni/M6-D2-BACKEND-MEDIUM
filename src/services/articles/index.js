const express = require("express")

const ArticleSchema = require("./schema")

const ArticleRouter = express.Router()

ArticleRouter.get("/", async (req, res, next) => {
	try {
		const articles = await ArticleSchema.find()
		res.send(articles)
	} catch (error) {
		next(error)
	}
})

module.exports = ArticleRouter
