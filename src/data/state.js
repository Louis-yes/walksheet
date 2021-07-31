import { reactive } from 'vue';
import Project from '../types/Project';

const state = reactive({
  activeCategory: '',
  view: 'category',
  project: new Project({ }, 'New Project'),
});
export default state;
