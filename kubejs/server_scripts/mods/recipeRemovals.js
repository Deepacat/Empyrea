// file for mass recipe removals or 
// removals for recipes that aren't replaced directly with another recipe

ServerEvents.recipes(e => {
    // fish infusion cycle
    e.remove({ id: 'botania:mana_infusion/pufferfish_to_cod' })
    e.remove({ id: 'botania:mana_infusion/cod_to_salmon' })
    e.remove({ id: 'botania:mana_infusion/salmon_to_tropical_fish' })
    e.remove({ id: 'botania:mana_infusion/tropical_fish_to_pufferfish' })
})