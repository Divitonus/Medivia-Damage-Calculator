# Archer damage mechanics

Tagging and stances: see [README.md](README.md). Armor: see [damage-taken.md](damage-taken.md).

**Source for everything marked Confirmed:** the in-game compendium (Distance Fighting, Dexterity, Arcane Marksmanship and Distance Skill Training pages). The worked example is the compendium's own and was re-checked by hand against the formulas. Nothing on this page has been tested in game yet.

## 1. Distance damage

Distance fighting is the archer's main combat style; archers advance in it faster than any other vocation.

### Maximum hit — Confirmed

```
maxValue = 20 + (attackSkill ^ 2) / 1600 * attackValue / attackFactor
```

- `attackSkill`: the Distance Fighting skill.
- `attackValue`: the compendium says distance damage depends on both the weapon's attack and the ammunition's attack, but the formula has a single `attackValue`. How the two combine is **not stated**; the worked example gives one number (30) for "Crossbow + Bolts".
- `attackFactor`: set by stance, the same factors as melee (see [Stances](README.md#stances-attack-factor--confirmed)).

### Minimum hit — Confirmed

```
minValue = playerLevel / 5 + (maxValue * 0.20)
```

Compared with melee (the melee column mirrors [knight.md](knight.md) §1; update both together):

| Term | Melee | Distance |
| --- | --- | --- |
| Base of the maximum | 25 | 20 |
| Skill divisor | 1550 | 1600 |
| Level term of the minimum | `level / 4` (1H), `level / 2` (2H) | `level / 5` |
| Share of the maximum in the minimum | `0.15` | `0.20` |

Rounding is not stated, and the worked example comes out to whole numbers so it does not show it. Melee was shown in game to round down; distance is **Assumed** to do the same.

### Worked example — Confirmed (compendium)

Level 50, distance skill 80, Offensive, crossbow + bolts (atk 30). `80^2 / 1600 = 4`.

- `maxValue = 20 + 4 * 30 / 1.0 = 140`
- `minValue = 50 / 5 + 140 * 0.20 = 10 + 28 = 38`
- Range 38 to 140 per hit.

### Hitting and reduction — Confirmed

- Distance attacks ignore blocking (the target's shield or weapon); only the target's [armor](damage-taken.md#armor--confirmed) reduces them.
- They can miss, and they are less likely to hit when fired from very close range.

The hit chance itself (by skill, distance or target) is **not stated**.

### Attack speed — Assumed

The training page says a blood hit is needed "every 30 turns (60 seconds)", so one turn is 2 s. We assume a distance attack fires once per turn, every 2 s, like a one-handed melee weapon. The compendium does not state the distance attack interval.

## 2. Weapons and ammunition — Confirmed

| Type | Ammunition | Notes |
| --- | --- | --- |
| Bow | Arrows | |
| Crossbow | Bolts | |
| Spear | none (thrown) | Can be picked up after use; small chance to break |
| Other thrown weapons | none (thrown) | Break after one use |

- Ammunition is equipped in the arrow slot of the Inventory. Quivers carry extra ammunition.
- Each ammunition type has its own attack value.
- Ammunition is conjured by archers, dropped by monsters, or bought from NPCs and players.
- Arcane Marksmanship allows the use of Heavy Arrows and Heavy Bolts (see below). Whether they can be used without it is not stated.
- The Ethereal Spear is conjured with "increo telum", a spell every archer knows, and does not drop on the ground after a throw.

**Not stated:** how weapon and ammunition attack combine into `attackValue` for bows and crossbows, whether a spear's or thrown weapon's own attack is used directly, and the attack values of Heavy ammunition and the Ethereal Spear.

## 3. Dexterity — Confirmed

A stat from equipment and temporary effects only. Benefits only archers and players with no vocation. Per point of Dexterity:

| Effect | Per point |
| --- | --- |
| Minimum distance weapon damage | +0.80 |
| Maximum distance weapon damage | +1.20 |
| Spellpower | +0.75 |

Sources: equipment, as a fixed Property or a randomized Attribute on many distance weapons and gear pieces, tied to the item's Item Rank; and consumables such as Green Witches Potion and Sweet Maris Feast. (Green Witches Potion is also listed as a Strength source on the Strength page; whether it gives the stat that fits the vocation is not stated.)

How it is applied is **Assumed**: added flat to the result of the min and max formulas (`max += 1.20 * Dexterity`, `min += 0.80 * Dexterity`), not folded into `maxValue` before the `* 0.20` step. This mirrors what was shown in game for Strength ([knight.md](knight.md#2-strength--confirmed)) but has not been tested for Dexterity.

**Not stated:** the Dexterity value of any specific item.

## 4. Archer spells and modifiers

### Arcane Marksmanship — Confirmed

A toggled spell (anthar arcus amplio). It works much like the knight's Bloodlust Stance (our comparison, not the compendium's). Mana cost 0, magic level 18, premium only, spell cost 0 gold. No cooldown. Learned from Ehrenfried in Garrogat after completing the Order of the Holy Rose faction.

While active:
- Only usable in a party with active shared experience.
- Allows Heavy Arrows and Heavy Bolts.
- Increases Spellpower.
- Reduces total health by 40%.

The offensive effect depends on the party's shared experience: if shared experience breaks, the offensive boost is lost but the health penalty stays; when shared experience is restored, the boost returns on its own.

**Not stated:** how much Spellpower it adds; whether "offensive boost" covers only the Spellpower or also Heavy ammunition; whether the 40% is taken from maximum or current health.

## 5. Skill training — Confirmed

Not part of the damage formula, but it governs how fast `attackSkill` grows.

| Attack result | Skill tries |
| --- | --- |
| Blood hit or damaging hit | 2 |
| Miss, or shot stopped by armor | 1 |

- At least one blood hit every 30 turns (60 s) is needed to keep advancing.
- To train Blocking at full speed while using distance, you must be hit twice per turn and land a blood hit every 15 turns (30 s).
- The recommended training weapon is the Ethereal Spear.

## 6. Not yet documented

The compendium pages above give nothing on these, so they are open for the next source:

- How weapon and ammunition attack combine into `attackValue`.
- Rounding of distance damage, and whether Dexterity is added flat (both assumed above).
- Hit chance and miss chance, including the close-range penalty.
- Distance attack interval (assumed 2 s above).
- Whether a distance hit uses up one of the two blocked attacks in a 2-second window.
- Critical hits.
- Attack values of Heavy Arrows, Heavy Bolts and the Ethereal Spear.
- Dexterity values of specific items.
- The Spellpower bonus of Arcane Marksmanship, and archer spell damage.
