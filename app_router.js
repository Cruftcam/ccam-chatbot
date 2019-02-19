// author: Stefan Reimann | cruftcam@gmail.com
//
// This version of the router shows how to deliver results from Google's Dialogflow to a HTML5 page.
//
// The following code-snippet is based on examples for output in the console, provided by Google and other contributors.
// You can find the original samples here: https://github.com/googleapis/nodejs-dialogflow#using-the-client-library
//
// licence:
// With respect to a lot of enthusiasts and volunteers my part of the code is given as it is. 
// Please don't forget to give the original developers of the console based training solutions a Thumb Up for their hard work! 
// My part is free to use under the aspect of Open Source, but without any kind of warranty. 
// For detailed answers, related to licensing questions, please refer to the corresponding developer informations and their websites.
// 

var express = require('express');
var router = express.Router();

const dialogflow = require('dialogflow');
const uuid = require('uuid');

// Route to the webpage 
router.get('/', function( req, res ) {    
    res.render('master');    
});

// Let's have fun with Google's Dialogflow V2 API.
router.get('/btn_client_send', async function( req, res ) { 
    var dynamic_get = req.query;
    var dynamic_text;

    if (dynamic_get.hasOwnProperty("wert")){             
        dynamic_text = dynamic_get.wert; 
    }

    var projectId = 'YOUR_PROJECT_ID';      
    const sessionId = uuid.v4();            // A unique identifier for the given session.

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
        text: {       
            text: dynamic_text,     // The query to send to the Dialogflow agent.            
            languageCode: 'en-US',  // The language used by the client (en-US).
        },
        },
    };

    // Send request. To catch the results from "AWAIT" we have to "ASYNC" this function.
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;  
    
    var server_response = result.fulfillmentText; // The bot's answer.
    
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    res.send(server_response);  // Now let's send the result to the HTML5 page.
    // console.log(server_response);    
});

module.exports = router;
