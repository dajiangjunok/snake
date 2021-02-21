// 定义食物类
class Food {
  // 定义一个属性表示食物索对应的元素
  element: HTMLElement;
  constructor() {
    // 获取页面中的food元素，并将其赋值给element
    this.element = document.getElementById('food')!;
  }

  // 获取一个获取食物X坐标的方法 
  get X() {
    return this.element.offsetLeft;
  }

  // 获取一个获取食物坐标Y的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成随机的位置 (最小0 最大290 坐标必须是整10)
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;