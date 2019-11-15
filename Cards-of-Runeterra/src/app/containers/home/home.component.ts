import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer } from '@angular/core';
import { CardType } from 'src/app/models/card-type.model';
import { Region } from 'src/app/models/region.model';
import { Rarity } from 'src/app/models/rarity.model';
import { SpellKeywords } from 'src/app/models/spell-keywords.model';
import { UnitKeywords } from 'src/app/models/unit-keywords.model';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  mana: string;
  attack: number;
  health: number;

  subtype: string;
  cardTitle: string;
  description: string;
  formattedDescription: string;
  levelup: string;

  Rarity = Rarity;
  rarity: Rarity = Rarity.None;

  CardType = CardType;
  type: CardType = CardType.Follower;

  Region = Region;
  region: Region;

  SpellKeywords = SpellKeywords;
  spellKeyword: SpellKeywords = SpellKeywords.Burst;
  spellKeywords: Map<SpellKeywords, boolean>;

  UnitKeywords = UnitKeywords;
  unitKeywords: Map<UnitKeywords, boolean>;

  constructor(private elementRef: ElementRef) { }

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

    this.spellKeywords = new Map<SpellKeywords, boolean>();
    this.spellKeywords.set(SpellKeywords.Burst, true);
    this.spellKeywords.set(SpellKeywords.Fast, false);
    this.spellKeywords.set(SpellKeywords.Slow, false);
    this.spellKeywords.set(SpellKeywords.Fleeting, false);
    this.spellKeywords.set(SpellKeywords.Overwhelm, false);

    this.spellKeyword = SpellKeywords.Burst;
  }

  switchType(type: CardType) {
    this.type = type;

    const nonChampionRarity: Rarity[] = [Rarity.None, Rarity.Common, Rarity.Rare, Rarity.Epic];

    if (type === CardType.Champion) {
      this.rarity = Rarity.Champion;
    } else if (!nonChampionRarity.includes(this.rarity)) {
      this.rarity = Rarity.None;
    }
  }

  switchRegion(region: Region) {
    this.region = region;
  }

  switchSpellKeyword(keyword: SpellKeywords) {
    if (keyword === SpellKeywords.Burst || keyword === SpellKeywords.Fast || keyword === SpellKeywords.Slow) {
      this.spellKeyword = keyword;
      this.spellKeywords.set(SpellKeywords.Burst, keyword === SpellKeywords.Burst);
      this.spellKeywords.set(SpellKeywords.Fast, keyword === SpellKeywords.Fast);
      this.spellKeywords.set(SpellKeywords.Slow, keyword === SpellKeywords.Slow);
    } else {
      this.spellKeywords.set(keyword, !this.spellKeywords.get(keyword));
    }
  }

  switchUnitKeyword(keyword: UnitKeywords) {
    this.unitKeywords.set(keyword, !this.unitKeywords.get(keyword));
  }

  switchRarity(rarity: Rarity) {
    this.rarity = rarity;
  }

  uniqueUnitKeyword(): boolean {
    let counter = 0;
    for (let value of this.unitKeywords.values()) {
      if (value) {
        counter++;
      }
    }

    return (counter === 1)
  }

  getUniqueUnitKeyword(): UnitKeywords {
    for (let key of this.unitKeywords.keys()) {
      if (this.unitKeywords.get(key)) {
        return key;
      }
    }
  }

  uniqueSpellKeyword(): boolean {
    let counter = 0;
    for (let value of this.spellKeywords.values()) {
      if (value) {
        counter++;
      }
    }

    return (counter === 1)
  }

  getUniqueSpellKeyword(): SpellKeywords {
    for (let key of this.spellKeywords.keys()) {
      if (this.spellKeywords.get(key)) {
        return key;
      }
    }
  }

  addColorTag(type: string) {
    if (type === 'action') {
      this.description += '<action></action>'
    } else if (type === 'name') {
      this.description += '<name></name>'
    }
    this.onDescriptionChange(this.description);

  }

  onDescriptionChange(description) {

    var list = document.getElementById("action-element-ref");
    list.innerHTML = "";

    this.description = description;

    description = '<div class="first-child">' + description + '</div>';
    description = description.replace(/<action>/g, '<span class="action">');
    description = description.replace(/<\/action>/g, '</span>');

    var elementRef = this.elementRef.nativeElement.querySelector('.action-element-ref');

    if (elementRef) {
      elementRef.insertAdjacentHTML('afterbegin', description);
    }
  }

  download() {
    const title = this.cardTitle ? this.cardTitle : 'customCard' + '.png'
    domtoimage.toBlob(document.getElementById('card'))
      .then(function (blob: Blob) {
        saveAs(blob, title);
      });
  }
}
