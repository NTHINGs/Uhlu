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
		database: 'uhlu',
		username: 'root',
		password: '',
		host: 'localhost',
		port: '3306',
		dialect: 'mysql'
	}
};
