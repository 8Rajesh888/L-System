const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screenWidth = 400;
    const screenHeight = 400;
    const FPS = 60;
    const world = {};

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "Koch Curve");
    r.SetTargetFPS(FPS);

    return {
        window: {
            width: screenWidth,
            height: screenHeight,
        }
    };
}

function kochCurve(num) {
    if (num <= 0) return "F";
    let x = "";
    const preKochcurve = kochCurve(num - 1);

    for (let i = 0; i < preKochcurve.length; i++) {
        if (preKochcurve[i] === "F") {
            x += "F-F+F-F+F";
        }
        else {
            x += preKochcurve[i];
        }
    }

    return x;

}

// function drawKochCurve(x, y, totalLength, depth) {
//     if (depth === 0) return;
//     const curve = kochCurve(depth);
//     const segmentLength = totalLength / Math.pow(3, depth);
//     let X = x;
//     let Y = y;
//     let angle = 0;
//     const angleDelta = Math.PI / 2;
//     for (let i of curve) {
//         if (i === "F") {
//             let nextX = X + segmentLength * Math.cos(angle);
//             let nextY = Y + segmentLength * Math.sin(angle);
//             r.DrawLine(X, Y, nextX, nextY, r.WHITE);
//             X = nextX;
//             Y = nextY;
//         } else if (i === "+") {
//             angle += angleDelta;
//         } else if (i === "-") {
//             angle -= angleDelta;
//         }
//     }
// }


function drawKochCurve(x, y, length, depth) {
    let X = x;
    let Y = y;
    if (depth === 0) return;
    const curve = kochCurve(depth);
    // F+F−F−F+F
    let nextX = x + length;
    let nextY = y;
    let minus = true;
    let plus = 0;
    for (i of curve) {
        if (i === "F") {
            // console.log(X, Y, nextX, nextY);

            r.DrawLine(X, Y, nextX, nextY, r.WHITE);
            X = nextX;
            Y = nextY;
        }
        else if (i === "-") {
            nextY = minus ? Y + length : Y - length;
            minus = !minus;
        }
        else if (i === "+") {
            // nextY = Y - length;
            // nextY = plus ? Y - length : Y + length;
            // plus = !plus;
            if (plus++ === 2) {
                nextX = X - length;
                plus = 0;
            }
            nextX = X + length;
        }
    }
    r.DrawCircle(X, Y, 3, r.RED)
}

// function drawKochCurve(x, y, length, depth) {
//     if (depth === 0) return;

//     let nextX = x + length;
//     let nextY = y;
//     r.DrawLine(x, y, nextX, nextY, r.WHITE);
//     x = nextX;
//     y = nextY;

//     nextX = x;
//     nextY = y - length;
//     r.DrawLine(x, y, nextX, nextY, r.WHITE);
//     x = nextX;
//     y = nextY;

//     nextX = x + length;
//     nextY = y;
//     r.DrawLine(x, y, nextX, nextY, r.WHITE);
//     x = nextX;
//     y = nextY;

//     nextX = x;
//     nextY = y + length;
//     r.DrawLine(x, y, nextX, nextY, r.WHITE);
//     x = nextX;
//     y = nextY;

//     nextX = x + length;
//     nextY = y;
//     r.DrawLine(x, y, nextX, nextY, r.WHITE);

//     // next += length;
//     // nextY = length;
//     drawKochCurve(nextX, nextY, length, depth - 1);
// }

function update() { }

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    const x = 100;
    const y = world.window.height / 2;
    const length = 20;
    const depth = 2;

    r.DrawCircle(x, y, 5, r.BLUE);
    drawKochCurve(x, y, length, depth);

    r.EndDrawing();

}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};

// F + F−F−F + F
//     + F + F−F−F + F
// −F + F−F−F + F
// −F + F−F−F + F
//     + F + F−F−F + F