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
        palatte: {
            0: r.RED,
            1: r.GREEN,
            2: r.YELLOW,
            3: r.GOLD,
            4: r.PURPLE,
        }
    };
}

function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * world.window.width;
        const y = Math.random() * world.window.height;
        const colour = world.palatte[i % 5];
        r.DrawCircle(x, y, 5, colour);
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