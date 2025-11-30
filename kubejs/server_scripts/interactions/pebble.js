ServerEvents.tags('block', e => {
    e.removeAll('gardenofglass:pebble_sources')
    e.add('kubejs:pebble_sources', [
        '#minecraft:dirt',
        '#minecraft:mud',
    ])
})

function rndFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function throwPebble(event, amount) {
    event.player.swing()
    event.block.popItemFromFace(
        Item.of('botania:pebble', rndFrom(amount[0], amount[1])),
        event.facing
    )
    let soundType = event.block.blockState.soundType
    event.level.playSound(
        null,
        event.block.pos.x, event.block.pos.y, event.block.pos.z,
        soundType.breakSound.location, 'block',
        soundType.volume * 0.4, soundType.pitch + (Math.random() * 0.2 - 0.1)
    )
}

BlockEvents.rightClicked(e => {
    if (
        e.block.hasTag('kubejs:pebble_sources') == false ||
        e.player.shiftKeyDown == false ||
        e.hand == 'OFF_HAND' ||
        e.player.fake == true
    ) { return }

    switch (e.item.id) {
        case 'kubejs:sifting_spade':
            e.player.damageHeldItem(e.hand, 1)
            throwPebble(e, [2, 5])
            break
        case 'minecraft:air':
            throwPebble(e, [1, 2])
            break
        case 'botania:pebble':
            throwPebble(e, [1, 2])
            break
        default:
            break
    }
})
