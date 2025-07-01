class TagGame {
  ceils = [];
  stepCounter;
  currentDraggable = [];
  constructor() {
    this.game = document.querySelector('#game');
    this.ceils = Array.from(this.game.querySelectorAll('.ceil'));
  }
  init() {
    const emptyCeil = this.ceils.find(el => el.id === 'empty');
    const index = this.ceils.findIndex(ceil => ceil === emptyCeil);
    console.log(emptyCeil, index, currentDraggable)
    this.ceils[index + 1] != null && this.currentDraggable.push(this.ceils[index + 1]);
    this.ceils[index - 1] != null && this.currentDraggable.push(this.ceils[index - 1]);
    this.ceils[index + 4] != null && this.currentDraggable.push(this.ceils[index + 4]);
    this.ceils[index - 4] != null && this.currentDraggable.push(this.ceils[index - 1]);

    let dragged;
    emptyCeil.addEventListener("dragover", (e) => e.preventDefault());
    emptyCeil.addEventListener('drop', () => {
      this.game.insertBefore(dragged, emptyCeil)
      this.ceils = Array.from(this.game.querySelectorAll('.ceil'));
      this.init();
    });

    currentDraggable.forEach((ceil) => {
      ceil.addEventListener("dragstart", (e) => {
        dragged = ceil;
      });
    })
  }
  setEvent() {

  }
}
const game = new TagGame();
game.init();


// const parentNode = document.querySelector('#game');
// const element1 = document.querySelector('#empty')
// const element2 = document.querySelector('#ceil-1')
// parentNode.insertBefore(element2, element1) 