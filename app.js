// Steuert eine einfache Masterpage und die zugehörigen Unterseiten.

var express = require('express'),    
    app = express(),
    engines = require('consolidate'),    
    app_router = require('./app_router');
    
app.use('/', app_router);


app.engine('html', engines.nunjucks);   // Einbinden bzw. verwenden der Templates aus dem Ordner View
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('views')); // HURRA !? Dies ist die Lösung zum einbinden von statischen Dateien wie CSS oder Image. Das kommt ins Tutorial. 
// Kann man diese statischen Dateien zur Laufzeit bearbeiten bzw. manipulieren ??? Wäre ein nettes Beispiel.

// Server starten.
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
