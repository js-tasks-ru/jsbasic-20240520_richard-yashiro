function getMinMax(str) {
  const numbers = str.split(' ')
      .map(parseFloat)
      .filter(Number.isFinite);
  
  return {
      min: Math.min(...numbers),
      max: Math.max(...numbers)
  };
}
