function getQuestion(category, sDate, eDate, diff) {
    var qtable = document.getElementById('resultTable');
  
    const tableRow = document.createElement('tr')
  
    qtable.appendChild(tableRow)
  
    var request = new XMLHttpRequest()
    // cors https://cors-anywhere.herokuapp.com/
    request.open('GET', 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/random', true)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      console.log(request.status)
      if (request.status >= 200 && request.status < 400) {
        data.forEach(jq => {
  
          const cat = document.createElement('td')
          cat.innerHTML = jq.category
  
          const question = document.createElement('td')
          question.innerHTML = jq.question
  
          const answer = document.createElement('td')
          answer.innerHTML = jq.answer

          const difficulty = document.createElement('td')
          difficulty.innerHTML = jq.difficulty
  
          tableRow.appendChild(cat)
          tableRow.appendChild(question)
          tableRow.appendChild(answer)
          tableRow.appendChild(difficulty)
        })
      } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        qtable.appendChild(errorMessage)
      }
    }
    request.send()
  }

function searchQuestions() {
    var category = document.getElementById('categoryInput').value;
    var sDate = document.getElementById('startDateInput').value;
    var eDate = document.getElementById('endDateInput').value;
    var diff = document.getElementById('difficultyInput').value;

    for (var i = 0; i < 5; i++) {
        getQuestion(category, sDate, eDate, diff);
    }
    
}