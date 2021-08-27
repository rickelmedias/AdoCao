const path      = window.location.pathname;

async function onLoadPage(e) {
    const logged    = await verifyLogged();

    if (logged) {
        if (Path.ver_cachorros())           { buttonToCreateDogs(); } 
        if (Path.cadastro_cachorros())      { getBreeds(); }
        if (Path.cachorros_minha_lista())   { getMyDogList(); }
    }else{
        // Redirect pages that need Authentication.
        if  (
            Path.cadastro_cachorros() ||
            Path.cadastro_cachorros_racas() ||
            Path.cachorros_minha_lista()
            ){ Redirect.toRoom('../') }

        // If storage have a token expired:
        if (localStorage.length > 0) {
            localStorage.clear();
        }
    }
    
    // Things that don't need login: 
    if (Path.ver_cachorros()){  getDogsFromApiAndCreateCards(); }
}

const Path = {
    ver_cachorros: () => {
        return ( 
        path.includes("pages") && 
        path.includes("cachorros") &&
        (!path.includes("cadastro")) &&
        (!path.includes("raca")) &&
        (!path.includes("minha_list"))
        );
    },

    cadastro_cachorros: () => {
        return ( 
        path.includes("pages") && 
        path.includes("cachorros") &&
        path.includes("cadastro") &&
        (!path.includes("raca"))
        );
    },

    cadastro_cachorros_racas: () => {
        return ( 
        path.includes("pages") && 
        path.includes("cachorros") &&
        path.includes("cadastro") &&
        path.includes("raca")
        );
    },

    cachorros_minha_lista: () => {
        return ( 
        path.includes("pages") && 
        path.includes("cachorros") &&
        path.includes("minha_lista")
        );
    },

}