(function() {
  window.addEventListener('load', init);
  let NUM_OF_CARD_TYPE = 4;
  let NUM_JOKER = 2;
   
  function init() {
    getCardInfo();
  }

  function showSelected(info) {
    let allCards = qsa('.button');
    let cardName;
    for(let i = 0; i < allCards.length; i++) {
        cardName = allCards[i].querySelector('img').alt;
        if(info[cardName].isSelected === true) {
          allCards[i].classList.remove('hidden');
        }
    }
  }

  function removeCard(info, card) {
    let cardName = card.querySelector('img').alt;
    if (info[cardName].numLeft !== 0){
    info[cardName].numLeft -= 1;
    }
    if(info[cardName].numLeft > 0) {
      card.querySelector('h3').textContent = "Number Left: " + info[cardName].numLeft;
    } else {
      card.querySelector('h3').textContent = "No more Left!";
    }
    localStorage.setItem('CardInfo', JSON.stringify(info));
  }

  function restartGame(info) {
    localStorage.clear();
    let cards = qsa(".button");
    let cardName;
    for (let i = 0; i < cards.length; i++) {
      cardName = cards[i].querySelector('img').alt;
      if (cardName === 'Joker') {
        info[cardName].numLeft = NUM_JOKER;
        cards[i].querySelector('h3').textContent = "Number Left: " + NUM_JOKER;
      } else {
        info[cardName].numLeft = NUM_OF_CARD_TYPE;
        cards[i].querySelector('h3').textContent = "Number Left: " + NUM_OF_CARD_TYPE;
      }
    }
    localStorage.setItem('CardInfo', JSON.stringify(info));
  }

  async function getCardInfo() {
    try {
      let info = localStorage.getItem('CardInfo');
      if (info === null) {
        let resp = await fetch('CardInfo');
        checkStatus(resp);
        info = await resp.json();
      } else { 
        info = JSON.parse(info);
      }
      changeInfo(info);
    } catch (error) {
      console.error(error);
    }
  }

  function changeInfo(info) {
    NUM_OF_CARD_TYPE *= info.numDecks;
    NUM_JOKER *= info.numDecks;
    loadGame(info);
    showSelected(info);
    let buttons = qsa('.button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        removeCard(info, this);
      });
    }
    id("restartGame").addEventListener('click', function (e) {
      e.preventDefault();
      restartGame(info);
    });
  }

  function loadGame(info) {
    let cards = qsa(".button");
    let cardName;
    for (let i = 0; i < cards.length; i++) {
      cardName = cards[i].querySelector('img').alt;
      if (info[cardName].numLeft > 0) {
        cards[i].querySelector('h3').textContent = "Number Left: " + info[cardName].numLeft;
      } else {
        cards[i].querySelector('h3').textContent = "No more Left!";
      }
      }
    }

  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error('Error in request: ' + response.statusText);
    }
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id (null if none).
 */
  function id(idName) {
    return document.getElementById(idName);
  }
})();