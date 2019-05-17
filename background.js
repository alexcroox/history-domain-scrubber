let clearing = false

// Listen for our extension icon to be clicked then open options page
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.runtime.openOptionsPage()
})

function clearHistory() {
  if (clearing) {
    return
  }

  clearing = true

  let domains = []

  chrome.storage.sync.get({ domains: [] }, options => {
    domains = options.domains

    // Loop through each banned domain and delete all history entries for it
    domains.forEach(function(domain) {
      chrome.history.search(
        {
          text: domain
        },
        historyItems => {
          historyItems.forEach(historyItem => {
            chrome.history.deleteUrl({
              url: historyItem.url
            })
          })
        }
      )
    })

    clearing = false
  })
}

chrome.alarms.create('checkNewTasks', {
  periodInMinutes: 1
})

chrome.alarms.onAlarm.addListener(clearHistory)

clearHistory()
