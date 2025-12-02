ServerEvents.tags('block', e => { // tag setup for pebbles, remove default gardenofglass digging
    e.removeAll('gardenofglass:pebble_sources')
    e.add('kubejs:pebble_sources', [
        '#minecraft:dirt',
        '#minecraft:mud',
    ])
})

function rndFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Number} amount 
 */
function throwPebble(event, amount, volMult) {
    let soundType = event.block.blockState.soundType
    event.player.swing()
    event.block.popItemFromFace(
        Item.of('botania:pebble', rndFrom(amount[0], amount[1])),
        event.facing
    )
    event.level.playSound(
        null, event.block.pos.x, event.block.pos.y, event.block.pos.z,
        soundType.breakSound.location, 'blocks',
        (soundType.volume * volMult), (soundType.pitch + (Math.random() * 0.2 - 0.1)) // stole formula from botania code
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
        case 'kubejs:sifting_spade': {
            e.player.damageHeldItem(e.hand, 1, broken => { // damage spade
                // play tool break noise because it doesn't by default for some reason
                e.level.playSound(null, e.block.pos.x, e.block.pos.y, e.block.pos.z, 'entity.item.break', 'players', 1, 1)
            })
            throwPebble(e, [2, 5], 0.6)
            break
        }
        case 'minecraft:air': {
            throwPebble(e, [1, 2], 0.4)
            break
        }
        case 'botania:pebble': {
            throwPebble(e, [1, 2], 0.4)
            break
        }
        default: break
    }
})
