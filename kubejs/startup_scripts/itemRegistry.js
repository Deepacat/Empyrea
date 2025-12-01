StartupEvents.registry('item', e => {
    e.create('kubejs:sifting_spade')
        .maxDamage(128)
        .texture('quark:item/trowel')
        .color('#8e8e8e')

    e.create('kubejs:watering_can')
        .maxDamage(64)
        .texture('supplementaries:item/faucet')
        .color('#0080ff')
})