module.exports={
    /**
     * GET : 
     * POST : 
     * DELETE :
     * PUT :
     */

    postChenillardState : function(){
        fetch('https://22a6-77-204-105-233.ngrok.io',{
            method : 'POST',
            mode : 'cors',
            body :chenillardState(true,1,"droite"), 
        }
        
        ).then(console.log("requete executée"))
    },
    

}

function chenillardState(etat,vitesse,sens){
        return JSON.stringify({chenillard : {etat : etat, vitesse : vitesse, sens : sens
        },
    })
    }