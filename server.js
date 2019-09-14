const express = require('express')
const config = require('./config/index')
var appData=require('./data.json')
const PORT = process.env.PORT || config.build.PORT
app = express()
router = express.Router()
apirouter = express.Router()
router.get('/', (req, res, next) => {
  req.url = '/index.html'
  next()
})
apirouter.get('/seller', (req, res, next) => {
  res.json({
    error: 0,
    data: appData.seller
  })
})
apirouter.get('/goods', (req, res, next) => {
  res.json({
    error: 0,
    data: appData.goods
  })
})
apirouter.get('/ratings', (req, res, next) => {
  res.json({
    error: 0,
    data: appData.ratings
  })
})
app.use(router)
//相对于api的子路由
app.use('/api', apirouter)
app.use(express.static('./dist'))
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log(`I am running on ${PORT}`)
})
