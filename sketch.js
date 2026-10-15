const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screenWidth = 400;
    const screenHeight = 400;
    const FPS = 20;
    const world = {};

    r.SetTraceLogLevel(r.LOG_DEBUG);
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);

    return world;
}

function update() {

}

function draw() {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);



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