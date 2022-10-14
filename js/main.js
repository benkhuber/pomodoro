let clock = document.querySelector('#clock')
let button = document.querySelector('#startTimer')
let timer = document.querySelector('#countdown')
let webpageTitle = document.querySelector('#webpageTitle')
button.addEventListener('click', launchCountdown)
button.addEventListener('click', launchRestCountdown)


worldTime()

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

let timerStorage = {
    focusTime: true,
    startButtonStatus: true,
    deadline: 0,
    timeLeftInSeconds: 0,
    displayMinutes: 0,
    displaySeconds: 0,
}

function refreshTimerDisplay() {
    if (timerStorage.displaySeconds < 10) {
        timerStorage.displaySeconds = '0' + timerStorage.displaySeconds
    }
    webpageTitle.innerHTML = `${timerStorage.displayMinutes}:${timerStorage.displaySeconds}`
    timer.innerHTML = `${timerStorage.displayMinutes}:${timerStorage.displaySeconds}`
    startStopButtonSwitch()
}

function startStopButtonSwitch() {
    if (timerStorage.startButtonStatus) {
        button.innerHTML = 'Start'
    } else if (!timerStorage.startButtonStatus) {
        button.innerHTML = 'Stop'
    }
}

function getDeadline() {
    let focusLength = document.querySelector('#focusLength').value
    timerStorage.deadline = Date.now() + (focusLength * 60000)
}

function restDeadline() {
    timerStorage.deadline = Date.now() + 5000
}


function launchCountdown() {
    if (timerStorage.focusTime) {
        getDeadline()
        countdown()
    }
}

function launchRestCountdown() {
    if (!timerStorage.focusTime) {
        restDeadline()
        restCountdown()
    }
}

function countdown() {
    let currentTime = Date.now()
    timerStorage.timeLeftInSeconds = Math.round((timerStorage.deadline - currentTime) / 1000)
    timerStorage.displayMinutes = Math.floor(timerStorage.timeLeftInSeconds / 60)
    timerStorage.displaySeconds = timerStorage.timeLeftInSeconds - (timerStorage.displayMinutes * 60)
    timerStorage.startButtonStatus = false

    refreshTimerDisplay()
    if (timerStorage.timeLeftInSeconds === 0) {
        timerStorage.displayMinutes = 0
        timerStorage.displaySeconds = 5
        timerStorage.focusTime = false
        timerStorage.startButtonStatus = true
        refreshTimerDisplay()
    } else {
        setTimeout(countdown, 1000)
    }
}

function restCountdown() {
    let currentTime = Date.now()
    timerStorage.timeLeftInSeconds = Math.round((timerStorage.deadline - currentTime) / 1000)
    timerStorage.displayMinutes = Math.floor(timerStorage.timeLeftInSeconds / 60)
    timerStorage.displaySeconds = timerStorage.timeLeftInSeconds - (timerStorage.displayMinutes * 60)
    timerStorage.startButtonStatus = false
    
    refreshTimerDisplay()
    if (timerStorage.timeLeftInSeconds === 0) {
        timerStorage.displayMinutes = 25
        timerStorage.displaySeconds = 0
        timerStorage.focusTime = true
        timerStorage.startButtonStatus = true
        refreshTimerDisplay()
    } else {
        setTimeout(restCountdown, 1000)
    }
}