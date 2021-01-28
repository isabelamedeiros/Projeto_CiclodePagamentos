//Rotas = Middleware /uma URL para cada um dos serviços/metodos (get, post, put, delete)

const express = require('express')

//exports -> passa uma info para um modulo do node
module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router) //só vai ser chamado quando a url tiver /api

    //Rotas API
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    router.route('/billingSummary').get(billingSummaryService.getSummary)

}