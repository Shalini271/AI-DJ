// number=37;
// for(i=1;i<=10;i++){
// console.log(number*i)
// }

lx = 0;
ly = 0;
rx = 0;
ry = 0;
lscore = 0;
rscore = 0;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    cam = createCapture(VIDEO);
    cam.hide();
    // canvas.hide();
    poses = ml5.poseNet(cam, loaded);
    poses.on("pose", pose);
    canvas.mousePressed(stoplay);
}

function preload() {
    music2 = loadSound("music.mp3");
    harry = loadSound("music.mp3");
    party = loadSound("party.mp3");
    call = loadSound("call.mp3");
}

function draw() {
    image(cam, 0, 0, 500, 500);
    fill("red");
    stroke("black");
    if (lscore > 0.2) {
        circle(lx, ly, 40)
        if (ly <= 500) {
            volume = 1 - (ly / 500);
            volume = volume.toFixed(2);
            console.log(volume);
            document.getElementById("volume").innerHTML = "Volume: " + volume;
            music2.setVolume(volume);
        }
    }
    if (rscore > 0.2) {
        circle(rx, ry, 40)
        if (ry <= 100) {
            rate(0.5)
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
        }
        else if (ry > 100 && ry <= 200) {
            rate(1)
            document.getElementById("speed").innerHTML = "Speed: 1x";
        }
        else if (ry > 200 && ry <= 300) {
            rate(1.5)
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
        }
        else if (ry > 300 && ry <= 400) {
            rate(2)
            document.getElementById("speed").innerHTML = "Speed: 2x";
        }
        else if (ry > 400 && ry <= 500) {
            rate(2.5)
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
        }
    }
}

function play() {
    song = document.getElementById("song").value;
    if (song == "party") {
        party.play();
        harry.stop();
        call.stop();
        music2 = party;
    }
    if (song == "call") {
        call.play();
        harry.stop();
        party.stop();
        music2 = call;
    }
    if (song == "harry") {
        harry.play();
        call.stop();
        party.stop();
        music2 = harry;
    }
    music2.setVolume(0.25);
    music2.rate(1);
}

// click = 1
// function show() {
//     if (click == 1) {
//         canvas.show();
//         document.getElementById("showorhide").innerHTML = "Hide";
//         click = 2;
//     }
//     else if (click == 2) {
//         canvas.hide();
//         document.getElementById("showorhide").innerHTML = "Show";
//         click = 1;
//     }
// }

function stop() {
    party.stop();
    harry.stop();
    call.stop();
}

function loaded() {
    console.log("Loaded.")
}

function pose(results) {
    console.log(results)
    if (results.length > 0) {
        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
        // console.log("The x and y for the left wrist are " + lx + "and " + ly)
        // console.log("The x and y for the right wrist are " + rx + "and " + ry)
        lscore = results[0].pose.keypoints[9].score;
        rscore = results[0].pose.keypoints[10].score;

    }

}

function stoplay() {
    if (click == 1) {
        music2.stop()
        click = 2
    }
    else if (click == 2) {
        music2.play()
        click = 1
    }
}