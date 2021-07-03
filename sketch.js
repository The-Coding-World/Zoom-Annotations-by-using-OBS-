// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Zx5wjql_j/';
let dobut;
let question;
let yes;
// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let questionFade = 0;
let yesFade = 0;
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
   dobut = loadImage('dobut.png');
  question = loadImage('question.png')
  yes = loadImage('Thumbs_Up.png')
}

function setup() {
  createCanvas(640 ,500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width , 460);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);
  console.log(label);

   if (label == 'Question'){
   questionFade = 255 ;
  }

  questionFade -= 15 ;
  if (questionFade > 0){
    tint(255 , questionFade);
       image(question,-10 ,-10 ,0,0);
     image(dobut, 400, 277, 0, 0);
    // Draw the label
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("I Have A Dobut!", width / 2, height - 4);
  }

  if (label == 'Yes'){
   yesFade = 255 ;
  }

  yesFade -= 15 ;
  if (yesFade > 0){
    tint(255 , yesFade);
    image(yes, 0, 0);
    // Draw the label
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("Yes", width / 2, height - 4);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
