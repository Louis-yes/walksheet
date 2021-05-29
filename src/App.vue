<template>
  <details v-for="(b,i) in ROOT.Children" :key="i">
      <summary>{{blocks[b].Title}}</summary>
      <ul>
        <li v-for="(bb, ii) in blocks[b].Children" :key="ii">
          <BlockSelector :Block="blocks[bb]" />
        </li>
      </ul>
  </details>
</template>

<script>
import blocks from './data/getData';
import BlockSelector from './components/BlockSelector.vue';

const { ROOT } = blocks;

export default {
  name: 'App',
  components: {
    BlockSelector,
  },
  data() {
    return {
      blocks,
      ROOT,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 50px;
}
</style>
