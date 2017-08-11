export const around_deltas = Array.from({length: 9}, (x, i) => {
  return {dx: parseInt(i / 3) - 1, dy: i % 3 - 1};
}).filter(obj => !(obj.dx === 0 && obj.dy === 0));

export const expandArray = (array, x, y, board_info) => {
  if(x < 0 || y < 0 || x >= board_info.width || y >= board_info.height)return null;
  return array[y * board_info.width + x];
};

export const getPositionFromIndex = (index, width) => {
  return {
    x: index % width,
    y: Math.floor(index / width)
  };
};

export const getIndexFromPosition = (position, width) => {
  return position.y * width + position.x;
};

export const shuffleArray = (array) => {
  for(let i = array.length - 1; i > 0; i--){
    let target = Math.floor(Math.random() * i);
    
    let temp = array[i];
    array[i] = array[target];
    array[target] = temp;
  }
  
  return array;
};

export const countTrue = (array) => {
  return array.reduce((s, x) => s + (x ? 1 : 0), 0);
};

export const createInitMines = (data) => {
  return shuffleArray(Array.from({length: data.width * data.height}, (x, i) => i < data.mine_num ? true : false));
};

export const createFalseBoard = (data) => {
  return shuffleArray(Array.from({length: data.width * data.height}, () => false));
};

export const createNullBoard = (data) => {
  return shuffleArray(Array.from({length: data.width * data.height}, () => null));
};

export const judgeGameOver = (status) => {
  for(let i = 0; i < status.mines.length; i++){
    if(status.mines[i] && status.opened[i])return true;
  }
  
  return false;
};

export const judgeGameClear = (state) => {
  return state.modes[state.mode].width * state.modes[state.mode].height - state.modes[state.mode].mine_num === countTrue(state.opened);
};

export const countAroundNum = (array, index, state, getters) => {
  if(state.mines[index])return null;
  let now_position = getPositionFromIndex(index, getters.board_info.width);
  return around_deltas.map(obj => expandArray(array, now_position.x + obj.dx, now_position.y + obj.dy, getters.board_info)).map(x => x === null ? 0 : x).reduce((s, x) => s + x);
};

export const openCell = (position, opened, getters) => {
  let board_info = getters.board_info;
  let index = getIndexFromPosition(position, board_info.width);
  if(position.x < 0 || position.y < 0 || position.x >= board_info.width || position.y >= board_info.height)return opened;
  if(opened[index])return opened;
  
  let new_opened = [...opened];
  
  new_opened[index] = true;
  
  if(getters.around_mine_num(index) === 0)around_deltas.forEach((obj) => {
    let now_position = getPositionFromIndex(index, board_info.width);
    now_position.x += obj.dx;
    now_position.y += obj.dy;
    new_opened = openCell(now_position, new_opened, getters);
  });
  
  return new_opened;
};

export const superOpen = (id, context) => {
  if(context.getters.around_mine_num(id) !== countAroundNum(context.state.flags, id, context.state, context.getters))return;
  
  let position = getPositionFromIndex(id, context.getters.board_info.width);
  around_deltas.forEach(obj => {
    let target_position = {
      x: position.x + obj.dx,
      y: position.y + obj.dy
    };
    if(expandArray(context.state.flags, target_position.x, target_position.y, context.getters.board_info))return;
    context.state.opened = openCell(target_position, context.state.opened, context.getters);
  });
};