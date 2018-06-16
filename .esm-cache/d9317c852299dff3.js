let send;_229‍.w('micro',[["send",function(v){send=v}]]);

const delayed = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.random())
    }, 2000)
  })
}

_229‍.d(async (req, res) => {
  const random = await delayed()

  send(res, 200, { query: req.query, random: random, __dirname: __dirname, env: process.env })
});
