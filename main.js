music = " ";
lefty = 0;
leftx = 0;
rightx = 0;
rihty = 0;
scoreleft = 0;
scoreright = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();

    pose1 = ml5.poseNet(camera, modelLoaded);
    pose1.on("pose", gotPoses);
}

function draw(){
    image(camera,0,0,600,500);
    fill("#cc0000");
    stroke("#cc0000");
    if(scoreright > 0.2){
    circle(rightx, righty, 20);
    if(righty > 0 && righty <= 100){
        document.getElementById("speed1").innerHTML = "Speed = 0.5";
        music.rate(0.5);
    }
    else if(righty > 100 && righty <= 200){
        document.getElementById("speed1").innerHTML = "Speed = 1";
        music.rate(1);
    }
    else if(righty > 200 && righty <= 300){
        document.getElementById("speed1").innerHTML = "Speed = 1.5";
        music.rate(1.5);
    }
    else if(righty > 300 && righty <= 400){
        document.getElementById("speed1").innerHTML = "Speed = 2";
        music.rate(2);
    }
    else if(righty > 400 && righty <= 500){
        document.getElementById("speed1").innerHTML = "Speed = 2.5";
        music.rate(2.5);
    }
}
    if(scoreleft > 0.2){
    circle(leftx, lefty, 20);
    circle1 = Number(lefty);
    decimal = floor(circle1);
    divide = decimal/500;
    multiply = divide*2;
    document.getElementById("volume1").innerHTML = "Volume is " + multiply;
}
}

function preload(){
    music = loadSound("music.mp3");
}

function song(){
    music.play();
    music.rate(2.5);
    music.setVolume(multiply);
}

function modelLoaded(){
    console.log("PoseNet is initialised");
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreright = results[0].pose.keypoints[10].score;
        scoreleft = results[0].pose.keypoints[9].score;
        console.log("Score Left = " + scoreleft + "Score Right = " + scoreright);
        rightx = results[0].pose.rightWrist.x;
        righty = results[0].pose.rightWrist.y;
        console.log("Right X = " + rightx + "Right Y = " + righty);
        leftx = results[0].pose.leftWrist.x;
        lefty = results[0].pose.leftWrist.y;
        console.log("Left X = " + leftx + "Left Y = " + lefty);
    }
    }
