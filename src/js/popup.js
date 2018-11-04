window.onload = () => {
  const $startButton = document.querySelector('.start');

  $startButton.onclick = () => {
    // Get active tab
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      console.log('TABS', tabs[0].url);
      console.log('TABS', tabs);
      // Send message to script file
      chrome.tabs.sendMessage(
        tabs[0].id,
        { injectApp: true },
        // response => window.close()
      );
    });
  };
}