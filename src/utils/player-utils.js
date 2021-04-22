// calculate Total Duration of a Song and returns in a string format mm:ss
export function calculateDurationTime(duration) {
  let durationMinute = Math.floor(duration / 60); // minutes
  let durationSeconds = Math.floor(duration % 60); // Seconds
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`; // to make 1 as 01
  return `${durationMinute}:${durationSeconds}`;
}

// calculate Current Time of a Song and returns in a string format mm:ss
export function calculateCurrentTime(currentTime) {
  let currentMinute = Math.floor(currentTime / 60); // minutes
  let currentSeconds = Math.floor(currentTime % 60); // seconds
  if (currentSeconds < 10)
    // to make 1 as 01
    currentSeconds = `0${currentSeconds}`;
  return `${currentMinute}:${currentSeconds}`;
}
