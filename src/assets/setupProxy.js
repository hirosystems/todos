// 'React-scripts start' sets up a development server that automatically
// registers files with this name. This proxy file sets up a CORS header
// for manifest.json, allowing sign in via Blockstack without using
// the webpack configuration file that create-react-app has configured 
// and hidden.

module.exports = function(app) {
  app.get('/manifest.json', (req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET',
      'X-random': 'random'
    });
    next();
  })
};