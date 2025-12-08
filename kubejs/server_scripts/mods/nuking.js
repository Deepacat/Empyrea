
global.nukelist = [
    // routers (all but activator router and module base rn)
    'modularrouters:breaker_module', 'modularrouters:detector_module', 'modularrouters:distributor_module',
    'modularrouters:dropper_module', 'modularrouters:energy_distributor_module', 'modularrouters:energy_output_module',
    'modularrouters:extruder_module_1', 'modularrouters:extruder_module_2', 'modularrouters:fluid_module',
    'modularrouters:fluid_module_2', 'modularrouters:placer_module', 'modularrouters:player_module',
    'modularrouters:puller_module_1', 'modularrouters:puller_module_2', 'modularrouters:sender_module_1',
    'modularrouters:sender_module_2', 'modularrouters:sender_module_3', 'modularrouters:vacuum_module',
    'modularrouters:void_module', 'modularrouters:blast_upgrade', 'modularrouters:energy_upgrade',
    'modularrouters:fluid_upgrade', 'modularrouters:speed_upgrade', 'modularrouters:stack_upgrade',
    'modularrouters:fast_pickup_augment', 'modularrouters:filter_round_robin_augment',
    'modularrouters:pickup_delay_augment', 'modularrouters:pushing_augment', 'modularrouters:range_up_augment',
    'modularrouters:range_down_augment', 'modularrouters:stack_augment', 'modularrouters:xp_vacuum_augment',
    'modularrouters:creative_module', 'modularrouters:flinger_module', 'modularrouters:mimic_augment',
    'modularrouters:bulk_item_filter', 'modularrouters:inspection_filter', 'modularrouters:mod_filter',
    'modularrouters:regex_filter', 'modularrouters:tag_filter', 'modularrouters:augment_core',
    'modularrouters:blank_upgrade', 'modularrouters:override_card', 'modularrouters:redstone_augment',
    'modularrouters:regulator_augment', 'modularrouters:sync_upgrade', 'modularrouters:security_upgrade',
    'modularrouters:muffler_upgrade', 'modularrouters:camouflage_upgrade'
]


// in game nuking actions
ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom(global.nukelist)
    event.add("kubejs:nuked", global.nukelist)
    event.add("c:hidden_from_recipe_viewers", global.nukelist)
})

ServerEvents.tags("block", (event) => {
    event.removeAllTagsFrom(global.nukelist)
})

ServerEvents.tags("fluid", (event) => {
    event.removeAllTagsFrom(global.nukelist)
    event.add("kubejs:nuked", global.nukelist)
    event.add("c:hidden_from_recipe_viewers", global.nukelist)
})

ServerEvents.recipes((event) => {
    event.remove({ input: global.nukelist })
    event.remove({ output: global.nukelist })
})

LootJS.modifiers((event) => {
    event.addLootTypeModifier(
        LootType.ENTITY,
        LootType.UNKNOWN,
        LootType.BLOCK,
        LootType.CHEST,
        LootType.FISHING,
        LootType.GIFT,
        LootType.ADVANCEMENT_ENTITY,
        LootType.ADVANCEMENT_REWARD,
        LootType.PIGLIN_BARTER
    ).removeLoot(global.nukelist)
})