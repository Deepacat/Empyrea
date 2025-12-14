LootJS.modifiers(e => {
    // only let astral attractor drop if it does not have the meteor spawned blockstate
    e.addBlockLootModifier('kubejs:astral_attractor')
        .removeLoot('kubejs:astral_attractor')
        .apply(ctx => {
            let spawned = ctx.destroyedBlock.blockState.getValue(global.meteor_spawned_prop)
            if (spawned == false) {
                ctx.addLoot(LootEntry.of('kubejs:astral_attractor'))
            }
        })
})
