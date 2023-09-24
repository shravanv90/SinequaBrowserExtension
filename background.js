chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "textSelected") {
    // Store the selected text in local storage.
    chrome.storage.local.set({ selectedText: message.text }, function () {
      // Create a notification to let the user know they can click on the extension icon to view more details.
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png", // Assuming you have an icon.png file
        title: "Your Extension",
        message:
          "Text selected. Click the extension icon to view more details.",
      });
    });
  }
});
