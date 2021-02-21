// 游戏控制器，控制其他所有类

// 引入其他类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
  // 定义三个属性
  /**
   * Snake 蛇
   * Food 食物
   * ScorePanel 记分牌
   **/
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 创建一个属性存储蛇移动的方向
  direction: string = 'Right';
  // 创建一个属性决定蛇是否存活
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init()
  }

  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandler);

    // 调用run方法，使蛇移动
    this.run();
  }

  // 创建键盘按下的响应函数
  keydownHandler = (event: KeyboardEvent) => {
    // 检查方向，event.key值是否合法
    /**
     * ArrowRight
     * ArrowUp
     * ArrowLeft
     * ArrowDown
     */
    // console.log(event.key);
    if (
      event.key === 'ArrowRight' || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft' || event.key === 'ArrowDown'
      || event.key === 'Right' || event.key === 'Left'
      || event.key === 'Top' || event.key === 'Down') {
      this.direction = event.key;
    }
  }

  // 创建一个蛇移动的方法
  run = () => {
    // 根据direction来使蛇的位置改变
    /**
     * 向上  top增加
     * 向下  top减少
     * 向左  left减少
     * 向右  left增加
    */
    //  获取蛇目前坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据按键方向计算X和Y的值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10;
        break;
      default:
        break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(X, Y);

    // 修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      alert(error.message + 'GAME OVER');
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run, 240 - (this.scorePanel.level - 1) * 30);
  }

  // 定义一个方法，检测蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置进行重置
      this.food.change();
      this.scorePanel.addScore();
      // 蛇增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;