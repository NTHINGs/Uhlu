module.exports = {
	development: {
		url: '',
		dialect: 'sqlite',
		storage: 'Uhlu.sqlite'
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: 'mysql'
	},
	staging: {
		url: process.env.DATABASE_URL,
		dialect: 'sqlite'
	},
	test: {
		url: process.env.DATABASE_URL,
		dialect: 'sqlite'
	}
};