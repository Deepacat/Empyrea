ServerEvents.recipes(e => {
    /* -- orechid calcite to amethyst / topaz / citrine-- */
    // amethyst ore
    e.recipes.botania.orechid('spectrum:amethyst_ore', 'minecraft:calcite', 1) // spectrum amethyst ore
        .id('kubejs:botania/orechid/amethyst_ore')
    // topaz ore
    e.recipes.botania.orechid('spectrum:topaz_ore', 'minecraft:calcite', 1) // spectrum topaz ore
        .id('kubejs:botania/orechid/topaz_ore')
    // citrine ore
    e.recipes.botania.orechid('spectrum:citrine_ore', 'minecraft:calcite', 1) // spectrum citrine ore
        .id('kubejs:botania/orechid/citrine_ore')

    /* -- orechid sourcestone to magic ores */
    // malum soulstone
    e.recipes.botania.orechid('malum:deepslate_soulstone_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deepslate_soulstone_ore')
    // malum brilliant ore
    e.recipes.botania.orechid('malum:brilliant_deepslate', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/brilliant_deepslate')
    // malum natural quartz
    e.recipes.botania.orechid('malum:natural_quartz_ore', 'ars_nouveau:sourcestone', 2)
        .id('kubejs:botania/orechid/natural_quartz_ore')
    // malum cthonic gold
    e.recipes.botania.orechid('malum:cthonic_gold_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/cthonic_gold_ore')
    // eidolon silver
    e.recipes.botania.orechid('eidolon:deep_silver_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deep_silver_ore')
    // eidolon lead
    e.recipes.botania.orechid('eidolon:deep_lead_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deep_lead_ore')
    // spectrum azurite
    e.recipes.botania.orechid('spectrum:deepslate_azurite_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deepslate_azurite_ore')
    // wizards reborn Arcanum
    e.recipes.botania.orechid('wizards_reborn:deepslate_arcanum_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deepslate_arcanum_ore')

    /* -- orechid ignem ores */
    // netherrack hidden iesnium from netherrack
    e.recipes.botania.orechid_ignem('occultism:iesnium_ore_natural', 'netherrack', 2000)
        .id('kubejs:botania/orechid/netherrack_natural_iesnium')
    // nether salt from netherrack
    e.recipes.botania.orechid_ignem('wizards_reborn:nether_salt_ore', 'netherrack', 2000)
        .id('kubejs:botania/orechid/nether_salt_ore')
    // stratine from nether arcane gold ore
    e.recipes.botania.orechid_ignem('spectrum:stratine_ore', 'wizards_reborn:nether_arcane_gold_ore', 67)
        .id('kubejs:botania/orechid/stratine_ore')
    e.recipes.botania.orechid_ignem('minecraft:blackstone', 'wizards_reborn:nether_arcane_gold_ore', 33) // fail recipe
        .id('kubejs:botania/orechid/nether_gold_loss')
})
