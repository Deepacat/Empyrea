function rndFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
* @param {Vec3d|Object} sourceVecObj
* @param {Vec3d|Object} targetVecObj
* @returns {Vec3d}
* Gets a motion vector from one position to another
*/
function getMotionVec(sourceVecObj, targetVecObj) {
    let startVec = sourceVecObj instanceof Vec3d ? sourceVecObj : new Vec3d(sourceVecObj.x, sourceVecObj.y, sourceVecObj.z)
    let endVec = targetVecObj instanceof Vec3d ? targetVecObj : new Vec3d(targetVecObj.x, targetVecObj.y, targetVecObj.z)
    return endVec.subtract(startVec).normalize()
}