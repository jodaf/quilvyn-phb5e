/*
Copyright 2026, James J. Hayes

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 59 Temple
Place, Suite 330, Boston, MA 02111-1307 USA.
*/

/* jshint esversion: 6 */
/* jshint forin: false */
/* globals Quilvyn, QuilvynRules, QuilvynUtils, SRD5E, Tasha, Volo, Xanathar */
"use strict";

/*
 * This module loads the rules from Fifth Edition Player's Handbook that are
 * not part of the 5.5E SRD.  The PHB5E2024 function contains methods that load
 * rules for particular parts of the rules; classRules for character classes,
 * magicRules for spells, etc.  These member methods can be called
 * independently in order to use a subset of the 5.5E PHB.  Similarly, the
 * constant fields of PHB5E2024 (FEATS, BACKGROUNDS, etc.) can be manipulated
 * to modify the choices.
 */
function PHB5E2024() {

  if(window.SRD5E == null) {
    alert('The PHB5E2024 module requires use of the SRD5E module');
    return;
  }

  let rules = new QuilvynRules('D&D 5.5E', PHB5E2024.VERSION);
  PHB5E2024.rules = rules;
  rules.plugin = PHB5E2024;

  rules.defineChoice('choices', SRD5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = PHB5E2024.choiceRules;
  rules.removeChoice = SRD5E.removeChoice;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = PHB5E2024.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = SRD5E.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E.RANDOMIZABLE_ATTRIBUTES);
  rules.getChoices = SRD5E.getChoices;
  rules.ruleNotes = PHB5E2024.ruleNotes;

  SRD5E.createViewers(rules, SRD5E.VIEWERS);
  rules.defineChoice('extras',
    'feats', 'featCount', 'sanityNotes', 'selectableFeatureCount',
    'validationNotes'
  );
  rules.defineChoice('preset',
    'background:Background,select-one,backgrounds',
    'species:Species,select-one,species', 'levels:Class Levels,bag,levels');

  SRD5E.abilityRules(rules, SRD5E.ABILITIES);
  SRD5E.combatRules
    (rules, PHB5E2024.ARMORS, PHB5E2024.SHIELDS, PHB5E2024.WEAPONS);
  SRD5E.magicRules(rules, PHB5E2024.SCHOOLS, PHB5E2024.SPELLS);
  SRD5E.identityRules(
    rules, PHB5E2024.ALIGNMENTS, PHB5E2024.BACKGROUNDS, PHB5E2024.CLASSES,
    PHB5E2024.DEITIES, PHB5E2024.PATHS, PHB5E2024.SPECIES
  );
  SRD5E.talentRules
    (rules, PHB5E2024.FEATS, PHB5E2024.FEATURES, PHB5E2024.GOODIES,
     PHB5E2024.LANGUAGES, PHB5E2024.SKILLS, PHB5E2024.TOOLS);

  Quilvyn.addRuleSet(rules);

}

PHB5E2024.VERSION = '2.4.1.0';

PHB5E2024.ALIGNMENTS = Object.assign({}, SRD5E.ALIGNMENTS);
PHB5E2024.ARMORS = Object.assign({}, SRD5E.ARMORS);
PHB5E2024.BACKGROUNDS_ADDED = {
  'Artisan':
    'Equipment=' +
      '"Artisan\'s Tools","2 Pouches","Traveler\'s Clothes","32 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Dexterity, Intelligence)",' +
      '"1:Skill Proficiency (Investigation; Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Artisan\'s Tools)",' +
      '"1:Crafter"',
  'Charlatan':
    'Equipment=' +
      '"Forgery Kit","Costume","Fine Clothes","15 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Dexterity, Constitution, Charisma)",' +
      '"1:Skill Proficiency (Deception; Sleight Of Hand)",' +
      '"1:Tool Proficiency (Forgery Kit)",' +
      '"1:Skilled"',
  'Entertainer':
    'Equipment=' +
      '"Musical Instrument","2 Costumes","Mirror","Perfume",' +
      '"Traveler\'s Clothes","11 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Dexterity, Charisma)",' +
      '"1:Skill Proficiency (Acrobatics; Performance)",' +
      '"1:Tool Proficiency (Choose 1 from any Musical Instrument)",' +
      '"1:Musician"',
  'Farmer':
    'Equipment=' +
      '"Sickle","Carpenter\'s Tools","Healer\'s Kit","Iron Pot","Shovel",' +
      '"Traveler\'s Clothes","30 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Constitution, Wisdom)",' +
      '"1:Skill Proficiency (Animal Handling; Nature)",' +
      '"1:Tool Proficiency (Carpenter\'s Tools)",' +
      '"1:Tough"',
  'Guard':
    'Equipment=' +
      '"Spear","Light Crossbow","20 Bolts","Gaming Set","Hooded Lantern",' +
      '"Manacles","Quiver","Traveler\'s Clothes","12 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Intelligence, Wisdom)",' +
      '"1:Skill Proficiency (Athletics; Perception)",' +
      '"1:Tool Proficiency (Choose 1 from any Gaming Set)",' +
      '"1:Alert"',
  'Guide':
    'Equipment=' +
      '"Shortbow","20 Arrows","Cartographer\'s Tools","Bedroll","Quiver",' +
      '"Tent","Traveler\'s Clothes","3 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Dexterity, Constitution, Charisma)",' +
      '"1:Skill Proficiency (Stealth; Survival)",' +
      '"1:Tool Proficiency (Cartographer\'s Tools)",' +
      '"1:Magic Initiate (Druid)"',
  'Hermit':
    'Equipment=' +
      '"Quarterstaff","Herbalism Kit","Bedroll","Book (Philosophy)","Lamp",' +
      '"Oil (3 Flasks)","Traveler\'s Clothes","16 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Constitution, Wisdom, Charisma)",' +
      '"1:Skill Proficiency (Medicine; Religion)",' +
      '"1:Tool Proficiency (Herbalism Kit)",' +
      '"1:Healer"',
  'Merchant':
    'Equipment=' +
      '"Gaming Set","Fine Clothes","Perfume","29 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Intelligence, Charisma)",' +
      '"1:Skill Proficiency (History; Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Gaming Set)",' +
      '"1:Skilled"',
  'Sailor':
    'Equipment=' +
      '"Dagger","Navigator\'s Tools","Rope","Traveler\'s Clothes","20 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Strength, Dexterity, Wisdom)",' +
      '"1:Skill Proficiency (Acrobatics; Perception)",' +
      '"1:Tool Proficiency (Navigator\'s Tools)",' +
      '"1:Tavern Brawler"',
  'Scribe':
    'Equipment=' +
      '"Calligrapher\'s Supplies","Fine Clothes","Lamp","Oil (3 Flasks)",' +
      '"Parchment (12 Sheets)","23 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Dexterity, Intelligence, Wisdom)",' +
      '"1:Skill Proficiency (Investigation; Perception)",' +
      '"1:Tool Proficiency (Calligrapher\'s Supplies)",' +
      '"1:Skilled"',
  'Wayfarer':
    'Equipment=' +
      '"2 Daggers","Thieves\' Tools","Gaming Set","Bedroll","2 Pouches",' +
      '"Traveler\'s Clothes","16 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Dexterity, Wisdom, Charisma)",' +
      '"1:Skill Proficiency (Insight; Stealth)",' +
      '"1:Tool Proficiency (Thieves\' Tools)",' +
      '"1:Lucky"'
};
PHB5E2024.BACKGROUNDS =
  Object.assign({}, SRD5E.BACKGROUNDS, PHB5E2024.BACKGROUNDS_ADDED);
