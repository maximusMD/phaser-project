export function getAngle(obj2, obj1) {
    var angleRadians = Math.atan2(obj2.getCenter().y - obj1.getCenter().y, obj2.getCenter().x - obj1.getCenter().x);
    // angle in degrees
    var angleDeg = (Math.atan2(obj2.getCenter().y - obj1.getCenter().y, obj2.getCenter().x - obj1.getCenter().x) * 180 / Math.PI);
    return { angleDeg, angleRadians }
}