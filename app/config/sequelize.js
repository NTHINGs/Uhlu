module.exports = {
	development: {
		url: '',
		dialect: 'sqlite',
		storage: 'Uhlu.sqlite'
	},
	production: {
		database: process.env.DATABASE,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: 'localhost',
		port: '3306',
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
