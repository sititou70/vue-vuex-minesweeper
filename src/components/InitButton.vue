<template>
  <button class="init_button" :class="'is-' + button_state" type="button" name="button" @click="click"></button>
</template>

<script>
export default {
  data: function(){
    return {
      name: "init_button"
    }
  },
  computed: {
    button_state(){
      if(this.$store.getters.game_clear)return "gameclear";
      if(this.$store.getters.game_over)return "gameover";
      return "normal";
    }
  },
  methods: {
    click(){
      this.$store.commit("initGame", this.$store._modules.root._children.Game.state.mode);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .init_button{
    position: absolute;
    left: 50%;
    width: 26px;
    height: 26px;
    border: none;
    background: url(../assets/faces.png);
    transform: translate(-50%, -5px);
    z-index: 1;
  }
  
  .is-normal{
    background-position: 0 0;
  }
  .is-notice{
    background-position: -26px 0;
  }
  .is-gameclear{
    background-position: -52px 0;
  }
  .is-gameover{
    background-position: -78px 0;
  }
</style>
