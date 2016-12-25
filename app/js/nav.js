(()=>{

    let toggle = document.getElementById('nav__toggle');
    let items = document.getElementById('nav__items');
    let close = document.getElementById('nav__close');

    toggle.addEventListener('click', () => {
        items.classList.add('nav__items_active');
    });

    close.addEventListener('click', () => {
        items.classList.remove('nav__items_active');
    });

})()