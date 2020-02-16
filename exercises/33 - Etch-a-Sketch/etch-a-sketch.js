/* eslint-disable prettier/prettier */

// Select elements on page (canvas, shake button)

const canvas = document.querySelector('#etch-a-sketch')
const ctx = canvas.getContext('2d')
const shakeButton = document.querySelector('.shake')
const MOVE_AMOUNT = 50

// Setup up canvas for drawing

// to get smooth drawing
const { width, height } = canvas
// create randow x, y starting points
let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)

ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = MOVE_AMOUNT

// change color
let hue = 0
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

ctx.beginPath() // start the drawing
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.stroke()

// write a draw function

function draw({ key }) {
  console.log(key)
  ctx.beginPath()
  ctx.moveTo(x, y)
  // move based on input
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT
      break
    case 'ArrowDown':
      y += MOVE_AMOUNT
      break
    case 'ArrowRight':
      x += MOVE_AMOUNT
      break
    case 'ArrowLeft':
      x -= MOVE_AMOUNT
      break
    default:
      break
  }
  ctx.lineTo(x, y)
  ctx.stroke()
  hue += 10
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
}

// write handler for keys

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault()
    draw({ key: e.key })
  }
}

// write clear/shake button

function clearCanvas() {
  canvas.classList.add('shake')
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath() // start the drawing
  ctx.moveTo(x, y)
  ctx.lineTo(x, y)
  ctx.stroke()
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('Done the shake!')
      canvas.classList.remove('shake')
    },
    { once: true },
  )
}

// listen for arrow skeys
window.addEventListener('keydown', handleKey)
shakeButton.addEventListener('click', clearCanvas)
