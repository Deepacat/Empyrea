// Refills (repairs durability of) the watering can
ItemEvents.firstRightClicked("kubejs:watering_can", e => {
    if (e.target.block == null) return
    if (!e.target.block.id == 'minecraft:water') return

    e.item.damageValue = Math.max(    0,    e.item.damageValue - 21)
    e.player.swing(e.hand, true)

    let { x, y, z } = e.target.block
    e.level.playSound(null, x + 0.5, y + 0.5, z + 0.5,
        "minecraft:item.bucket.fill", "blocks", 0.5,
        Math.random() * (1.1 - 1) + 1)
    e.level.spawnParticles('minecraft:falling_water',
        false, x + 0.5, y + 1, z + 0.5,
        0.3, 0.4, 0.3, 20, 0)
})