// tier 2 CMY upgraded pedestal recipes

ServerEvents.recipes(e => {
    e.custom({
        "type": "spectrum:pedestal",
        "time": 200, "tier": "simple", "experience": 1,
        "magenta": 0, "yellow": 0, "cyan": 10, "black": 0, "white": 0,
        "result": {
            "item": 'spectrum:lagoon_rod',
            "count": 1
        },
        "pattern": [
            "  B",
            " AC",
            "B C"
        ],
        "key": {
            "A": { "tag": 'kubejs:rare_mana' },
            "B": { "item": 'spectrum:polished_basalt' },
            "C": { "item": 'botania:mana_string' },
        }
    }).id('kubejs:spectrum/pedestal/lagoon_rod_mana')
})