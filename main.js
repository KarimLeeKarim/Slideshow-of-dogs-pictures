async function start() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    createBreedList(data.message)
}

start()

function createBreedList(porodasiyahisi) {
    document.getElementById('breed').innerHTML = `
    <select onchange="loadbyBreed(this.value);">
        <option> Choose a dog breed </option>
        ${Object.keys(porodasiyahisi).map(function (porodi) {
        return `<option>${porodi}</option>`
    }).join('')}
    </select>
    `
}

async function loadbyBreed(porodalar) {
    if (breed != "Choose a dog breed ") {
        const response = await fetch(`https://dog.ceo/api/breed/${porodalar}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(pictures) {
    let currentPosition = 0
    document.querySelector('.slideshow').innerHTML = `
    <div class="slide" style="background-image: url('${pictures[0]}')"></div>
    <div class="slide" style="background-image: url('${pictures[1]}')"></div>
    `
    currentPosition += 2
    setInterval(nextSlide, 3000)

    function nextSlide() {
        document.querySelector(".slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${pictures[currentPosition]}')"></div>`)
        setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= pictures.length) {
            currentPosition = 0
          } else {
            currentPosition++
          }
    }
}



