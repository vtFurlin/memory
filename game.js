const types = ['Fruta'] // All types of cards
const colors = ['ff0', 'f33', '3f3', 'f93'] // All colors of images
var fullDeck = []// All cards
var deck // Cards drawn for this game (duplicated and shuffled)
var wrapper // HTML div containing all game elements
var active = false // Card showing
var locked = false // Can the player make any move?
var points = 0
var innerWidth
var pointSound
var winSound
var badSound
var music

function onTouch () {
  if(locked) return
  if(this.lastChild.lastChild.style.opacity == 0.3) return
  if(active == this) return
  if(this.className == 'card') {
    this.className += ' flipped'
    locked = true
    if(active)
      if(active.lastChild.lastChild.src == this.lastChild.lastChild.src)
      {
        pointSound.play()
        this.lastChild.lastChild.style.opacity = 0.3
        this.lastChild.lastChild.style.filter = 'grayscale(50%)'
        active.lastChild.lastChild.style.opacity = 0.3
        active.lastChild.lastChild.style.filter = 'grayscale(50%)'
        points += 1
        if(points >= 10)
          winSound.play()
        else
          locked = false
        active = false
      } else { // wrong combination
        badSound.play()
        unflip = setInterval( function () {
          this.className = 'card'
          active.className = 'card'
          active = false
          locked = false
        clearInterval(unflip) }.bind(this), 1500)
      }
    else { //no active card
      active = this
      unlock = setInterval( function () {
        locked = false
      clearInterval(unlock) }, 1000)
    }

  }
}

class Card {
  constructor (word, img, type, color) {
    this.element
    this.word = word
    this.img = img
    this.type = type
    this.color = color
    this.flipped = false
  }
  display () {
    let card = document.createElement('div')
    card.className = 'card'
    card.style.width = innerWidth*.22+'px'
    card.style.height = innerWidth*.22+'px'
    let front = document.createElement('figure')
    front.className = 'front'
    card.appendChild(front)
    let back = document.createElement('figure')
    back.className = 'back'
    card.appendChild(back)
    let image = document.createElement('img')
    image.src = 'assets/'+this.img+'.jpg'
    back.appendChild(image)
    card.addEventListener('touchend', onTouch.bind(card))
    wrapper.appendChild(card)
  }
}

const shuffleArray = arr => (
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
)

fullDeck.push(new Card('Banana', 'banana', 0, 0))
fullDeck.push(new Card('Milho', 'milho', 0, 0))
fullDeck.push(new Card('Maracuja', 'maracuja', 0, 0))
fullDeck.push(new Card('Maçã', 'maca', 0, 1))
fullDeck.push(new Card('Morango', 'morango', 0, 1))
fullDeck.push(new Card('Pitanga', 'pitanga', 0, 1))
fullDeck.push(new Card('Melancia', 'melancia', 0, 2))
fullDeck.push(new Card('Pera', 'pera', 0, 2))
fullDeck.push(new Card('Limão', 'limao', 0, 2))
fullDeck.push(new Card('Cenoura', 'cenoura', 0, 3))
fullDeck.push(new Card('Laranja', 'laranja', 0, 3))
fullDeck.push(new Card('Abobora', 'abobora', 0, 3))

fullDeck = shuffleArray(fullDeck)

while(fullDeck.length > 10) {
  fullDeck.pop()
}

deck = shuffleArray(fullDeck.concat(fullDeck))

const DOMReady = (event) => {
  pointSound = new Audio('assets/point.wav')
  badSound = new Audio('assets/bad.mp3')
  winSound = new Audio('assets/win.wav')
  music = new Audio('assets/music.mp3')
  music.volume = 0.15
  music.play()
  innerWidth = window.innerWidth
  wrapper = document.getElementById('wrapper')
  wrapper.style.width = innerWidth+'px'
  deck.forEach((element) => {
    element.display()
  })
}

document.addEventListener("DOMContentLoaded", DOMReady)
