ServerEvents.tags('item', e => {
    e.add('kubejs:rare_mana', ['botania:mana_pearl', 'botania:mana_diamond'])

    e.remove('essentials:circuit_components', ['minecraft:quartz'])
    e.add('essentials:circuit_components', ['malum:natural_quartz'])

    // lava rod wont give it immunity when fished for some reason
    e.add('lychee:fire_immune', ['minecraft:netherrack'])
})

ServerEvents.tags('block', e => {
    e.add('minecraft:mineable/pickaxe', [
        'schematicannon:schematicannon'
    ])

    e.add('minecraft:mineable/axe', [
        'schematicannon:schematicannon'
    ])
})

EntityEvents.spawned(e => {
    if (e.entity.name.string != 'Netherrack') { return }
    e.server.tell(`netherrack drop`)
})