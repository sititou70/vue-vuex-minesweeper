<template>
  <div class="board">
    <BoardButton v-for="(item, index) of numBoard" :key="index" :id="index"></BoardButton>
  </div>
</template>

<script>
import BoardButton from "./BoardButton";

export default {
  data: function(){
    return {
      name: "init_button"
    }
  },
  computed: {
    numBoard(){
      return this.$store._modules.root._children.Game.state.mines;
    }
  },
  components: {
    BoardButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .board{
    margin: 10px 0 0;
    line-height: 0;
    border: solid 1px #808080;
    border-width: 0 1px 1px 0;
  }
</style>
