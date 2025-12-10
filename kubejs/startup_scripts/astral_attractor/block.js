// Meteor spawner block registry
const $BooleanProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.BooleanProperty")
global.meteor_spawned_prop = $BooleanProperty.create("meteor_spawned")

/** @param {Internal.BlockEntity} attractor */
global.attractorSpawnMeteor = (attractor) => {
    try {
        if (attractor.blockState.getValue(global.meteor_spawned_prop) == true) { return }
        let heightMapPos = attractor.level.getHeightmapPos("motion_blocking", attractor.blockPos)
        if (heightMapPos.below().y != attractor.blockPos.y) { return } // check if any blocks above
        let dayTime = attractor.level.dayTime()
        if (dayTime % 24000 < 13000) { return } // check if night time

        let rnd = rndFrom(0, 1000)
        rnd = 0
        if (rnd != 0) { return } // 1 in 1000 every second

        /** @type {Internal.Entity} */
        let meteorEntity = attractor.level // create the meteor entity
            .createEntity("kubejs:meteor")

        let rndPos = Object.assign(
            { y: attractor.blockPos.y + 300 },
            rndPerimeter(attractor.blockPos.x, attractor.blockPos.z, 128)
        )

        // let chunkCoords = { x: Math.floor(rndPos.x / 16), z: Math.floor(rndPos.z / 16) }
        // let coordVec = Vec3d(rndPos.x, rndPos.y, rndPos.z)

        // console.log(`blockpos: ${rndPos.x}, ${rndPos.y}, ${rndPos.z}`)
        // console.log(`chunkpos: ${chunkCoords.x}, ${chunkCoords.z}`)
        // console.log(level.getChunkAt(coordVec).getFullStatus())

        let meteorSpawnPos = rndPos

        meteorEntity.setPosition(meteorSpawnPos.x, meteorSpawnPos.y, meteorSpawnPos.z)

        let attractorVec = new Vec3d(attractor.blockPos.x + 0.5, attractor.blockPos.y + 0.5, attractor.blockPos.z + 0.5)

        let delta = getMotionVec(meteorEntity.getPos(), attractorVec).scale(2)
        meteorEntity.setDeltaMovement(delta)
        meteorEntity.spawn()

        attractor.level.getBlock(attractor.blockPos).set('kubejs:astral_attractor', { meteor_spawned: true })

        // // debug spawn position
        Utils.server.tell(`spawning emetor at ${meteorSpawnPos.x}, ${meteorSpawnPos.y}, ${meteorSpawnPos.z}`)

        // save movement data to nbt so it can be reset constantly
        meteorEntity.mergeNbt({ BalmData: { delta: { x: delta.x(), y: delta.y(), z: delta.z() } } })
        meteorEntity.mergeNbt({ BalmData: { target: { x: attractor.blockPos.x, y: attractor.blockPos.y, z: attractor.blockPos.z  } } })
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
        .property(meteor_spawned)
        .defaultState(state => { state.cycle(global.meteor_spawned_prop) })
        .blockEntity(blockInfo => {
            blockInfo.serverTick(20, 0, (entity) => {
                global.attractorSpawnMeteor(entity)
            })
        })
})
