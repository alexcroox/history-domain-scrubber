var clearing = false;

// Listen for our extension icon to be clicked then open options page
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.runtime.openOptionsPage();
});

function clearHistory() {
    if (clearing)
        return;

    clearing = true;

    var domains = [];

    chrome.storage.sync.get({ "domains": [] }, function(options) {
        domains = options.domains;

        domains.forEach(function(domain) {
            chrome.history.search({
                "text": domain
            }, function(historyItems) {
                historyItems.forEach(function(historyItem) {
                    console.log(historyItem.url);
                    chrome.history.deleteUrl({
                        url: historyItem.url
                    })
                });
            })
        });

        clearing = false;
    });
}

chrome.alarms.create('checkNewTasks', {
    periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(clearHistory);

clearHistory();
