const myMenuMobile = document.querySelector('.mobile-menu');

myMenuMobile.addEventListener('click', (e) => {
    const e_menu_list = document.querySelectorAll('ul#menu li');
    const e_menu = document.querySelector('ul#menu');
    const e_close = document.querySelector('button#close-mobile-menu');

    for (const li of e_menu_list) {
        if (li.classList.contains('active')){
            li.classList.remove('active');
        }else{
            li.classList.add('active');
        }
    }

    if (e_menu.classList.contains('active')){
        e_menu.classList.remove('active');
        e_close.classList.remove('active');
        reloadScrollBars();
    }else{
        e_menu.classList.add('active');
        e_close.classList.add('active');
        unloadScrollBars();
    }
}, false);


function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}