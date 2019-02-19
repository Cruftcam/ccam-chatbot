// author:  Stefan Reimann
// license: Royalty free for private and educational purposes.

var elem_id= 0;
var calculated_object_height = 0;

function clientRequest(dom_id) {     
    var client_request = document.getElementById("id_client_text").value;
    if(client_request == "")
    {
        client_request = "Insert text, please.";                
    } 
    
    document.getElementById("id_client_text").value = "";
    document.getElementById("id_client_text").placeholder = "";
    
    createClientCard(client_request);     
    loadDocNew(dom_id, client_request);
}

// Create a Clientcard at runtime. 
function createClientCard(request_from_client) {    
    var new_card = document.createElement("div");
    var new_label = document.createElement("label");
    new_card.classList.add("chat-card", "client");

    var t = document.createTextNode(request_from_client);
    new_label.appendChild(t);

    new_card.appendChild(new_label);    
    new_card.id = elem_id;
    elem_id++;
    
    document.getElementById("id_chat-card").appendChild(new_card); 

    var actual_id = elem_id - 1;
    var css_property = window.getComputedStyle(document.getElementById(actual_id), null).getPropertyValue("height");
    
    calculated_object_height = calculated_object_height + 6 + removePX(css_property); // In this simplified example some hardcoded values are used.    
    if(calculated_object_height > 350) {
        document.getElementById("id_chat-card").scrollTo(0, calculated_object_height);
    }
}

function removePX(wert) {        
    var res = parseInt(wert);  
    return res;
}

// Try to create a Botcard at runtime. The card should show the result from the Dialogflow server.
function createBotCardLive(answer) {
    var new_card = document.createElement("div");
    var new_label = document.createElement("label");

    new_card.classList.add("chat-card", "bot");
    
    var response_from_bot = answer; // Result sent from the Google Dialogflow server. 

    var t = document.createTextNode(response_from_bot);
    new_label.appendChild(t);

    new_card.appendChild(new_label);    
    new_card.id = elem_id;
    elem_id++;            
    document.getElementById("id_chat-card").appendChild(new_card);
    
    var actual_id = elem_id - 1;
    var css_property = window.getComputedStyle(document.getElementById(actual_id), null).getPropertyValue("height"); 
    
    calculated_object_height = calculated_object_height + 6 + removePX(css_property); 
    
    if(calculated_object_height > 350) {
        document.getElementById("id_chat-card").scrollTo(0, calculated_object_height);
    }
}

function loadDocNew(dom_id, request_text) {
    var bot_result;                
    var subpage = ""; 

    if (dom_id.id == "btn_client_send") {        
        var subpage = "btn_client_send?wert=" + request_text; // Ask the bot here... 
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {            
            bot_result = xhttp.responseText;
            createBotCardLive(bot_result); // Creates a card at runtime and shows the result...
        }
    };
    xhttp.open("GET", subpage, true);
    xhttp.send(); 
}
