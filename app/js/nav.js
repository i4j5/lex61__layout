(()=>{

    const toggle = document.getElementById('nav__toggle');
    const wrapper = document.getElementById('nav__wrapper');
    const close = document.getElementById('nav__close');

    toggle.addEventListener('click', () => {
        wrapper.classList.add('nav__wrapper_active');
    });

    close.addEventListener('click', () => {
        wrapper.classList.remove('nav__wrapper_active');
    });

})();