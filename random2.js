const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 30;
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
        x: 0
    };
}

function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);

    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 600 + 200;
        r.DrawLineEx({ x: x, y: 0 }, { x: x, y: world.window.height }, 5, r.WHITE);
    }

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