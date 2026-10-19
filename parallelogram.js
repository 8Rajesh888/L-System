const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getEdges(point, v1, v2) {
    const side = v2.side * Math.tan(v2.angle);
    const e1 = point;
    const e2 = {
        x: point.x + v1.side,
        y: point.y,
    };
    const e3 = {
        x: point.x - side,
        y: point.y + v2.side,
    }
    const e4 = {
        x: e2.x - side,
        y: e3.y,
    }
    // console.log(e1, e2, e3, e4);
    return {
        0: e1,
        1: e2,
        2: e4,
        3: e3,
    }
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 30;
    const world = {};
    const point = {
        x: 300,
        y: 300,
    };
    const vec1 = {
        side: 600,
        angle: 0,
    };
    const vec2 = {
        side: 350,
        angle: 120,
    };
    const points = getEdges(point, vec1, vec2);

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
        points,
    };
}

function update(world) {
    world.cf++;
}

function draw(world) {
    const p = world.points;

    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);

    for (let i = 0; i < 4; i++) {
        r.DrawLineEx(p[i], p[(i + 1) % 4], 3, r.BLACK);
    }

    // r.DrawRectangleLines(100, 100, 200, 300, r.BEIGE)
    // for (let i = 0; i < 100; i++) {
    //     const x = Math.random() * 200 + 100;
    //     const y = Math.random() * 300 + 100;
    //     const colour = world.palatte[i % 5];
    //     r.DrawCircle(x, y, 5, colour);
    // }

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