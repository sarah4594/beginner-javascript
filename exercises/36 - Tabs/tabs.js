const tabs = document.querySelector('.tabs')
const tabButtons = tabs.querySelectorAll('[role="tab"]')
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'))

function handleTabClick(event) {
  // hide all tab paenls
  tabPanels.forEach(panel => (panel.hidden = true))
  // mark all other tabs as unselected
  // for aria - use setAttribute
  // tabButtons.forEach(tab => (tab.ariaSelected = false))
  tabButtons.forEach(tab => tab.setAttribute('aria-selected', false))
  // mark clikced tab as selected
  event.currentTarget.setAttribute('aria-selected', true)
  // find associated tab panel and show it
  const { id } = event.currentTarget

  /* METHOD 1
  const tabPanel = tabs.querySelector(`[aria-labelledby=${id}]`)
  tabPanel.hidden = false
}
*/

  // Method 2 - find in array of tab panels
  // can't do find right now - tabPanels is a nodeList
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id,
  )
  tabPanel.hidden = false
}

function handleTabKey(event) {
  if (event.keyCode !== 9) return
  const offset = event.shiftKey ? -1 : 1
  const currentButton = Array.from(tabButtons).filter(
    button => button.getAttribute('aria-selected') === 'true',
  )
  const index = Array.from(tabButtons).indexOf(currentButton[0])
  console.log(index)
  const nextIndex = (index + tabButtons.length + offset) % tabButtons.length
  const nextButton = tabButtons[nextIndex]
  console.log(nextIndex)
  nextButton.click()
  nextButton.focus()
  event.preventDefault()
  event.stopPropagation()
}
tabButtons[0].focus()
tabButtons.forEach(button => button.addEventListener('click', handleTabClick))
tabButtons.forEach(button => button.addEventListener('keydown', handleTabKey))
