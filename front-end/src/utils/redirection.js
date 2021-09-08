
const Redirect = {
    
    toDogInformations: (id) => {
        if (window.location.pathname.includes('/front-end/')) {
            window.location.href = `http://127.0.0.1:5500/front-end/pages/cachorro/#/id=${id}`;
        }else{
            window.location.href = `http://127.0.0.1:5500/pages/cachorro/#/id=${id}`;
        }
    },

    toRoom: (room) => {
        window.location.href = `./${room}`;
    }

}