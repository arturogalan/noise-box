<script>
import eventBus from '../helpers/eventBus';

export default {
  name: 'closeable',
  data() {
    return {
      uniqueId: Math.random().toString(36).substring(2) + Date.now().toString(36),
    };
  },
  mounted() {
    eventBus.$on('closeAllExceptMe', this.closeAllExceptMe);
    this.$el.addEventListener('click', this.emitClose);
  },
  destroyed() {
    eventBus.$off('closeAllExceptMe', this.closeAllExceptMe);
  },
  methods: {
    closeAllExceptMe({ uniqueId }) {
      if (this.uniqueId !== uniqueId && this.close && typeof this.close === 'function') {
        this.close();
      }
    },
    emitClose(event) {
      event.stopPropagation();
      eventBus.$emit('closeAllExceptMe', { uniqueId: this.uniqueId });
    },
  },
};
</script>
