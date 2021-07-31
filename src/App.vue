<template>
  <div class="left">
      <div class="event-bio">
        <h1>{{state.project.title}}</h1>
      </div>
      <CategoryNav/>
  </div>
  <div class="centre">
    <DetailsView :category="state.activeCategory"></DetailsView>
  </div>
</template>

<script>
import CategoryNav from './components/CategoryNav.vue';
import DetailsView from './components/DetailsView.vue';
import state from './data/state';
import initialEvent from './data/initialEvent.json';

function getProject() {
  state.project = initialEvent;
  [state.activeCategory] = initialEvent.details.root.children;
}

export default {
  name: 'App',
  components: {
    CategoryNav,
    DetailsView,
  },
  data() {
    return {
      state,
    };
  },
  mounted() {
    console.log('honk');
    getProject();
  },
};
</script>

<style>
@import './assets/tachyons.min.css';
@import './assets/type.css';
:root {
  --background: #DAD7CD;
  --f_high : #000000;
  --f_med : #ffffff;
  --f_low : #b3b2ac;
  --f_inv : #43423e;
  --b_high : #43423e;
  --b_med : #c2c1bb;
  --b_low : #e5e3dc;
  --b_inv : #eb3f48;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--f_high);
  margin-top: 60px;
  margin-left: 50px;

  display: grid;
  grid-template-columns: 400px auto;
  grid-template-areas:
    "LEFT CENTER"
  ;
}

.left {
  grid-area: LEFT;
}

.centre {
  grid-area: CENTER;
}
</style>
