export function calculateTimeRemaining(endTimeUnix: number): string {
  const currentTimeUnix = Math.floor(Date.now() / 1000);
  const timeRemaining = endTimeUnix - currentTimeUnix;

  if (timeRemaining <= 0) {
    return "Expired";
  }

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export function getTimeDifferenceFromUnix(givenUnixTime: number): string {
  const currentTimeUnix = Math.floor(Date.now() / 1000);
  const timeDifference = givenUnixTime - currentTimeUnix;

  if (timeDifference > 0) {
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;
    return `In ${hours}h ${minutes}m ${seconds}s`;
  } else if (timeDifference < 0) {
    const hours = Math.floor(Math.abs(timeDifference) / 3600);
    const minutes = Math.floor((Math.abs(timeDifference) % 3600) / 60);
    const seconds = Math.abs(timeDifference) % 60;
    return `${hours}h ${minutes}m ${seconds}s ago`;
  } else {
    return "The time is now";
  }
}

export function isCurrentTimeOutsideRange(
  startTimeUnix: number,
  endTimeUnix: number
): boolean {
  const currentTimeUnix = Math.floor(Date.now() / 1000);
  return currentTimeUnix < startTimeUnix || currentTimeUnix > endTimeUnix;
}
