let clock = document.querySelector('#clock')

function worldTime () {
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

    if (hours < 10) {
        hours = '0' + hours
    }

    
clock.innerHTML = `${hours}:${minutes}:${seconds} ${session}`
}

setInterval(1000)

worldTime()