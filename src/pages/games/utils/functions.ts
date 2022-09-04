export const getRange = (count: number) => [...Array(count).keys()];

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function shuffle <T>(array: Array<T>): Array<T> {
  const arr = [...array];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export default {};
