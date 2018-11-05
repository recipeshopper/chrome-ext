// var parser = require('ingredients-parser');

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
    // return ingrObj;
    return ingrArr;
  }

  var scrapeIngredients = () => {
    let ingrArr = getIngredients();
    let result = ingredParser(ingrArr);
    return result;
  }

  window.onload = () => {
    const $startButton = document.querySelector('.start');

    $startButton.onclick = () => {
      // Get active tab
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, (tabs) => {
        // Send message to script file
        chrome.tabs.sendMessage(
          tabs[0].id,
          { getList: true },
          (response) => {
            console.log('Ingredients Array', response);
            response.ingredArr.forEach((ele)=>{
              $(".list").append(`<li>${ele.ingredient}</li>`)
              }
            )
          }
        );
      });
    };
  }
;