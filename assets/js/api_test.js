const app = document.getElementById('qfinder')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://jservice.io/api/random', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(question => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = question.question

      const p = document.createElement('p')
      p.textContent = question.answer

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
