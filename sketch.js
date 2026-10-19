const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 60;
    const world = {};

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);

    return {
        window: {
            width: screenWidth,
            height: screenHeight,
        },
        cf: 0,
    };
}

// function fractalTree(num) {
//     if (num <= 0) return "0";
//     let x = "";
//     const preFractalTree = fractalTree(num - 1);

//     for (let i = 0; i < preFractalTree.length; i++) {
//         if (preFractalTree[i] === "1") {
//             x += "11";
//         } else if (preFractalTree[i] === "0") {
//             x += "1[0]0";
//         }
//         else {
//             x += preFractalTree[i];
//         }
//     }
//     console.log(preFractalTree);

//     return x;

// }

function drawFractalTree(x, y, length, angle, depth) {
    if (depth === 0) return;

    const nextX = x + Math.cos(angle) * length;
    const nextY = y + Math.sin(angle) * length;
    r.DrawLine(x, y, nextX, nextY, r.WHITE);

    const nextLength = length * 0.8;

    drawFractalTree(nextX, nextY, nextLength, angle - Math.PI / 6, depth - 1);
    drawFractalTree(nextX, nextY, nextLength, angle + Math.PI / 6, depth - 1);
}

function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    const x = world.window.width / 2;
    const y = world.window.height - 150;
    const length = 120;
    const angle = -Math.PI / 2;
    const depth = 20;

    drawFractalTree(x, y, length, angle, depth);

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