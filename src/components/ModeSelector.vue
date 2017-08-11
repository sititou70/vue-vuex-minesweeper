<template>
  <select class="mode_selector" @change="change($event.target.value)">
    <option v-for="item of modes" :value="item" :selected="mode === item">{{item}}</option>
  </select>
</template>

<script>
export default {
  data: function(){
    return {
      name: "mode_selector",
    }
  },
  computed: {
    modes(){
      return Object.keys(this.$store._modules.root._children.Game.state.modes);
    },
    mode(){
      return this.$store._modules.root._children.Game.state.mode;
    }
  },
  methods: {
    change(mode){
      this.$store.commit("initGame", mode);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
