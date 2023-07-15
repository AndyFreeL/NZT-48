import * as functions from './modules/functions.js';

functions.isWebp();
import Slider from './slider.js'

document.addEventListener('DOMContentLoaded', function() {
    new Slider(document.querySelector('.carousel'),100);
    new Slider(document.querySelector('.carousel2'), 70);
});

window.onscroll = function(){
    const scroll = window.scrollY;
    const header = document.querySelector('.header')
    if(scroll>100){
        header.classList.add('scrolled')
    }else{
        header.classList.remove('scrolled')
    }
};









