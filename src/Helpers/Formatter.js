export function prettyDate(timestamp){
    timestamp = (Date.now() - timestamp) / 1000;
    let hours;
    let minutes;
    let seconds;
    hours = Math.floor(timestamp / 3600);
    timestamp %= 3600;
    minutes = Math.floor(timestamp / 60);
    seconds = timestamp % 60;
    return `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${parseInt(seconds) < 10 ? '0'+parseInt(seconds) : parseInt(seconds)}`
}