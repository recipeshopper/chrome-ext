import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
  render() {
    return (
      <div> 
        RECIPE ADDED! 
        <Button />
      </div>
    )
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if(request.injectApp) {
    // Inject our app to DOM and send response
    injectApp();
    response({
      body: document.all[0].outerHTML,
    });
  }
});

function injectApp() {
  console.log(document.all[0].outerHTML);
  window.alert('RECIPE ADDED!');
  // const newDiv = document.createElement("div");
  // newDiv.setAttribute("id", "chromeExtensionReactApp");
  // document.body.appendChild(newDiv);
  // ReactDOM.render(<App />, newDiv);
}