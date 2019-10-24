let elements = document.getElementsByTagName('randq');

for (let app of elements) {

  const container = document.createElement('div')
  container.setAttribute('class', 'container')

  app.appendChild(container)

  var request = new XMLHttpRequest()
  request.open('GET', 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/random', true)
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      data.forEach(jq => {

        const qcard = document.createElement('div')
        qcard.setAttribute('class', 'qcard')

        const h4 = document.createElement('h4')
        h4.textContent = jq.question

        const p = document.createElement('p')
        p.textContent = jq.answer

        container.appendChild(qcard)
        qcard.appendChild(h4)
        qcard.appendChild(p)
      })
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }

  request.send()
}

