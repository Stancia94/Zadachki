type size = 'small' | 'middle' | 'large';

function sizeBallInNumber(size: size) {
  switch (size) {
    case 'small':
      return 2;
    case 'middle':
      return 1.5
    case 'large':
      return 0.2;
  }
}

function countFloor(stage: number, size: size): number {
  const sizeBall = sizeBallInNumber(size);
  let counter = stage;
  while (stage > 1) {
    stage /= sizeBall;
    counter += Math.floor(stage);
  }
  return counter;
}

console.log(countFloor(10, "small"));