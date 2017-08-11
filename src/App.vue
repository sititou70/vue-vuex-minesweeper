<template>
  <div id="app" :class="'is-' + mode">
    <InfoHeader></InfoHeader>
    <Board></Board>
  </div>
</template>

<script>
import InfoHeader from "./components/InfoHeader";
import Board from "./components/Board";

export default {
  name: "app",
  components: {
    InfoHeader,
    Board
  },
  computed: {
    mode(){
      return this.$store._modules.root._children.Game.state.mode;
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  
  body{
    background: #c0c0c0;
    margin: 0 0 30px;
  }
  
  button::-moz-focus-inner{
    border: none;
  }
  
  #app{
    margin: 0 auto;
  }
  
  .is-easy{
    width: calc(16px * 8 + 1px);
  }
  .is-normal{
    width: calc(16px * 16 + 1px);
  }
  .is-hard{
    width: calc(16px * 30 + 1px);
  }
  .is-very_hard{
    width: calc(16px * 48 + 1px);
  }
  .is-mania{
    width: calc(16px * 64 + 1px);
  }
</style>
