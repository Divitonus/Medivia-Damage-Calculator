# Mage and druid damage mechanics

Tagging: see [README.md](README.md). Armor: see [damage-taken.md](damage-taken.md).

Mages and druids share these mechanics (**Assumed** for anything beyond these pages): the compendium pages below name both vocations together and give nothing that separates them.

**Source for everything marked Confirmed:** the in-game compendium (Intelligence, Wands and Small Explosive Runes pages). Nothing on this page has been tested in game yet.

## 1. Intelligence — Confirmed

A stat from equipment and temporary effects only. Only mages and druids benefit from it.

| Effect | Per point |
| --- | --- |
| Spellpower | +1 |

What the Intelligence page says about where it comes from:
- The amount of Intelligence an item grants is determined by its Item Rank.
- Many equipment pieces and magical weapons provide Intelligence, either as a fixed Property or as a randomized Attribute.
- Items with higher rarity or rank often provide more Intelligence.
- Certain consumables, such as the Green Witches Potion, can temporarily increase it.

**Not stated:** the Intelligence value of any specific item.

## 2. Wands — Confirmed

Magical weapons used only by mages and druids. They store elemental energy and may require a certain magic level to be equipped.

- Equipped in the hand slot of the Inventory. They shoot automatically at the selected target.
- Each use consumes a fixed amount of charges. The "Recharge Wand" spell, available to all mages and druids, recharges them.
- Starter wands do not consume any mana when used.
- They deal elemental damage based on the wand's type. Some wands may also apply extra effects, such as damage over time.

**Not stated:** the damage formula of a wand's own attack, the charges used per shot, the magic level requirement of any wand, and the attack interval.

## 3. Small Explosive Runes — Confirmed

Used with most wands and staves: place the wand, staff, scepter or rod in your hand and the runes in your ammunition slot or rune pouch.

| Held weapon | Effect |
| --- | --- |
| One-handed wand | Single-target ranged missile, physical damage |
| Two-handed staff | 3x3 tile area explosion, physical damage to the target and surrounding tiles |

Both attack types deal the same amount of damage, based on Spellpower:

```
minValue = spellpower * 0.15
maxValue = spellpower * 0.35
```

Rounding is not stated. The damage is physical, and [armor](damage-taken.md#armor--confirmed) reduces all physical damage; whether [blocking](damage-taken.md#blocking--confirmed) applies to a rune hit is **not stated**.

**Not stated:** whether a scepter or rod acts as a one-handed or a two-handed weapon for this table, how the damage is rolled between the minimum and maximum, and whether each tile of the explosion gets its own roll.

### Worked example — Assumed (ours, not the compendium's)

Spellpower 100: range 15.0 to 35.0 per rune before any rounding. Plain arithmetic on the formula above; not checked in game.

## 4. Not yet documented

The compendium pages above give nothing on these, so they are open for the next source:

- Where base Spellpower comes from besides Intelligence.
- Rounding of rune damage, how it is rolled between minimum and maximum, and per-tile rolls in the explosion.
- How scepters and rods fit the rune table.
- Whether blocking applies to rune hits.
- Wand attack damage, charges and interval.
- Rune consumption per use.
- Magic damage and spell damage formulas, resistances and critical hits, and anything that separates a mage from a druid.
