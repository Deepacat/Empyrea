ServerEvents.recipes(e => {
    e.remove({ id: 'ars_nouveau:novice_spell_book' })
    e.recipes.botania.runic_altar('ars_nouveau:novice_spell_book', [
        'botania:rune_mana',
        'ars_nouveau:worn_notebook',
        'botania:manasteel_sword',
        'botania:manasteel_pick',
        'botania:manasteel_axe',
        'botania:manasteel_shovel',
    ])
})