const blinkerSettings = {
  durationTime: 10,
  showBlinker: true
};
let timer;
console.log(new Date());

// function onGot(newState) {
//   if (newState === 'idle') {
//     console.log('Please come back — we miss you!');
//   } else if (newState === 'active') {
//     console.log('Glad to still have you with us!');
//   }
// }
// // eslint-disable-next-line
// chrome.idle.queryState(15, onGot);
// querying.then(onGot);

// eslint-disable-next-line
chrome.idle.setDetectionInterval(15);

// eslint-disable-next-line
chrome.storage.sync.get(['durationTime', 'showBlinker'], function(items) {
  console.log('blinkerSettings', items);
  if (items.durationTime) {
    blinkerSettings.durationTime = items.durationTime;
    blinkerSettings.showBlinker = items.showBlinker;
  } else {
    // eslint-disable-next-line
    chrome.storage.sync.set(blinkerSettings, function() {});
  }
  // eslint-disable-next-line
  chrome.storage.sync.get(['durationTime', 'showBlinker'], function(items) {
    console.log('Blinker  Settings initial', items);
  });
});
setInterval(() => {
  console.log(new Date());
}, 60000);

const options = {
  type: 'basic',
  title: 'It is a time to blink',
  message: 'Give your eyes a break and reduce your eye strain',
  priority: 1,
  iconUrl: 'icon.png'
};

function sendNotification() {
  // eslint-disable-next-line
  chrome.notifications.create('eye-blinker-' + new Date(), options, function(
    id
  ) {
    // eslint-disable-next-line
    if (chrome.runtime.lastError) {
      // eslint-disable-next-line
      console.log('Notification sent error:', chrome.runtime.lastError);
    } else {
      console.log('Notification Sent :', id);
    }
  });
}

function initializeTimer(duration) {
  if (blinkerSettings.showBlinker)
    console.log(
      `notification will sent after ${duration} minutes `,
      new Date()
    );
  if (timer) clearTimeout(timer);

  timer = setInterval(() => {
    console.log(
      `Message will send only if Show blinker =`,
      blinkerSettings.showBlinker
    );
    if (blinkerSettings.showBlinker) {
      sendNotification();
    }
  }, duration * 60 * 1000);
}

// eslint-disable-next-line
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message Received -->', request);
  if (request.durationTime) {
    blinkerSettings.durationTime = request.durationTime;
    blinkerSettings.showBlinker = blinkerSettings.showBlinker;
    initializeTimer(blinkerSettings.durationTime);
    // eslint-disable-next-line
    chrome.storage.sync.set(blinkerSettings, function() {});
    // eslint-disable-next-line
    chrome.storage.sync.get(['durationTime', 'showBlinker'], function(items) {
      console.log('chrome.storage.sync.set', items);
    });
  }
  // eslint-disable-next-line
  if (request.hasOwnProperty('showBlinker')) {
    blinkerSettings.showBlinker = request.showBlinker;
    blinkerSettings.durationTime = blinkerSettings.durationTime;
    initializeTimer(blinkerSettings.durationTime);
    // eslint-disable-next-line
    chrome.storage.sync.set(blinkerSettings, function() {});
    // eslint-disable-next-line
    chrome.storage.sync.get(['durationTime', 'showBlinker'], function(items) {
      console.log('chrome.storage.sync.set', items);
    });
  }
});

initializeTimer(blinkerSettings.durationTime);
let systemLocked = false;
// eslint-disable-next-line
chrome.idle.onStateChanged.addListener(function(state) {
  console.log('state', state);

  if (state === 'locked') {
    clearTimeout(timer);
    systemLocked = true;
  }
  if (state === 'active' && systemLocked) {
    console.log('Chrome Status', state);

    initializeTimer(blinkerSettings.durationTime);
    systemLocked = !systemLocked;
  }
});
