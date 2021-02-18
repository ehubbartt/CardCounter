(function () {
  window.addEventListener('load', init);

  function init() {
    getCardInfo();
  }

  async function getCardInfo() {
    try {
      let info = localStorage.getItem('CardInfo');
      if (info === null) {
        let resp = await fetch('CardInfo.json');
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
    showSelected(info);
    selectOptions(info);
    let selectCards = qsa('.nameOfCard');
    for (let i = 0; i < selectCards.length; i++) {
      selectCards[i].addEventListener('click', function (e) {
        e.preventDefault();
        selectACard(info, this);
      });
    }
    let numDecks = qsa('.numOfDecks');
    for (let i = 0; i < numDecks.length; i++) {
      numDecks[i].addEventListener('click', function (e) {
        e.preventDefault();
        select(info, this);
      });
    }
  }

  function showSelected(info) {
    let cards = qsa('.nameOfCard');
    let cardName;
    for (let i = 0; i < cards.length; i++) {
      cardName = cards[i].textContent;
      if (info[cardName].isSelected === true) {
        cards[i].classList.toggle('selected');
      }
    }
  }

  function select(info, card) {
    let allOptions = qsa(".numOfDecks");
    for (let i = 0; i < allOptions.length; i++) {
      allOptions[i].classList.remove('selected');
    }
    card.classList.toggle('selected');
    let numDecks = card.textContent;
    info.numDecks = numDecks;
    localStorage.setItem('CardInfo', JSON.stringify(info));
  }

  function selectOptions(info) {
    let options = qsa('.numOfDecks');
    for (let i = 0; i < options.length; i++) {
      if (info.numDecks === options[i].textContent) {
        options[i].classList.toggle('selected');
      }
    }
  }

  function selectACard(info, card) {
    card.classList.toggle('selected');
    let cardName = card.textContent;
    if (card.classList.contains('selected')) {
      info[cardName].isSelected = true;
    } else {
      info[cardName].isSelected = false;
    }
    localStorage.setItem('CardInfo', JSON.stringify(info));
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