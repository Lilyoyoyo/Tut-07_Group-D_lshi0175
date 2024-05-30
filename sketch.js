let lineSettings = [];
let selectedColor = [0, 0, 0]; // Default color
let animate = false; // Animation flag
let animationOffset = 0;

function setup() {
    createCanvas(windowWidth, windowHeight); // Create a canvas with the width and height of the window
    createLines();
}

function draw() {
    background(246, 240, 221); // Redraw the background
    let scaleFactor = min(windowWidth / 1920, windowHeight / 1080);
    scale(scaleFactor);

    for (let settings of lineSettings) { // Iterate over each configuration object
        drawLines(settings); // Call the drawLines function to draw the lines, passing in the current configuration object
    }

    if (animate) {
        animationOffset += 0.01;
        for (let settings of lineSettings) {
            settings.lengthStart = map(sin(animationOffset), -1, 1, 0.2, 0.5);
            settings.lengthEnd = map(cos(animationOffset), -1, 1, 0.2, 0.5);
        }
    }
}

function windowResized() {
    // React to window size
    resizeCanvas(windowWidth, windowHeight);
    createLines();
}

function createLines() {
    strokeCap(SQUARE);
    
    lineSettings = [ // Define an array for each set of lines
        { x: 0.27, y: 0.44, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.28, lengthEnd: 0.2, distanceStart: -0.05, distanceEnd: 0.03, num: 20 },
        { x: 0.59, y: 0.39, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.76, lengthEnd: 0.76, distanceStart: -0.06, distanceEnd: 0.02, num: 20 },
        { x: 0.30, y: 0.50, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.03, lengthEnd: 0.03, distanceStart: -0.07, distanceEnd: 0.05, num: 40 },
        { x: 0.34, y: 0.56, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.26, lengthEnd: 0.22, distanceStart: -0.13, distanceEnd: -0.10, num: 14 },
        { x: 0.48, y: 0.45, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.30, lengthEnd: 0.28, distanceStart: -0.13, distanceEnd: -0.11, num: 1 },
        { x: 0.78, y: 0.24, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.14, lengthEnd: 0.15, distanceStart: -0.14, distanceEnd: -0.12, num: 1 },
        { x: 0.68, y: 0.32, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.05, lengthEnd: 0.08, distanceStart: -0.15, distanceEnd: -0.11, num: 2 },
        { x: 0.69, y: 0.31, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.04, lengthEnd: 0.29, distanceStart: -0.18, distanceEnd: 0.04, num: 40, skipRange: [15, 23] },
        { x: 0.68, y: 0.44, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.76, lengthEnd: 0.76, distanceStart: -0.06, distanceEnd: 0.02, num: 20},
        { x: 0.78, y: 0.375, angle: radians(-33), color: [0, 0, 0], weight: 2, lengthStart: 0.3, lengthEnd: 0.39, distanceStart: -0.06, distanceEnd: 0.02, num: 20},
        { x: 0.70, y: 0.58, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.60, lengthEnd: 0.60, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
        { x: 0.48, y: 0.53, angle: radians(-33), color: [0, 0, 0], weight: 2, lengthStart: 0.33, lengthEnd: 0.33, distanceStart: -0.025, distanceEnd: 0.01, num: 10},
        { x: 0.78, y: 0.44, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.20, lengthEnd: 0.20, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
        { x: 0.48, y: 0.45, angle: radians(-33), color: [0, 0, 0], weight: 1, lengthStart: 0.53, lengthEnd: 0.53, distanceStart: -0.13, distanceEnd: -0.11, num: 1 },
        { x: 0.45, y: 0.64, angle: radians(-33), color: [0, 0, 0], weight: 6, lengthStart: 0.20, lengthEnd: 0.20, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
        { x: 0.30, y: 0.56, angle: radians(-33), color: [0, 0, 0], weight: 4, lengthStart: 0.20, lengthEnd: 0.20, distanceStart: -0.15, distanceEnd: -0.08, num: 1},
    ];
}

function drawLines({ x, y, angle, color, weight, lengthStart, lengthEnd, distanceStart, distanceEnd, num, skipRange }) {
    push(); // Save the current drawing style and transformation matrix
    translate(width * x, height * y); // Move the origin to the specified position (x, y)
    rotate(angle); // Rotate the coordinate system to the specified angle
    stroke(color); // Set the line color
    for (let i = 0; i <= num; i++) { // Loop num times to draw lines
        if (skipRange && i >= skipRange[0] && i <= skipRange[1]) continue; // If the current index is within the skip range, skip this iteration
        let xoff = map(i, 0, num, -width * 0.03, width * 0.01); // Calculate the x-axis offset
        strokeWeight(weight); // Set the line weight
        let length = map(i, 0, num, width * lengthStart, width * lengthEnd); // Calculate the line length
        let distance = map(i, 0, num, width * distanceStart, width * distanceEnd); // Calculate the line position on the y-axis
        line(-length / 2 + xoff, distance, length / 2 + xoff, distance); // Draw the line
    }
    pop(); 
}

// User input functions
function mouseMoved() {
    let colorValue = map(mouseX, 0, width, 0, 255);
    for (let settings of lineSettings) {
        settings.color = [colorValue, 100, 150];
    }
}

function mouseDragged() {
    let dragOffset = map(mouseY, 0, height, -20, 20);
    for (let settings of lineSettings) {
        settings.distanceStart += dragOffset * 0.001;
        settings.distanceEnd += dragOffset * 0.001;
    }
}

function keyPressed() {
    if (key === 'R') {
        for (let settings of lineSettings) {
            settings.lengthStart += 0.01;
            settings.lengthEnd += 0.01;
        }
    }
    if (key === 'S') {
        for (let settings of lineSettings) {
            settings.lengthStart -= 0.01;
            settings.lengthEnd -= 0.01;
        }
    }
}

// Functions to handle input changes
function changeColor() {
    let colorPicker = document.getElementById("colorPicker");
    selectedColor = hexToRgb(colorPicker.value);
    for (let settings of lineSettings) {
        settings.color = selectedColor;
    }
    redraw();
}

function changeLineWeight() {
    let lineWeight = document.getElementById("lineWeight").value;
    for (let settings of lineSettings) {
        settings.weight = parseInt(lineWeight);
    }
    redraw();
}

function changeNumLines() {
    let numLines = document.getElementById("numLines").value;
    for (let settings of lineSettings) {
        settings.num = parseInt(numLines);
    }
    redraw();
}

function changeLineAngle() {
    let lineAngle = document.getElementById("lineAngle").value;
    for (let settings of lineSettings) {
        settings.angle = radians(parseInt(lineAngle));
    }
    redraw();
}

function toggleAnimation() {
    animate = !animate;
}

// Utility function to convert hex color to rgb
function hexToRgb(hex) {
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}
