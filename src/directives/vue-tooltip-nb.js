import Vue from 'vue';

const positionTooltip = function(event, element) {
  const cursorSize = 15;
  event = event || window.event;
  let pageX = event.pageX;
  let pageY = event.pageY;
  // IE 8
  if (pageX === undefined) {
    pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  element.style.top = `${pageY+cursorSize}px`;
  element.style.left = `${pageX+cursorSize}px`;
};

const createTooltip = function(event, element, text) {
  let boxDiv = document.createElement('div');
  boxDiv.classList.add('tooltip-box');
  boxDiv.classList.remove('fade-out');
  boxDiv.classList.add('fade-in');
  let textDiv = document.createElement('div');
  textDiv.innerHTML = text;
  boxDiv.classList.add('tooltip-text');
  boxDiv.appendChild(textDiv);
  boxDiv.style.position = 'fixed';
  element.appendChild(boxDiv);
  positionTooltip(event, boxDiv);
  element.setAttribute('vue-tooltip', true);
};

const tooltip = {

  inserted: function(el, binding, vnode) {
    el.addEventListener('mouseover', (e)=> {
      if (!el.attributes['vue-tooltip'] || el.attributes['vue-tooltip'].value === 'false') {
        createTooltip(e, el, binding.value.text || binding.expression);
      }
    });
    el.addEventListener('mousemove', (e)=> {
      if (el.attributes['vue-tooltip'] && el.attributes['vue-tooltip'].value === 'true') {
        positionTooltip(e, el.lastChild);
      }
      if (!el.attributes['vue-tooltip'] || el.attributes['vue-tooltip'].value === 'false') {
        createTooltip(e, el, binding.value.text);
      }
    });
    el.addEventListener('mouseleave', ()=> {
      if (el.attributes['vue-tooltip'] && el.attributes['vue-tooltip'].value === 'true') {
        el.lastChild.classList.remove('fade-in');
        el.lastChild.classList.add('fade-out');
        el.setAttribute('vue-tooltip', 'fading');
        setTimeout(()=> {
          el.setAttribute('vue-tooltip', false);
          el.removeChild(el.lastChild);
        }, 250);
      }
    });
  },
  update: function(el, binding) {
    //If tooltip exists, change the text
    if (el.attributes['vue-tooltip'] && el.attributes['vue-tooltip'].value === 'true') {
      el.lastChild.lastChild.innerHTML = binding.value.text || binding.expression;
    }
  },
};

export default {
  init() {
    Vue.directive('tooltip', tooltip);
  },
};
