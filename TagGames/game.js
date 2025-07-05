class TagGame {
  ceils = []
  constructor() {
    this.game = document.querySelector('#game')
    this.createTag()
    this.initControl()
  }
  createTag() {
    for (let i = 0; i < 16; i++) {
      const ceil = `<div id="ceil-${i}" class="ceil">${i ? i : ''}</div>`
      this.ceils.push(i)
      this.game.insertAdjacentHTML('beforeend', ceil)
    }
  }
  isResolvedOrder() {
    const indexEmptyCeil = this.ceils.indexOf(0)
    const rowWithEmptyCeil = Math.floor(indexEmptyCeil / 4) + 1;
    let inversionPare = 0;
    for (let i = 0; i < this.ceils.length; i++) {
      for (let j = i + 1; j < this.ceils.length; j++) {
        if (this.ceils[j] === 0) continue;
        if (this.ceils[i] > this.ceils[j]) inversionPare += 1;
      }
    }
    if ((inversionPare + rowWithEmptyCeil) % 2 === 0 || (inversionPare + rowWithEmptyCeil) === 1) {
      return true
    } else {
      return false;
    }
  }
  randomize() {
    this.ceils = [];
    while (this.ceils.length < 16) {
      let newNum = Math.floor(Math.random() * 16);
      let existingNum = this.ceils.find(el => el === newNum);
      if (existingNum) {
        continue;
      } else if (existingNum == 0) {
        continue;
      } else {
        this.ceils.push(newNum)
      }
    }
    this.render()
  }
  render() {
    this.game.innerHTML = ''
    this.ceils.forEach((i) => {
      const ceil = `<div id="ceil-${i}" class="ceil">${i ? i : ''}</div>`
      this.game.insertAdjacentHTML('beforeend', ceil)
    })
  }
  isPossibleMove(indexMovedCeil, indexEmptyCeil, direction) {
    indexEmptyCeil += 1;
    indexMovedCeil += 1;
    switch (direction) {
      case 'top':
      case 'bottom':
        if (indexMovedCeil <= 0 || indexMovedCeil >= 17) {
          return false;
        }
        break;
      case 'left':
        if ((indexEmptyCeil) % 4 == 0 && indexMovedCeil == indexEmptyCeil + 1) {
          return false;
        }
        break;
      case 'rigth':
        if ((indexEmptyCeil - 1) % 4 == 0 && indexMovedCeil == indexEmptyCeil - 1) {
          return false;
        }
        break;
    }
    return true;
  }
  move(direction) {
    const indexEmptyCeil = this.ceils.indexOf(0)
    let difference;
    switch (direction) {
      case 'top':
        difference = 4;
        break;
      case 'left':
        difference = 1;
        break;
      case 'bottom':
        difference = -4;
        break;
      case 'rigth':
        difference = -1;
        break;
      default:
        break;
    }
    const indexMovedCeil = indexEmptyCeil + difference;
    if (!this.isPossibleMove(indexMovedCeil, indexEmptyCeil, direction)) return;
    [this.ceils[indexEmptyCeil], this.ceils[indexMovedCeil]] = [this.ceils[indexMovedCeil], this.ceils[indexEmptyCeil]]
    this.render()
    this.isWin()
  }
  initControl() {
    document.addEventListener('keypress', ({ code }) => {
      switch (code) {
        case 'KeyW':
          this.move('top')
          break;
        case 'KeyA':
          this.move('left')
          break;
        case 'KeyS':
          this.move('bottom')
          break;
        case 'KeyD':
          this.move('rigth')
          break;
        default:
          break;
      }
    })
  }
  isWin() {
    for (let i = 0; i < this.ceils.length; i++) {
      if (this.ceils[i] !== i) return false;
    }
    console.log('win')
    return true;
  }
}

const game = new TagGame()

const btnRandomize = document.querySelector('#randomize')
btnRandomize.addEventListener('click', () => {
  game.randomize();
  while (!game.isResolvedOrder()) {
    game.randomize();
  }
})
// const parentNode = document.querySelector('#game');
// const element1 = document.querySelector('#empty')
// const element2 = document.querySelector('#ceil-1')
// parentNode.insertBefore(element2, element1) 

/**
 * Класс TagTame
 * Функции класса
 * Привязка к элементу на странице
 * Ходы
 *  step
 * Перерисовка при ходе
 *  render
 * Подсчет ходов
 *  stepCounter 
 * Иметь контроллер для перемещения пятнашек 
 */
/**
 * Класс Timer
 * Счет времени от начала игры и до конца
 */