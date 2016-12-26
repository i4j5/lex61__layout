(()=>{

    const offer = document.getElementById('offer');
    
    let resizOffer = () => {
        offer.style.height = document.documentElement.clientHeight + 'px';
    };

    window.addEventListener('load', resizOffer);
    window.addEventListener('resize', resizOffer);
    
})();