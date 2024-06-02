const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		},
		password: {
			type: String,
			required: true
		}
	},
	{ versionKey: false, timestamps: true }
)

const User = model('User', UserSchema, 'users')

module.exports = {User}