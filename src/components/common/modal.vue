<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <transition name="fade">
    <div
      v-if="show"
      class="modal">
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: $z-index-modal; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  // background-color: rgb(0,0,0); /* Fallback color */
  // background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content/Box */
.modal-content {
  margin: 5% auto; /* 15% from the top and centered */
  width: 80%; /* Could be more or less, depending on screen size */
  height: 80%; /* Could be more or less, depending on screen size */
}
</style>

