const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getFrequency(array, total, count) {
    const frequency = [];
    const part = total / count;
    for (let index = 0; index < count; index++) {
        frequency[index] = 0;
    }
    for (const element of array) {
        frequency[Math.floor(element / part)]++;
    }
    return frequency;
}

function getRandom(total) {
    const array = [];
    for (let index = 0; index < total; index++) {
        const fisrtRandom = Math.random() * 100;
        const secondRandom = Math.random() * 100;
        const thirdRandom = Math.random() * 100;
        const fourthRandom = Math.random() * 100;
        const fifthRandom = Math.random() * 100;

        const sum = (fisrtRandom + secondRandom + thirdRandom + fourthRandom + fifthRandom) / 5;
        array.push(sum)
    }
    return array;
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 30;
    const world = {};

    const totalPoints = 5000000;
    const array = getRandom(totalPoints);

    const maxValue = 100;
    const count = 50;
    const frequency = getFrequency(array, maxValue, count);

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
        frequency,
        totalPoints,
        count,
    };
}

function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);
    const maxFrequency = Math.max(...world.frequency);
    const xOffset = world.window.width / world.count;
    const yOffset = (world.window.height / maxFrequency);
    // console.log(world.window.height / maxFrequency);

    let x = xOffset;
    for (const element of world.frequency) {
        const y = world.window.width - element * yOffset;
        r.DrawCircle(x, y, 5, r.RED);
        x += xOffset;
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