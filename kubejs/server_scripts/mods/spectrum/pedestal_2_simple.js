// tier 2 CMY upgraded pedestal recipes

ServerEvents.recipes(e => {
    e.custom({
        "type": "spectrum:pedestal",
        "time": 200, "tier": "simple", "experience": 1,
        "magenta": 0, "yellow": 32, "cyan": 0, "black": 0, "white": 0,
        "result": {
            "item": 'minecraft:lava_bucket',
            "count": 1
        },
        "pattern": [
            "ABA",
            "CDC",
            "EBE"
        ],
        "key": {
            "A": { "item": 'spectrum:orange_pigment' },
            "B": { "item": 'spectrum:mermaids_gem' },
            "C": { "item": 'ars_nouveau:fire_essence' },
            "D": { "item": 'minecraft:bucket' },
            "E": { "item": 'minecraft:magma_block' },
        }
    }).id('kubejs:spectrum/pedestal/lava_bucket')
})