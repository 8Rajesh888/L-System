const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandom(total) {
    const array = [];
    for (let index = 0; index < total; index++) {
        const fisrtRandom = Math.random() * 500;
        const secondRandom = Math.random() * 500;

        array.push({ x: fisrtRandom, y: secondRandom })
    }
    return array;
}

function getTotal(array, radius, startX, startY) {
    let count = 0;
    for (const { x, y } of array) {
        if (isInsideCircle(x - startX, y - startY, radius)) {
            count++;
        }
    }
    return count;
}

function setup() {
    const screenWidth = 1000;
    const screenHeight = 1000;
    const FPS = 60;
    const world = {};
    const points = {
        total: 1000000,
    };
    const rectangle = {
        x: 250,
        y: 250,
        width: 500,
        height: 500,
    };
    const circle = {
        x: 500,
        y: 500,
        radius: 200,
    }

    const array = getRandom(points.total);
    points.getInsideCircle = getTotal(array, circle.radius, rectangle.x, rectangle.y);
    const areaOf = {
        sqaure: rectangle.height ** 2,
        actualCircle: Math.PI * circle.radius ** 2,
    }
    areaOf.derivedCircle = areaOf.sqaure * (points.getInsideCircle / points.total),

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
        array,
        points,
        rectangle,
        circle,
        areaOf,
    };
}

function isInsideCircle(x, y, radius) {
    return (x ** 2 + y ** 2) < (radius ** 2);
}
function update(world) {
    world.cf++;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.SKYBLUE);
    const rect = world.rectangle;
    const circle = world.circle;

    r.DrawRectangleLines(rect.x, rect.y, rect.width, rect.height, r.RED);
    r.DrawCircleLines(circle.x, circle.y, circle.radius, r.RED);
    r.DrawText(`Total : ${world.points.total}`, 10, 10, 20, r.GOLD);
    r.DrawText(`Inside Circle : ${world.points.getInsideCircle}`, 200, 10, 20, r.GOLD);

    let y = 750;
    for (const [key, value] of Object.entries(world.areaOf)) {
        r.DrawText(` ${key}  :${value}`, 10, y, 20, r.GOLD);
        y += 50;
    }
    for (let index = 0; index < world.array.length; index++) {
        const { x, y } = world.array[index];
        let colour = world.palatte[index % 5];
        if (isInsideCircle(x - rect.x, y - rect.y, circle.radius)) {
            colour = r.BLACK;
        };
        r.DrawCircle(rect.x + x, rect.y + y, 2, colour);

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