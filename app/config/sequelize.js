module.exports = {
	development: {
		url: '',
		dialect: 'sqlite',
		storage: 'Uhlu.sqlite'
	},
	production: {
        database:  process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
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
