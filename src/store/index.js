import Vue from "vue";
import Vuex from "vuex";
import {
  createInitMines,
  createFalseBoard,
  createNullBoard,
  countTrue,
  judgeGameOver,
  judgeGameClear,
  countAroundNum,
  openCell,
  getPositionFromIndex,
  superOpen
} from "@/game"

Vue.use(Vuex);

const Mouse = {
  state:{
    button: null,
    active_id: null
  },
  getters: {
    mouse_info(state){
      return {
        button: state.button,
        active_id: state.active_id
      };
    }
  },
  actions: {
    mouseup(context, payload){
      if(context.getters.game_over || context.getters.game_clear)return;
      if(context.state.button === null)return;
      if(context.state.button === 0)context.dispatch("openCell", payload.id);
      if(context.state.button === 2)context.dispatch("toggleFlag", payload.id);
      if(context.state.button === 3)context.dispatch("superOpen", payload.id);
      context.state.button = null;
    },
    mousedown(context, payload){
      if(payload.e.button == 1)return null;
      
      if(context.state.button == null){
        context.state.button = payload.e.button;
      }else{
        context.state.button = 3;
      }
    },
    mouseenter(context, payload){
      context.state.active_id = payload.id;
    }
  }
};

const Game = {
  state: {
    modes: {
      easy: {
        width: 8,
        height: 8,
        mine_num: 10
      },
      normal: {
        width: 16,
        height: 16,
        mine_num: 40
      },
      hard: {
        width: 30,
        height: 16,
        mine_num: 99
      },
      very_hard: {
        width: 48,
        height: 24,
        mine_num: 256
      },
      mania: {
        width: 64,
        height: 48,
        mine_num: 777
      }
    },
    mode: "normal",
    mines: [],
    flags: [],
    opened: [],
    num_board: []
  },
  getters: {
    game_over(state){
      return judgeGameOver(state);
    },
    game_clear(state){
      return judgeGameClear(state);
    },
    board_info(state){
      return state.modes[state.mode];
    },
    around_mine_num: (state, getters) => (index) => {
      if(state.num_board[index] === null)state.num_board[index] = countAroundNum(state.mines, index, state, getters);
      return state.num_board[index];
    },
    flag_num(state){
      return state.flags.reduce((s, x) => s + (x ? 1 : 0), 0);
    }
  },
  mutations: {
    initGame(state, mode){
      state.mode = mode;
      state.mines = createInitMines(state.modes[mode]);
      state.flags = createFalseBoard(state.modes[mode]);
      state.opened = createFalseBoard(state.modes[mode]);
      state.num_board = createNullBoard(state.modes[mode]);
    }
  },
  actions: {
    openCell(context, id){
      if(context.state.flags[id])return;
      let position = getPositionFromIndex(id, context.getters.board_info.width);
      context.state.opened = openCell(position, context.state.opened, context.getters);
    },
    toggleFlag(context, id){
      if(context.state.opened[id])return;
      let new_flags = [...context.state.flags];
      new_flags[id] = !new_flags[id];
      context.state.flags = new_flags;
    },
    superOpen(context, id){
      if(context.state.flags[id])return;
      superOpen(id, context);
    }
  }
};

export default new Vuex.Store({
  modules: {
    Mouse,
    Game
  }
});
