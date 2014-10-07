var restify = require('restify');
var request = require('request');
var jsdom = require('jsdom');
var port = Number(process.env.PORT || 5000);
var utd = {
  'directory': 'http://www.utdallas.edu/directory/includes/'+
               'directories.class.php?dirType=displayname&dirAffil=All&'+
               'dirDept=All&dirMajor=All&dirSchool=All&dirSearch='
};

var server = restify.createServer({
  "name": "ut-dallas-utils"
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.CORS());
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true
}));

server.get('/is_student/:name', function (req, res, next) {
  request({uri: utd.directory+encodeURIComponent(req.params.name) }, function(err, response, body){
    if(err && response.statusCode !== 200) {
      res.send({ error: true });
    } else {
      jsdom.env({
        html: body,
        scripts: ['http://code.jquery.com/jquery-2.1.1.min.js'],
        done: function(err, window){
          var $ = window.jQuery;
          res.send({ 
            error: false, 
            request: req.params, 
            isStudent: $('.firstEntry').length > 0
          });
        }
      });
    }
  });
  return next();
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
