class Snake {
  // 表示蛇的元素
  head: HTMLElement;
  // 蛇身(包括蛇头)
  bodies: HTMLCollection;
  // 蛇容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标（头部坐标）
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (this.X === value) return;
    // 判断X合法值
    if (value < 0 || value > 290) {
      // 进入判断 蛇撞墙了
      throw new Error('蛇撞墙了!');
    }
    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('水平方向发生了掉头');
      // 如果发生了掉头 让蛇向着反方向继续移动
      if (value > this.X) {
        // 如果新值大于旧值X,则说明蛇向右走，此时发生掉头，应该蛇继续向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) return;
    // 判断Y合法值
    if (value < 0 || value > 290) {
      // 进入判断 蛇撞墙了
      throw new Error('蛇撞墙了!');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {

      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 蛇增加身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 添加一个蛇身体移动的方法
  moveBody() {
    /**
     *   将蛇身体设置为前边身体的位置
     *   举例子：
     *     第四节 = 第三节的位置
     *     第三节 = 第二节的位置
     *     第二节 = 第一节的位置
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkHeadBody = () => {
    // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断，说明蛇头撞到了身体，游戏结束
        throw Error('撞到自己了...')
      }
    }
  }
}

export default Snake;