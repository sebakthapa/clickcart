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
    const shuffledObjects = shuffleArray(objects);
  
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

