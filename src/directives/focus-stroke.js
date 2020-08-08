import Vue from 'vue'
import store from '../store'

const isFocusEnabled = store.getters['ui/isFocusEnabled']

const focusStroke = {
  inserted: function (el, binding, vnode) {
    const size = binding.value.size || 1
    el.style.border = size + 'px solid transparent'
    if (!isFocusEnabled) return
    el.addEventListener('mouseover', (e) => {
      el.style.border = size + 'px solid #3f7f00'
    })
    el.addEventListener('mouseleave', () => {
      el.style.border = size + 'px solid transparent'
    })
  },
  update: function (el, binding) {
    const size = binding.value.size || 1
    if (!isFocusEnabled) return
    el.addEventListener('mouseover', (e) => {
      el.style.border = size + 'px solid #3f7f00'
    })
    el.addEventListener('mouseleave', () => {
      el.style.border = size + 'px solid transparent'
    })
  },
}

export default {
  init () {
    Vue.directive('focusStroke', focusStroke)
  },
}
