<script>
import closeable from '../../mixins/closeable';

export default {
  name: 'dropdown',
  mixins: [closeable],
  props: {
    list: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      strokeColor: '',
    };
  },
  computed: {
    selectedItem() {
      return this.list.find((el)=> el.selected) || {};
    },
    strokeBoxShadow() {
      return this.strokeColor ? `0 0px 4px 0 ${this.strokeColor}` : '0 0px 4px 0 grey';
    },
  },
  methods: {
    emitSelected(item) {
      this.$emit('selected', item);
      this.close();
    },
    close() {
      this.$refs[`checkbox_toggle${this.name}`].checked = false;
    },
    setStroke(isHover) {
      this.strokeColor = isHover ? '#3f7f00' : '';
    },
  },
};
</script>
<template>
  <div
    class="dropdown"
    @mouseover="setStroke(true)"
    @mouseleave="setStroke(false)">
    <input
      :id="`checkbox_toggle${name}`"
      :ref="`checkbox_toggle${name}`"
      type="checkbox">
    <label
      :for="`checkbox_toggle${name}`"
      :style="{ boxShadow: strokeBoxShadow}"
    >
      {{ selectedItem.name }}
      <img
        class="arrow"
        src="../../assets/icons/arrow.png"></label>
    <ul>
      <li
        v-for="item in list"
        :key="item.name"
        @click="emitSelected(item)">{{ item.name }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .arrow{
    position: absolute;
    top: .7rem;
    right: .5rem;
    width: 1rem;
  }
  .dropdown{
    z-index: $z-index-3;
    position: relative;
    display: inline-block;
    font-family: "Dyslexic";
    font-size: .8rem;
    color: #FFF;
    min-width: 200px;
  }
  label{
      box-sizing: border-box;
      display: block;
      width: 100%;
      background-color: rgba(88, 49, 49, .5);
      padding: .5rem 0rem;
      color: #FFF;
      cursor: pointer;
      text-align: center;
      // box-shadow: 0 0px 4px 0 grey;
      border-radius: .3rem;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-shadow: 2px 2px rgba(0, 0, 0, 0.8);
  }
  ul{
      position: absolute;
      list-style: none;
      text-align: left;
      width: 100%;
      left: 0;
      z-index: 1;
      margin:0;
      padding:0;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      max-height: 1rem;
      display: none;
      overflow-y: auto;
      max-height: 20rem;
      border-radius: .2rem;
  }
  ul li{
      padding: 8px;
      background-color: azure;
      color: rebeccapurple;
      // margin-bottom: 1px;
      cursor: pointer;
  }

  ul li:hover{
      background-color: slategray;
      color: #FFF;
  }

  ul li a{
      color: inherit;
      text-decoration: none;
  }
  input[type=checkbox]{
    display: none;
  }
  ul{
    display: none;
  }
  input[type=checkbox]:checked ~ ul {
      display: block;
      @extend .fade-in;
  }
</style>

