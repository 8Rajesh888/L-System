// const sketch = require("./kochCurve");
// const sketch = require("./sketch");
const sketch = require("./parallelogram");
// const sketch = require("./circle");
// const sketch = require("./random4");
// const sketch = require("./random3");
// const sketch = require("./random2");
// const sketch = require("./random1");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
}

main();