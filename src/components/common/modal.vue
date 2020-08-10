<script>
import { mapActions } from 'vuex'

export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
    },
    clickOutsideCloses: {
      type: Boolean,
      default: false,
    },
    modalName: {
      type: String,
      default: null,
    }
  },
  methods: {
    ...mapActions('ui', [
      'toggleModal',
    ]),
    closeModal () {
      if (this.modalName) {
        this.toggleModal({ modalName: this.modalName, status: false })
      }
    },
  },
}
</script>
<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="show"
      class="modal"
      @click="clickOutsideCloses && closeModal()"
    >
      <div
        :class="[size === 'big' && 'modal-content--big']"
        class="modal-content"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: $z-index-10; /* Sit on top */
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
  display: flex;
  margin: 5% auto; /* 15% from the top and centered */
  width: 80%; /* Could be more or less, depending on screen size */
  height: 75%; /* Could be more or less, depending on screen size */
  &--big {
    max-width: 90%; /* Could be more or less, depending on screen size */
    max-height: 95%; /* Could be more or less, depending on screen size */
  }
}
</style>
