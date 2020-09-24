<script>

export default {
  name: 'MainMenu',
  components: {
  },
  mixins: [],
  data () {
    return {
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
  },
  methods: {

  },

}
</script>
<template>
  <div>
    This is the main menu
    <router-link :to="{name: 'guitarAmp'}">
      GUITAR AMP
    </router-link>
    <router-link :to="{name: 'stylophone'}">
      STYLOPHONE
    </router-link>
  </div>
</template>
<style lang="scss">
</style>
