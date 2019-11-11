import { Component, OnInit } from '@angular/core';
import { CardType } from 'src/app/models/card-type.model';
import { Region } from 'src/app/models/region.model';
import { Rarity } from 'src/app/models/rarity.model';
import { SpellKeywords } from 'src/app/models/spell-keywords.model';
import { UnitKeywords } from 'src/app/models/unit-keywords.model';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mana: number;
  attack: number;
  health: number;

  cardTitle: string;
  description: string;
  levelup: string;

  Rarity = Rarity;
  rarity: Rarity = Rarity.None;

  CardType = CardType;
  type: CardType = CardType.Follower;

  Region = Region;
  region: Region;

  SpellKeywords = SpellKeywords;
  spellKeyword: SpellKeywords = SpellKeywords.Burst;

  UnitKeywords = UnitKeywords;
  unitKeywords: Map<UnitKeywords, boolean>;

  ngOnInit() {
    this.unitKeywords = new Map<UnitKeywords, boolean>();
    this.unitKeywords.set(UnitKeywords.Ephemeral, false);
    this.unitKeywords.set(UnitKeywords.Challenger, false);
    this.unitKeywords.set(UnitKeywords.Fearsome, false);
    this.unitKeywords.set(UnitKeywords.QuickAttack, false);
    this.unitKeywords.set(UnitKeywords.Elusive, false);
    this.unitKeywords.set(UnitKeywords.CantBlock, false);
    this.unitKeywords.set(UnitKeywords.Tough, false);
    this.unitKeywords.set(UnitKeywords.Overwhelm, false);
    this.unitKeywords.set(UnitKeywords.Regeneration, false);
    this.unitKeywords.set(UnitKeywords.Lifesteal, false);
    this.unitKeywords.set(UnitKeywords.Barrier, false);
    this.unitKeywords.set(UnitKeywords.DoubleAttack, false);
    this.unitKeywords.set(UnitKeywords.Fleeting, false);
  }

  switchType(type: CardType) {
    this.type = type;
  }

  switchRegion(region: Region) {
    this.region = region;
  }

  switchSpellKeyword(keyword: SpellKeywords) {
    this.spellKeyword = keyword;
  }

  switchUnitKeyword(keyword: UnitKeywords) {
    this.unitKeywords.set(keyword, !this.unitKeywords.get(keyword));
  }

  switchRarity(rarity: Rarity) {
    this.rarity = rarity;
  }

  uniqueKeyword(): boolean {
    let counter = 0;
    for (let value of this.unitKeywords.values()) {
      if (value) {
        counter++;
      }
    }
    if (counter === 1) {
      return true;
    }
    return false;
  }

  getUniqueKeyword(): UnitKeywords {
    console.log(this.unitKeywords);

    for (let key of this.unitKeywords.keys()) {
      if (this.unitKeywords.get(key)) {
        return key;
      }
    }
  }
}
