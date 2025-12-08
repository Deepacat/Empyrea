const teleports = {
    ow_up: {
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
    nether_to_ow: {
        condition: {
            dimension: "minecraft:the_nether",
            belowY: 0
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            text: "You feel a weight lifting as you return to the overworld...",
        }
    },
    end_to_ow: {
        condition: {
            dimension: "minecraft:the_end",
            belowY: 0
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
            text: "You feel ..",
        }
    },
    beneath_to_ow: {
        condition: {
            dimension: "spectrum:deeper_down",
            belowY: -320
        },
        target: {
            dimension: "minecraft:overworld",
            height: 320,
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

    for (let teleport in teleports) {
        let c = teleports[teleport].condition
        if (
            e.player.level.dimension == c.dimension &&
            (c.belowY && e.player.y < c.belowY ||
                c.aboveY && e.player.y > c.aboveY)
        ) {
            let target = teleports[teleport].target
            e.player.setStatusMessage(target.text)
            e.player.potionEffects.add('minecraft:darkness', 40, 0, true, false)
            e.player.teleportTo(target.dimension, e.player.x, target.height, e.player.z, e.player.yaw, e.player.pitch)
            e.player.persistentData.putInt('last_tp', Utils.server.tickCount)
            e.player.persistentData.putBoolean('next_fall_immune', true)
        }
    }
})

EntityEvents.hurt(e => {
    let nextFallImmune = e.entity.persistentData.getInt('next_fall_immune')
    if (nextFallImmune == null || nextFallImmune == false) { return }
    if (e.source.type().msgId() == 'fall' && nextFallImmune == true) {
        // delays the fall damage removal since some occurences cause 2 damage events at once (e.g. falling on farmland)
        e.entity.server.scheduleInTicks(2, () => { 
            e.entity.persistentData.putBoolean('next_fall_immune', false)
        })
        e.cancel()
    }
})