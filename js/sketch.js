function setup() {
  createCanvas(windowWidth, windowHeight).parent('model');
}

function draw() {
  var x = Math.round($('#output-val').text());

  // Input
  for(let i = 0; i < 2; i++) {
    push();
    ellipse(125, 200+(200*i), 65, 65);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(1, 125, 200+(200*i));
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
    pop();
  }

  // Output
  push();
  ellipse(725, 300, 65, 65);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(x, 725, 300);
  pop();
}
