// const blinkerSettings = {
//   time: 20000
// };
// chrome.storage.sync.set({ yourBody: 'myBody' }, function() {
// });
// chrome.storage.sync.get(['yourBody'], function(items) {
//   console.log('Data', items);
// });
const options = {
  type: 'list',
  title: 'It is a time to blink',
  message: 'Give your eyes a break and reduce your eye strain',
  priority: 1,
  items: [
    {
      title: 'It is a time to blink',
      message: 'Give your eyes a break and reduce your eye strain'
    }
  ],
  iconUrl: 'icon.png'
};

function sendNotification() {
  // eslint-disable-next-line
  chrome.notifications.create('alert' + new Date(), options, function(id) {
    // eslint-disable-next-line
    console.log('Last error:', id, chrome.runtime.lastError);
  });
}

// eslint-disable-next-line
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  setTimeout(() => {
    sendNotification();
  }, request.time);
});
