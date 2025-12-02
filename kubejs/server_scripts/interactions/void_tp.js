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

PlayerEvents.tick(e => {
    let p = e.player
    let pDim = p.level.dimension
    let pHeight = p.y

    for (let teleport in teleports) {
        let c = teleports[teleport].condition
        if (
            pDim == c.dimension &&
            (c.belowY && pHeight < c.belowY) ||
            (c.aboveY && pHeight > c.aboveY)
        ) {
            let target = teleports[teleport].target
            p.setStatusMessage(target.text)
            p.potionEffects.add('minecraft:darkness', 40, 0, true, false)
            p.teleportTo(target.dimension, p.x, target.height, p.z, p.yaw, p.pitch)
        }
    }
})