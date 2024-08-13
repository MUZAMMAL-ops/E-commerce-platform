const express = require('express');
const App = express()
const cors = require('cors')
const middleware = require('./middleware')
const appRoutes = require('./appRoutes')
App.use(express.json());

App.use(cors())
App.use(middleware)
App.use('/',appRoutes)






App.listen(4000)