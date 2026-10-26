const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandom() {
    const array = [];
    for (let index = 0; index < 20; index++) {
        const fisrtRandom = Math.random();
        const secondRandom = Math.random();
        const thirdRandom = Math.random();
        const fourthRandom = Math.random();
        const fifthRandom = Math.random();

        const sum = (fisrtRandom + secondRandom + thirdRandom + fourthRandom + fifthRandom) * 100;
        array.push(sum)
    }
    return array;
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 30;
    const world = {};

    const array = getRandom();

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
        },
        array
    };
}

function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);
    let count = 0;
    for (let index = 300; index < 500; index += 10) {
        const y = world.window.height - world.array[count++];
        r.DrawCircle(index, y, 5, r.RED)
    }
    // console.log(world.array);


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