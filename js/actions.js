const actions = {};

// the keys of this object should each match an action
const images = {
  hammer: "assets/thor_hammer.png",
  chainsaw: "assets/chainsaw.png",
  wrench: 'assets/wrench.png',
  jackhammer: 'assets/jackhammer.png',
  paintbrush: 'assets/paintbrush.png',
  screwdriver: 'assets/screwdriver.png',
  secret: 'assets/nearbeer.png'
};

actions.hammer = () => {
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

actions.chainsaw = () => {
  const xOffset = 25;
  const yOffset = 62;

  const rip = document.createElement('div');
  rip.className = 'rip';
  rip.style.top = mouseY + yOffset + 'px';
  rip.style.left = mouseX + xOffset + 'px';
  rip.style.zIndex = zIndex++;

  body.appendChild(rip);
}

actions.wrench = (e, cursorDiv) => {
  const xOffset = 90;
  const yOffset = 62;

  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  ele.style.transitionDuration = '.5s';
  rotate(e, ele);  
  body.prepend(cursorDiv);
}

actions.jackhammer = (cursorDiv) => {
  const xOffset = 90;
  const yOffset = 62;

  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  if (ele != body) {
    ele.remove();
  }
  body.prepend(cursorDiv);
}

actions.paintbrush = () => {
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

actions.screwdriver = (e, cursorDiv) => {
  cursorDiv.remove();
  const ele = document.elementFromPoint(mouseX, mouseY);
  ele.style.transitionDuration = `.5s`;
  rotate(e, ele);
  size(e, ele);
  body.prepend(cursorDiv);
}

actions.egg = () => {
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