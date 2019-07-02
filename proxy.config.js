const proxy = [{
    context: '/api',
    target: 'https://rotas-lixo-ibirama-api.herokuapp.com',
    pathRewrite: { '^/api': '' }
}];
module.exports = proxy;