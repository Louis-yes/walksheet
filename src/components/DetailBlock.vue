<template>
  <article class="detail card">
    <h2 class="h2">{{detail.title}}</h2>
    <div class="children">
      <span class="child-detail" v-for="(cc,ii) in detail.children" :key="ii">
        {{getDetail(cc).title}}
      </span>
    </div>
    <textarea class="textfield" v-model="detail.content" />
  </article>
</template>

<script>
import state from '../data/state';

export default {
  name: 'DetailBlock',
  components: {
  },
  props: {
    detailID: String,
  },
  data() {
    return {
      state,
    };
  },
  methods: {
    getDetail(id) {
      return state.project.details[id];
    },
  },
  computed: {
    detail() {
      return state.project.details[this.detailID];
    },
  },
};
</script>

<style scoped>
  .card {
    max-width: 500px;
    margin: 0 0 15px;
    padding: 16px 26px 35px;
    background: #E5E3DC;
    border-radius: 25px;
  }
  .children {
    opacity: .7;
  }
  .child-detail {
    display: inline;
    padding: 0 5px 0 0;
  }
  .textfield {
    resize: vertical;
    min-height: 67px;
    width: 100%;
    margin-top: 10px;

    outline: solid 1px var(--f_med);
    background: none;
    border: none;
  }

  .textfield:focus {
    outline: solid 1px var(--f_med);
  }
</style>
