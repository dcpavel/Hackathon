const body = document.querySelector('body');
const runtime = chrome.runtime;


const objInfo = (x, y) => {
  x,
  y,
  rot = 0,
  size = changeSize
  const zIndex = 500;
};


const moveCursor = (e, cursorDiv) => {
  mouseY = e.clientY;
  mouseX = e.clientX;

  cursorDiv.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;  
}

const interact = (e) => {
  switch (action) {
    case 'hammer':
      actions.hammer();
      break;
    case 'chainsaw':
      if (sawOn) {
        clearInterval(stopChainsaw);
      } else {
        stopChainsaw = setInterval(actions.chainsaw, 1);
      }
      sawOn = !sawOn;
      break;
    case 'wrench':
      actions.wrench(e, cursorDiv);
      break;
    case 'jackhammer':
      actions.jackhammer(cursorDiv);
      break;
    case 'paintbrush':
      actions.paintbrush();
      break;
    case 'screwdriver':
      actions.screwdriver(e, cursorDiv);
      break;
    case 'secret':
      actions.egg();
      break;
  }
}

const changeAction = (event, action = 'hammer') => {
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
    case 'h':
      action = 'hammer';
      break;
    case 'c':
      action = 'chainsaw';
      break;
    case 'w':
      action = 'wrench';
      break;
    case 'j':
      action = 'jackhammer';
      break;
    case 'p':
      action = 'paintbrush';
      break;
    case 's':
      action = 'screwdriver';
      break;
    case 'e':
      action = 'secret';
      break;
    default:
      console.log(event);  
  }
  
  setCursor(images, action);
      
  clearInterval(stopChainsaw);
  sawOn = false;
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

const changeSize = (mouse, ele) => {
  if (mouse.button === 0) {
    ele.width = ele.width * 1.25;
    ele.height = ele.height * 1.25;
  } else if (mouse.button === 2) {
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
  const cursorUrl = runtime.getURL(actions[action]);

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


let default_aaction = 'hammer';
let mouseY = 0;
let mouseX = 0;

let cursorDiv = setCursor(images, action);
body.prepend(cursorDiv);

let stopChainsaw = null;
let sawOn = false;

body.addEventListener('mousemove', (e) => moveCursor(e));
body.addEventListener('click', (e) => interact(e))
body.addEventListener('keydown', (e) => changeAction(e));
window.addEventListener('contextmenu', (e) =>{
  e.preventDefault();
  if ([2,5].includes(action)) {
    interact(e);
  }
})