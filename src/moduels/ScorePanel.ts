// 定义表示记分牌的类
/**
 * score,level记录分数和等级
 * scoreEle，levelEle  分数和等级所在的元素，在构造函数中进行初始化
 */
class ScorePanel {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分时升级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    // 判断分数多少
    if (this.score % this.upScore === 0) {
      this.levelup()
    }
  }

  // 等级提升
  levelup() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;