PHB5E2024.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"features.Path Of The Wild Heart ? 3:Animal Speaker",' +
    '"features.Path Of The Wild Heart ? 3:Rage Of The Wilds",' +
    '"features.Path Of The Wild Heart ? 6:Aspect Of The Wilds",' +
    '"features.Path Of The Wild Heart ? 10:Nature Speaker",' +
    '"features.Path Of The Wild Heart ? 14:Power Of The Wilds",' +
    '"features.Path Of The World Tree ? 3:Vitality Of The Tree",' +
    '"features.Path Of The World Tree ? 6:Branches Of The Tree",' +
    '"features.Path Of The World Tree ? 10:Battering Roots",' +
    '"features.Path Of The World Tree ? 14:Travel Along The Tree",' +
    '"features.Path Of The Zealot ? 3:Divine Fury",' +
    '"features.Path Of The Zealot ? 3:Warrior Of The Gods",' +
    '"features.Path Of The Zealot ? 6:Fanatical Focus",' +
    '"features.Path Of The Zealot ? 10:Zealous Presence",' +
    '"features.Path Of The Zealot ? 14:Rage Of The Gods"',
  'Bard':
    '"features.College Of Dance ? 3:Dazzling Footwork",' +
    '"features.College Of Dance ? 6:Inspiring Movement",' +
    '"features.College Of Dance ? 6:Tandem Footwork",' +
    '"features.College Of Dance ? 14:Leading Evasion",' +
    '"features.College Of Glamour ? 3:Beguiling Magic",' +
    '"features.College Of Glamour ? 3:Mantle Of Inspiration",' +
    '"features.College Of Glamour ? 6:Mantle Of Majesty",' +
    '"features.College Of Glamour ? 14:Unbreakable Majesty",' +
    '"features.College Of Valor ? 3:Combat Inspiration",' +
    '"features.College Of Valor ? 3:Martial Training",' +
    '"features.College Of Valor ? 6:Extra Attack",' +
    '"features.College Of Valor ? 14:Battle Magic"',
  'Cleric':
    '"features.Light Domain ? 3:Light Domain Spells",' +
    '"features.Light Domain ? 3:Radiance Of The Dawn",' +
    '"features.Light Domain ? 3:Warding Flare",' +
    '"features.Light Domain ? 6:Improved Warding Flare",' +
    '"features.Light Domain ? 17:Corona Of Light",' +
    '"features.Trickery Domain ? 3:Blessing Of The Trickster",' +
    '"features.Trickery Domain ? 3:Invoke Duplicity",' +
    '"features.Trickery Domain ? 3:Trickery Domain Spells",' +
    '"features.Trickery Domain ? 6:Trickster\'s Transformation",' +
    '"features.Trickery Domain ? 17:Improved Duplicity",' +
    '"features.War Domain ? 3:Guided Strike",' +
    '"features.War Domain ? 3:War Domain Spells",' +
    '"features.War Domain ? 3:War Priest",' +
    '"features.War Domain ? 6:War God\'s Blessing",' +
    '"features.War Domain ? 17:Avatar Of Battle"',
  'Druid':
    '"features.Circle Of The Moon ? 3:Circle Forms",' +
    '"features.Circle Of The Moon ? 3:Circle Of The Moon Spells",' +
    '"features.Circle Of The Moon ? 6:Improved Circle Forms",' +
    '"features.Circle Of The Moon ? 10:Moonlight Step",' +
    '"features.Circle Of The Moon ? 14:Lunar Form",' +
    '"features.Circle Of The Sea ? 3:Circle Of The Sea Spells",' +
    '"features.Circle Of The Sea ? 3:Wrath Of The Sea",' +
    '"features.Circle Of The Sea ? 6:Aquatic Affinity",' +
    '"features.Circle Of The Sea ? 10:Stormborn",' +
    '"features.Circle Of The Sea ? 14:Oceanic Gift",' +
    '"features.Circle Of The Stars ? 3:Star Map",' +
    '"features.Circle Of The Stars ? 3:Starry Form",' +
    '"features.Circle Of The Stars ? 6:Cosmic Omen",' +
    '"features.Circle Of The Stars ? 10:Twinkling Constellations",' +
    '"features.Circle Of The Stars ? 14:Full Of Stars"',
  'Fighter':
    '"features.Battle Master ? 3:Combat Superiority",' +
    '"features.Battle Master ? 3:Student Of War",' +
    '"features.Battle Master ? 7:Know Your Enemy",' +
    '"features.Battle Master ? 10:Improved Combat Superiority",' +
    '"features.Battle Master ? 15:Relentless",' +
    '"features.Battle Master ? 18:Ultimate Combat Superiority",' +
    '"features.Eldritch Knight ? 3:Spellcasting",' +
    '"features.Eldritch Knight ? 3:War Bond",' +
    '"features.Eldritch Knight ? 7:War Magic",' +
    '"features.Eldritch Knight ? 10:Eldritch Strike",' +
    '"features.Eldritch Knight ? 15:Arcane Charge",' +
    '"features.Eldritch Knight ? 18:Improved War Magic",' +
    '"features.Psi Warrior ? 3:Psionic Power",' +
    '"features.Psi Warrior ? 7:Telekinetic Adept",' +
    '"features.Psi Warrior ? 10:Guarded Mind",' +
    '"features.Psi Warrior ? 15:Bulwark Of Force",' +
    '"features.Psi Warrior ? 18:Telekinetic Master"',
  'Monk':
    '"features.Way Of Mercy ? 3:Hand Of Harm",' +
    '"features.Way Of Mercy ? 3:Hand Of Healing",' +
    '"features.Way Of Mercy ? 3:Implements Of Mercy",' +
    '"features.Way Of Mercy ? 6:Physician\'s Touch",' +
    '"features.Way Of Mercy ? 11:Flurry Of Healing And Harm",' +
    '"features.Way Of Mercy ? 17:Hand Of Ultimate Mercy",' +
    '"features.Way Of Shadow ? 3:Shadow Arts",' +
    '"features.Way Of Shadow ? 6:Shadow Step",' +
    '"features.Way Of Shadow ? 11:Improved Shadow Step",' +
    '"features.Way Of Shadow ? 17:Cloak Of Shadows",' +
    '"features.Warrior Of The Elements ? 3:Elemental Attunement",' +
    '"features.Warrior Of The Elements ? 3:Manipulate Elements",' +
    '"features.Warrior Of The Elements ? 6:Elemental Burst",' +
    '"features.Warrior Of The Elements ? 11:Stride Of The Elements",' +
    '"features.Warrior Of The Elements ? 17:Elemental Epitome"',
  'Paladin':
    '"features.Oath Of Glory ? 3:Inspiring Smite",' +
    '"features.Oath Of Glory ? 3:Oath Of Glory Spells",' +
    '"features.Oath Of Glory ? 3:Peerless Athlete",' +
    '"features.Oath Of Glory ? 7:Aura Of Alacrity",' +
    '"features.Oath Of Glory ? 15:Glorious Defense",' +
    '"features.Oath Of Glory ? 20:Living Legend",' +
    '"features.Oath Of The Ancients ? 3:Nature\'s Wrath",' +
    '"features.Oath Of The Ancients ? 3:Oath Of The Ancients Spells",' +
    '"features.Oath Of The Ancients ? 7:Aura Of Warding",' +
    '"features.Oath Of The Ancients ? 15:Undying Sentinel",' +
    '"features.Oath Of The Ancients ? 20:Elder Champion",' +
    '"features.Oath Of Vengeance ? 3:Oath Of Vengeance Spells",' +
    '"features.Oath Of Vengeance ? 3:Vow Of Enmity",' +
    '"features.Oath Of Vengeance ? 7:Relentless Avenger",' +
    '"features.Oath Of Vengeance ? 15:Soul Of Vengeance",' +
    '"features.Oath Of Vengeance ? 20:Avenging Angel"',
  'Ranger':
    '"features.Beast Master ? 3:Primal Companion",' +
    '"features.Beast Master ? 7:Exceptional Training",' +
    '"features.Beast Master ? 11:Bestial Fury",' +
    '"features.Beast Master ? 15:Share Spells",' +
    '"features.Fey Wanderer ? 3:Dreadful Strikes",' +
    '"features.Fey Wanderer ? 3:Fey Wanderer Spells",' +
    '"features.Fey Wanderer ? 3:Otherworldly Glamour",' +
    '"features.Fey Wanderer ? 7:Beguiling Twist",' +
    '"features.Fey Wanderer ? 11:Fey Reinforcements",' +
    '"features.Fey Wanderer ? 15:Misty Wanderer",' +
    '"features.Gloom Stalker ? 3:Dread Ambusher",' +
    '"features.Gloom Stalker ? 3:Gloom Stalker Spells",' +
    '"features.Gloom Stalker ? 3:Umbral Sight",' +
    '"features.Gloom Stalker ? 7:Iron Mind",' +
    '"features.Gloom Stalker ? 11:Stalker\'s Flurry",' +
    '"features.Gloom Stalker ? 15:Shadowy Dodge"',
  'Rogue':
    '"features.Arcane Trickster ? 3:Spellcasting",' +
    '"features.Arcane Trickster ? 3:Mage Hand Legerdemain",' +
    '"features.Arcane Trickster ? 9:Magical Ambush",' +
    '"features.Arcane Trickster ? 13:Versatile Trickster",' +
    '"features.Arcane Trickster ? 17:Spell Thief",' +
    '"features.Assassin ? 3:Assassinate",' +
    '"features.Assassin ? 3:Assassin\'s Tools",' +
    '"features.Assassin ? 9:Infiltration Expertise",' +
    '"features.Assassin ? 13:Envenom Weapons",' +
    '"features.Assassin ? 17:Death Strike",' +
    '"features.Soulknife ? 3:Psionic Power",' +
    '"features.Soulknife ? 3:Psychic Blades",' +
    '"features.Soulknife ? 9:Soul Blades",' +
    '"features.Soulknife ? 13:Psychic Veil",' +
    '"features.Soulknife ? 17:Rend Mind"',
  'Sorcerer':
    '"features.Aberrant Sorcery ? 3:Psionic Spells",' +
    '"features.Aberrant Sorcery ? 3:Telepathic Speech",' +
    '"features.Aberrant Sorcery ? 6:Psionic Sorcery",' +
    '"features.Aberrant Sorcery ? 6:Psychic Defenses",' +
    '"features.Aberrant Sorcery ? 14:Revelation In Flesh",' +
    '"features.Aberrant Sorcery ? 18:Warping Implosion",' +
    '"features.Clockwork Sorcery ? 3:Clockwork Spells",' +
    '"features.Clockwork Sorcery ? 3:Restore Balance",' +
    '"features.Clockwork Sorcery ? 6:Bastion Of Law",' +
    '"features.Clockwork Sorcery ? 14:Trance Of Order",' +
    '"features.Clockwork Sorcery ? 18:Clockwork Cavalcade",' +
    '"features.Wild Magic ? 3:Wild Magic Surge",' +
    '"features.Wild Magic ? 3:Tides Of Chaos",' +
    '"features.Wild Magic ? 6:Bend Luck",' +
    '"features.Wild Magic ? 14:Controlled Chaos",' +
    '"features.Wild Magic ? 18:Tamed Surge"',
  'Warlock':
    '"features.Archfey Patron ? 3:Achefey Spells",' +
    '"features.Archfey Patron ? 3:Steps Of The Fey",' +
    '"features.Archfey Patron ? 6:Misty Escape",' +
    '"features.Archfey Patron ? 10:Beguiling Defenses",' +
    '"features.Archfey Patron ? 14:Bewitching Magic",' +
    '"features.Celestial Patron ? 3:Celestial Spells",' +
    '"features.Celestial Patron ? 3:Healing Light",' +
    '"features.Celestial Patron ? 6:Radiant Soul",' +
    '"features.Celestial Patron ? 10:Celestial Resilience",' +
    '"features.Celestial Patron ? 14:Searing Vengeance",' +
    '"features.Great Old One Patron ? 3:Awakened Mind",' +
    '"features.Great Old One Patron ? 3:Great Old One Spells",' +
    '"features.Great Old One Patron ? 3:Psychic Spells",' +
    '"features.Great Old One Patron ? 6:Clairvoyant Combatant",' +
    '"features.Great Old One Patron ? 10:Eldritch Hex",' +
    '"features.Great Old One Patron ? 10:Thought Shield",' +
    '"features.Great Old One Patron ? 14:Create Thrall"',
  'Wizard':
    '"features.Abjurer ? 3:Abjuration Savant",' +
    '"features.Abjurer ? 3:Arcane Ward",' +
    '"features.Abjurer ? 6:Projected Ward",' +
    '"features.Abjurer ? 10:Spell Breaker",' +
    '"features.Abjurer ? 14:Spell Resistance",' +
    '"features.Diviner ? 3:Divination Savant",' +
    '"features.Diviner ? 3:Portent",' +
    '"features.Diviner ? 6:Expert Divination",' +
    '"features.Diviner ? 10:The Third Eye",' +
    '"features.Diviner ? 14:Greater Portent",' +
    '"features.Illusionist ? 3:Illusion Savant",' +
    '"features.Illusionist ? 3:Improved Illusions",' +
    '"features.Illusionist ? 6:Phantasmal Creatures",' +
    '"features.Illusionist ? 10:Illusory Self",' +
    '"features.Illusionist ? 14:Illusory Reality"',
};
PHB5E2024.CLASSES_SELECTABLES_ADDED = {
  'Barbarian':
    '"3:Path Of The Wild Heart:Barbarian Subclass",' +
    '"3:Path Of The World Tree:Barbarian Subclass",' +
    '"3:Path Of The Zealot:Barbarian Subclass"',
  'Bard':
    '"3:College Of Dance:Bard Subclass",' +
    '"3:College Of Glamour:Bard Subclass",' +
    '"3:College Of Valor:Bard Subclass"',
  'Cleric':
    '"3:Light Domain:Cleric Subclass",' +
    '"3:Trickery Domain:Cleric Subclass",' +
    '"3:War Domain:Cleric Subclass"',
  'Druid':
    '"3:Circle Of The Moon:Druid Subclass",' +
    '"3:Circle Of The Sea:Druid Subclass",' +
    '"3:Circle Of The Stars:Druid Subclass"',
  'Fighter':
    '"3:Battle Master:Fighter Subclass",' +
    '"3:Eldritch Knight:Fighter Subclass",' +
    '"3:Psi Warrior:Fighter Subclass"',
  'Monk':
    '"3:Way Of Mercy:Monk Subclass",' +
    '"3:Way Of Shadow:Monk Subclass",' +
    '"3:Warrior Of The Elements:Monk Subclass"',
  'Paladin':
    '"3:Oath Of Glory:Paladin Subclass",' +
    '"3:Oath Of The Ancients:Paladin Subclass",' +
    '"3:Oath Of Vengeance:Paladin Subclass"',
  'Ranger':
    '"3:Beast Master:Ranger Subclass",' +
    '"3:Fey Wanderer:Ranger Subclass",' +
    '"3:Gloom Stalker:Ranger Subclass"',
  'Rogue':
    '"3:Arcane Trickster:Rogue Subclass",' +
    '"3:Assassin:Rogue Subclass",' +
    '"3:Soulknife:Rogue Subclass"',
  'Sorcerer':
    '"3:Aberrant Sorcery:Sorcerer Subclass",' +
    '"3:Clockwork Sorcery:Sorcerer Subclass",' +
    '"3:Wild Magic:Sorcerer Subclass"',
  'Warlock':
    '"3:Archfey Patron:Warlock Subclass",' +
    '"3:Celestial Patron:Warlock Subclass",' +
    '"3:Great Old One Patron:Warlock Subclass"',
  'Wizard':
    '"3:Abjurer:Wizard Subclass",' +
    '"3:Diviner:Wizard Subclass",' +
    '"3:Illusionist:Wizard Subclass"'
};
PHB5E2024.CLASSES = Object.assign({}, SRD5E.CLASSES);
for(let c in PHB5E2024.CLASSES_FEATURES_ADDED)
  PHB5E2024.CLASSES[c] =
    PHB5E2024.CLASSES[c].replace('Features=', 'Features=' + PHB5E2024.CLASSES_FEATURES_ADDED[c] + ',');
