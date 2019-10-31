function makeBoard(id_tag) {
    var board = document.getElementById(id_tag);
    board.innerHTML = ""
  
    var request = new XMLHttpRequest()
    // cors https://cors-anywhere.herokuapp.com/
    var requestURL = 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?min_date=2008-03-05&max_date=2008-03-05'
    request.open('GET', requestURL, true)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      console.log(request.status)
      if (request.status >= 200 && request.status < 400) {
        var numCategories = 6
        // Create a deck for holding the board cards
        const deck = document.createElement('div')
        deck.setAttribute('class', 'card-deck')
        board.appendChild(deck)
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
        var qNum = 0
        // Create the flipping question cards
        data.forEach(jq => {
          if (qNum++ % numCategories == 0) {
            // Create a deck for holding the board cards
            var qDeck = document.createElement('div')
            qDeck.setAttribute('class', 'card-deck')
            board.appendChild(qDeck)
            var jq = data[i]
          }
          // Make flipping card
          const flipInner = document.createElement('div')
          flipInner.setAttribute('class', 'card-inner')
          qDeck.appendChild(flipInner)
          const card = document.createElement('div')
          card.setAttribute('class', 'card')
          flipInner.appendChild(card)
          
          // Make front of card
          const cardFront = document.createElement('div')
          cardFront.setAttribute('class', 'card-front')
          card.appendChild(cardFront)
          const cardBody = document.createElement('div')
          cardBody.setAttribute('class', 'card-body')
          cardFront.appendChild(cardBody)
          const cardTitle = document.createElement('h2')
          cardTitle.setAttribute('class', 'card-title')
          // Put card's value on the front
          cardTitle.innerHTML = "$" + jq.value
          cardBody.appendChild(cardTitle)

          // Make back of card
          const cardBack = document.createElement('div')
          cardBack.setAttribute('class', 'card-back')
          card.appendChild(cardBack)
          const bCardBody = document.createElement('div')
          bCardBody.setAttribute('class', 'card-body')
          cardBack.appendChild(bCardBody)
          const bCardTitle = document.createElement('h2')
          bCardTitle.setAttribute('class', 'card-title')
          // Put card's question and answer (hidden)
          bCardTitle.innerHTML = jq.question
          bCardBody.appendChild(bCardTitle)
        });

      } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        board.appendChild(errorMessage)
      }
    }
    request.send()
  }

  makeBoard('jBoard');