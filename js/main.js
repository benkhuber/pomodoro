let clock = document.querySelector('#clock')
let button = document.querySelector('#startTimer')
let timer = document.querySelector('#countdown')
button.addEventListener('click', getDeadline)
button.addEventListener('click', countdown)

function worldTime() {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let session = 'AM'

    if (hours === 0) {
        hours = 12
    } else if (hours > 12) {
        session = 'PM'
        hours = hours - 12
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    clock.innerHTML = `${hours}:${minutes} ${session}`
    setTimeout(worldTime, 1000)
}

deadlineStore = 0

function getDeadline() {
    deadlineStore = Date.now() + 1.5e6
    //test rest timer
    // deadlineStore = Date.now() + 3000
}

function restDeadline() {
    deadlineStore = Date.now() + 300000
}



function countdown() {
    let deadline = deadlineStore
    let currentTime = Date.now()
    let timeLeft = deadline - currentTime
    let seconds = Math.round(timeLeft / 1000)
    let minutes = Math.floor(seconds / 60)
    let displaySeconds = seconds - (minutes*60)
    if (displaySeconds < 10) {
        displaySeconds = '0' + displaySeconds
    }

    timer.innerHTML = `${minutes}:${displaySeconds}`
    if (minutes == 0 && displaySeconds == 0) {
        restDeadline()
        restCountdown()
    } else {
    setTimeout(countdown, 1000)
    }
}

function restCountdown() {
    let restDeadline = deadlineStore
    let currentTime = Date.now()
    let timeLeft = restDeadline - currentTime
    let seconds = Math.round(timeLeft / 1000)
    let minutes = Math.floor(seconds / 60)
    let displaySeconds = seconds - (minutes*60)
    if (displaySeconds < 10) {
        displaySeconds = '0' + displaySeconds
    }
    timer.innerHTML = `${minutes}:${displaySeconds}`
    setTimeout(restCountdown, 1000)
}


worldTime()