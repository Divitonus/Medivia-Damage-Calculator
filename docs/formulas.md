# Formulas: Knight damage mechanics

Every formula below is tagged **Confirmed** (stated by the source) or **Assumed** (inferred by us, not stated).

**Source for everything marked Confirmed:** the in-game compendium (Melee Fighting, Strength, Bloodlust Stance, Blocking and Armor pages). Worked examples are the compendium's own and were re-checked by hand against the formulas.

## 1. Melee damage

### Maximum hit — Confirmed

```
maxValue = 25 + (attackSkill ^ 2) / 1550 * attackValue / attackFactor
```

- `attackSkill`: the skill for the weapon type (swords, clubs, axes).
- `attackValue`: the weapon's attack.
- `attackFactor`: set by stance (see Stances).

### Minimum hit — Confirmed (in-game tested)

```
minValue = (playerLevel / 4) + (maxValue * 0.15)
```

The compendium also says level raises the minimum damage by weapon hand:

| Weapon | Level term |
| --- | --- |
| One-handed | +1 min damage every 4 levels (`level / 4`) |
| Two-handed | +1 min damage every 2 levels (`level / 2`) |

The `playerLevel / 4` in the formula is the one-handed case; for two-handed weapons the level term is `level / 2`. Checking the compendium's examples (level 50, skill 80, Offensive):

| Weapon | maxValue | minValue by formula | minValue in compendium |
| --- | --- | --- | --- |
| Bright Sword (1H, atk 36) | 173 | 12.5 + 26.0 = ~38 | **32** |
| Giant Sword (2H, atk 69) | 309 | 25 + 46.35 = ~71 | **71** |

The two-handed example matches. **The compendium's one-handed example does not** (formula gives about 38, it prints 32), and it is the outlier: an in-game test settled it in favour of the written formula.

**In-game tests (level 281, melee skill 115):** one-handed (atk 49) in Offensive stance at Strength 28 to 153, and two-handed (atk 83) in Offensive, Balanced and Defensive stance at Strength 40 to 154. Every minimum and maximum matched this, with the result rounded down:

```
maxValue = 25 + skill^2 / 1550 * atk / attackFactor
max      = floor(maxValue + 0.35 * Strength)
min      = floor(level / 4 (1H) or level / 2 (2H) + maxValue * 0.15 + 0.30 * Strength)
```

What this confirms:
- The `level / 4` (one-handed) and `level / 2` (two-handed) minimum terms.
- Strength is added flat after the formulas, at 0.35 per point to the maximum and 0.30 per point to the minimum.
- The `* 0.15` in the minimum uses the stance-adjusted `maxValue` (before Strength), so stance lowers the minimum as well as the maximum.
- Results round down. The compendium examples (173.65 shows as 173, 309.9 as 309) agree.

The compendium's own one-handed example is the only value that disagrees with all of this. A first two-handed test read 787 where the formula gave 786.7, but it was recorded at Strength 153 and the later tests match a Strength of 154 exactly (787.1), so it was probably a Strength misrecording.

### Attack speed — Confirmed

| Weapon | Attack interval |
| --- | --- |
| One-handed | 2 s |
| Two-handed | 3 s |

### Stances (attack factor) — Confirmed

| Stance | attackFactor |
| --- | --- |
| Offensive | 1.0 |
| Balanced | 1.2 |
| Defensive | 2.0 |

A larger factor lowers the maximum hit. Stance is changed in the Inventory tab, above the active conditions window.

### Worked example — Confirmed (compendium)

Level 50, melee skill 80, Offensive. `80^2 / 1550 = 4.129`.

- Bright Sword (1H, atk 36): `25 + 4.129 * 36 / 1.0 = 173`. Range 32 to 173 as printed; the formula gives about 38 for the minimum (see above).
- Giant Sword (2H, atk 69): `25 + 4.129 * 69 / 1.0 = 309`. Range 71 to 309.

Final damage is then reduced by the target's armor or shield. Melee never misses and can only be used at close range.

## 2. Strength — Confirmed

A stat from equipment and temporary effects only (for example Green Witches Potion, Spicy Maris Feast, Melee Ring). Usable by knights and players with no vocation. Per point of Strength:

| Effect | Per point |
| --- | --- |
| Minimum melee weapon damage | +0.30 |
| Maximum melee weapon damage | +0.35 |
| Spellpower | +1.20 |

**Confirmed in game:** the bonus is added flat to the result of the min and max formulas (`max += 0.35 * Strength`, `min += 0.30 * Strength`), not folded into `maxValue` before the `* 0.15` step. See the in-game test under Minimum hit.

**Not stated by the compendium:** the Strength value of any specific item (it depends on Item Rank).

## 3. Damage taken

Order of reduction in the compendium's example: the shield (blocking) first, then armor.

### Blocking — Confirmed

Reduces physical damage only. Applies to the first two physical attacks received in any 2-second window; further attacks in that window are not reduced.

```
maxBlock = defenceValue * skillValue ^ (6/5) * defenceFactor * 0.05 + 10
```

The amount blocked is a random value between 0 and `maxBlock`. All numbers round down.

Which item and skill are used:

| Equipped | defenceValue from | skillValue |
| --- | --- | --- |
| Shield | the shield's Def | Blocking skill |
| Melee weapon, if no shield | the weapon's Def | Melee Fighting skill |
| Distance weapon | fixed 7 | Distance Fighting skill |
| Fists | fixed 7 | not stated |

Defence factor by stance:

| Stance | defenceFactor |
| --- | --- |
| Offensive | 0.5 |
| Balanced | 0.7 |
| Defensive | 1.0 |

Worked example (dark shield Def 25, Blocking skill 50), checked: Defensive 146, Balanced 105, Offensive 78.

### Armor — Confirmed

Reduces all physical damage, including sudden death runes and ultimate explosion. Armor comes from the helmet, armor, legs and boots slots, plus some amulets. Skills do not affect it.

```
totalArmor = sum of the armor value of every equipped item
minReduction = totalArmor ^ (4/3) * 0.27
maxReduction = totalArmor ^ (3/2) * 0.26
```

A random value between `minReduction` and `maxReduction` is subtracted from the incoming damage. Damage reduced to 0 or below shows a yellow spark on the creature.

Rounding is not stated; the compendium's example is consistent with rounding down (**Assumed**).

Worked example, checked: total armor 30 gives a reduction of 25 to 42. A 90 melee hit with 40 blocked leaves 50, armor takes 25 to 42, so 8 to 25 hit points are lost.

## 4. Knight spells and modifiers

### Bloodlust Stance — Confirmed

A toggled spell (anthar gladius amplio). Mana cost 0, magic level 5, premium only, 2300 gold from Tvindorath in Garrogat.

- Only usable while wielding a two-handed melee weapon.
- Two-handed attack interval drops from 3 s to 2 s.
- You take 25% more damage from all sources while active.

Whether the 25% extra damage is applied before or after blocking and armor is **not stated**.

### Fury — Confirmed

While Bloodlust Stance is active, taking damage while using a two-handed weapon gives 1 Fury point. The damage needed per point scales with level (the scaling is **not stated**). Points are stored in the Fury Gauge and spent on:

| Spell | Fury cost |
| --- | --- |
| Decimate | 50 |
| Berserk | 100 |

## 5. Not yet documented

The compendium pages above give nothing on these, so they are open for the next source:

- Critical hits.
- Damage numbers for Decimate and Berserk.
- Fury scaling with level.
- Strength values of specific items.
- Spell damage (the Strength spellpower bonus is known, the spell formulas are not).
