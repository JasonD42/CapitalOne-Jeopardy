function getQuestion(category, sDate, eDate, diff) {
    var qtable = document.getElementById('resultTable');
    qtable.empty();

    var params = "?"
    var needAnd = false
    if (category != "") {
        params = params + "category=" + (categories.indexOf(category)+1)
        needAnd = true
    }
    if (sDate != "" && eDate != "") {
        if (needAnd) {
            params = params + "&"
        }
        params = params + "min_date=" + sDate + "&max_date=" + eDate
        needAnd = true
    }
    if (diff != "") {
        if (needAnd) {
            params = params + "&"
        }
        params = params + "value=" + diff
        needAnd = true
    }

  
    var request = new XMLHttpRequest()
    // cors https://cors-anywhere.herokuapp.com/
    var requestURL = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues" + params
    request.open('GET',  requestURL, true)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
      // Begin accessing JSON data here     
      var data = JSON.parse(this.response)
      console.log(request.status)
      if (request.status >= 200 && request.status < 400) {
        data.forEach(jq => {
          
          const tableRow = document.createElement('tr')
          qtable.appendChild(tableRow)  
  
          const cat = document.createElement('td')
          cat.innerHTML = jq.category["title"]
  
          const question = document.createElement('td')
          question.innerHTML = jq.question
  
          const answer = document.createElement('td')
          answer.innerHTML = jq.answer

          const difficulty = document.createElement('td')
          difficulty.innerHTML = jq.value
  
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

    getQuestion(category, sDate, eDate, diff);
    
}