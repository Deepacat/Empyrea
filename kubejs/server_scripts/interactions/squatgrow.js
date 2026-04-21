const $BonemealEvent = Java.loadClass('net.minecraftforge.event.entity.player.BonemealEvent')
const $BonemealableBlock = Java.loadClass('net.minecraft.world.level.block.BonemealableBlock')

PlayerEvents.tick(e => {
    const { player, level } = e

    if (!player.isShiftKeyDown()) { // When unshifting ready up a sneak grow
        player.persistentData.putBoolean('sneak_grow_ready', true)
        return
    }

    if (!player.isHoldingInAnyHand('kubejs:watering_can')) return
    // Make sure the player has a sneak grow available (Standing)
    if (!player.persistentData.getBoolean('sneak_grow_ready')) return
    // Remove the sneak grow ready state so player has to unshift to use again
    player.persistentData.putBoolean('sneak_grow_ready', false)

    // hand used for the swing anim
    let handUsed = player.mainHandItem == 'kubejs:watering_can' ? 'MAIN_HAND' : 'OFF_HAND'

    let center = player.blockPosition()
    // 5x1x5 area to check for bonemealable blocks
    for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
            let pos = center.offset(dx, 0, dz)
            let blockState = level.getBlockState(pos)
            let block = blockState.getBlock()

            if (blockState.isAir()) continue // skip air blocks
            // Attempt starting a bonemeal event on the block
            let event = new $BonemealEvent(player, level, pos, blockState, Item.of('bone_meal'))

            if (event.isCanceled()) continue // skip if bonemeal event is canceled (Can't bonemeal)

            if (block instanceof $BonemealableBlock) {
                if (block.isValidBonemealTarget(level, pos, blockState, false)) { // Double check valid bonemeal target
                    if (block.isBonemealSuccess(level, level.random, pos, blockState)) { // Currently bonemealable check
                        let heldItem = player.getHeldItem(handUsed)
                        // Prevent breaking watering can
                        if ((heldItem.maxDamage - heldItem.damageValue) == 1) {
                            player.setStatusMessage(`Your watering can must be refilled.`)
                            return
                        }
                        player.damageHeldItem(handUsed, 1)

                        block.performBonemeal(level, level.random, pos, blockState) // Apply bonemeal
                        // I don't know what this is or the number ID but AI found it and it makes particles and noise happen so that's cool
                        level.levelEvent(1505, pos, 0)
                        player.swing(handUsed, true)

                    }
                }
            }
        }
    }
})