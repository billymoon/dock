"use script";// import router from 'fs-route/demo/micro/server'

// export default const route = router([ __dirname, 'routes' ])

// console.log(route)

const x = require('fs-route/demo/micro')

module.exports = x([ __dirname, 'routes' ])

console.log(module.exports)
