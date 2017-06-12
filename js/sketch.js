function setup() {
  createCanvas(windowWidth, windowHeight).parent('model');
}

function draw() {
  var x = Math.round($('#output-val').text());

  // Weights
  push();
  textSize(12);
  textAlign(CENTER, CENTER);
  textFont("monospace");
  fill(255, 255, 0);
  text(getInputWeights().w1, 175, 175);
  text(getInputWeights().w2, 190, 210);
  text(getInputWeights().w3, 175, 250);
  text(getInputWeights().w4, 175, 355);
  text(getInputWeights().w5, 190, 395);
  text(getInputWeights().w6, 175, 430);
  text(getHiddenWeights().w1, 485, 150);
  text(getHiddenWeights().w2, 485, 285);
  text(getHiddenWeights().w3, 485, 450);
  pop();

  // Input
  for(let i = 0; i < 2; i++) {
    push();
    ellipse(125, 200+(200*i), 65, 65);
    pop();
  }

  // Hidden
  for(let i = 0; i < 3; i++){
    push();
    ellipse(425, 150+(150*i), 65, 65);
    stroke(255);
    line(125, 200, 425, 150+(150*i));
    line(125, 400, 425, 150+(150*i));
    line(425, 150+(150*i), 725, 300);
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont('Monospace');
    text('S', 425, 150+(150*i));
    pop();
  }

  // Output
  push();
  ellipse(725, 300, 65, 65);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(x, 725, 300);
  pop();

  // Change input values
  push();
  textSize(30);
  textAlign(CENTER, CENTER);
  var inputVal = $('#input-select').val();
  if(inputVal == "00") {
    text(0, 125, 200);
    text(0, 125, 400);
  } else if(inputVal == "01") {
    text(0, 125, 200);
    text(1, 125, 400);
  } else if(inputVal == "10") {
    text(1, 125, 200);
    text(0, 125, 400);
  } else {
    text(1, 125, 200);
    text(1, 125, 400);
  }
  pop();
}
