<script>
export default {
  name: 'switch-on',
  props: {
    name: {
      type: String,
      required: false,
      default: 'Power',
    },
    color: {
      type: String,
      required: false,
      default: 'red',
    },
  },
  data() {
    return {
      switchedOn: false,
    };
  },
  methods: {
    toogleSwitch() {
      this.switchedOn = !this.switchedOn;
      this.$emit('click');
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="frame">
      <div
        :class="`switch-border--${color}`"
        class="switch-border">
        <div
          v-if="switchedOn"
          :class="`switch-top-side--${color}`"
          class="switch-top-side"/>
        <div
          :class="switchedOn ? `switch-on--${color}` : `switch-off--${color}`"
          class="switch">
          <div class="inner-switch-grid"/>
          <label
            :class="[switchedOn && `switch-right switch-right--${color}`]"
            class="letter"
            @click="toogleSwitch()">
            <span :class="switchedOn && 'switch-letter-right'">
              0
            </span>
          </label>
          <label
            :class="[!switchedOn && `switch-left switch-left--${color}`]"
            class="letter"
            @click="toogleSwitch()">
            <span :class="!switchedOn && 'switch-letter-left'">
              I
            </span>
          </label>
        </div>
        <div
          v-if="!switchedOn"
          :class="`switch-bottom-side--${color}`"
          class="switch-bottom-side"/>
      </div>
    </div>
    <div
      class="setting-name"
    >
      <span>{{ name }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.frame {
  width: 2.9rem;
  display: inline-block;
  border: 5px solid #282727;
  border-radius: 2px;
  background: black;
}
.switch-border {
  border: 3px solid;
  &--red{
    border-color: #5d0202;
  }
  &--black{
    border-color: black;
  }
}
.switch-top-side {
  width: 2.5rem;
  height: .5rem;
  box-shadow: inset 0px 0px 8px 0px black;
  &--red{
    border-bottom: 1px solid #5d0202;
    background-color: red;
  }
  &--black{
      border-bottom: 1px solid #1a1919;
    background-color: 1a1919;
  }
}
.switch-bottom-side {
  width: 2.5rem;
  height: .5rem;
  &--red{
    border-top: 1px solid #5d0202;
    background-color: darkred;
    border-left: .2px solid #5d0202;
  }
  &--black{
      border-top: 1px solid #1a1919;
    background-color: #1a1919;
    border-left: .2px solid #1a1919;
  }
  // transform: rotateZ(deg);
  box-shadow: inset 0px 0px 8px 0px black;
}
.switch {
  width: 2.5rem;
  height: 3rem;
  opacity: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.switch-off {
  &--red{
    background-color: darkred;
  }
  &--black{
    background-color: black;
  }
}
.switch-on {
  &--red{
    box-shadow: inset 0px -2px 20px 0px #111010;
    background-color: red;
  }
  &--black{
    background-color: black;
  }
}
.switch-left {
  transform: rotateZ(-3deg) translate(-1px);
  &--red{
    border-left: .2px solid #5d0202;
  }
  &--black{
    border-left: .2px solid #1a1919;
  }
}
.switch-letter-left {
  padding-left: 3px;
}
.switch-right {
  transform: rotateZ(3deg) translate(-1px);
    &--red{
    border-left: .2px solid #5d0202;
  }
  &--black{
    border-left: .2px solid #1a1919;
  }
}
.switch-letter-right {
  padding-left: 3px;
}
.inner-switch-grid {
  width: 2.5rem;
  height: 3rem;
  position: absolute;
  opacity: .2;
  background-size: 3px 3px;
  background-image: linear-gradient(to right,#5d0202 1px, transparent 1px), linear-gradient(to bottom,#5d0202 1px, transparent 1px);
}
.letter {
  color: #9d9b9b;
  font-weight: bold;
  z-index: 0;
  cursor: pointer;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setting-name {
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  position: absolute;
  width: 200%;
  bottom: -30%;
  font-size: .6rem;
  font-family: "FontPbio";
  white-space: nowrap;
  align-self: center;
}

</style>