for(let c in PHB5E2024.CLASSES_SELECTABLES_ADDED)
  PHB5E2024.CLASSES[c] =
    PHB5E2024.CLASSES[c].replace('Selectables=', 'Selectables=' + PHB5E2024.CLASSES_SELECTABLES_ADDED[c] + ',');
PHB5E2024.DEITIES = Object.assign({}, SRD5E.DEITIES);
PHB5E2024.FEATS_ADDED = {

  'Crafter':'Category=Origin',
  'Healer':PHB5E.FEATS.Healer + ' Category=Origin',
  'Lucky':PHB5E.FEATS.Lucky + ' Category=Origin',
  'Musician':'Category=Origin',
  'Tavern Brawler':PHB5E.FEATS['Tavern Brawler'] + ' Category=Origin',
  'Tough':PHB5E.FEATS.Tough + ' Category=Origin',

  'Actor':PHB5E.FEATS.Actor + ' ' +
    'Category=General Require="level >= 4","charisma >= 13"',
  'Athlete':PHB5E.FEATS.Athlete + ' ' +
    'Category=General Require="level >= 4","strength >= 13 || dexterity >= 13"',
  'Charger':PHB5E.FEATS.Charger + ' ' +
    'Category=General Require="level >= 4","strength >= 13 || dexterity >= 13"',
  'Chef':'Category=General Require="level >= 4"',
  'Crossbow Expert':PHB5E.FEATS['Crossbow Expert'] + ' ' +
    'Category=General Require="level >= 4","dexterity >= 13"',
  'Crusher':'Category=General Require="level >= 4"',
  'Defensive Duelist':PHB5E.FEATS['Defensive Duelist'] + ' ' +
    'Category=General Require="level >= 4","dexterity >= 13"',
  'Dual Wielder':PHB5E.FEATS['Dual Wielder'] + ' ' +
    'Category=General Require="level >= 4","strength >= 13 || dexterity >= 13"',
  'Durable':PHB5E.FEATS.Durable + ' Category=General Require="level >= 4"',
  'Elemental Adept (Acid)':PHB5E.FEATS['Elemental Adept (Acid)'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Elemental Adept (Cold)':PHB5E.FEATS['Elemental Adept (Cold)'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Elemental Adept (Fire)':PHB5E.FEATS['Elemental Adept (Fire)'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Elemental Adept (Lightning)':PHB5E.FEATS['Elemental Adept (Lightning)'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Elemental Adept (Thunder)':PHB5E.FEATS['Elemental Adept (Thunder)'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Fey-Touched':'Category=General Require="level >= 4"',
  'Great Weapon Master':PHB5E.FEATS['Great Weapon Master'] + ' ' +
    'Category=General Require="level >= 4","strength >= 13"',
  'Heavily Armored':PHB5E.FEATS['Heavily Armored'] + ' ' +
    'Category=General Require="level >= 4","armorProficiency.Medium"',
  'Heavy Armor Master':PHB5E.FEATS['Heavy Armor Master'] + ' ' +
    'Category=General Require="level >= 4","armorProficiency.Heavy"',
  'Inspiring Leader':PHB5E.FEATS['Inspiring Leader'] + ' ' +
    'Category=General Require="level >= 4","wisdom > 13 || charisma >= 13"',
  'Keen Mind':PHB5E.FEATS['Keen Mind'] + ' ' +
    'Category=General Require="level >= 4","intelligence >= 13"',
  'Lightly Armored':PHB5E.FEATS['Lightly Armored'] + ' ' +
    'Category=General Require="level >= 4"',
  'Mage Slayer':PHB5E.FEATS['Mage Slayer'] + ' ' +
    'Category=General Require="level >= 4"',
  'Martial Weapon Training':'Category=General Require="level >= 4"',
  'Medium Armor Master':PHB5E.FEATS['Medium Armor Master'] + ' ' +
    'Category=General Require="level >= 4","armorProficiency.Medium"',
  'Moderately Armored':PHB5E.FEATS['Moderately Armored'] + ' ' +
    'Category=General Require="level >= 4","armorProficiency.Light"',
  'Mounted Combatant':PHB5E.FEATS['Mounted Combatant'] + ' ' +
    'Category=General Require="level >= 4"',
  'Observant':PHB5E.FEATS.Observant + ' ' +
    'Category=General ' +
    'Require="level >= 4","intelligence >= 13 || wisdom >= 13"',
  'Piercer':'Category=General Require="level >= 4"',
  'Poisoner':'Category=General Require="level >= 4"',
  'Polearm Master':PHB5E.FEATS['Polearm Master'] + ' ' +
    'Category=General Require="level >= 4","strength > 13 || dexterity >= 13"',
  'Resilient':PHB5E.FEATS.Resilient + 'Category=General Require="level >= 4"',
  'Ritual Caster':PHB5E.FEATS['Ritual Caster'] + ' ' +
    'Category=General ' +
    'Require=' +
      '"level >= 4",' +
      '"intelligence > 13 || wisdom >= 13 || charisma >= 13"',
  'Sentinel':PHB5E.FEATS.Sentinel + ' ' +
    'Category=General Require="level >= 4","strength > 13 || dexterity >= 13"',
  'Shadow-Touched':'Category=General Require="level >= 4"',
  'Sharpshooter':PHB5E.FEATS.Sharpshooter + ' ' +
    'Category=General Require="level >= 4","dexterity >= 13"',
  'Shield Master':PHB5E.FEATS['Shield Master'] + ' ' +
    'Category=General Require="level >= 4","armorProficiency.Shield"',
  'Skill Expert':'Category=General Require="level >= 4"',
  'Skulker':PHB5E.FEATS.Skulker + ' ' +
    'Category=General Require="level >= 4","dexterity >= 13"',
  'Slasher':'Category=General Require="level >= 4"',
  'Speedy':
    'Category=General ' +
    'Require="level >= 4","dexerity > 13 || constitution >= 13"',
  'Spell Sniper':PHB5E.FEATS['Spell Sniper'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Telekinetic':'Category=General Require="level >= 4"',
  'Telepathic':'Category=General Require="level >= 4"',
  'War Caster':PHB5E.FEATS['War Caster'] + ' ' +
    'Category=General ' +
    'Require="level >= 4","features.Spellcasting || features.Pact Magic"',
  'Weapon Master':PHB5E.FEATS['Weapon Master'] + ' ' +
    'Category=General Require="level >= 4"',

  'Blind Fighting':
    'Category="Fighting Style" Require="features.Fighting Style"',
  'Dueling':'Category="Fighting Style" Require="features.Fighting Style"',
  'Interception':'Category="Fighting Style" Require="features.Fighting Style"',
  'Protection':'Category="Fighting Style" Require="features.Fighting Style"',
  'Thrown Weapon Fighting':
    'Category="Fighting Style" Require="features.Fighting Style"',
  'Unarmed Fighting':
    'Category="Fighting Style" Require="features.Fighting Style"',

  'Boon Of Energy Resistance':'Category="Epic Boon" Require="level >= 19"',
  'Boon Of Fortitude':'Category="Epic Boon" Require="level >= 19"',
  'Boon Of Recovery':'Category="Epic Boon" Require="level >= 19"',
  'Boon Of Skill':'Category="Epic Boon" Require="level >= 19"',
  'Boon Of Speed':'Category="Epic Boon" Require="level >= 19"'

};
PHB5E2024.FEATS = Object.assign({}, SRD5E.FEATS, PHB5E2024.FEATS_ADDED);
PHB5E2024.FEATURES_ADDED = {

  // Species

  // Aasimar
  'Celestial Resistance': // ref Volo
    'Section=save Note="Has resistance to necrotic and radiant damage"',
  'Celestial Revelation':
    'Section=feature ' +
    'Note="Can use the Heavenly Wings, Inner Radiance, or Necrotic Shroud feature for 1 min once per long rest"',
  // Darkvision as SRD5E2024
  'Heavenly Wings': // ref Volo (as Radiant Soul)
    'Section=ability,combat ' +
    'Note=' +
      '"Gives a 30\' fly Speed",' +
      '"Can inflict +%{proficiencyBonus} HP radiant once per rd"',
  'Healing Hands': // ref Volo
    'Section=magic ' +
    'Note="Touch heals %{proficiencyBonus}d4 hit points once per long rest"',
  'Inner Radiance': // ref Volo (as Radiant Consumption)
    'Section=combat ' +
    'Note="Emits a bright light in a 10\' radius that inflicts %{proficiencyBonus} HP radiant"',
  'Light Bearer': // ref Volo
    'Section=magic ' +
    'Note="Knows the <i>Light</i> cantrip" ' +
    'SpellAbility=Charisma ' +
    'Spells=Light',
  'Necrotic Shroud': // ref Volo
    'Section=combat ' +
    'Note="R10\' Inflicts frightened (save DC %{8+charismaModifier+proficiencyBonus} negates) until the end of the next turn"',

  // TODO

  // Class

  // Barbarian
  // Path Of The Wild Heart
  'Animal Speaker':'Section=feature Note="TODO"',
  'Aspect Of The Wilds':'Section=feature Note="TODO"',
  'Nature Speaker':'Section=feature Note="TODO"',
  'Power Of The Wilds':'Section=feature Note="TODO"',
  'Rage Of The Wilds':'Section=feature Note="TODO"',
  // Path Of The World Tree
  'Battering Roots':'Section=feature Note="TODO"',
  'Branches Of The Tree':'Section=feature Note="TODO"',
  'Travel Along The Tree':'Section=feature Note="TODO"',
  'Vitality Of The Tree':'Section=feature Note="TODO"',
  // Path Of The Zealot
  'Divine Fury':'Section=feature Note="TODO"',
  'Fanatical Focus':'Section=feature Note="TODO"',
  'Rage Of The Gods':'Section=feature Note="TODO"',
  'Warrior Of The Gods':'Section=feature Note="TODO"',
  'Zealous Presence':'Section=feature Note="TODO"',

  // Bard
  // College Of Dance
  'Dazzling Footwork':'Section=feature Note="TODO"',
  'Inspiring Movement':'Section=feature Note="TODO"',
  'Leading Evasion':'Section=feature Note="TODO"',
  'Tandem Footwork':'Section=feature Note="TODO"',
  // College Of Glamour
  'Beguiling Magic':Xanathar.FEATURES['Enthralling Performance'],
  'Mantle Of Inspiration':Xanathar.FEATURES['Mantle Of Inspiration'],
  'Mantle Of Majesty':Xanathar.FEATURES['Mantle Of Majesty'],
  'Unbreakable Majesty':Xanathar.FEATURES['Unbreakable Majesty'],
  // College Of Valor
  'Combat inspiration':PHB5E.FEATURES['Combat Inspiration'],
  'Martial Training':'Section=feature Note="TODO"',
  // Extra Attack as SRD5E2024
  'Battle Magic':PHB5E.FEATURES['Battle Magic'],

  // Cleric
  'Corona Of Light':PHB5E.FEATURES['Corona Of Light'],
  'Improved Warding Flare':PHB5E.FEATURES['Improved Flare'],
  'Light Domain Spells':PHB5E.FEATURES['Light Domain']
    .replace('1:', '3:')
    .replace('Guardian Of Faith', 'Arcane Eye'),
  'Radiance Of The Dawn':PHB5E.FEATURES['Radiance Of The Dawn'],
  'Warding Flare':PHB5E.FEATURES['Warding Flare'],
  // Trickery Domain
  'Blessing Of The Trickster':PHB5E.FEATURES['Blessing Of The Trickster'],
  'Improved Duplicity':PHB5E.FEATURES['Improved Duplicity'],
  'Invoke Duplicity':PHB5E.FEATURES['Invoke Duplicity'],
  'Trickery Domain Spells':PHB5E.FEATURES['Trickery Domain']
    .replace('1:', '3:')
    .replace('Invisibility', 'Pass Without Trace')
    .replace('Blink', 'Hypnotic Pattern')
    .replace('Nondetection', 'Dispel Magic')
    .replace('Polymorph', 'Confusion'),
  "Trickster's Transformation":'Section=feature Note="TODO"',
  // War Domain
  'Avatar Of Battle':PHB5E.FEATURES['Avatar Of Battle'],
  'Guided Strike':PHB5E.FEATURES['Guided Strike'],
  'War Domain Spells':PHB5E.FEATURES['War Domain']
    .replace('1:', '3:')
    .replace('Divine Favor', 'Guiding Bolt')
    .replace('Stoneskin', 'Fire Shield')
    .replace('Flame Strike', 'Steel Wind Strike'),
  'War Priest':PHB5E.FEATURES['War Priest'],
  "War God's Blessing":PHB5E.FEATURES["War God's Blessing"],

  // Druid
  // Circle Of The Moon
  'Circle Forms':PHB5E.FEATURES['Circle Forms'],
  'Circle Of The Moon Spells':'Section=feature Note="TODO"',
  'Improved Circle Forms':'Section=feature Note="TODO"',
  'Lunar Form':'Section=feature Note="TODO"',
  'Moonlight Step':'Section=feature Note="TODO"',
  // Circle Of The Sea
  'Aquatic Afiinity':'Section=feature Note="TODO"',
  'Circle Of The Sea Spells':'Section=feature Note="TODO"',
  'Oceanic Gifts':'Section=feature Note="TODO"',
  'Stormborn':'Section=feature Note="TODO"',
  'Wrath Of The Sea':'Section=feature Note="TODO"',
  // Circle Of The Stars
  'Cosmic Omen':Tasha.FEATURES['Cosmic Omen'],
  'Full Of Stars':Tasha.FEATURES['Full Of Stars'],
  'Star Map':Tasha.FEATURES['Star Map'],
  'Starry Form':Tasha.FEATURES['Starry Form'],
  'Twinkling Constellations':Tasha.FEATURES['Twinkling Constellations'],

  // Fighter
  // Battle Master
  'Combat Superiority':PHB5E.FEATURES['Combat Superiority'],
  'Improved Combat Superiority':PHB5E.FEATURES['Improved Combat Superiority'],
  'Know Your Enemy':PHB5E.FEATURES['Know Your Enemy'],
  'Relentless':PHB5E.FEATURES.Relentless,
  'Student Of War':PHB5E.FEATURES['Student Of War'],
  'Ultimate Combat Superiority':'Section=feature Note="TODO"',
  // Eldritch Knight
  'Arcane Charge':PHB5E.FEATURES['Arcane Charge'],
  'Eldritch Strike':PHB5E.FEATURES['Eldritch Strike'],
  'Improved War Magic':PHB5E.FEATURES['Improved War Magic'],
  'War Bond':PHB5E.FEATURES['Weapon Bond'],
  'War Magic':PHB5E.FEATURES['War Magic'],
  // Spellcasting as SRD5E2024
  // Psi Warrior
  'Bulwark Of Force':Tasha.FEATURES['Bulwark Of Force'],
  'Guarded Mind':Tasha.FEATURES['Guarded Mind'],
  'Psionic Power':Tasha.FEATURES['Psionic Power'],
  'Telekinetic Adept':Tasha.FEATURES['Telekinetic Adept'],
  'Telekinetic Master':Tasha.FEATURES['Telekinetic Master'],

  // Monk
  // Way Of Mercy
  'Flurry Of Healing And Harm':Tasha.FEATURES['Flurry Of Healing And Harm'],
  'Hand Of Harm':Tasha.FEATURES['Hand Of Harm'],
  'Hand Of Healing':Tasha.FEATURES['Hand Of Healing'],
  'Hand Of Ultimate Mercy':Tasha.FEATURES['Hand Of Ultimate Mercy'],
  'Implements Of Mercy':Tasha.FEATURES['Implements Of Mercy'],
  "Physician's Touch":Tasha.FEATURES["Physician's Touch"],
  // Way Of Shadow
  'Cloak Of Shadows':PHB5E.FEATURES['Cloak Of Shadows (Way Of Shadow)'],
  'Improved Shadow Step':'Section=feature Note="TODO"',
  'Shadow Arts':PHB5E.FEATURES['Shadow Arts'],
  'Shadow Step':PHB5E.FEATURES['Shadow Step'],
  // Way Of The Elements
  'Elemental Attunement':PHB5E.FEATURES['Elemental Attunement'],
  'Elemental Burst':'Section=feature Note="TODO"',
  'Elemental Epitome':'Section=feature Note="TODO"',
  'Manipulate Elements':'Section=feature Note="TODO"',
  'Stride Of The Elements':'Section=feature Note="TODO"',

  // Paladin
  // Oath Of The Ancients
  'Aura Of Warding':
    'Section=save ' +
    'Note="R%{levels.Paladin<18?10:30}\' Self and allies have resistance to spell damage"',
  'Elder Champion':
    'Section=magic ' +
    'Note="Can regain 10 hit points per rd, cast Paladin spells as a bonus action, and inflict disadvantage on saves vs. self spells on foes within 10\' for 1 min once per long rest"',
  "Nature's Wrath":
    'Section=magic ' +
    'Note="R10\' Can use Channel Divinity to create spectral vines that restrain the target (save DC %{spellDifficultyClass.P} Dexterity or Strength ends)"',
  'Oath Of The Ancients Spells':PHB5E.FEATURES_ADDED['Oath Of The Ancients'],
  'Turn The Faithless':
    'Section=combat ' +
    'Note="R30\' Can use Channel Divinity to make fiends and fey flee (save DC %{spellDifficultyClass.P} Wisdom negates) for 1 min"',
  'Undying Sentinel':
    'Section=combat,feature,save ' +
    'Note=' +
      '"Can retain 1 hit point when brought to 0 hit points once per long rest",' +
      '"Suffers no debility from aging",' +
      '"Has immunity to magical aging"',
  // Oath Of Vengeance
  'Abjure Enemy':
    'Section=magic ' +
    'Note="R60\' Can use Channel Divinity to halt a target (save DC %{spellDifficultyClass.P} Wisdom inflicts half speed; fiends and undead have disadvantage on the save) for 1 min"',
  'Avenging Angel':
    'Section=ability,combat ' +
    'Note=' +
      '"Can gain a 60\' fly speed for 1 hr once per long rest",' +
      '"Can gain a 30\' aura that frightens foes (save DC %{spellDifficultyClass.P} Wisdom negates; damage ends), giving advantage on ally attacks, for 1 hr once per long rest"',
  'Oath Of Vengeance':
    'Spells=' +
      '"3:Bane","3:Hunter\'s Mark",' +
      '"5:Hold Person","5:Misty Step",' +
      '"9:Haste","9:Protection From Energy",' +
      '"13:Banishment","13:Dimension Door",' +
      '"17:Hold Monster",17:Scrying',
  'Relentless Avenger':
    'Section=combat ' +
    'Note="Can move %{speed//2}\' after a successful opportunity attack without provoking opportunity attacks"',
  'Soul Of Vengeance':
    'Section=combat ' +
    'Note="Can use a reaction when a Vow Of Enmity target attacks to make a melee attack on the target"',
  'Vow Of Enmity':
    'Section=combat ' +
    'Note="R10\' Can use Channel Divinity and a bonus action to give self advantage on attacks against a target for 1 min"',

  // Ranger
  // Beast Master
  'Bestial Fury':'Section=combat Note="Companion can make 2 attacks per rd"',
  'Exceptional Training':
    'Section=combat ' +
    // errata removes Dodge and adds magical attacks
    'Note="Can use a bonus action to command companion to Dash, Disengage, or Help instead of Attack/Companion attacks count as magical"',
  "Ranger's Companion":
    'Section=combat ' +
    'Note="Companion beast of up to CR 1/4, with the higher of %{levels.Ranger*4} or its maximum normal hit points, obeys commands and gains +%{proficiencyBonus} Armor Class, attack, damage, and proficient skills and saving throws"',
  'Share Spells':
    'Section=magic ' +
    'Note="R30\' Can have spells cast on self also affect companion"',

  // Rogue
  // Assassin
  'Assassinate':
    'Section=combat ' +
    'Note="Has advantage on attacks before the target\'s first turn/Successful surprise attacks are critical hits"',
  'Bonus Proficiencies (Assassin)':
    'Section=skill Note="Tool Proficiency (Disguise Kit; Poisoner\'s Kit)"',
  'Death Strike':
    'Section=combat ' +
    'Note="Inflicts double damage on a successful surprise attack (save DC %{8+dexterityModifier+proficiencyBonus} Constitution negates)"',
  'Impostor':
    'Section=skill ' +
    'Note="Can use unerring mimicry and has advantage on Deception to overcome suspicion"',
  'Infiltration Expertise':
    'Section=skill ' +
    'Note="Can use a 1-week process to create and adopt a different identity"',
  // Arcane Trickster
  'Mage Hand Legerdemain':
    'Section=magic ' +
    'Note="Can use an invisible <i>Mage Hand</i> to stow and retrieve objects, pick locks, and disarm traps" ' +
    'Spells="Mage Hand"',
  'Magical Ambush':
    'Section=magic ' +
    'Note="Casting a spell from hiding inflicts disadvantage on the target\'s initial save"',
  'Spell Thief':
    'Section=magic ' +
    'Note="Can negate the effects of a spell cast on self and use spell slots to cast the same spell for 8 hr (save DC %{8+intelligenceModifier+proficiencyBonus} negates) once per long rest"',
  // Spellcasting as above
  'Versatile Trickster':
    'Section=magic ' +
    'Note="Can use a bonus action to direct <i>Mage Hand</i> to distract a target within 5\', gaining advantage on attacks vs. it until the end of the turn"',

  // Sorcerer
  // Wild Magic
  'Bend Luck':
    'Section=magic ' +
    'Note="Can spend 2 Sorcery Points to add or subtract 1d4 from a target attack, ability check, or save"',
  'Controlled Chaos':
    'Section=magic ' +
    'Note="Can choose from 2 effects when triggering a Wild Magic Surge"',
  'Spell Bombardment':
    'Section=magic ' +
    'Note="Can add another die after rolling the maximum on a spell damage die once per turn"',
  'Tides Of Chaos':
    'Section=combat ' +
    'Note="Can gain advantage on an attack, ability check, or save once per long rest or Wild Magic Surge"',
  'Wild Magic Surge':
    'Section=magic ' +
    'Note="Casting a spell has a 5% chance of unleashing a random magic effect"',

  // Warlock
  // The Archfey
  'Beguiling Defenses':
    'Section=save ' +
    'Note="Has immunity to charm and can reflect charm spells onto the caster (save DC %{spellDifficultyClass.K} Wisdom negates) for 1 min or until the caster takes damage"',
  'Dark Delirium':
    'Section=magic ' +
    'Note="R60\' Inflicts charmed or frightened and unaware of surroundings (save DC %{spellDifficultyClass.K} Wisdom negates) for concentration up to 1 min once per short rest"',
  'Fey Presence':
    'Section=magic ' +
    'Note="Can inflict a choice of charmed or frightened (save DC %{spellDifficultyClass.K} Wisdom negates) until the end of the next turn on all creatures in a 10\' cube once per short rest"',
  'Misty Escape':
    'Section=magic ' +
    'Note="Can use a reaction upon taking damage to teleport 60\' and become invisible until the start of the next turn once per short rest; attacking or casting ends"',
  // The Great Old One
  'Awakened Mind':'Section=skill Note="R30\' Can communicate telepathically"',
  'Create Thrall':
    'Section=magic ' +
    'Note="Touch charms an incapacitated humanoid and allows telepathic communication with it"',
  'Entropic Ward':
    'Section=combat ' +
    'Note="Can use a reaction to inflict disadvantage on an attacker once per short rest; a miss gives self advantage on the first attack on that foe until the end of the next turn"',
  'Thought Shield':
    'Section=save ' +
    'Note="Has immunity to telepathy and resistance to psychic damage, and taking psychic damage inflicts equal damage on the attacker"',

  // Wizard
  // School Of Abjuration
  'Abjuration Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy abjuration spells into spellbook"',
  'Arcane Ward':
    'Section=magic ' +
    'Note="After a long rest, can cause an abjuration spell to create a ward around self that can absorb %{levels.Wizard*2+intelligenceModifier} HP damage; once these are all used, casting another abjuration spell restores 2x the spell level to the ward"',
  'Improved Abjuration':
    'Section=magic Note="+%{proficiencyBonus} abjuration spell ability checks"',
  'Projected Ward':
    'Section=magic Note="R30\' Can use Arcane Ward to absorb damage to others"',
  'Spell Resistance':
    'Section=save ' +
    'Note="Has advantage vs. spells and resistance to spell damage"',
  // School Of Conjuration
  'Benign Transposition':
    'Section=magic ' +
    'Note="R30\' Can teleport self or swap with a willing creature once per long rest or conjuration spell casting"',
  'Conjuration Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy conjuration spells into spellbook"',
  'Durable Summons':
    'Section=magic Note="Summoned creatures gain 30 temporary HP"',
  'Focused Conjuration':
    'Section=magic Note="Damage cannot break conjuration concentration"',
  'Minor Conjuration':
    'Section=magic ' +
    // errata adds end upon dealing damage
    'Note="R10\' Can create a 3\' cube inanimate object weighing up to 10 lb that emits a 5\' dim light and lasts for 1 hr or until it takes or deals damage"',
  // School Of Divination
  'Divination Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy divination spells into spellbook"',
  'Expert Divination':
    'Section=magic ' +
    'Note="Casting a divination spell restores a lower-level expended slot of up to level 5"',
  'Greater Portent':
    'Section=magic Note="Can use Portent 3 times per long rest"',
  'Portent':
    'Section=magic ' +
    'Note="Can replace a visible target\'s attack, ability check, or save with one of two pre-rolled values %{magicNotes.greaterPortent?3:2} times per long rest"',
  'The Third Eye':
    'Section=magic ' +
    'Note="Can use an action once per short rest to gain 60\' darkvision, 60\' ethereal sight, the ability to read any language, or 10\' invisibility sight until the next rest"',
  // School Of Enchantment
  'Alter Memories':
    'Section=magic ' +
    'Note="Chosen target becomes unaware of self charm; can also cause it to forget up to %{charismaModifier+1>?1} hr of the time spent charmed (save DC %{spellDifficultyClass.W} Intelligence negates)"',
  'Enchantment Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy enchantment spells into spellbook"',
  'Hypnotic Gaze':
    'Section=magic ' +
    'Note="Can daze an adjacent creature (save DC %{spellDifficultyClass.W} Wisdom negates) while maintained once per target per long rest"',
  'Instinctive Charm':
    'Section=magic ' +
    'Note="R30\' Can use a reaction to redirect an attack on self to another (save DC %{spellDifficultyClass.W} Wisdom negates until a long rest)"',
  'Split Enchantment':
    'Section=magic Note="Can add a second target to an enchantment spell"',
  // School Of Illusion
  'Illusion Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy illusion spells into spellbook"',
  'Illusory Reality':
    'Section=magic ' +
    'Note="Can use a bonus action to make a harmless object in a self illusion real for 1 min"',
  'Illusory Self':
    'Section=magic ' +
    'Note="Can use a reaction to cause an attack on self to miss once per short rest"',
  'Improved Minor Illusion':
    'Section=magic ' +
    'Note="Knows the <i>Minor Illusion</i> cantrip; effects can include both a sound and an image" ' +
    'Spells="Minor Illusion"',
  'Malleable Illusions':
    'Section=magic Note="Can modify self illusions throughout their durations"',
  // School Of Necromancy
  'Command Undead':
    'Section=magic ' +
    'Note="R60\' Can use an action to control an undead target (save DC %{spellDifficultyClass.W} Charisma negates permanently; targets with Intelligence of at least 8 have advantage on the save, and targets with Intelligence of at least 12 repeat the save every hr)"',
  'Grim Harvest':
    'Section=magic ' +
    'Note="Regains hit points equal to twice the spell level, or 3x for necromantic spells, when a self spell kills"',
  'Inured To Undeath':
    'Section=save ' +
    'Note="Has resistance to necrotic damage and immunity to maximum hit point reduction"',
  'Necromancy Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy necromancy spells into spellbook"',
  'Undead Thralls':
    'Section=magic ' +
    'Note="Knows the <i>Animate Dead</i> spell; casting it animates an additional corpse and gives corpses +%{levels.Wizard} hit points and +%{proficiencyBonus} HP weapon damage" ' +
    'Spells="Animate Dead"',
  // School Of Transmutation
  'Master Transmuter':
    'Section=magic ' +
    'Note="Can destroy a transmuter\'s stone to transmute a 5\' cube, remove curses, diseases, and poisons, cast <i>Raise Dead</i>, or restore youth" ' +
    'Spells="Raise Dead"',
  'Minor Alchemy':
    'Section=magic ' +
    'Note="Can change the substance of 1 cubic foot of matter per 10 min effort for concentration up to 1 hr"',
  'Shapechanger':
    'Section=magic ' +
    'Note="Knows the <i>Polymorph</i> spell; can transform self into a CR 1 creature once per short rest" ' +
    'Spells=Polymorph',
  'Transmutation Savant':
    'Section=magic ' +
    'Note="Requires half the normal time and cost to copy transmutation spells into spellbook"',
  "Transmuter's Stone":
    'Section=magic ' +
    'Note="Can use an 8-hr process to create a stone that gives a choice of 60\' darkvision, +10\' Speed, proficiency on Constitution saves, or resistance to a chosen energy damage, and can change the effect of a possessed stone when casting a transmutation spell"',

  // Backgrounds
  'By Popular Demand':
    'Section=skill ' +
    'Note="Can receive welcome and lodging in exchange for performing"',
  'City Secrets':
    'Section=ability ' +
    'Note="Can travel and lead others through a city at twice normal speed"',
  'Criminal Contact':
    'Section=feature ' +
    'Note="Knows how to contact a liaison to criminal networks"',
  'Discovery':'Section=feature Note="Knows a unique and powerful truth"',
  'False Identity':
    'Section=skill ' +
    'Note="Has a documented second identity and can forge familiar documents"',
  'Guild Membership':
    'Section=feature ' +
    'Note="Can receive assistance from fellow guild members/Must pay a 5 gp monthly guild fee"',
  'Military Rank':
    'Section=feature ' +
    'Note="Receives respect, deference, and the loan of resources from fellow soldiers"',
  'Position Of Privilege':
    'Section=feature ' +
    'Note="Receives welcome from the upper class and deference from commoners"',
  'Researcher':'Section=skill Note="Knows where and whom to ask about lore"',
  'Rustic Hospitality':
    'Section=feature Note="Can receive shelter from common folk"',
  "Ship's Passage":
    'Section=feature ' +
    'Note="Can receive water passage for self and companions in exchange for labor"',
  'Wanderer':
    'Section=skill ' +
    'Note="Has an excellent geographic memory and can forage for 6 people"',

  // Feats
  'Actor':
    'Section=ability,skill ' +
    'Note=' +
      '"+1 Charisma",' +
      '"Has advantage on Deception and Performance to impersonate another person and can mimic others\' speech or sounds"',
  'Alert':
    'Section=combat,combat ' +
    'Note=' +
      '"+5 Initiative",' +
      '"Cannot be surprised, and unseen foes gain no advantage on attacks on self"',
  'Athlete':
    'Section=ability,ability ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Standing, running long jump, and running high jump each use only 5\' of movement/Can climb at full speed"',
  'Charger':
    'Section=combat ' +
    'Note="Can use a bonus action after a 10\' Dash to attack (+5 damage) or to push 10\'"',
  'Crossbow Expert':
    'Section=combat ' +
    'Note="Ignores the loading quality of proficient crossbows/Suffers no disadvantage on ranged attacks within 5\'/Can use a bonus action to make a hand crossbow attack after a one-handed attack"',
  'Defensive Duelist':
    'Section=combat ' +
    'Note="Can use a reaction to gain +%{proficiencyBonus} Armor Class when wielding a proficient finesse weapon"',
  'Dual Wielder':
    'Section=combat ' +
    'Note="+1 Armor Class when wielding two melee weapons/Can use two-weapon fighting with any one-handed weapons/Can draw or stow two weapons simultaneously"',
  'Dungeon Delver':
    'Section=save,skill ' +
    'Note=' +
      '"Has advantage to avoid or resist traps and resistance to trap damage",' +
      // errata changes the second effect
      '"Has advantage on Perception and Investigation (secret door detection)/Suffers no Perception penalty when traveling at a fast pace"',
  'Durable':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Regains a minimum of %{constitutionModifier*2>?2} hit points from a Hit Die roll"',
  'Elemental Adept (Acid)':
    'Section=magic ' +
    'Note="Spells that inflict acid damage ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Cold)':
    'Section=magic ' +
    'Note="Spells that inflict cold damage ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Fire)':
    'Section=magic ' +
    'Note="Spells that inflict fire damage ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Lightning)':
    'Section=magic ' +
    'Note="Spells that inflict lightning damage ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Thunder)':
    'Section=magic ' +
    'Note="Spells that inflict thunder damage ignore resistance and treat 1s as 2s on damage dice"',
  'Great Weapon Master':
    'Section=combat ' +
    'Note="Can use a bonus action to attack after scoring a critical hit or reducing a foe to 0 hit points with a melee weapon/Can make a -5 attack with a heavy weapon to inflict +10 damage"',
  'Healer':
    'Section=skill ' +
    'Note="Using a healer\'s kit to stabilize also restores 1 hit point/Can use a healer\'s kit to restore 1d6+4 + target HD hit points once per creature per short rest"',
  'Heavily Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"Armor Proficiency (Heavy)"',
  'Heavy Armor Master':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"Suffers -3 HP damage from nonmagical bludgeoning, piercing, and slashing weapons when wearing heavy armor"',
  'Inspiring Leader':
    'Section=combat ' +
    'Note="R30\' 10-min speech gives 6 allies %{level+charismaModifier} temporary hit points once per target per short rest"',
  'Keen Mind':
    'Section=ability,feature ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"Always knows the direction of north and hours until sunrise or sunset/Can recall anything seen or heard during the past month"',
  'Lightly Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Light)"',
  'Linguist':
    'Section=ability,skill,skill ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"Language (Choose 3 from any)",' +
      '"Can create ciphers (DC %{intelligence+proficiencyBonus} Intelligence to decode)"',
  'Lucky':
    'Section=combat ' +
    'Note="Can gain advantage on an attack, ability check, or save or inflict foe disadvantage an attack on self 3 times per long rest"',
  'Mage Slayer':
    'Section=combat,save ' +
    'Note=' +
      '"Can use a reaction to attack an adjacent caster/Foe suffers disadvantage on concentration to maintain a spell in response to a self attack",' +
      '"Has advantage on saves vs. spells cast by adjacent foes"',
  'Magic Initiate (Bard)':
    'Section=Magic ' +
    'Note="Knows 2 Bard cantrips and can cast a chosen B1 spell once per long rest"',
  'Magic Initiate (Cleric)':
    'Section=Magic ' +
    'Note="Knows 2 Cleric cantrips and can cast a chosen C1 spell once per long rest"',
  'Magic Initiate (Druid)':
    'Section=Magic ' +
    'Note="Knows 2 Druid cantrips and can cast a chosen D1 spell once per long rest"',
  'Magic Initiate (Sorcerer)':
    'Section=Magic ' +
    'Note="Knows 2 Sorcerer cantrips and can cast a chosen S1 spell once per long rest"',
  'Magic Initiate (Warlock)':
    'Section=Magic ' +
    'Note="Knows 2 Warlock cantrips and can cast a chosen K1 spell once per long rest"',
  'Magic Initiate (Wizard)':
    'Section=Magic ' +
    'Note="Knows 2 Wizard cantrips and can cast a chosen W1 spell once per long rest"',
  'Martial Adept':
    'Section=combat ' +
    'Note="Has the Combat Superiority feature with 2 maneuvers and 1 die"',
  'Medium Armor Master':
    'Section=combat,skill ' +
    'Note=' +
      '"+1 Armor Class in medium armor if Dexterity is at least 16",' +
      '"Suffers no Stealth disadvantage from wearing medium armor"',
  'Mobile':
    'Section=ability,combat ' +
    'Note=' +
      '"+10 Speed",' +
      '"Can Dash at full speed in difficult terrain/Attacking a target does not provoke an opportunity attack"',
  'Moderately Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Medium/Shield)"',
  'Mounted Combatant':
    'Section=combat,save ' +
    'Note=' +
      '"Has advantage on melee attacks on an unmounted foe smaller than mount and can redirect attacks on mount to self",' +
      '"Mount suffers no damage on a successful Dexterity save and half on failure"',
  'Observant':
    'Section=ability,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Intelligence, Wisdom)",' +
      '"Can read lips/+5 passive Investigation and passive Perception"',
  'Polearm Master':
    'Section=combat ' +
    'Note="Can use a bonus action to attack with the butt of a polearm, inflicting 1d4 HP bludgeoning, and a foe entering polearm reach provokes an opportunity attack"',
  'Resilient':
    'Section=ability,save ' +
    'Note=' +
      '"Ability Boost (Choose 1 from any)",' +
      '"Save Proficiency (Choose 1 from any)"',
  'Ritual Caster':
    'Section=magic ' +
    'Note="Can cast spells of up to level %{(level+1)//2} from a ritual book"',
  'Savage Attacker':
    'Section=combat ' +
    'Note="Can take the best of two melee damage rolls once per rd"',
  'Sentinel':
    'Section=combat ' +
    'Note="Successful opportunity attacks halt the target/Can take an opportunity attack when a foe uses Disengage/Can use a reaction to attack when an adjacent foe attacks another"',
  'Sharpshooter':
    'Section=combat ' +
    'Note="Suffers no disadvantage on attacks at long range/Ranged attacks ignore 3/4 cover/Can make a -5 attack with a ranged weapon to inflict +10 damage"',
  'Shield Master':
    'Section=combat,save ' +
    'Note=' +
      '"Can use a bonus action to shove the target 5\' after an attack",' +
      '"+%{shieldACBonus} Dexterity vs. targeted spells and effects, and can use a reaction to suffer no damage instead of half on a successful Dexterity save"',
  // TODO or Tools
  'Skilled':'Section=skill Note="Skill Proficiency (Choose 3 from any)"',
  'Skulker':
    'Section=skill ' +
    'Note="Can hide when lightly obscured/Ranged miss does not reveal position/Suffers no disadvantage on Perception from dim light"',
  'Spell Sniper':
    'Section=magic ' +
    'Note="Can cast attack spells at double normal range/Spells ignore 3/4 cover/Knows an additional attack cantrip"',
  'Tavern Brawler':
    'Section=Ability,Combat,Combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Strength)",' +
      // errata removes Unarmed Strike proficiency
      '"Weapon Proficiency (Improvised)/Unarmed attacks inflict 1d4 HP",' +
      '"Can use a bonus action to grapple after a successful unarmed or improvised attack"',
  'Tough':'Section=combat Note="+%{level*2} Hit Points"',
  'War Caster':
    'Section=magic ' +
    'Note="Has advantage on concentration saves to maintain a spell/Can cast when holding a shield or a weapon/Can use a reaction to cast as an opportunity attack in response to movement"',
  'Weapon Master':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Weapon Proficiency (Choose 4 from any Simple Weapon, any Martial Weapon)"'

};
PHB5E2024.FEATURES = Object.assign({}, SRD5E.FEATURES, PHB5E2024.FEATURES_ADDED);
PHB5E2024.GOODIES = Object.assign({}, SRD5E.GOODIES);
PHB5E2024.LANGUAGES = Object.assign({}, SRD5E.LANGUAGES);
PHB5E2024.SPECIES_ADDED = {
  'Aasimar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"1:Celestial Resistance","1:Darkvision","1:Healing Hands",' +
      '"1:Light Bearer","5:Celestial Revelation"'
};
PHB5E2024.SPECIES = Object.assign({}, SRD5E.SPECIES, PHB5E2024.SPECIES_ADDED);
PHB5E2024.SCHOOLS = Object.assign({}, SRD5E.SCHOOLS);
PHB5E2024.SHIELDS = Object.assign({}, SRD5E.SHIELDS);
PHB5E2024.SKILLS = Object.assign({}, SRD5E.SKILLS);
PHB5E2024.SPELLS_ADDED = {
  // TODO
  "Crusader's Mantle":PHB5E.SPELLS_ADDED["Crusader's Mantle"],
  'Ensnaring Strike':PHB5E.SPELLS_ADDED['Ensnaring Strike'],
  'Steel Wind Strike':Xanathar.SPELLS['Steel Wind Strike']
};
PHB5E2024.SPELLS_LEVELS_ADDED = {
  // TODO
};
PHB5E2024.SPELLS_RENAMED = {
  // TODO
};
PHB5E2024.SPELLS = Object.assign({}, SRD5E.SPELLS, PHB5E2024.SPELLS_ADDED);
for(let s in PHB5E2024.SPELLS_LEVELS_ADDED)
  PHB5E2024.SPELLS[s] =
    PHB5E2024.SPELLS[s].replace('Level=', 'Level=' + PHB5E2024.SPELLS_LEVELS_ADDED[s] + ',');
for(let s in PHB5E2024.SPELLS_RENAMED) {
  PHB5E2024.SPELLS[PHB5E2024.SPELLS_RENAMED[s]] = PHB5E2024.SPELLS[s];
  delete PHB5E2024.SPELLS[s];
}
PHB5E2024.TOOLS = Object.assign({}, SRD5E.TOOLS);
PHB5E2024.WEAPONS = Object.assign({}, SRD5E.WEAPONS);

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
PHB5E2024.choiceRules = function(rules, type, name, attrs) {
  SRD5E.choiceRules(rules, type, name, attrs);
  if(type == 'Class')
    PHB5E2024.classRulesExtra(rules, name);
  else if(type == 'Feat')
    PHB5E2024.featRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
PHB5E2024.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Barbarian') {

    rules.defineRule('carry', 'abilityNotes.aspectOfTheBeast(Bear)', '*', '2');
    rules.defineRule('lift', 'abilityNotes.aspectOfTheBeast(Bear)', '*', '2');
    rules.defineRule('features.Path Of The Totem Warrior',
      'features.Path Of The Totem Warrior (Bear)', '=', '1',
      'features.Path Of The Totem Warrior (Eagle)', '=', '1',
      'features.Path Of The Totem Warrior (Wolf)', '=', '1'
    );

  } else if(name == 'Bard') {

    rules.defineRule
      ('bardHasExtraAttack', 'features.College Of Valor', '=', '1');
    rules.defineRule
      ('combatNotes.extraAttack', 'bardFeatures.Extra Attack', '^=', '2');

  } else if(name == 'Cleric') {

    rules.defineRule('clericHasDivineStrike',
      'features.Nature Domain', '=', '1',
      'features.Tempest Domain', '=', '1',
      'features.Trickery Domain', '=', '1',
      'features.War Domain', '=', '1'
    );
    rules.defineRule('clericHasPotentSpellcasting',
      'features.Knowledge Domain', '=', '1',
      'features.Light Domain', '=', '1'
    );
    rules.defineRule('divineStrikeDamageType',
      'features.Divine Strike', '?', null,
      'features.Nature Domain', '=', '"cold, fire, or lightning"',
      'features.Tempest Domain', '=', '"thunder"',
      'features.Trickery Domain', '=', '"poison"',
      'features.War Domain', '=', '"weapon damage type"'
    );

  } else if(name == 'Druid') {

    rules.defineRule
      ('magicNotes.wildShape', 'magicNotes.circleForms', '=', null);
    rules.defineRule('magicNotes.circleForms',
      classLevel, '=', 'source < 6 ? 1 : Math.floor(source / 3)'
    );

  } else if(name == 'Fighter') {

    rules.defineRule('battleMasterLevel',
      'features.Battle Master', '?', null,
      'levels.Fighter', '=', null
    );
    rules.defineRule('maxDexOrStrMod',
      'dexterityModifier', '=', null,
      'strengthModifier', '^', null
    );
    rules.defineRule('maneuverSaveDC',
      'features.Combat Superiority', '?', null,
      'proficiencyBonus', '=', '8 + source',
      'maxDexOrStrMod', '+', null
    );
    rules.defineRule('combatNotes.combatSuperiority',
      'battleMasterLevel', '+=', 'source<7 ? 4 : source<15 ? 5 : 6'
    );
    rules.defineRule('combatNotes.combatSuperiority.1',
      'features.Combat Superiority', '?', null,
      'battleMasterLevel', '=', '8',
      'combatNotes.improvedCombatSuperiority', '=', null
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'features.Combat Superiority', '?', null,
      'battleMasterLevel', '=', 'source<7 ? 3 : source<10 ? 5 : source<15 ? 7 : 9'
    );
    rules.defineRule('combatNotes.improvedCombatSuperiority',
      classLevel, '=', 'source<18 ? 10 : 12'
    );
    rules.defineRule('combatNotes.tripAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule // Italics noop
      ('combatNotes.warMagic', 'combatNotes.improvedWarMagic', '+', 'null');
    rules.defineRule('selectableFeatureCount.Fighter (Maneuver)',
      'combatNotes.combatSuperiority.2', '=', null
    );

    let slots = [
      'W0:2@3;3@10',
      'W1:2@3;3@4;4@7',
      'W2:2@7;3@10',
      'W3:2@13;3@16',
      'W4:1@19'
    ];
    rules.defineRule('casterLevels.Eldritch Knight',
      'features.Eldritch Knight', '?', null,
      'levels.Fighter','=', null
    );
    QuilvynRules.spellSlotRules(rules, 'casterLevels.Eldritch Knight', slots);
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Eldritch Knight', '^=', null);
    rules.defineRule
      ('magicNotes.spellcasting', 'features.Eldritch Knight', '=', '"Wizard"');

  } else if(name == 'Monk') {

    rules.defineRule('magicNotes.discipleOfTheElements',
      'monkFeatures.Way Of The Four Elements', '?', null,
      classLevel, '=', 'Math.floor( (source + 4) / 5)'
    );
    rules.defineRule('magicNotes.discipleOfTheElements-1',
      classLevel, '?', 'source >= 5'
    );
    rules.defineRule('selectableFeatureCount.Monk (Elemental Discipline)',
      'magicNotes.discipleOfTheElements', '=', null
    );

  } else if(name == 'Rogue') {

    let slots = [
      'W0:3@3;4@10',
      'W1:2@3;3@4;4@7',
      'W2:2@7;3@10',
      'W3:2@13;3@16',
      'W4:1@19'
    ];
    rules.defineRule('casterLevels.Arcane Trickster',
      'features.Arcane Trickster', '?', null,
      'levels.Rogue','=', null
    );
    QuilvynRules.spellSlotRules(rules, 'casterLevels.Arcane Trickster', slots);
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Arcane Trickster', '^=', null);
    rules.defineRule
      ('magicNotes.spellcasting', 'features.Arcane Trickster', '=', '"Wizard"');

  } else if(name == 'Wizard') {

    rules.defineRule // Italics noop
      ('magicNotes.portent', 'magicNotes.greaterPortent', '+', 'null');
    rules.defineRule('combatNotes.invokeDuplicity', // Italics noop
      'combatNotes.improvedDuplicity', '+', 'null'
    );

  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
PHB5E2024.featRulesExtra = function(rules, name) {

  let matchInfo;

  if(name.match(/^Magic\sInitiate\s\(.*\)$/)) {
    let c = name.replace('Magic Initiate (', '').replace(')', '');
    rules.defineRule('casterLevels.' + (c == 'Warlock' ? 'K' : c.charAt(0)),
      'features.' + name, '^=', '1'
    );
  } else if(name == 'Martial Adept') {
    rules.defineRule
      ('combatNotes.combatSuperiority', 'combatNotes.martialAdept', '+=', '1');
    rules.defineRule('combatNotes.combatSuperiority.1',
      'combatNotes.martialAdept', '^=', '6'
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'combatNotes.martialAdept', '+=', '2'
    );
    rules.defineRule
      ('features.Combat Superiority', 'combatNotes.martialAdept', '=', '1');
    let selectables = rules.getChoices('selectableFeatures');
    for(let s in selectables) {
      if(selectables[s].includes('Maneuver'))
        rules.defineRule(
          'validationNotes.fighter-' + s.replaceAll(' ', '') + 'SelectableFeature',
          'combatNotes.martialAdept', '^', '0'
        );
    }
  } else if(name == 'Medium Armor Master') {
    rules.defineRule('armorClass',
      'combatNotes.mediumArmorMaster', '+', '0',
      'combatNotes.mediumArmorMaster.1', '+', null
    );
    rules.defineRule('combatNotes.mediumArmorMaster.1',
      'features.Medium Armor Master', '?', null,
      'dexterity', '?', 'source >= 16',
      'armorCategory', '=', 'source == "Medium" ? 1 : null'
    );
  } else if(name == 'Tavern Brawler') {
    rules.defineRule
      ('weapons.Unarmed.2', 'combatNotes.tavernBrawler', '^=', '"1d4"');
  } else if(name == 'Weapon Master') {
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.weaponMaster', '+=', '4');
  }

};

/* Returns an array of plugins upon which this one depends. */
PHB5E2024.getPlugins = function() {
  let result = [SRD5E2024];
  return result;
};

/* Returns HTML body content for user notes associated with this rule set. */
PHB5E2024.ruleNotes = function() {
  return '' +
    '<h2>D&D 5.5E Quilvyn Plugin Notes</h2>\n' +
    'D&D 5.5E Quilvyn Plugin Version ' + PHB5E2024.VERSION + '\n' +
    '<h3>Limitations</h3>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s D&D 5.5E rule set is unofficial Fan Content permitted under ' +
    'Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
