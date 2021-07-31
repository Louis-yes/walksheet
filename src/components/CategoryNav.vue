<template>
<ul class="categories">
  <li class="category"
    v-for="(dd,ii) in categories"
    :key="ii"
    v-on:click="setActiveCategory(dd)"
    >
    {{title(state.project.details[dd].title)}}
  </li>
</ul>
</template>
<script>
import state from '../data/state';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export default {
  name: 'CategoryNav',
  props: {
    // details,
  },
  data() {
    return {
      state,
    };
  },
  computed: {
    categories() {
      return state.project.details.root ? state.project.details.root.children : [];
    },
  },
  methods: {
    title(tt) {
      return toTitleCase(tt);
    },
    setActiveCategory(dd) {
      state.activeCategory = dd;
    },
  },
};
</script>
<style scoped>
  .categories {
    position: fixed;
    top: 100px;
    left: 50px;
    list-style: none;
    padding: 0;
    max-width: 305px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    text-transform: capitalize;
  }
  .category {
    margin-top: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .category:hover {
    font-weight: bold;
  }
</style>
