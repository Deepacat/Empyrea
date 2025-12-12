// file for mass recipe removals or 
// removals for recipes that aren't replaced directly with another recipe

ServerEvents.recipes(e => {
    // fish infusion cycle
    e.remove({ id: 'botania:mana_infusion/pufferfish_to_cod' })
    e.remove({ id: 'botania:mana_infusion/cod_to_salmon' })
    e.remove({ id: 'botania:mana_infusion/salmon_to_tropical_fish' })
    e.remove({ id: 'botania:mana_infusion/tropical_fish_to_pufferfish' })

    // mesh to obsidian
    e.remove({ id: 'botania:pure_daisy/obsidian' })

    // Ars skyblock essence recipe removals
    e.remove({ id: 'ars_nouveau:conjuration_essence_to_end_stone' })
    e.remove({ id: 'ars_nouveau:conjuration_essence_to_soul_sand' })
    e.remove({ id: 'ars_nouveau:fire_essence_to_magma_block' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_andesite' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_calcite' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_deepslate' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_diorite' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_granite' })
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_tuff' })
    e.remove({ id: 'minecraft:pointed_dripstone' }) // water essence and 4 stone from ars caelum, why mc namespace??

})  