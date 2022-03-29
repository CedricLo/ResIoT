
const url = "https://c1e4-148-60-140-218.ngrok.io/"
const url2 = "http://127.0.0.1:3030"

//const axios = require('axios');


module.exports={
    /**
     * GET : 
     * POST : 
     * DELETE :
     * PUT :
     */

    postChenillardState : function(etat,vitesse,sens){  
        fetch(url2,{
            method : 'POST',
            headers: { 'Accept' : 'application/json', 'Content-Type': "application/json" },
            body : chenillardState(etat,vitesse,sens),
            mode: 'no-cors'
        }
        ).then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(rejected => {
        });
        
    },
    

}

function chenillardState(etat,vitesse,sens){
        return {
            "chenillard" : "chenillard",
            "etat" : etat, 
            "vitesse" : vitesse, 
            "sens" : sens
        };
}