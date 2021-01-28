const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

//outra função middleware
function getSummary(req, res) {
    BillingCycle.aggregate([{
        $project: { credit: {$sum: "$credits.value" }, debt: {$sum: "$debts.value" }}
    }, {
        $group: {_id: null, credit: {$sum: "$credit" }, debt: {$sum: "$debt" }} //agregando os dados em um unico registro
    }, {
        $project: {_id: 0, credit: 1, debt: 1} //projetando somente credito e debito
    }], function(error, result) { //callback
        if(error) {
            res.status(500).json({errors: [error]}) //array com 1 ou mais erros, se houver
        } else {
            res.json(_.defaults(result[0], {credit: 0, debt: 0 })) //padrão de resultado
        }

    })
}

    module.exports = { getSummary }