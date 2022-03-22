
const url = "https://c1e4-148-60-140-218.ngrok.io/"
const url2 = "http://127.0.0.1:3030"

module.exports={
    /**
     * GET : 
     * POST : 
     * DELETE :
     * PUT :
     */

    postChenillardState : function(etat,vitesse,sens){
        fetch(url,{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : chenillardState(etat,vitesse,sens), 
            mode : 'no-cors'
        }).then(data => {
          console.log(data);
        })
        .catch(rejected => {
            console.log(rejected);
        });
    },
    

}

function chenillardState(etat,vitesse,sens){
        return {chenillard : {
            "etat" : etat, 
            "vitesse" : vitesse, 
            "sens" : sens
        },
    }
}