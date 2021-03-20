const gridContainer = document.querySelector('#grid-container');
const gridWidth = 500;
const reSize = document.getElementById('sizeBtn');
const colorSelection = Array.from(document.querySelectorAll('.btn-outline-dark'));
let color = 'black';
let drgb = .1;

let gridCol = (numSquare = 16) => {
  gridContainer.style.gridTemplateColumns = `repeat(${numSquare}, 1fr)`;
}

let squareGenerator = (numSquare = 16) => {
  let squareWidth = gridWidth / numSquare;
  for (let i =  0; i < numSquare * numSquare; i++) {
    const square = document.createElement('div');
    square.classList = 'square';
    square.addEventListener('mouseover', colorChange);
    gridContainer.appendChild(square);
  }
}

let newLoad = () => {
  gridCol();
  squareGenerator();
}

let removeSquare = () => {
  const squareNodes = Array.from(gridContainer.childNodes);
  squareNodes.forEach((e) => gridContainer.removeChild(e));
}

let newSize = () => {
  let numSquare = prompt('Enter how many squares you want per side (1-100)');
  if (numSquare < 1 || numSquare > 100) {
    alert('Your number is not in the allowed range. Try Again');
    newSize();
  } else {
    removeSquare();
    gridCol(numSquare);
    squareGenerator(numSquare);
  }
}

let colors = (e) => {
  color = e.target.id;
}

let colorChange = (e) => {
  switch (color) {
    case 'black':
      e.target.style.backgroundColor = 'black';
      break;
    case 'darker':
      drgb = parseFloat(e.target.style.backgroundColor.slice(16));
      console.log(drgb, drgb > 0.8);
      if (!drgb) {
        drgb = 0.1;
      } else if (drgb < 0.9) {
        drgb += 0.1;
      } else {
        drgb = 0.9;
      }
      e.target.style.backgroundColor = `rgba(10, 10, 10, ${drgb})`;
      break;
    case 'rainbow':
      rgbRed = Math.floor(Math.random()*255);
      rgbBlue = Math.floor(Math.random()*255);
      rgbGreen = Math.floor(Math.random()*255);
      console.log('rbg(',rgbRed,', ',rgbGreen,', ',rgbBlue,')');
      e.target.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbGreen})`;
      break;
    case 'erase':
      e.target.style.backgroundColor = 'white';
      break;
    }
}

window.addEventListener('load', newLoad, false);
reSize.addEventListener('click', newSize);
colorSelection.forEach(button => button.addEventListener('click', colors));
