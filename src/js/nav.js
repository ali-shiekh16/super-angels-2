import gsap from 'gsap';
const button = document.querySelector('#nav-toggle-button');
const nav = document.querySelector('.nav');

button.addEventListener('click', () => {
  gsap.to(nav, {
    duration: 0.2,
    height: () => (!nav.getBoundingClientRect().height ? 'auto' : '0'),
  });
});
