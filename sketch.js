let truncation_value = 0.8;
const model = new rw.HostedModel({
  url: "https://20thcentlamps-16500steps-v001.hosted-models.runwayml.cloud/v1/",
  token: "Pth51OEDCjGDoEr2dDfAAw==",
});

let xImgPos, yImgPos;
let inp, seed, col, colorT, title, myFont, gfx;
var txt, startL, output, canvas, subtxtY, subtxtW, link, link2;
var h = window.innerHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  subtxtY = windowHeight / 6;
  subtxtW = windowWidth / 4.5;

  title = createDiv("Lamp");
  title.position(-20, subtxtY * 2);
  title.style('z-index', '-1');
  title.style('font-size', '20vw');
  title.style('line-height', 0);
  title.style('color', '#696969');
  title.style('opacity', '0.5');
  title.style('font-family', 'ff-meta-web-pro');
  title.style('font-weight', '200');
  title.style('font-style', 'italic');
  title.style('user-select', 'none');

  title2 = createDiv("Generator");
  title2.parent(title);
  title2.position(0, 0);
  title2.style('font-size', '20vw');
  title2.style('line-height', 1.8);
  title2.style('text-indent', '0.35em');
  title2.style('color', '#696969');
  title2.style('opacity', '1');
  title2.style('font-family', 'ff-meta-web-pro');
  title2.style('font-weight', '200');
  title2.style('font-style', 'italic');
  title2.style('user-select', 'none');

  sub = createP("styleGAN trained on 1161 imgs of 20th Century");
  //sub.parent(title2);
  sub.position(subtxtW * 3, windowHeight - 130);
  sub.style('line-height', 1.8);
  sub.style('color', '#303030');
  sub.style('font-family', 'Crimson Pro');
  sub.style('font-weight', '16');
  sub.style('font-style', 'normal');
  sub.style('user-select', 'none');

  sub2 = createP("lamp designs for 16500 steps");
  sub2.parent(sub);
  sub2.position(0, 5);
  sub2.style('line-height', 1.8);
  sub2.style('color', '#303030');
  sub2.style('font-family', 'Crimson Pro');
  sub2.style('font-weight', '16');
  sub2.style('font-style', 'normal');
  sub2.style('user-select', 'none');

  link = createP("made with RunwayML _ a project by Naoko Hara");
  link.parent(sub);
  link.position(0, 40);
  link.style('color', '#303030');
  link.style('font-family', 'Crimson Pro');
  link.style('font-size', '14px');
  link.style('font-style', 'bold');

  //fill(150);
  //textSize(15);
  //textFont('Crimson Pro');
  //text("styleGAN trained on 1161 imgs of 20th Century\nlamp designs for 16500 steps",
  //windowWidth - 631, windowHeight - 90, 384, 256);


  inp = createInput('');
  inp.input(gotText);

  strokeWeight(0.25);
  stroke(0);
  line(50, windowHeight - 150, windowWidth - 50, windowHeight - 150);

  startL = 128;
  for (let x = 0; x < windowWidth; x++) {
    line(startL, 50, startL, windowHeight - 50);
    startL += 256;
  }

}

function draw() {
  //text box pos
  inp.position(mouseX, mouseY - 65);

  col = color(25, 23, 200, 0)
  inp.size(500, 130);
  inp.style('font-size', '100px');
  inp.style('background-color', col);
  inp.style('border-style', 'hidden');
  inp.style('font-family', 'Crimson Pro');
  inp.style('font-weight', '300');
  inp.style('font-style', 'regular');

  if (windowWidth > 1920) {
    xImgPos = 1408;
  } else if ((windowWidth < 1919) && (windowWidth > 1664)) {
    xImgPos = 1152;
  } else if ((windowWidth < 1663) && (windowWidth > 1408)) {
    xImgPos = 896;
  } else if ((windowWidth < 1407) && (windowWidth > 1152)) {
    xImgPos = 640;
  } else if ((windowWidth < 1151) && (windowWidth > 896)) {
    xImgPos = 384;
  }

}

function gotText() {
  seed = 0;
  if (this.value() != "") {
    let text = this.value()
    for (let t = 0; t < text.length; t++) {
      //print text in console
      print(text[t].charCodeAt())
      //below adds up keycode of all text input and puts it in seed
      seed += int(text[t].charCodeAt())
    }
    // print(seed)
    getImageFromRunway()
  }
}

function getImageFromRunway() {
  randomSeed(seed);
  z = createZ(512)
  const path = model;
  const data = {
    z: z,
    truncation: truncation_value
  };
  // httpPost(path, 'json', data, gotImage, gotError);

  if (!model.isAwake()) {
    console.log('asleep') // this is a fake function for demonstration
  } else {
    model.query(data)
      .then(result => gotImage(result));
  }
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  i = createImg(result.image, imageReady);
  i.hide();
  i2 = createImg(result.image, imageReady2);
  i2.hide();
  i3 = createImg(result.image, imageReady3);
  i3.hide();
}

function imageReady() {
  yImgPos = h - 512;
  image(i, xImgPos, yImgPos, 512, 512);
}

function imageReady2() {
  image(i2, xImgPos, yImgPos - 512, 512, 512);
}

function imageReady3() {
  image(i2, xImgPos, yImgPos - 1024, 512, 512);
}

function createZ(v) {
  let z = [];
  for (let zi = 0; zi < v; zi++) {
    z.push(random(-1, 1))
  }
  return z;
}