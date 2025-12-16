ServerEvents.recipes(e => {
    // rune recipes
    e.remove({ id: 'botania:runic_altar/mana' })
    e.recipes.botania.runic_altar('2x botania:rune_mana', [ // mana rune
        '#kubejs:rare_mana',
        'botania:manasteel_ingot',
        'botania:quartz_mana',
        'botania:mana_glass',
        'botania:mana_string',
        'ars_nouveau:source_gem',
    ], 5000).id('kubejs:mods/botania/runic_altar/mana')

    e.remove({ id: 'botania:runic_altar/air' })
    e.recipes.botania.runic_altar('2x botania:rune_air', [ // air rune
        'ars_nouveau:air_essence',
        'spectrum:shimmerstone_gem',
        'minecraft:feather',
        'minecraft:string',
        '#minecraft:wool_carpets',
        'botania:mana_powder'
    ], 5000).id('kubejs:mods/botania/runic_altar/air')

    e.remove({ id: 'botania:runic_altar/water' })
    e.recipes.botania.runic_altar('2x botania:rune_water', [ // water rune
        'spectrum:mermaids_gem',
        'spectrum:quitoxic_powder',
        'minecraft:fishing_rod',
        'botania:mana_powder',
        'botania:manasteel_ingot',
        'minecraft:sugar_cane'
    ], 5000).id('kubejs:mods/botania/runic_altar/water')

    e.remove({ id: 'botania:runic_altar/earth' })
    e.recipes.botania.runic_altar('2x botania:rune_earth', [ // earth rune
        'minecraft:andesite',
        'minecraft:coal_block',
        ['minecraft:red_mushroom', 'minecraft:brown_mushroom'],
        'minecraft:amethyst_block',
        'botania:mana_powder',
        'botania:manasteel_ingot'
    ], 5000).id('kubejs:mods/botania/runic_altar/earth')

    e.remove({ id: 'botania:runic_altar/fire' })
    e.recipes.botania.runic_altar('2x botania:rune_fire', [ // fire rune
        'minecraft:gunpowder',
        'minecraft:nether_brick',
        ['minecraft:nether_wart', 'minecraft:blaze_rod'],
        'botania:mana_powder',
        'botania:manasteel_ingot'
    ], 5000).id('kubejs:mods/botania/runic_altar/fire')

    e.remove({ id: 'ars_nouveau:novice_spell_book' })
    e.recipes.botania.runic_altar('ars_nouveau:novice_spell_book', [ // novice spell book
        'botania:rune_mana',
        'ars_nouveau:worn_notebook',
        'botania:manasteel_sword',
        'botania:manasteel_pick',
        'botania:manasteel_axe',
        'botania:manasteel_shovel',
    ], 25000).id('kubejs:mods/botania/runic_altar/novice_spell_book')
})