
const Redirect = {
    
    toDogInformations: async (object) => {
        let arrObj = await object.split(',');
        
        if (window.location.pathname.includes('/front-end/')) {
            window.location.href = `adocao.rickelmedias.dev/pages/cachorro/#/id=${arrObj[0]}`;
        }else{
            window.location.href = `adocao.rickelmedias.dev/pages/cachorro/#/id=${arrObj[0]}`;
        }
    },

    toRoom: (room) => {
        window.location.href = `./${room}`;
    }

}