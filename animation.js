const ball = document.querySelector('.ball'), btn = document.querySelector('.btn-action'), 
spring = document.querySelector('.spring'), fill = document.querySelector('.fill');

const stretchSpring = () => {
   fill.style.animationName = 'bar';
   fill.style.animationPlayState = 'running';
   spring.style.animationPlayState = 'running';
   btn.textContent = "Puść sprężynę";
   btn.removeEventListener('mousedown', stretchSpring)
   btn.removeEventListener('touchstart', stretchSpring)
}

const releaseSpring = () => {
    //pobieranie stylu w danym momencie
    const fillStyles = getComputedStyle(fill);
    const fillWidth = parseInt(fillStyles.width, 10);
    
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
    const springPower = (fillWidth/barWidth * 100).toFixed(0);
    btn.textContent = `Moc uderzenia to ${springPower}%`;
    btn.style.color = 'black';
    fill.style.animationPlayState = 'paused';
    

    document.documentElement.style.setProperty('--power-x', `${24+springPower/1.4}%`);
    ball.style.animation = 'fly-ball-x 0.8s  1 forwards cubic-bezier(.12, .73, .22, .78), fly-ball-y 0.8s 1 linear forwards';

    document.documentElement.style.setProperty('--spring-left', getComputedStyle(spring).left);
    spring.style.animation = '0.1s spring-release 1 forwards linear';

    //blokowanie listenera
    btn.removeEventListener('mouseup', releaseSpring)
    btn.removeEventListener('touchend', releaseSpring)

    //reset animacji - wywołanie, gdy piłka dotknie podłoża
    ball.addEventListener('animationend', resetAnimation);



    //za pomocą JavaScript keyframes
    const myRules = document.styleSheets[0].cssRules;

    for(const i of myRules){
        if(i.name === 'fly-ball-x'){
            i.appendRule(`100% {left: ${24+springPower/1.4}%}`)
        }
    }
    }

const resetAnimation = () => {
    ball.removeEventListener('animationend', resetAnimation);
    setTimeout(()=> {
        btn.addEventListener('mousedown', stretchSpring);
        btn.addEventListener('mouseup', releaseSpring);
        btn.addEventListener('touchstart', stretchSpring);
        btn.addEventListener('touchend', releaseSpring);

        btn.style.color = "white";
        btn.textContent = "Naciągnij spężynę";

        spring.style.animation = "";
        ball.style.animation = "";
        fill.style.animationName = "none";
    },1000)
}


btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);


