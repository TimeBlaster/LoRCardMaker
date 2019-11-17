import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer } from '@angular/core';
import { CardType } from 'src/app/models/card-type.model';
import { Region } from 'src/app/models/region.model';
import { Rarity } from 'src/app/models/rarity.model';
import { SpellKeywords } from 'src/app/models/spell-keywords.model';
import { UnitKeywords } from 'src/app/models/unit-keywords.model';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Keywords } from 'src/app/models/keywords.model';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  imagePath: '';
  reader: FileReader;

  mana: number;
  attack: number;
  health: number;

  subtype: string;
  cardTitle: string;
  description = '';
  levelup: string;

  CardType = CardType;
  type: CardType = CardType.Follower;

  Rarity = Rarity;
  rarity: Rarity = Rarity.None;

  Region = Region;
  region: Region;

  Keywords = Keywords;

  SpellKeywords = SpellKeywords;
  spellKeyword: SpellKeywords = SpellKeywords.Burst;
  spellKeywords: Map<SpellKeywords, boolean>;

  UnitKeywords = UnitKeywords;
  unitKeywords: Map<UnitKeywords, boolean>;

  hasImage = false;

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

    let input: any = document.getElementById("uploader");
    if (this.reader) {
      this.reader.readAsDataURL(input.files[0]);
    }

    setTimeout(() => {
      this.onDescriptionChange(this.description);
    })
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

  resetCard() {
    this.mana = null;
    this.attack = null;
    this.health = null;
    this.subtype = null;
    this.cardTitle = null;
    this.description = '';
    this.levelup = null;
    this.region = null;
    this.rarity = this.type === CardType.Champion ? Rarity.Champion : Rarity.None;
    this.spellKeyword = SpellKeywords.Burst;
    this.resetUnitKeywords();
    this.resetSpellKeywords();

    let input: any = document.getElementById("uploader");
    input.value = "";

    this.hasImage = false;
  }

  resetUnitKeywords() {
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

  resetSpellKeywords() {
    this.spellKeywords.set(SpellKeywords.Burst, true);
    this.spellKeywords.set(SpellKeywords.Fast, false);
    this.spellKeywords.set(SpellKeywords.Slow, false);
    this.spellKeywords.set(SpellKeywords.Fleeting, false);
    this.spellKeywords.set(SpellKeywords.Overwhelm, false);
  }

  addColorTag(type: string) {
    if (type === 'name') {
      this.description += '<name></name>'
    } else if (type === 'keyword') {
      this.description += '<keyword></keyword>'
    } else {
      Object.keys(Keywords).map(key => {
        if (type === Keywords[key]) {
          this.description += '<' + type + '>';
        }
      });
    }
    this.onDescriptionChange(this.description);
  }

  onDescriptionChange(description) {

    var list = document.getElementById("description-element-ref");
    if (list) {
      list.innerHTML = "";
    }

    var spellList = document.getElementById("spell-description-element-ref");
    if (spellList) {
      spellList.innerHTML = "";
    }

    var sizedList = document.getElementById("sized-description-element-ref");
    if (sizedList) {
      sizedList.innerHTML = "";
    }

    var sizedSpellList = document.getElementById("sized-spell-description-element-ref");
    if (sizedSpellList) {
      sizedSpellList.innerHTML = "";
    }

    this.description = description;

    description = '<div class="first-child">' + description + '</div>';
    description = description.replace(/<name>/g, '<span class="name">');
    description = description.replace(/<\/name>/g, '</span>');
    description = description.replace(/<keyword>/g, '<span class="keyword">');
    description = description.replace(/<\/keyword>/g, '</span>');

    Object.keys(Keywords).map(key => {
      var regex = new RegExp('<' + Keywords[key] + '>', 'g')
      description = description.replace(regex, '<img class="inline-icon" src="assets/keywords/inline/' + Keywords[key] + '.png">');
    });

    var elementRef = this.elementRef.nativeElement.querySelector('.description-element-ref');
    if (elementRef) {
      elementRef.insertAdjacentHTML('afterbegin', description);
    }

    var spellElementRef = this.elementRef.nativeElement.querySelector('.spell-description-element-ref');
    if (spellElementRef) {
      spellElementRef.insertAdjacentHTML('afterbegin', description);
    }

    var sizedElementRef = this.elementRef.nativeElement.querySelector('.sized-description-element-ref');
    if (sizedElementRef) {
      sizedElementRef.insertAdjacentHTML('afterbegin', description);
    }

    var sizedSpellElementRef = this.elementRef.nativeElement.querySelector('.sized-spell-description-element-ref');
    if (sizedSpellElementRef) {
      sizedSpellElementRef.insertAdjacentHTML('afterbegin', description);
    }
  }

  zoom(option: string) {
    var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
    var sizedCardImageElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');

    if (cardImageElementRef) {
      let newHeight: string;
      let newWidth: string;
      let newSizedHeight: string;
      let newSizedWidth: string;

      if (option === 'in') {
        newHeight = (cardImageElementRef.height + 20) + 'px';
        newSizedHeight = (cardImageElementRef.height + 40) + 'px';
        newWidth = (cardImageElementRef.width + 20) + 'px';
        newSizedWidth = (cardImageElementRef.width + 40) + 'px';
      } else {
        newHeight = (cardImageElementRef.height - 20) + 'px';
        newSizedHeight = (cardImageElementRef.height - 40) + 'px';
        newWidth = (cardImageElementRef.width - 20) + 'px';
        newSizedWidth = (cardImageElementRef.width - 40) + 'px';
      }

      cardImageElementRef.style.height = newHeight;
      sizedCardImageElementRef.style.height = newSizedHeight;
      cardImageElementRef.style.width = newWidth;
      sizedCardImageElementRef.style.width = newSizedWidth;
    }
  }

  move(direction: string) {
    var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
    var sizedCardImageElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');

    let top = parseInt(cardImageElementRef.style.top) ? parseInt(cardImageElementRef.style.top).toString() : '15';
    let left = parseInt(cardImageElementRef.style.left) ? parseInt(cardImageElementRef.style.left).toString() : '10';

    let sizedTop = parseInt(sizedCardImageElementRef.style.top) ? parseInt(sizedCardImageElementRef.style.top).toString() : '30';
    let sizedLeft = parseInt(sizedCardImageElementRef.style.left) ? parseInt(sizedCardImageElementRef.style.left).toString() : '20';

    if (direction === 'up') {
      top = (parseInt(top) - 20) + 'px';
      sizedTop = (parseInt(sizedTop) - 40) + 'px';
    }
    if (direction === 'down') {
      top = (parseInt(top) + 20) + 'px';
      sizedTop = (parseInt(sizedTop) + 40) + 'px';
    }
    if (direction === 'right') {
      left = (parseInt(left) + 20) + 'px';
      sizedLeft = (parseInt(sizedLeft) + 40) + 'px';
    }
    if (direction === 'left') {
      left = (parseInt(left) - 20) + 'px';
      sizedLeft = (parseInt(sizedLeft) - 40) + 'px';
    }

    if (top) {
      cardImageElementRef.style.top = top;
      sizedCardImageElementRef.style.top = sizedTop;
    }
    if (left) {
      cardImageElementRef.style.left = left;
      sizedCardImageElementRef.style.left = sizedLeft;
    }
  }

  upload() {
    if (!this.reader) {
      this.reader = new FileReader();
    }

    this.reader.onload = (e: any) => {
      var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
      var bottomCardImageElementRef = this.elementRef.nativeElement.querySelector('.card-bottom-image');
      if (cardImageElementRef) {
        cardImageElementRef.style.display = 'block';
        cardImageElementRef.src = e.target.result;
      }

      if (bottomCardImageElementRef) {
        bottomCardImageElementRef.style.display = 'block';
        bottomCardImageElementRef.src = e.target.result;
      }

      var sizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');
      var bottomSizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-bottom-image');
      if (sizedElementRef) {
        sizedElementRef.style.display = 'block';
        sizedElementRef.src = e.target.result;
      }

      if (bottomSizedElementRef) {
        bottomSizedElementRef.style.display = 'block';
        bottomSizedElementRef.src = e.target.result;
      }
    };

    let input: any = document.getElementById("uploader");
    this.reader.readAsDataURL(input.files[0]);

    this.hasImage = true;
  }

  download() {
    const title = this.cardTitle ? this.cardTitle : 'customCard' + '.png';
    const card = document.getElementById('sized-card');

    domtoimage.toBlob(card, { width: 680, height: 1024 })
      .then(function (blob: Blob) {
        saveAs(blob, title);
      }, (err) => {
        console.log('err', err);
      }
      );
  }
}
