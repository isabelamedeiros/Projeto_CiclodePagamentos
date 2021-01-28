const _ = require('lodash')
const BillingCycle = require('./billingCycle')

//criando serviços que vao na base no mongodb/ APi Rest para os metodos get/obtem info, post/Inserir, put/Alterar, delete/Remover
BillingCycle.methods(['get', 'post', 'put', 'delete'])

//Ativando as validações do bd
BillingCycle.updateOptions({new: true, runValidators: true})

//tratamento de erros / lista de erros -> objeto com um array de erros
BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle
    if(bundle.errors){
        var errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    } else {
        next()
    }
}
    function parseErrors(nodeRestfulErrors) {
        const errors = []
        _.forIn(nodeRestfulErrors, error => errors.push(error.message))
        return errors
    }


BillingCycle.route('count', function(req, res, next) {
    BillingCycle.count(function(error, value) {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

//exportar o ciclo de pagamento, para usar nas rotas
module.exports = BillingCycle