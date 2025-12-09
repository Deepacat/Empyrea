ServerEvents.recipes(e => {
    e.remove({ id: 'ars_nouveau:novice_spell_book' })
    e.recipes.botania.runic_altar('ars_nouveau:novice_spell_book', [
        'botania:rune_mana',
        'ars_nouveau:worn_notebook',
        'botania:manasteel_sword',
        'botania:manasteel_pick',
        'botania:manasteel_axe',
        'botania:manasteel_shovel',
    ], 25000).id('kubejs:mods/botania/runic_altar/novice_spell_book')

    e.remove({ id: 'botania:runic_altar/mana' })
    e.recipes.botania.runic_altar('botania:rune_mana', [
        '#kubejs:rare_mana',
        'botania:manasteel_ingot',
        'botania:quartz_mana',
        'botania:mana_glass',
        'botania:mana_string',
        'ars_nouveau:source_gem',
    ], 3000).id('kubejs:mods/botania/runic_altar/mana')
})