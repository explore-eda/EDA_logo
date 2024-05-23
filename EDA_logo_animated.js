let cP;
let cB;
let cC;
let inColor = true;
let animate = true;

function setup() {
  if (animate == false){
    noLoop(); // Run once and stop
  }
  
  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(700, 400);
  background(255);
  noStroke();  
  

  if (inColor == true){
    cP = color('#220029');
    cB = color('#0076C8');
    cC = color('#66E3FF');    
  }
  else{
    cP = color(0);
    cB = color(100);
    cC = color(200);    
  } 
}


function draw() {
  clear();

  let t0 = 0;
  let t1 = 0;
  let t2 = 0;  
  
  if (animate == true){
    t0 = round(abs(sin(frameCount * 0.02))*15);  //+0-15%
    t1 = round(sin(frameCount * 0.02)*25);  //+-25%
    t2 = round(sin(frameCount * 0.05)*25); //+-25%, slower
  }

  let originD = createVector(315, 100);
  drawD(originD, t0, t1);
  
  let originA = createVector(445, 100);
  drawA(originA, t2);
  
  let originE = createVector(150, 100);
  drawE(originE, t0, t1, t2);  
}


function drawE(origin, d0=0, d1=0, d2=0){
  let H = 200;
  let h = 55;
  let lift = (H-h)/2;

  let lng=145;
  let shrt=100;
  noStroke();
  fill(cP);
  rect(origin.x, origin.y, lng - d0 + d1, 55); //x,y,w,h
  
  fill(cB);
  rect(origin.x, origin.y+lift, shrt + d0, 55); //x,y,w,h
  
  fill(cC);
  rect(origin.x, origin.y+(2*lift), lng + d2/2, 55); //x,y,w,h
}

function drawD(origin, delta1=0, delta2=0){
  let bkLeg = 50;
  let r = 100;
  let xC = origin.x + bkLeg;
  let yC = origin.y + r;
  let tT=-90;
  let tB=90;
  let k = 55;

  let midArcSt = -60 - delta1;
  let midArcEnd = -15 + delta2;

  noStroke();
  fill(cP);  

  //upper segment
  beginShape();
  vertex(origin.x,origin.y+k);
  vertex(origin.x,origin.y);
  for(i=tT; i<-6.5+midArcSt; i++){
      let x = r*cos(radians(i)) + xC;
      let y = r*sin(radians(i)) + yC;  
      vertex(x,y);
  }
  for(i=-14+midArcSt; i>tT; i--){
      let x = (r-k)*cos(radians(i)) + xC;
      let y = (r-k)*sin(radians(i)) + yC;  
      vertex(x,y);
  }
  vertex(origin.x,origin.y+k);
  endShape();  
  
  //wedge
  fill(cB);  
  beginShape();
  vertex(xC,yC);
  for(i=midArcSt+4; i<midArcEnd; i++){
    let x = (r+6)*cos(radians(i)) + xC;
    let y = (r+6)*sin(radians(i)) + yC;  
    vertex(x,y);
  }  

  vertex(xC,yC);
  endShape();
  
  //lower segment
  fill(cC);   
  beginShape();
  vertex(origin.x, origin.y+r+r);  
  vertex(origin.x, origin.y+r+r-k);
  for(i=tB; i>midArcEnd+20; i--){
      let x = (r-k)*cos(radians(i)) + xC;
      let y = (r-k)*sin(radians(i)) + yC;  
      vertex(x,y);
  }  
  for(i=midArcEnd+10; i<tB; i++){
      let x = r*cos(radians(i)) + xC;
      let y = r*sin(radians(i)) + yC;  
      vertex(x,y);
  }
  vertex(origin.x, origin.y+r+r);  
  endShape();  
}

function drawA(origin, d0=0){
  let H = 200;
  let W = 190;
  let h = 55;
  let lift = (H-(3*h))/2;

  let bump = 8;
  let slope = W/(2*H);
  let yPrime = 0;
  let xPrimeUp = yPrime => (W/2) - (slope * yPrime);
  let xPrimeDn = yPrime => slope * yPrime + (W/2);
  
  fill(cP);
  beginShape();
  vertex(origin.x+xPrimeUp(h+bump), origin.y+h+bump);
  vertex(origin.x+xPrimeUp(0), origin.y+0);
  vertex(origin.x+xPrimeDn(h+bump), origin.y+h+bump);
  endShape();
  
  bump-=2;
  fill(cB);
  beginShape();
  vertex(origin.x+xPrimeUp(lift+(2*h)+bump+d0), origin.y+(lift+(2*h))+bump+d0);
  vertex(origin.x+xPrimeUp(lift+h+bump), origin.y+lift+h+bump);
  vertex(origin.x+xPrimeDn(lift+h+bump), origin.y+lift+h+bump);
  vertex(origin.x+xPrimeDn(lift+(2*h)+bump+d0), origin.y+(lift+(2*h))+bump+d0);
  endShape();
  
  bump-=2;
  fill(cC);
  beginShape();
  vertex(origin.x+xPrimeUp(H), origin.y+H);
  vertex(origin.x+xPrimeUp((2*lift)+(2*h)+bump+d0), origin.y+(2*lift)+(2*h)+bump+d0);
  vertex(origin.x+xPrimeDn((2*lift)+(2*h)+bump+d0), origin.y+(2*lift)+(2*h)+bump+d0);
  vertex(origin.x+xPrimeDn(H), origin.y+H);
  endShape();
}
