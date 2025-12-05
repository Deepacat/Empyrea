// tier 1 C/M/Y un-upgraded pedestal recipes

ServerEvents.recipes(e => {
    e.custom({
        "type": "spectrum:pedestal",
        "time": 200, "tier": "basic", "experience": 1,
        "magenta": 0, "yellow": 10, "cyan": 10, "black": 0, "white": 0,
        "result": {
            "item": 'ars_nouveau:green_archwood_sapling',
            "count": 1
        },
        "pattern": [
            " A ",
            "ABA",
            " A "
        ],
        "key": {
            "A": { "tag": 'forge:dusts/mana' },
            "B": { "item": 'minecraft:jungle_sapling' },
        }
    }).id('kubejs:spectrum/pedestal/flourishing_sapling')
})