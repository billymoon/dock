let path;_947‍.w('path',[["default",function(v){path=v}]]);let send;_947‍.w('micro',[["send",function(v){send=v}]]);let route;_947‍.w('fs-route/esm',[["default",function(v){route=v}]]);





const promisedRouter = route(path.join(__dirname, 'routes'))

_947‍.d(async (req, res) => {
  const matcher = await promisedRouter
  try {
    const { handler, query, params } = matcher(req.url, req.method)
    
    if (handler) {
      return handler(req, res, { query, params })
    } else {
      send(res, 404, { error: 'not found' })
    }      
  } catch (err) {
    send(res, 500, { error: err.message })
  }
});
