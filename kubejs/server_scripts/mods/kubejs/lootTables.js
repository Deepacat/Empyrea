LootJS.modifiers(e => {
    e.addBlockLootModifier('kubejs:astral_attractor')
        .removeLoot('kubejs:astral_attractor')
        .apply(ctx => {
            let spawned = ctx.destroyedBlock.blockState.getValue(global.meteor_spawned_prop)
            if (spawned == false) {
                ctx.addLoot(LootEntry.of('kubejs:astral_attractor'))
            }
        })
})
