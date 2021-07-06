song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWrist = Number(scoreLeftWrist);
        remove_decimal = Math.floor(inNumberLeftWrist);
        volume = remove_decimal/400;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left x: " + leftWristX + " left y: " + leftWristY);
        console.log("right x: " + rightWristX + " right y: " + rightWristY);
    }
}
