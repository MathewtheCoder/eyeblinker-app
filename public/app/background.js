const blinkerSettings = {
  durationTime: 20, // Minutes
  showBlinker: true
};
let timer;
// console.log(new Date());

chrome.idle.setDetectionInterval(15);

setInterval(() => {
  // console.log(new Date(), blinkerSettings);
}, 60000);

const options = {
  type: 'basic',
  title: 'It is a time to blink',
  message: 'Give your eyes a break and reduce your eye strain',
  priority: 1,
  iconUrl: 'icons/icon.png',
  eventTime: 20000
};

function sendNotification() {
  chrome.notifications.create(`eye-blinker-${new Date()}`, options, () => {
    if (chrome.runtime.lastError) {
      // console.log('Notification sent error:', chrome.runtime.lastError);
    } else {
      // console.log('Notification Sent :', id);
    }
  });
}

function initializeTimer(duration) {
  if (blinkerSettings.showBlinker) {
    // console.log(
    //   `notification will sent after ${duration} minutes `,
    //   new Date()
    // );
  }

  if (timer) clearTimeout(timer);

  timer = setInterval(() => {
    // console.log(
    //   `Message will sent only if Show blinker =`,
    //   blinkerSettings.showBlinker
    // );
    if (blinkerSettings.showBlinker) {
      sendNotification();
    }
  }, duration * 60 * 1000);
}
// Update badge
function setBadge() {
  if (!blinkerSettings.showBlinker) {
    chrome.browserAction.setBadgeText({ text: 'off' });

    chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
  } else {
    chrome.browserAction.setBadgeText({ text: '' });
  }
}
chrome.runtime.onMessage.addListener(request => {
  // console.log('Message Received -->', request);
  if (request.durationTime) {
    blinkerSettings.durationTime = request.durationTime;
    blinkerSettings.showBlinker = blinkerSettings.showBlinker;
    initializeTimer(blinkerSettings.durationTime);
    chrome.storage.sync.set(blinkerSettings, () => {});
    // chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
    //   console.log('chrome.storage.sync.set', items);
    // });
  }
  // eslint-disable-next-line
  if (request.hasOwnProperty('showBlinker')) {
    blinkerSettings.showBlinker = request.showBlinker;
    blinkerSettings.durationTime = blinkerSettings.durationTime;
    initializeTimer(blinkerSettings.durationTime);
    setBadge();
    chrome.storage.sync.set(blinkerSettings, () => {});

    // chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
    //   console.log('chrome.storage.sync.set', items);
    // });
  }
});

let systemLocked = false;
// eslint-disable-next-line
chrome.idle.onStateChanged.addListener(state => {
  // console.log('state', state);

  if (state === 'locked') {
    clearTimeout(timer);
    systemLocked = true;
  }
  if (state === 'active' && systemLocked) {
    // console.log('Chrome Status', state);

    initializeTimer(blinkerSettings.durationTime);
    systemLocked = !systemLocked;
  }
});

// Initialize the eye-blinker settings

chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
  // console.log('blinkerSettings', items);
  if (items.durationTime) {
    blinkerSettings.durationTime = items.durationTime;
    blinkerSettings.showBlinker = items.showBlinker;
  } else {
    chrome.storage.sync.set(blinkerSettings, () => {});
  }
  initializeTimer(blinkerSettings.durationTime);
  setBadge();

  // chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
  //   console.log('Blinker  Settings initial', items);
  // });
});
