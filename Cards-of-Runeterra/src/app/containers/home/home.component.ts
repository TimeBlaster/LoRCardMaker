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

  Rarity = Rarity;
  rarity: Rarity = Rarity.None;

  CardType = CardType;
  type: CardType = CardType.Follower;

  Region = Region;
  region: Region;

  SpellKeywords = SpellKeywords;
  spellKeyword: SpellKeywords = SpellKeywords.Burst;

  UnitKeywords = UnitKeywords;
  unitKeyword: UnitKeywords

  ngOnInit() {  }

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
    this.unitKeyword = keyword;
  }

  switchRarity(rarity: Rarity) {
    this.rarity = rarity;
  }
}
