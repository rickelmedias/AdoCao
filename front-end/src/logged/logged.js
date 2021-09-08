async function CreatePageUserLogged() {
        const LoginInfo = await getMyLoginInfo();
        const pageLogged = document.querySelector('main');
        pageLogged.innerHTML = `
        <section class="modal-log-reg">

        <article>
                <label for="">Dados da Conta</label>
                <label for="" class="label-h1">Meu Nome de Login: ${LoginInfo.user}</label>
                <label for="" class="label-h1">Meu Nome: ${LoginInfo.user_name}</label>
                <label for="" class="label-h1">Meus Posts: ${LoginInfo.dogs_posted} cachorros</label>
                <p><a onclick="exitAccount()">Sair da Conta.</a></p>
        </article>

        </section>
        `;
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
                // console.log(json);
                return json;
        });

        return consumeApi;
}

function exitAccount() {
    localStorage.clear();
    location.reload();    
}