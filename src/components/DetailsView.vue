<template>
  <div class="channel">
        <DetailBlock v-for="(dd,ii) in details" :key="ii" :detailID="dd" />
  </div>
</template>

<script>
import state from '../data/state';
import DetailBlock from './DetailBlock.vue';

export default {
  name: 'DetailsView',
  components: {
    DetailBlock,
  },
  props: {
    category: String,
  },
  data() {
    return {
      state,
    };
  },
  computed: {
    details() {
      return state.project.details[this.category]
        ? state.project.details[this.category].children
        : [];
    },
  },
};
</script>

<style>

</style>
