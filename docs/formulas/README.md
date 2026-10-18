# Formulas

How damage is worked out in Medivia, split by topic:

| Page | Covers |
| --- | --- |
| [knight.md](knight.md) | Melee damage, Strength, Bloodlust Stance, Fury |
| [archer.md](archer.md) | Distance damage, weapons and ammunition, Dexterity, Arcane Marksmanship, skill training |
| [damage-taken.md](damage-taken.md) | Blocking and armor, which reduce the damage of every vocation |

Every formula is tagged **Confirmed** (stated by the source) or **Assumed** (inferred by us, not stated). Each page names its sources. Unless a page says otherwise, the source is the in-game compendium, and its worked examples were re-checked by hand against the formulas.

## Stances (attack factor) — Confirmed

Melee and distance damage formulas divide by the same stance factor:

| Stance | attackFactor |
| --- | --- |
| Offensive | 1.0 |
| Balanced | 1.2 |
| Defensive | 2.0 |

A larger factor lowers the maximum hit. Stance is changed in the Inventory tab, above the active conditions window. Stance also sets the blocking factor; see [damage-taken.md](damage-taken.md).
