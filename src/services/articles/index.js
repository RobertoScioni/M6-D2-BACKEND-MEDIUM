const express = require("express")

const ArticleSchema = require("./schema")

const ArticleRouter = express.Router()

ArticleRouter.get("/", async (req, res, next) => {
	try {
		const articles = await ArticleSchema.find()
		res.send(articles)
	} catch (error) {
		return next(error)
	}
})

ArticleRouter.get("/:id", async (req, res, next) => {
	try {
		const article = await ArticleSchema.findById(req.params.id)
		res.send(article)
	} catch (error) {
		return next(error)
	}
})

ArticleRouter.post("/", async (req, res, next) => {
	try {
		const newArticle = new ArticleSchema(req.body)
		const { _id } = await newArticle.save()

		res.status(201).send(_id)
	} catch (error) {
		next(error)
	}
})

ArticleRouter.put("/:id", async (req, res, next) => {
	try {
		const article = await ArticleSchema.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
		)
		if (article) {
			res.send(article)
		} else {
			const error = new Error(`Article with id ${req.params.id} not found`)
			error.httpStatusCode = 404
			next(error)
		}
	} catch (error) {
		next(error)
	}
})

ArticleRouter.delete("/:id", async (req, res, next) => {
	try {
		const article = await ArticleSchema.findByIdAndDelete(req.params.id)
		if (article) {
			res.send("Deleted")
		} else {
			const error = new Error(`Article with id ${req.params.id} not found`)
			error.httpStatusCode = 404
			next(error)
		}
	} catch (error) {
		next(error)
	}
})

module.exports = ArticleRouter
