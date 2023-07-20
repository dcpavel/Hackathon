const body = document.querySelector('body');
const images = ["assets/thor_hammer.png", "assets/chainsaw.png", 'assets/wrench.png',
  'assets/jackhammer.png', 'assets/paintbrush.png', 'assets/screwdriver.png', 'assets/beer.png'];
// assets/beer.png must be last for the easter egg to work
const runtime = chrome.runtime;

let mouseY = 0;
let mouseX = 0;
let zIndex = 500;
let rot = 30;

let action = 0;
let stopChainsaw = null;
let sawOn = false;

const moveCursor = (e) => {
  mouseY = e.clientY;
  mouseX = e.clientX;

  cursorDiv.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;  
}

const interact = (e) => {
  switch (action) {
    case 0:
      hammer();
      break;
    case 1:
      if (sawOn) {
        clearInterval(stopChainsaw);
      } else {
        stopChainsaw = setInterval(chainsaw, 1);
      }
      sawOn = !sawOn;
      break;
    case 2:
      wrench(e);
      break;
    case 3:
      jackhammer();
      break;
    case 4:
      paintbrush();
      break;
    case 5:
      screwdriver(e);
      break;
    case 6:
      egg();
      break;
  }
}

const changeAction = (event) => {
  if (/^[A-Z]$/.test(event.key)) event.key = event.key.toStringLower();
  console.log(event.key);
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
    case 'd': 
      action = nextAction();
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'a':
      action = prevAction();
      break;
    case 'w':
      action = 2;
      break;
    case 'h':
      action = 0;
      break;
    case 's':
    case 'c':
      action = 1;
      break;
    case 'j':
      action = 3;
      break;
    case 'p':
      action = 4;
      break;
    case 's':
      action = 5;
      break;
    case 'e':
      action = 6;
      break;
    default:
      console.log(event);  
  }
  
  setCursor(images, action);
      
  clearInterval(stopChainsaw);
  sawOn = false;
}

const hammer = () => {
  const xOffset = 90;
  const yOffset = 62;

  const imageUrl = runtime.getURL("assets/broken_glass.png");

  const broken = document.createElement('div');
  broken.className = 'broken_glass';
  broken.style.top = mouseY - yOffset + 'px';
  broken.style.left = mouseX - xOffset + 'px';
  broken.style.backgroundImage = `url(${imageUrl})`;

  body.appendChild(broken);
}

const chainsaw = () => {
  const xOffset = 25;
  const yOffset = 62;

  const rip = document.createElement('div');
  rip.className = 'rip';
  rip.style.top = mouseY + yOffset + 'px';
  rip.style.left = mouseX + xOffset + 'px';
  rip.style.zIndex = zIndex++;

  body.appendChild(rip);
}

const wrench = (e) => {
  const xOffset = 90;
  const yOffset = 62;

  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  ele.style.transitionDuration = '.5s';
  rotate(e, ele);  
  body.prepend(cursorDiv);
}

const jackhammer = () => {
  const xOffset = 90;
  const yOffset = 62;

  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  if (ele != body) {
    ele.remove();
  }
  body.prepend(cursorDiv);
}

const paintbrush = () => {
  const xOffset = 90;
  const yOffset = 62;

  const imageUrl = runtime.getURL("assets/AnaCat.jpg");

  const anaCat = document.createElement('div');
  anaCat.className = 'ana_cat';
  anaCat.style.top = mouseY - yOffset + 'px';
  anaCat.style.left = mouseX - xOffset + 'px';
  anaCat.style.backgroundImage = `url(${imageUrl})`;

  body.appendChild(anaCat);
}

const screwdriver = (e) => {
  const xOffset = 90;
  const yOffset = 62;

  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  ele.style.transitionDuration = `.5s`;
  rotate(e, ele);
  size(e, ele);
  body.prepend(cursorDiv);
}

const egg = () => {
  const xOffset = 90;
  const yOffset = 62;

  const imageUrl = runtime.getURL("assets/alisa.jpg");

  const anaCat = document.createElement('div');
  anaCat.className = 'ana_cat';
  anaCat.style.top = mouseY - yOffset + 'px';
  anaCat.style.left = mouseX - xOffset + 'px';
  anaCat.style.backgroundImage = `url(${imageUrl})`;

  body.appendChild(anaCat);
}

const rotate = (e, ele) => {
  rot += /[d+]deg/.test(ele.style.transform);
 
  if (e.button === 0) {
    rot += 30;
    ele.style.transform = `rotate(${rot}deg)`;
  } else if (e.button === 2) {
    rot -= 30;
    ele.style.transform = `rotate(${rot}deg)`;
  }
}

const size = (e, ele) => {
  if (e.button === 0) {
    ele.width = ele.width * 1.25;
    ele.height = ele.height * 1.25;
  } else if (e.button === 2) {
    ele.width = ele.width * .75;
    ele.height = ele.height * .75;
  }
}

const nextAction = () => {
  ++action;
  if (!images[action] || action === images.length - 1) {
    action = 0;
  }

  return action;
}

const prevAction = () => {
  --action;
  if (!images[action] || action === images.length - 1) {
    action = images.length - 2;
  }
  console.log(action);

  return action;
}

const setCursor = (images, i) => {
  const cursorUrl = runtime.getURL(images[i]);
  let cursorDiv = document.querySelector('#cursor');

  if (!cursorDiv) {
    cursorDiv = document.createElement('div');
    cursorDiv.id = 'cursor';
  }

  cursorDiv.style.backgroundImage = `url('${cursorUrl}')`;

  return cursorDiv;
}

const identify = () => {
  alert(e.target);
}


const cursorDiv = setCursor(images, action);
body.prepend(cursorDiv);

body.addEventListener('mousemove', (e) => moveCursor(e));
body.addEventListener('click', (e) => interact(e))
body.addEventListener('keydown', (e) => changeAction(e));
window.addEventListener('contextmenu', (e) =>{
  e.preventDefault();
  if ([2,5].includes(action)) {
    interact(e);
  }
})