// Meteor spawner block registry
const $BooleanProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.BooleanProperty")
global.meteor_spawned_prop = $BooleanProperty.create("meteor_spawned")

/** @param {Internal.BlockEntity} attractor */
global.attractorTick = (attractor) => {
    try {
        if (attractor.blockState.getValue(global.meteor_spawned_prop) == true) { return }
        let heightMapPos = attractor.level.getHeightmapPos("motion_blocking", attractor.blockPos)
        if (heightMapPos.below().y != attractor.blockPos.y) { return } // check if any blocks above
        let dayTime = attractor.level.dayTime()
        if (dayTime % 24000 < 13000) { return } // check if night time

        let rnd = rndFrom(0, 1000)
        if (rnd != 0) { return } // 1 in 1000 every second

        /** @type {Internal.Entity} */
        let meteorEntity = attractor.level // create the meteor entity
            .createEntity("kubejs:meteor")

        let meteorSpawnPos = Object.assign(
            { y: attractor.blockPos.y + 300 },
            rndPerimeter(attractor.blockPos.x, attractor.blockPos.z, 128)
        )
        meteorEntity.setPosition(meteorSpawnPos.x, meteorSpawnPos.y, meteorSpawnPos.z) // set the meteors position

        let attractorVec = new Vec3d(attractor.blockPos.x + 0.5, attractor.blockPos.y + 0.5, attractor.blockPos.z + 0.5)
        let delta = getMotionVec(meteorEntity.getPos(), attractorVec).scale(2) // create a motion vector for the meteor
        meteorEntity.setDeltaMovement(delta) // set the meteors motion
        meteorEntity.spawn() // spawn the meteor entity

        // uncharge the attractor, disabling getting it back when broken
        attractor.level.getBlock(attractor.blockPos).set('kubejs:astral_attractor', { meteor_spawned: true })

        // save movement data to nbt so it can be reset constantly
        meteorEntity.mergeNbt({ BalmData: { delta: { x: delta.x(), y: delta.y(), z: delta.z() } } })
    } catch (e) { console.log(e) }
}

StartupEvents.registry("block", (e) => {
    e.create("kubejs:astral_attractor", "cardinal")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .defaultCutout()
        .soundType("copper")
        .item(item => {
            item.tooltip(Text.gray("Allures shimmering clusters from above"))
            item.tooltip(Text.gray("Leave the attractor exposed to the sky and clear of any obstructions"))
        })
        .model("minecraft:block/furnace")
        .property(global.meteor_spawned_prop)
        .defaultState(state => { state.cycle(global.meteor_spawned_prop) })
        .blockEntity(blockInfo => {
            blockInfo.serverTick(20, 0, (entity) => {
                global.attractorTick(entity)
            })
        })
})
