

export function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function groupObjectsRandomly(objects, maxObjectsPerGroup) {
  // Step 1: Shuffle the array of objects randomly
  // const shuffledObjects = shuffleArray(objects); //shuffling done
  const shuffledObjects = objects; //shuffling not done

  // Step 2: Create groups of arrays
  const groups = [];
  let currentGroup = [];
  for (let i = 0; i < shuffledObjects.length; i++) {
    currentGroup.push(shuffledObjects[i]);
    if (currentGroup.length === maxObjectsPerGroup || i === shuffledObjects.length - 1) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }

  return groups;
}



export function getSomeWords(text, num) {
  // Remove leading and trailing spaces, then split the text by spaces
  const words = text.trim().split(' ');

  // Take the first 5 words using the slice method
  const firstFiveWords = words.slice(0, num).join(' ');

  return firstFiveWords;
}

export const isClient = typeof window !== 'undefined';



export const filterString = (string) => {
  return string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}


export function sortProductsByPriceLowToHigh(products) {
  return products.slice().sort((a, b) => a.price - b.price);
}
export function sortProductsByPriceHighToLow(products) {
  return products.slice().sort((a, b) => b.price - a.price);
}

export function sortProductsByTopRating(products) {
  return products.slice().sort((a, b) => b.rating.rate - a.rating.rate);
}