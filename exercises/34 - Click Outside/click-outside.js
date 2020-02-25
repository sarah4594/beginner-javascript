/* eslint-disable prettier/prettier */
const cardButtons = document.querySelectorAll('.card button')
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

function handleCardButtonClick(event) {
  const button = event.currentTarget
  // like querySelectorAll but the closest
  const card = button.closest('.card')
  showCard(card)
  // show modal
  overlay.classList.add('open')
}

const preload = new Image()
function showCard(card) {
  const imgSrc = card.querySelector('img').src
  const { id, description } = card.dataset
  const name = card.querySelector('h2').textContent
  // populate modal with info
  modal.dataset.id = id
  preload.src = imgSrc.replace('200', '600')
  modal.innerHTML = `<div class="placeholder"></div>
    <p>${description}</p>`

  preload.onload = () => {
    modal.innerHTML = `<img src="${preload.src}" alt="${name}">
    <p>${description}</p>`
  }
}

function closeModal() {
  overlay.classList.remove('open')
}

overlay.addEventListener('click', function(event) {
  const isOutside = !event.target.closest('.modal')
  if (isOutside) {
    closeModal()
  }
})

function getCard(offset) {
  let current = parseInt(modal.dataset.id)
  if (current + offset < 0) current = cards.length
  const id = (current + offset) % cards.length
  return document.querySelector(`.card[data-id="${id}"]`)
}

window.addEventListener('keyup', event => {
  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft': {
      const prev = getCard(-1)
      showCard(prev)
      break
    }
    case 'ArrowRight': {
      const next = getCard(+1)
      showCard(next)
      break
    }
    default:
      break
  }
})

cardButtons.forEach(button => {
  button.addEventListener('click', handleCardButtonClick)
})
