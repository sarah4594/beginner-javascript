const terms = document.querySelector('.terms-and-conditions')
const watch = document.querySelector('.watch')
const button = document.querySelector('.accept')

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  // when it's 100% on page
  threshold: 1,
})

function obCallback(payload) {
  console.log(payload[0])
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false
    // stop observing
    ob.unobserve(terms.lastElementChild)
  }
  // good for pictures and stuff
  // else {
  //   button.disabled = true
  // }
}

// observing last paragraph
ob.observe(terms.lastElementChild)
