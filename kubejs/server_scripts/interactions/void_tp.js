const teleports = {
    ow_up: { // teleport back to top of overworld
        condition: {
            dimension: "minecraft:overworld",
            belowY: -67
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            text: "You blink and appear in the sky...",
        }
    },
    nether_to_ow: { // teleport back to overworld from nether void
        condition: {
            dimension: "minecraft:the_nether",
            belowY: -3
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            spawnpoint: true,
            text: "You feel a weight lifting as you return to the overworld...",
        }
    },
    end_to_ow: { // teleport back to overworld from end void
        condition: {
            dimension: "minecraft:the_end",
            belowY: -3
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            spawnpoint: true,
            text: "You feel ..",
        }
    },
    beneath_to_ow: { // teleport back to overworld from deeper down/beneath void
        condition: {
            dimension: "spectrum:deeper_down",
            belowY: -320
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            spawnpoint: true,
            text: "You feel your soul being pulled to the above...",
        }
    }
}

PlayerEvents.loggedIn(e => {
    e.player.persistentData.putInt('last_tp', Utils.server.tickCount)
})

// teleports
PlayerEvents.tick(e => {
    let lastTp = e.player.persistentData.getInt('last_tp')
    if (lastTp == null) {
        e.player.persistentData.putInt('last_tp', 0)
    }

    if (Utils.server.tickCount - lastTp < 20) { return }

    for (let [k, teleport] of Object.entries(teleports)) {
        let c = teleport.condition

        if (
            e.player.level.dimension == c.dimension &&
            (c.belowY !== undefined && (e.player.y < c.belowY))
        ) {
            let target = teleport.target
            e.player.setStatusMessage(target.text)
            e.player.potionEffects.add('minecraft:darkness', 40, 0, true, false)

            let tpx = target.spawnpoint ? e.player.nbt.getInt('SpawnX') : e.player.x
            let tpz = target.spawnpoint ? e.player.nbt.getInt('SpawnZ') : e.player.z

            e.player.teleportTo(target.dimension, tpx, target.height, tpz, e.player.yaw, e.player.pitch)
            e.player.persistentData.putInt('last_tp', Utils.server.tickCount)
            e.player.persistentData.putBoolean('next_fall_immune', true)
        }
    }
})

// Fall damage cancelling
EntityEvents.hurt(e => {
    let nextFallImmune = e.entity.persistentData.getInt('next_fall_immune')
    if (nextFallImmune == null || nextFallImmune == false) { return }
    if (e.source.type().msgId() == 'fall' && nextFallImmune == true) {
        // delays the fall damage removal since some occurences cause 2 damage events at once (e.g. falling on farmland)
        e.entity.server.scheduleInTicks(5, () => {
            // e.player.tell(`fall dmg removed fall immune`)
            e.entity.persistentData.putBoolean('next_fall_immune', false)
        })
        e.cancel()
    }
})

PlayerEvents.tick(e => {
    if (Utils.server.tickCount % 20 !== 0) return
    if (
        e.player.persistentData.getBoolean('next_fall_immune') &&
        e.player.getMotionY().toFixed(3) == -0.078 &&
        e.player.onGround()
    ) {
        // e.player.tell(`tick removed fall immune`)
        e.entity.persistentData.putBoolean('next_fall_immune', false)
    }
})