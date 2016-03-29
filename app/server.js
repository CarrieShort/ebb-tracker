var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyNOAA = function(request, response) {
  console.log('Routing NOAA request for', request.params[0]);
  (requestProxy({
    url: 'http:///tidesandcurrents.noaa.gov/api/datagetter?' + request.params[0]
  }))(request, response);
};

app.get('/tides/*', proxyNOAA);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
