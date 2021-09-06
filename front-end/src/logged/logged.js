function CreatePageUserLogged() {
        getMyLoginInfo();
        const pageLogged = document.querySelector('main');
        pageLogged.innerHTML = "<div>Teste</div>";
}

async function getMyLoginInfo() {
        const apiUrl = 'http://localhost:3003/users/login/check';
        const token  = localStorage.getItem('token');

        const consumeApi = fetch(apiUrl, {
                method: "post",

                headers: { 
                        "Authorization": `Bearer ${token}`
                }
        }).then( (response) => {
                return response.json();
        }).then( (json) => {
                console.log(json);
        });
}