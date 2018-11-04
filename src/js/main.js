import React from 'react';
import ReactDOM from 'react-dom';
var parser = require('ingredients-parser');

var getIngredients = () => {
  let ingrArr = [];
  let temp = document.getElementsByClassName("recipe-ingred_txt");
  for (let i=0; i< temp.length; i++) {
    if (temp[i].getAttribute("itemprop") === "recipeIngredient") {
      ingrArr.push(temp[i].textContent);
    }
  }
  return ingrArr;
}

var stringToNum = (string) => {
  return string.split(' ').reduce((accum, ele)=>{
    return accum + eval(ele);
  }, 0)
}

var ingredParser = (ingrArr) => {
  let ingrObj = [];
  ingrArr.forEach((ele)=>{
    let tempObj = parser.parse(ele);
    if (tempObj.amount) {
      tempObj.amount = stringToNum(tempObj.amount);
    } else {
      tempObj.amount = 0;
    }
    ingrObj.push(tempObj);
  })
  return ingrObj;
}

var scrapeIngredients = () => {
  let ingrArr = getIngredients();
  let result = ingredParser(ingrArr);
  console.log('RESULT', result);
  return result;
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if(request.getList) {
    // Inject our app to DOM and send response
    let result = scrapeIngredients();
    response({
      ingredArr: result
    });
  }
});
