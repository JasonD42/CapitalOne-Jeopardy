function makeBoard(id_tag) {
    var board = document.getElementById(id_tag);
    board.innerHTML = ""

    // Create a deck for holding the board cards
    const deck = document.createElement('div')
    deck.setAttribute('class', 'card-deck')
    board.appendChild(deck)
  
    var request = new XMLHttpRequest()
    // cors https://cors-anywhere.herokuapp.com/
    var requestURL = 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?min_date=2007-03-05&max_date=2007-03-05'
    request.open('GET', requestURL, true)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      console.log(request.status)
      if (request.status >= 200 && request.status < 400) {
        var numCategories = 6
        // Setup the 6 category header cards
        for (var i = 0; i < numCategories; i++) {
            var jq = data[i];
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            deck.appendChild(card)
            const cardBody = document.createElement('div')
            cardBody.setAttribute('class', 'card-body')
            card.appendChild(cardBody)

            const cardTitle = document.createElement('h2')
            cardTitle.setAttribute('class', 'card-title')
            cardTitle.innerHTML = jq.category["title"]

            cardBody.appendChild(cardTitle)
        }
      } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        board.appendChild(errorMessage)
      }
    }
    request.send()
  }

  makeBoard('jBoard');