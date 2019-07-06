<script>
export default {
  name: 'dropdown',
  props: {
    list: {
      type: Array,
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
      this.$refs.checkbox_toogle.checked = false;
    },
  },
};
</script>
<template>
  <div class="dropdown">
    <input
      id="checkbox_toggle"
      ref="checkbox_toogle"
      type="checkbox">
    <label for="checkbox_toggle">{{ selectedItem.name }}</label>
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
      display: block
  }
</style>

