
function sqr(n) {
    return n * n;
}


function sqrt(n) {
    return n ** 0.5;
}


function distanceBtwnTwoPoints() {
    return sqrt(sqr((circle1x - circle2x)) + sqr((circle1y - circle2y)));
}



function getCenter(center, centerofrect, size) {
    return center + (centerofrect - size) / 2;
}
