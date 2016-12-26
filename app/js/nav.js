(()=>{

    let toggle = document.getElementById('nav__toggle');
    let wrapper = document.getElementById('nav__wrapper');
    let close = document.getElementById('nav__close');

    toggle.addEventListener('click', () => {
        wrapper.classList.add('nav__wrapper_active');
    });

    close.addEventListener('click', () => {
        wrapper.classList.remove('nav__wrapper_active');
    });

})();