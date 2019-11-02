function getRandom(id_tag) {
  var app = document.getElementById(id_tag);
  app.innerHTML = ""

  const container = document.createElement('div')
  container.setAttribute('class', 'container')

  app.appendChild(container)

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

        const qcard = document.createElement('div')
        qcard.setAttribute('class', 'qcard')

        const h3 = document.createElement('h3')
        h3.textContent = jq.question

        const h6 = document.createElement('h6')
        h6.textContent = jq.answer

        container.appendChild(qcard)
        qcard.appendChild(h3)
        qcard.appendChild(h6)
      })
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }
  request.send()

  var audio = document.getElementById('think-music');
  audio.play();
}