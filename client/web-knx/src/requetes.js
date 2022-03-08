module.exports={
    /**
     * GET : 
     * POST : 
     * DELETE :
     * PUT :
     */

    postChenillardState : function(etat,vitesse,sens){
        fetch('https://22a6-77-204-105-233.ngrok.io',{
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