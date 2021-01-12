const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const ArticleSchema = new Schema(
	{
		headLine: {
			type: String,
			required: true,
		},
		subHead: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			name: String,
			img: String,
		},
		cover: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
)

ArticleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("User", ArticleSchema)
