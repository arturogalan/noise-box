<template>
    <div
      class="led"
      :class="`led--${on ? 'on' : 'off'} led--${size}`"
      :style="{backgroundColor: color}"
    />
</template>

<script>
  export default {
    name: "led",
    props: {
      color: {
        type: String,
        required: true,
      },
      on: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'small',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .led {
    border-radius: 100%;
    display: flex;
    &--on {
      box-shadow: inset -1px 0px 2px 1px rgba(26, 21, 20, 0.527);
    }
    &--off {
      box-shadow: inset 0px 1px 20px 0px rgb(0, 0, 0);
    }
    &--small {
      width: 10px;
      height: 10px;
    }
    &--big {
      width: 13px;
      height: 13px;
    }
  }
</style>