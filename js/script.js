console.log("here");
let mouseY = 0;
let mouseX = 0;
let zIndex = 500;
let action = 0;
const images = ["thor_hammer.png", "assets/chainsaw.png"];
//clearInterval name
let stopChainsaw = null;
//is the saw on
let sawOn = false;
const overlay = document.createElement('div');
overlay.id = 'full_display';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.zIndex = zIndex++; // to ensure it's on top
overlay.style.cursor =  `none`;

overlay.onclick = () => {
  
  const xOffset = 90;
  const yOffset = 62;

  if (action === 0) {
        const imageUrl = chrome.runtime.getURL("assets/broken_glass.png");
    // const imageUrl = chrome.runtime.getURL("thor_hammer.png");
    const broken = document.createElement('div');
    broken.className = 'broken_glass';
    broken.style.position = 'absolute';
    broken.style.top = mouseY - yOffset + 'px';
    broken.style.left = mouseX - xOffset + 'px';
    broken.style.zIndex = zIndex++;
    broken.style.backgroundImage = `url(${imageUrl})`;

    overlay.appendChild(broken);
  }
  else {
    //if on
    if (sawOn) {
      clearInterval(stopChainsaw);
    } else {
      stopChainsaw = setInterval(chainsaw, 5);
    }
    sawOn = !sawOn;
    //else
  }
}

window.addEventListener('keydown', (e) => {
  console.log('keydown');
    if (e.code === 'ArrowDown' || e.code ==='ArrowUp') {
      action = (action + 1) % 2;
      cursorUrl = chrome.runtime.getURL(images[action]);
      cursorDiv.style.backgroundImage = `url(${cursorUrl})`;
      clearInterval(stopChainsaw);
      sawOn = false;
    }
});

let cursorUrl = chrome.runtime.getURL(images[action]);
const cursorDiv = document.createElement('div');
cursorDiv.id = 'cursor';
cursorDiv.style.position = 'absolute';
cursorDiv.style.backgroundImage = `url(${cursorUrl})`;
cursorDiv.style.width = '128px';
cursorDiv.style.height = '146px';
cursorDiv.style.zIndex = 2000000000 - 1;

const moveCursor = (e) => {
  mouseY = e.clientY;
  mouseX = e.clientX;

  cursorDiv.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
  cursorDiv.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}

overlay.appendChild(cursorDiv);
overlay.addEventListener('mousemove', moveCursor);



const chainsaw = () => {
  const xOffset = 25;
  const yOffset = 62;

  const rip = document.createElement('div');
  rip.className = 'rip';
  rip.style.position = 'absolute';
  rip.style.top = mouseY + yOffset + 'px';
  rip.style.left = mouseX + xOffset + 'px';
  rip.style.zIndex = zIndex++;
  rip.style.backgroundColor = 'black';
  rip.style.height = '10px';
  rip.style.width = '10px';

  overlay.appendChild(rip);
}

document.body.appendChild(overlay);
