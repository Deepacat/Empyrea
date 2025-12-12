ServerEvents.recipes(e => {
    // amethyst/topaz/citrine ores from calcite
    e.recipes.botania.orechid('spectrum:amethyst_ore', 'minecraft:calcite', 3) // spectrum amethyst ore
        .id('kubejs:botania/orechid/amethyst_ore')
    e.recipes.botania.orechid('spectrum:topaz_ore', 'minecraft:calcite', 1) // spectrum topaz ore
        .id('kubejs:botania/orechid/topaz_ore')
    e.recipes.botania.orechid('spectrum:citrine_ore', 'minecraft:calcite', 1) // spectrum citrine ore
        .id('kubejs:botania/orechid/citrine_ore')

    // magic ores from sourcestone
    e.recipes.botania.orechid('malum:deepslate_soulstone_ore', 'ars_nouveau:sourcestone', 1) // malum soulstone 
        .id('kubejs:botania/orechid/deepslate_soulstone_ore')
    e.recipes.botania.orechid('malum:brilliant_deepslate', 'ars_nouveau:sourcestone', 1) // malum brilliant
        .id('kubejs:botania/orechid/brilliant_deepslate')
    e.recipes.botania.orechid('malum:natural_quartz_ore', 'ars_nouveau:sourcestone', 2) // malum natural quartz
        .id('kubejs:botania/orechid/natural_quartz_ore')
    e.recipes.botania.orechid('malum:cthonic_gold_ore', 'ars_nouveau:sourcestone', 1) // malum cthonic gold
        .id('kubejs:botania/orechid/cthonic_gold_ore')
    e.recipes.botania.orechid('eidolon:deep_silver_ore', 'ars_nouveau:sourcestone', 1) // eidolon silver
        .id('kubejs:botania/orechid/deep_silver_ore')
    e.recipes.botania.orechid('eidolon:deep_lead_ore', 'ars_nouveau:sourcestone', 1) // eidolon lead
        .id('kubejs:botania/orechid/deep_lead_ore')
    e.recipes.botania.orechid('spectrum:deepslate_azurite_ore', 'ars_nouveau:sourcestone', 1) // spectrum azurite
        .id('kubejs:botania/orechid/deepslate_azurite_ore')


})