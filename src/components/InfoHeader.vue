<template>
  <div class="info_header">
    <span class="mine_info">{{remain_mine_num}}</span>
    <InitButton></InitButton>
    <ModeSelector class="mode_selector"></ModeSelector>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InitButton from "./InitButton";
import ModeSelector from "./ModeSelector";

export default {
  name: "info_header",
  computed: {
    remain_mine_num(){
      return this.$store.getters.board_info.mine_num - this.$store.getters.flag_num;
    }
  },
  components: {
    InitButton,
    ModeSelector
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .info_header{
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: 30px 0 0;
  }
  
  .mine_info{
    color: red;
    font-weight: bold;
  }
</style>
