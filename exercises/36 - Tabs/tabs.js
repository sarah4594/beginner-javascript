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

tabButtons.forEach(button => button.addEventListener('click', handleTabClick))
