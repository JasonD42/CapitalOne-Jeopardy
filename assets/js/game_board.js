function addQ(board, qToAdd, id, first, value) {
  if (first) {
    const cDeck = document.createElement('div')
    cDeck.setAttribute('class', 'card-deck')
    cDeck.setAttribute('id', id)
    board.appendChild(cDeck)
  }
  var qDeck = document.getElementById(id);

  // Make flipping card
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
  qDeck.appendChild(card)
  const flipInner = document.createElement('div')
  flipInner.setAttribute('class', 'card-inner')
  card.appendChild(flipInner)

  // Make front of card
  const cardFront = document.createElement('div')
  cardFront.setAttribute('class', 'card-front')
  flipInner.appendChild(cardFront)
  const cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body')
  cardFront.appendChild(cardBody)
  const cardTitle = document.createElement('h2')
  cardTitle.setAttribute('class', 'card-title')
  // Put card's value on the front
  cardTitle.innerHTML = "$" + value
  cardBody.appendChild(cardTitle)

  // Make back of card
  const cardBack = document.createElement('div')
  cardBack.setAttribute('class', 'card-back')
  flipInner.appendChild(cardBack)
  const bCardBody = document.createElement('div')
  bCardBody.setAttribute('class', 'card-body')
  cardBack.appendChild(bCardBody)
  const bCardTitle = document.createElement('h2')
  bCardTitle.setAttribute('class', 'card-title')
  // Put card's question and answer (hidden)
  bCardTitle.innerHTML = qToAdd.question
  bCardBody.appendChild(bCardTitle)

  const bCardAns = document.createElement('h5')
  const bCardAnsCover = document.createElement('mark')
  bCardAnsCover.innerHTML = qToAdd.answer
  bCardAns.appendChild(bCardAnsCover)
  bCardBody.appendChild(bCardAns)
}

function getCat(board, cDeck, catID, first) {
  //var retData = [];

  var request = new XMLHttpRequest()
  // cors https://cors-anywhere.herokuapp.com/
  var requestURL = 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?category=' + catID
  request.open('GET', requestURL, true)
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    console.log(request.status)
    if (request.status >= 200 && request.status < 400) {
      //numCategories++

      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      cDeck.appendChild(card)
      const catCard = document.createElement('div')
      catCard.setAttribute('class', 'cat-card')
      card.appendChild(catCard)
      const cardBody = document.createElement('div')
      cardBody.setAttribute('class', 'card-body')
      catCard.appendChild(cardBody)

      const cardTitle = document.createElement('h2')
      cardTitle.setAttribute('class', 'card-title')
      cardTitle.innerHTML = data[0].category["title"]

      cardBody.appendChild(cardTitle)

      // Save 1 question of each difficulty
      for (var j = 0; j < 5; j++) {
        var question = data[j];
        //console.log(data[j])
        console.log(question)
        addQ(board, question, (catID + j), first, (j+1)*200);
      }

    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      board.appendChild(errorMessage)
    }
  }
  request.send()
  //console.log(retData)
  //return retData;
}

function makeBoard(id_tag) {
  var board = document.getElementById(id_tag);
  board.innerHTML = ""

  // Create a deck for holding the board category cards
  const cDeck = document.createElement('div')
  cDeck.setAttribute('class', 'card-deck')
  board.appendChild(cDeck)

  // Setting up list/categories of the questions
  //var allData = [];
  //var numCategories = 6;
  var first = true;
  for (var i = 0; i < 6; i++) {
    var catID = (Math.floor(Math.random() * 18419) + 1);
    getCat(board, cDeck, catID, first);
    first = false;
  }
  /*
  // We have all 30 questions, now just have to organize them by difficulty
  var qNum = 0
  var qDeck = document.createElement('div')
  // Create the flipping question cards
  allData.forEach(jq => {
    if (qNum != 0 && qNum % numCategories == 0) {
      // Create a deck for holding the board cards
      qDeck = document.createElement('div')
      qDeck.setAttribute('class', 'card-deck')
      board.appendChild(qDeck)
    }
    // Make flipping card
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    qDeck.appendChild(card)
    const flipInner = document.createElement('div')
    flipInner.setAttribute('class', 'card-inner')
    card.appendChild(flipInner)

    // Make front of card
    const cardFront = document.createElement('div')
    cardFront.setAttribute('class', 'card-front')
    flipInner.appendChild(cardFront)
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')
    cardFront.appendChild(cardBody)
    const cardTitle = document.createElement('h2')
    cardTitle.setAttribute('class', 'card-title')
    // Put card's value on the front
    cardTitle.innerHTML = "$" + (Math.floor((qNum / 6) + 1) * 200)
    cardBody.appendChild(cardTitle)

    // Make back of card
    const cardBack = document.createElement('div')
    cardBack.setAttribute('class', 'card-back')
    flipInner.appendChild(cardBack)
    const bCardBody = document.createElement('div')
    bCardBody.setAttribute('class', 'card-body')
    cardBack.appendChild(bCardBody)
    const bCardTitle = document.createElement('h2')
    bCardTitle.setAttribute('class', 'card-title')
    // Put card's question and answer (hidden)
    bCardTitle.innerHTML = jq.question
    bCardBody.appendChild(bCardTitle)

    const bCardAns = document.createElement('h5')
    const bCardAnsCover = document.createElement('mark')
    bCardAnsCover.innerHTML = jq.answer
    bCardAns.appendChild(bCardAnsCover)
    bCardBody.appendChild(bCardAns)

    qNum++
  });
  */
}

makeBoard('jBoard');