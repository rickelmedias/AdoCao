window.onload = async () => {
    /* Check if user is logged */
    const logged = await verifyLogged();

    if (logged) {
        console.log('On');
    }else{
        console.log('Off');
    }
}