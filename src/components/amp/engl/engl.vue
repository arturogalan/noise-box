<script>
import ChickenHeadKnob from '../../common/chicken-head-knob.vue';
export default {
  name: 'Engl',
  components: {
    ChickenHeadKnob,
  },
};
</script>
<template>
  <div class="amp-wrapper">
    <div class="knob-grid" >
      <chicken-head-knob
        :name="'trebble'"
        :knobs-number="1"
        :init-value="25"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.amp-wrapper {
  width: 100%;
  height: 10rem;
  background-color: rgb(82,79,78);
  box-shadow: inset 0px 1px 10px 0px rgb(0, 0, 0);
}
.knob-grid {
    position: absolute;
    z-index: $z-index-pedal;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.one-knob {
  cursor: pointer;
  margin-right: .3rem;
  &--normal {
    width: 3rem;
  }
  &--zoom-in {
    width: 10rem;
  }
}
</style>
