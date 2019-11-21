import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { CardType } from 'src/app/models/card-type.model';
import { Region } from 'src/app/models/region.model';
import { Rarity } from 'src/app/models/rarity.model';
import { SpellKeywords } from 'src/app/models/spell-keywords.model';
import { UnitKeywords } from 'src/app/models/unit-keywords.model';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Keywords } from 'src/app/models/keywords.model';
import fitty from 'fitty';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {
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

  fits;
  sizedFits

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

  ngAfterViewInit() {
    var fittyElement = this.elementRef.nativeElement.querySelector('.fitty-card-title');
    var sizedFittyElement = this.elementRef.nativeElement.querySelector('.sized-fitty-card-title');
    this.fits = fitty(fittyElement, { minSize: 10, maxSize: 30 })
    this.sizedFits = fitty(sizedFittyElement, { minSize: 20, maxSize: 60 })
    this.fits.observeMutations = true;
    this.sizedFits.observeMutations = true;
    this.fits.fit();
    this.sizedFits.fit();
  }

  switchType(type: CardType) {
    if ((this.type === CardType.Spell && type !== CardType.Spell) || (this.type !== CardType.Spell && type === CardType.Spell)) {
      let input: any = document.getElementById("uploader");
      if (this.reader) {
        this.reader.readAsDataURL(input.files[0]);
      }
    }

    const nonChampionRarity: Rarity[] = [Rarity.None, Rarity.Common, Rarity.Rare, Rarity.Epic];

    if (type === CardType.Champion) {
      this.rarity = Rarity.Champion;
    } else if (!nonChampionRarity.includes(this.rarity)) {
      this.rarity = Rarity.None;
    }

    this.type = type;

    setTimeout(() => {
      this.onDescriptionChange(this.description);
      this.fits.unsubscribe();
      this.sizedFits.unsubscribe();
      var fittyElement = this.elementRef.nativeElement.querySelector('.fitty-card-title');
      var sizedFittyElement = this.elementRef.nativeElement.querySelector('.sized-fitty-card-title');
      this.fits = fitty(fittyElement, { minSize: 10, maxSize: 30 })
      this.sizedFits = fitty(sizedFittyElement, { minSize: 20, maxSize: 60 })
      this.fits.fit();
      this.sizedFits.fit();
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
    this.levelup = null;
    this.region = null;
    this.rarity = this.type === CardType.Champion ? Rarity.Champion : Rarity.None;
    this.spellKeyword = SpellKeywords.Burst;
    this.resetUnitKeywords();
    this.resetSpellKeywords();
    this.resetImages();
    this.resetDescription();
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

  resetImages() {
    let input: any = document.getElementById("uploader");
    input.value = "";

    var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
    var bottomCardImageElementRef = this.elementRef.nativeElement.querySelector('.card-bottom-image');
    if (cardImageElementRef) {
      cardImageElementRef.style.display = 'none';
      cardImageElementRef.src = "";
    }

    if (bottomCardImageElementRef) {
      bottomCardImageElementRef.style.display = 'none';
      bottomCardImageElementRef.src = "";
    }

    var sizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');
    var bottomSizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-bottom-image');
    if (sizedElementRef) {
      sizedElementRef.style.display = 'none';
      sizedElementRef.src = "";
    }

    if (bottomSizedElementRef) {
      bottomSizedElementRef.style.display = 'none';
      bottomSizedElementRef.src = "";
    }

    this.hasImage = false;
  }

  resetDescription() {
    this.description = '';

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

  onTitleChange() {
    this.fits.unsubscribe();
    this.sizedFits.unsubscribe();
    var fittyElement = this.elementRef.nativeElement.querySelector('.fitty-card-title');
    var sizedFittyElement = this.elementRef.nativeElement.querySelector('.sized-fitty-card-title');
    this.fits = fitty(fittyElement, { minSize: 10, maxSize: 30 })
    this.sizedFits = fitty(sizedFittyElement, { minSize: 20, maxSize: 60 })
    this.fits.fit();
    this.sizedFits.fit();
  }

  onDescriptionChange(description) {
    this.resetDescription();
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

  zoom(option: string, offset: number = 10) {
    var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
    var sizedCardImageElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');

    if (cardImageElementRef) {
      let newHeight: string;
      let newWidth: string;
      let newSizedHeight: string;
      let newSizedWidth: string;

      if (option === 'in') {
        newHeight = (cardImageElementRef.height + offset) + 'px';
        newSizedHeight = (sizedCardImageElementRef.height + offset * 2) + 'px';
        newWidth = (cardImageElementRef.width + offset) + 'px';
        newSizedWidth = (sizedCardImageElementRef.width + offset * 2) + 'px';
        this.move('left', 5);
        this.move('up', 5);
      } else {
        newHeight = (cardImageElementRef.height - offset) + 'px';
        newSizedHeight = (sizedCardImageElementRef.height - offset * 2) + 'px';
        newWidth = (cardImageElementRef.width - offset) + 'px';
        newSizedWidth = (sizedCardImageElementRef.width - offset * 2) + 'px';
        this.move('right', 5);
        this.move('down', 5);
      }

      cardImageElementRef.style.height = newHeight;
      sizedCardImageElementRef.style.height = newSizedHeight;
      cardImageElementRef.style.width = newWidth;
      sizedCardImageElementRef.style.width = newSizedWidth;
    }
  }

  move(direction: string, offset: number = 10) {
    var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
    var sizedCardImageElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');

    let left = parseInt(cardImageElementRef.style.left).toString();
    let top = parseInt(cardImageElementRef.style.top).toString();

    if (left.toString() === 'NaN') {
      left = '10';
    }
    if (top.toString() === 'NaN') {
      top = '10';
    }

    let sizedTop = parseInt(sizedCardImageElementRef.style.top).toString();
    let sizedLeft = parseInt(sizedCardImageElementRef.style.left).toString();

    if (sizedTop.toString() === 'NaN') {
      sizedTop = '30';
    }
    if (sizedLeft.toString() === 'NaN') {
      sizedLeft = '20';
    }

    if (direction === 'up') {
      top = (parseInt(top) - offset) + 'px';
      sizedTop = (parseInt(sizedTop) - offset * 2) + 'px';
    }
    if (direction === 'down') {
      top = (parseInt(top) + offset) + 'px';
      sizedTop = (parseInt(sizedTop) + offset * 2) + 'px';
    }
    if (direction === 'right') {
      left = (parseInt(left) + offset) + 'px';
      sizedLeft = (parseInt(sizedLeft) + offset * 2) + 'px';
    }
    if (direction === 'left') {
      left = (parseInt(left) - offset) + 'px';
      sizedLeft = (parseInt(sizedLeft) - offset * 2) + 'px';
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
      var image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        var cardImageElementRef = this.elementRef.nativeElement.querySelector('.card-image');
        if (cardImageElementRef) {
          cardImageElementRef.style.height = '';
          cardImageElementRef.style.width = '';
          cardImageElementRef.style.top = '';
          cardImageElementRef.style.left = '';
          cardImageElementRef.style.display = 'block';
          cardImageElementRef.src = image.src;

          if(this.type !== CardType.Spell)
          {
            cardImageElementRef.style.height = (image.height / 2).toString() + 'px';
            cardImageElementRef.style.width = (image.width / 2).toString() + 'px';

            var top = -(image.height / 2 - 466) / 2;
            cardImageElementRef.style.top = (top).toString() + 'px';

            var left = -(image.width / 2 - 318) / 2;
            cardImageElementRef.style.left = (left).toString() + 'px';
          }          
        }

        var sizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-image');
        if (sizedElementRef) {
          sizedElementRef.style.height = '';
          sizedElementRef.style.width = '';
          sizedElementRef.style.top = '';
          sizedElementRef.style.left = '';
          sizedElementRef.style.display = 'block';
          sizedElementRef.src = image.src;

          if(this.type !== CardType.Spell)
          {
            sizedElementRef.style.height = image.height.toString() + 'px';
            sizedElementRef.style.width = image.width.toString() + 'px';

            var top = -(image.height - 932) / 2;
            sizedElementRef.style.top = (top).toString() + 'px';

            var left = -(image.width - 636) / 2;
            sizedElementRef.style.left = (left).toString() + 'px';
          }
        }

        var bottomCardImageElementRef = this.elementRef.nativeElement.querySelector('.card-bottom-image');
        if (bottomCardImageElementRef) {
          bottomCardImageElementRef.style.display = 'block';
          bottomCardImageElementRef.src = image.src;
        }

        var bottomSizedElementRef = this.elementRef.nativeElement.querySelector('.sized-card-bottom-image');
        if (bottomSizedElementRef) {
          bottomSizedElementRef.style.display = 'block';
          bottomSizedElementRef.src = image.src;
        }
      };
    };

    let input: any = document.getElementById("uploader");
    this.reader.readAsDataURL(input.files[0]);

    this.hasImage = true;
  }

  getTitle(): string {
    if (this.cardTitle)
      return (this.cardTitle.match(/^ *$/) !== null ? 'customCard' : this.cardTitle) + '.png'
    else
      return 'customCard' + '.png';
  }

  download() {
    var title = this.getTitle();
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
