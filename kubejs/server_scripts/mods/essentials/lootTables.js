LootJS.modifiers(e => {
    // replace quartz tag with natural quartz drop on advanced circuits
    e.addLootTableModifier(/essentials.*circuit/)
        .replaceLoot('#forge:gems/quartz', LootEntry.of('malum:natural_quartz'))

})