'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  nav.dataset.open = 'false';
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.dataset.open = String(open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
const perspectives = {
  body: { kicker: 'THE HOSPITAL', heading: 'A body in critical care.', description: 'Hospitalized with COVID-19, Michael was placed in a medically induced coma. That medical crisis is the starting point of his account.', label: 'THE BODY / STILL' },
  mind: { kicker: 'THE PERCEIVED WORLD', heading: 'A mind held captive.', description: 'Michael recounts captivity, abandonment, and betrayal—experiences that felt real to him during his coma. The book follows that perceived world from his point of view.', label: 'THE MIND / ELSEWHERE' }
};
const controls = [...document.querySelectorAll('[data-view]')];
controls.forEach(button => button.addEventListener('click', () => {
  const view = button.dataset.view;
  const content = perspectives[view];
  if (!content) return;
  controls.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('.reality-scene').dataset.state = view;
  document.querySelector('.scene-label').textContent = content.label;
  document.querySelector('#reality-kicker').textContent = content.kicker;
  document.querySelector('#reality-heading').textContent = content.heading;
  document.querySelector('#reality-description').textContent = content.description;
}));
