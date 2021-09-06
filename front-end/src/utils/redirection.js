const Redirect = {
    
    toDogInformations: (id) => {
        window.location.href = `http://127.0.0.1:5500/pages/cachorro/#/id=${id}`;
    },

    toRoom: (room) => {
        window.location.href = `./${room}`;
    }

}