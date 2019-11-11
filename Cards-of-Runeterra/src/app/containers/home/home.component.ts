import { Component, OnInit } from '@angular/core';
import { CardType } from 'src/app/models/card-type.model';
import { Region } from 'src/app/models/region.model';
import { Rarity } from 'src/app/models/rarity.model';
import { SpellFeature } from 'src/app/models/spell-feature.model';
import { UnitFeature } from 'src/app/models/unit-feature.model';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  type: CardType = CardType.Spell;
  mana: number;
  attack: number;
  health: number;
  cardTitle: string;
  description: string;
  region: Region;
  rarity: Rarity;
  spellFeature: SpellFeature
  unitFeature: UnitFeature
  CardType = CardType;
  Region = Region;

  ngOnInit() {  }

  switchType(type: CardType) {
    this.type = type;
  }

  switchRegion(region: Region) {
    this.region = region;
  }
}
