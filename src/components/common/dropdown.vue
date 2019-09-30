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
  computed: {
    selectedItem() {
      return this.list.find((el)=> el.selected) || {};
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
  },
};
</script>
<template>
  <div
    class="dropdown">
    <input
      :id="`checkbox_toggle${name}`"
      :ref="`checkbox_toggle${name}`"
      type="checkbox">
    <label :for="`checkbox_toggle${name}`">{{ selectedItem.name }}</label>
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
  .dropdown{
    z-index: $z-index-3;
    position: relative;
    display: inline-block;
    font-family: "FontPbio";
    font-size: .8rem;
    color: #FFF;
    min-width: 200px;
  }
  label{
      box-sizing: border-box;
      display: inline-block;
      width: 100%;
      background-color: black;
      padding: 15px 20px;
      color: #FFF;
      cursor: pointer;
      text-align: center;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  ul{
      position: absolute;
      list-style: none;
      text-align: left;
      width: 100%;
      z-index: 1;
      margin:0;
      padding:0;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      max-height: 1rem;
      display: none;
      overflow-y: auto;
      max-height: 20rem;
  }
  ul li{
      padding: 15px;
      background-color: #fff;
      color: #4FB9A7;
      // margin-bottom: 1px;
      cursor: pointer;
  }

  ul li:hover{
      background-color: #4FB9A7;
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

