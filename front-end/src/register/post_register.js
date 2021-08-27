async function postRegister (user, pass, user_name) {
    try {
        if (user.trimStart().trimEnd() == "") {
            return errorToRegister("ERRO: USUARIO ESTÁ EM BRANCO!", false);
        }
        else
        if (pass.trimStart().trimEnd() == "") {
            return errorToRegister("ERRO: SENHA ESTÁ EM BRANCO!", false);
        }
        else
        {
                let xhr = new XMLHttpRequest();
                
                const bodyRegister = {
                    login:   `${user}`,
                    pass:   `${pass}`,
                    user_name:   `${user_name}`
                };
                
                urlRegisterPost = `http://localhost:3003/users/register`;
                xhr.open("POST", urlRegisterPost);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(bodyRegister));

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 409) {
                            errorToRegister(xhr.responseText, true);
                        return;
                        }
                        if (xhr.status === 201) {
                            errorToRegister(`USUARIO ${bodyRegister.login.toUpperCase()} CADASTRADO`, false);
                            window.location.replace('../login');
                            return;
                        } 
                    }
                };
            }
    } catch (error) {
         console.log(error);
    }
}

async function sendRegister(e) {
    e.preventDefault();
    const user = await document.getElementById("user").value;
    const pass = await document.getElementById("pass").value;
    const user_name = await document.getElementById("user_name").value;
    await postRegister(user, pass, user_name);
}

function errorToRegister(e, isJson) {4
    if (isJson) {
        const error = Array(JSON.parse(e));
        
        if ( error[0].response.error.toUpperCase() == "USER ALERADY EXISTS" ) {
            alert("USUARIO JA EXISTE");
        }
    }else{
            alert(e); 
    }
}