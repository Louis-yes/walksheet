<template>
  <div class="block-selector">
    <input
        :id="Block.id + '-checkbox'"
        type="checkbox"
        :checked="isChecked"
        v-model="isChecked"
    />
    <label :for="Block.id + '-checkbox'">
      {{Block.Title}}
      <em style="color:grey;">{{Block.Children.length ? Block.Children.length : ""}}</em>
    </label>
    <ul v-if="Block.Children.length" v-show="isChecked">
        <li v-for="(CC,ii) in Block.Children" :key="ii">
          <BlockSelector :Block="blocks[CC]" />
        </li>
    </ul>
  </div>
</template>

<script>
import blocks from '../data/getData';

console.log(blocks);
// {
//     id: string,
//     Title: string,
//     Contents: string,
//     Type: string,
//     Children: [id],
//     Parent: string,
//     level: int
// }
export default {
  name: 'BlockSelector',
  props: {
    Block: {},
  },
  data() {
    return {
      isChecked: false,
      blocks,
    };
  },
};
</script>

<style>
    .hey { color: red }
</style>
