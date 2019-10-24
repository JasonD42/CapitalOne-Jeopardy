const app = document.getElementById('qfinder')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/random', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(jq => {
      console.log(jq.id)

      const qcard = document.createElement('div')
      qcard.setAttribute('class', 'qcard')

      const h1 = document.createElement('h1')
      h1.textContent = jq.question

      const p = document.createElement('p')
      p.textContent = jq.answer

      container.appendChild(qcard)
      qcard.appendChild(h1)
      qcard.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
