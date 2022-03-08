
const url = "https://22a6-77-204-105-233.ngrok.io"
const url2 = "http://127.0.0.1:3030"

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
            mode : 'cors',
            body : chenillardState(etat,vitesse,sens), 
        }
        
        ).then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(rejected => {
            console.log(rejected);
        });
    },
    

}

function chenillardState(etat,vitesse,sens){
        return JSON.stringify({chenillard : {
            etat : etat, 
            vitesse : vitesse, 
            sens : sens
        },
    })
}