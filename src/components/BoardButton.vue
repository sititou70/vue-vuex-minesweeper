<template>
  <button class="board_button" :class="'is-' + button_state" @mouseup="e => mouseup({e, id: this.id})" @mousedown="e => mousedown({e, id: this.id})" @mouseenter="e => mouseenter({e, id: this.id})" type="button" name="button"></button>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data: function(){
    return {
      name: "board_button"
    }
  },
  props: ["id"],
  computed: {
    button_state(){
      //let mouse_info = this.$store.getters.mouse_info;
      //if(mouse_info.active_id === this.id && mouse_info.button !== null)return 0;
      if(this.$store.getters.game_over && this.$store.state.Game.mines[this.id])return "mine";
      if(this.$store.state.Game.flags[this.id])return "flag";
      if(!this.$store.state.Game.opened[this.id])return "normal";
      if(this.$store.state.Game.mines[this.id])return "mine";
      return this.$store.getters.around_mine_num(this.id);
    }
  },
  methods: {
    ...mapActions([
      "mouseup",
      "mousedown",
      "mouseenter"
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .board_button{
    width: 16px;
    height: 16px;
    border: none;
    background: url(../assets/buttons.png);
    outline: none;
  }
  
  .is-flag{
    background-position: -16px 0;
  }
  .is-mine{
    background-position: -32px 0;
  }
  .is-mine-critical{
    background-position: -48px 0;
  }
  .is-mine-mistake{
    background-position: -64px 0;
  }
  .is-0{
    background-position: -80px 0;
  }
  .is-1{
    background-position: -96px 0;
  }
  .is-2{
    background-position: -112px 0;
  }
  .is-3{
    background-position: -128px 0;
  }
  .is-4{
    background-position: -144px 0;
  }
  .is-5{
    background-position: -160px 0;
  }
  .is-6{
    background-position: -176px 0;
  }
  .is-7{
    background-position: -192px 0;
  }
  .is-8{
    background-position: -208px 0;
  }
</style>
