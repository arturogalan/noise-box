<script>
export default {
  name: 'MacButtons',
  props: {
    maximized: {
      type: Boolean,
      default: false,
    },
    buttonLiterals: {
      type: Object,
      default: ()=> ({
        close: 'TOOLTIP.PEDAL.CLOSE',
        minimize: 'TOOLTIP.PEDAL.MINIMIZE',
        maximize: 'TOOLTIP.PEDAL.MAXIMIZE',
      }),
    },
    buttonVisible: {
      type: Object,
      default: ()=> ({
        close: true,
        minimize: true,
        maximize: true,
      }),
    },
    buttonEnabled: {
      type: Object,
      default: ()=> ({
        close: true,
        minimize: true,
        maximize: true,
      }),
    },
  },
};
</script>
<template>
  <div class="pedal-led--strip">
    <div
      v-tooltip="buttonEnabled.close && {text: $t(buttonLiterals.close)}"
      v-if="buttonLiterals.close"
      :class="[buttonLiterals.close && 'pedal-led--close', !buttonEnabled.close && 'pedal-led--disabled']"
      class="pedal-led"
      @click="$emit('close')">
      <i :class="buttonLiterals.close && 'ico-close ico-led'"/>
    </div>
    <div
      v-tooltip="buttonEnabled.minimize && ({text: $t(buttonLiterals.minimize)})"
      v-if="buttonLiterals.minimize"
      :class="[buttonLiterals.minimize && 'pedal-led--minimize', !buttonEnabled.minimize && 'pedal-led--disabled']"
      class="pedal-led"
      @click="$emit('minimize')">
      <i :class="buttonLiterals.minimize && 'ico-minimize ico-led'"/>
    </div>
    <div
      v-tooltip="buttonEnabled.maximize && ({text: $t(buttonLiterals.maximize)})"
      v-if="buttonLiterals.maximize"
      :class="[buttonLiterals.maximize && 'pedal-led--maximize', !buttonEnabled.maximize && 'pedal-led--disabled']"
      class="pedal-led"
      @click="$emit('maximize')">
      <i :class="buttonLiterals.maximize && 'ico-maximize ico-led'"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ico-led {
  width: 10px;
  line-height: 10px;
  font-size: 8px;
  margin-left: .5px;
  display: none;
}
.pedal-led--strip:hover {
  .ico-led {
    display: block;
  }
}
.pedal-led {
  border-radius: 100%;
  width: 12px;
  height: 12px;
  display: flex;
  color: black;
    margin-right: .3rem;
  &--close{
    cursor: pointer;
    background-color: red;
  }
  &--disabled{
    cursor: default;
    background-color: #787575;
  }
  &--minimize{
    cursor: pointer;
    background-color: yellow;
  }
  &--maximize{
    cursor: pointer;
    background-color: lawngreen;
  }
  &--strip {
    padding: 0 .3rem .3rem;
    display:flex;
    flex-direction: row;
    width: -moz-min-content;    /* Firefox */
    width: -webkit-min-content; /* Chrome */
  }
}
</style>
