<script>
import {mapGetters} from 'vuex';
// const input = require('../assets/icons/input.svg');
// const output = require('../assets/icons/output.svg');

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
      <section v-if="defaultInputDevice || defaultInputDevice">
        <div class="footer-container">
          <div class="footer-section">
            <span>
              <img
                src="../assets/icons/input.svg"
                class="icon-type">
            </span>
            <span>
              Input:{{ defaultInputDevice.label }}
            </span>
          </div>
          <div class="footer-section">
            <span>
              <img
                src="../assets/icons/output.svg"
                class="icon-type">
            </span>
            <span>
              Output:{{ defaultOutputDevice.label }}
            </span>
          </div>

        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.footer-container {
  display: flex;
  justify-content: space-around
}
.footer-section {
  display: table;

img {
  vertical-align: middle;
  display: table-cell;
  margin-right: 1rem;
}
span {
  vertical-align: middle;
  display: table-cell;
}
}

.icon-type{
    max-width: 2rem;
}
</style>
