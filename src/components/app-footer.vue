<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('pedal', [
      'defaultInputDevice',
      'defaultOutputDevice',
    ]),
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },

};
</script>

<template>
  <div>
    <div
      class="footer">
      <p v-if="defaultInputDevice || defaultInputDevice">
        Input:{{ defaultInputDevice.label }} Output:{{ defaultOutputDevice.label }}
      </p>
    </div>
  </div>
</template>

<style>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   height: 2em;
   background-color: black;
   color: white;
   text-align: center;
}
</style>
