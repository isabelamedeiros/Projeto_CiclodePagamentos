const server = require('./config/server')
require('./config/database')
require('./config/routes')(server) //retorna a função server