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
		url: '',
		dialect: 'sqlite',
		storage: 'Uhlu.sqlite'
	},
	test: {
		url: '',
		dialect: 'sqlite',
		storage: 'Uhlu.sqlite'
	}
};
