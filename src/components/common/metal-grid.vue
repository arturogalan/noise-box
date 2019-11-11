<script>
export default {
  name: 'metal-grid',

};
</script>
<template>
  <div class="metal-grid-wrapper n-index-5">
    <div class="horizontal-metal-bar horizontal-metal-bar--big top n-index-3">
      <div class="horizontal-white-reflect horizontal-white-reflect--middle-left" />
      <div class="horizontal-white-reflect horizontal-white-reflect--middle-right" />
    </div>
    <div class="horizontal-metal-bar horizontal-metal-bar--small center left-small n-index-1">
      <div class="horizontal-white-reflect" />
      <div class="horizontal-white-reflect horizontal-white-reflect--right" />
    </div>
    <div class="horizontal-metal-bar horizontal-metal-bar--big bottom n-index-3">
      <div class="horizontal-white-reflect horizontal-white-reflect--middle-left" />
      <div class="horizontal-white-reflect horizontal-white-reflect--middle-right" />
    </div>
    <div class="vertical-metal-bar left n-index-4">
      <div class="vertical-white-reflect vertical-white-reflect--top" />
    </div>
    <div class="vertical-metal-bar middle n-index-2">
      <div class="vertical-white-reflect vertical-white-reflect--middle" />
    </div>
    <div class="vertical-metal-bar right n-index-4">
      <div class="vertical-white-reflect vertical-white-reflect--top" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $metal-color: rgb(48,43,43);
  $metal-border-color: rgb(17,10,8);
  $box-shadow: #4f4848;
  $box-shadow-2: #292828;

  .metal-grid-wrapper {
    position: relative;
    width: 2.6rem;
    height: 2.3rem;
    // background-color: black;
    display: flex;
    overflow: hidden;
    float: left;
  }
  .horizontal-metal-bar {
    position: absolute;
    background-color: $metal-color;
    border-top: 3px solid $metal-border-color;
    border-bottom: 3px solid $metal-border-color;
    &--big {
      width: 100%;
      height: 5%;
    }
    &--small {
      width: 83%;
      height: 5%;
      border-left: 3px solid $metal-border-color;
      border-right: 3px solid $metal-border-color;
    }
      box-shadow: inset -7px -2px 4px 0px #110a08;
  }
  .vertical-metal-bar {
    position: absolute;
    background-color: $metal-color;
    border-left: 3px solid $metal-border-color;
    width: 5%;
    height: 100%;
    border-right: 3px solid $metal-border-color;
  }
  .center {
    align-self: center;
  }
  .top {
    top: 0;
    transform: translateY(-50%)
  }
  .bottom {
    bottom: 0;
    transform: translateY(50%)
  }
  .left {
    left:0;
    transform: translateX(-50%)
  }
  .left-small{
    left:5%;
  }
  .right {
    right:0;
    transform: translateX(50%)
  }
  .middle {
    left: 43%;
  }
  .horizontal-white-reflect{
    position: absolute;
    background-color: white;
    border-radius: 20%;
    height: 80%;
    width: 20%;
    box-shadow: inset 1px -1px 8px 5px $box-shadow-2;
    &--right {
      right:0;
    }
    &--middle-left {
      left: 25%;
    }
    &--middle-right {
      left: 55%;
    }
  }
  .vertical-white-reflect{
    position: absolute;
    background-color: white;
    border-radius: 20%;
    height: 20%;
    width: 100%;
    box-shadow: inset 0px 2px 6px 4px $box-shadow-2;
    &--middle {
      top:55%;
    }
    &--top{
      top: 0;
    }
  }
</style>
