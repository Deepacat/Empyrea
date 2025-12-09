ServerEvents.recipes(e => {
    e.remove({ id: 'spectrum:potion_workshop_crafting/lava_bucket' })

    e.custom({
        "type": "spectrum:potion_workshop_crafting",
        "base_ingredient": {
            "item": "minecraft:bucket"
        },
        "use_up_base_ingredient": true,
        "color": 13387304,
        "ingredient1": {
            "item": "spectrum:orange_pigment",
            "count": 4
        },
        "result": {
            "item": "minecraft:lava_bucket"
        }
    }).id('kubejs:spectrum/potion_workshop_crafting/lava_bucket')
})
