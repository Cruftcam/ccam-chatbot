

var express = require('express'),    
    app = express(),
    engines = require('consolidate'),    
    app_router = require('./app_router');
    
app.use('/', app_router);


app.engine('html', engines.nunjucks);   
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('views')); 

// start server
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
