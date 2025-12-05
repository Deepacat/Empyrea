ServerEvents.recipes(e => {
    // amethyst/topaz/citrine ores from calcite
    e.recipes.botania.orechid('spectrum:amethyst_ore', 'minecraft:calcite', 3)
        .id('kubejs:botania/orechid/amethyst_ore')
    e.recipes.botania.orechid('spectrum:topaz_ore', 'minecraft:calcite', 1)
        .id('kubejs:botania/orechid/topaz_ore')
    e.recipes.botania.orechid('spectrum:citrine_ore', 'minecraft:calcite', 1)
        .id('kubejs:botania/orechid/citrine_ore')

    // magic ores from sourcestone
    e.recipes.botania.orechid('malum:deepslate_soulstone_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deepslate_soulstone_ore')
    e.recipes.botania.orechid('malum:brilliant_deepslate', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/brilliant_deepslate')
    e.recipes.botania.orechid('malum:natural_quartz_ore', 'ars_nouveau:sourcestone', 2)
        .id('kubejs:botania/orechid/natural_quartz_ore')
    e.recipes.botania.orechid('eidolon:deep_silver_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deep_silver_ore')
    e.recipes.botania.orechid('eidolon:deep_lead_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deep_lead_ore')
    e.recipes.botania.orechid('spectrum:deepslate_azurite_ore', 'ars_nouveau:sourcestone', 1)
        .id('kubejs:botania/orechid/deepslate_azurite_ore')

})