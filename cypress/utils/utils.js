export function getRandomString(length) {
  const letters = "abcdefghijklmnopqrstuvwxyz-";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

export function getXMinutesFromNow(minsToAdd) {
  const now = new Date();
  const futureTime = new Date(now.getTime() + minsToAdd * 60000); // Add minutes

  const year = futureTime.getFullYear();
  const month = String(futureTime.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(futureTime.getDate()).padStart(2, "0");
  const hours = String(futureTime.getHours()).padStart(2, "0");
  const minutes = String(futureTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getTimeXMinsFromNow(minsToAdd = 30) {
  // Create a new Date object for the current time
  let currentDate = new Date();

  // Add 30 minutes to the current time
  currentDate.setMinutes(currentDate.getMinutes() + minsToAdd);

  // Get hours and minutes
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  // Pad hours and minutes with leading zeros if necessary
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Format time as HH:MM
  let timeString = hours + ':' + minutes;

  return timeString;
  }
  