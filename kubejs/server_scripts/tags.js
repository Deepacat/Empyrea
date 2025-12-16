ServerEvents.tags('item', e => {
    e.add('kubejs:rare_mana', ['botania:mana_pearl', 'botania:mana_diamond'])

    e.remove('essentials:circuit_components', ['minecraft:quartz'])
    e.add('essentials:circuit_components', ['malum:natural_quartz'])
})

ServerEvents.tags('block', e => {
    e.add('minecraft:mineable/pickaxe', [
        'schematicannon:schematicannon'
    ])

    e.add('minecraft:mineable/axe', [
        'schematicannon:schematicannon'
    ])
})