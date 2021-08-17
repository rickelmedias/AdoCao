const Redirect = {
    
    toDogInformations: (id) => {
        window.location.href = `../../pages/cachorro/#/id=${id}`;
    },

    toRoom: (room) => {
        window.location.href = `./${room}`;
    }

}