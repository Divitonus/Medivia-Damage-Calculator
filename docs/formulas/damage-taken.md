# Damage taken

Reductions applied to an incoming hit. Tagging and stances: see [README.md](README.md).

**Source for everything marked Confirmed:** the in-game compendium (Blocking and Armor pages).

Order of reduction in the compendium's example: the shield (blocking) first, then armor.

## Blocking — Confirmed

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

## Armor — Confirmed

Reduces all physical damage, including sudden death runes and ultimate explosion. Armor comes from the helmet, armor, legs and boots slots, plus some amulets. Skills do not affect it.

```
totalArmor = sum of the armor value of every equipped item
minReduction = totalArmor ^ (4/3) * 0.27
maxReduction = totalArmor ^ (3/2) * 0.26
```

A random value between `minReduction` and `maxReduction` is subtracted from the incoming damage. Damage reduced to 0 or below shows a yellow spark on the creature.

Rounding is not stated; the compendium's example is consistent with rounding down (**Assumed**).

Worked example, checked: total armor 30 gives a reduction of 25 to 42. A 90 melee hit with 40 blocked leaves 50, armor takes 25 to 42, so 8 to 25 hit points are lost.
