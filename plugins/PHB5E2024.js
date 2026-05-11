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
/* globals Quilvyn, QuilvynRules, PHB5E, SRD5E2024, Tasha, Xanathar */
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

  if(window.PHB5E == null || window.SRD5E2024 == null || window.Tasha == null || window.Xanathar == null) {
    alert('The PHB5E2024 module requires use of the SRD5E2024, PHB5E, Tasha, and Xanathar modules');
    return;
  }

  let rules = new QuilvynRules('D&D 5.5E', PHB5E2024.VERSION);
  PHB5E2024.rules = rules;
  rules.plugin = PHB5E2024;

  rules.defineChoice('choices', SRD5E2024.CHOICES);
  rules.choiceEditorElements = SRD5E2024.choiceEditorElements;
  rules.choiceRules = PHB5E2024.choiceRules;
  rules.removeChoice = SRD5E2024.removeChoice;
  rules.editorElements = SRD5E2024.initialEditorElements();
  rules.getFormats = SRD5E2024.getFormats;
  rules.getPlugins = PHB5E2024.getPlugins;
  rules.makeValid = SRD5E2024.makeValid;
  rules.randomizeOneAttribute = SRD5E2024.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E2024.RANDOMIZABLE_ATTRIBUTES);
  rules.getChoices = SRD5E2024.getChoices;
  rules.ruleNotes = PHB5E2024.ruleNotes;

  SRD5E2024.createViewers(rules, SRD5E2024.VIEWERS);
  rules.defineChoice('extras',
    'feats', 'featCount', 'sanityNotes', 'selectableFeatureCount',
    'validationNotes'
  );
  rules.defineChoice('preset',
    'background:Background,select-one,backgrounds',
    'species:Species,select-one,species', 'levels:Class Levels,bag,levels');

  SRD5E2024.abilityRules(rules, SRD5E2024.ABILITIES);
  SRD5E2024.combatRules
    (rules, PHB5E2024.ARMORS, PHB5E2024.SHIELDS, PHB5E2024.WEAPONS);
  SRD5E2024.magicRules(rules, PHB5E2024.SCHOOLS, PHB5E2024.SPELLS);
  SRD5E2024.identityRules(
    rules, PHB5E2024.ALIGNMENTS, PHB5E2024.BACKGROUNDS, PHB5E2024.CLASSES,
    PHB5E2024.DEITIES, PHB5E2024.SPECIES
  );
  SRD5E2024.talentRules
    (rules, PHB5E2024.FEATS, PHB5E2024.FEATURES, PHB5E2024.GOODIES,
     PHB5E2024.LANGUAGES, PHB5E2024.SKILLS, PHB5E2024.TOOLS);

  Quilvyn.addRuleSet(rules);

}

PHB5E2024.VERSION = '2.4.1.0';

PHB5E2024.ALIGNMENTS = Object.assign({}, SRD5E2024.ALIGNMENTS);
PHB5E2024.ARMORS = Object.assign({}, SRD5E2024.ARMORS);
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
      '"1:Ability Boost (Choose 3 from Dexterity, Constitution, Wisdom)",' +
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
      '"Navigator\'s Tools","2 Pouches","Traveler\'s Clothes","22 GP" ' +
    'Features=' +
      '"1:Ability Boost (Choose 3 from Constitution, Intelligence, Charisma)",' +
      '"1:Skill Proficiency (Animal Handling; Persuasion)",' +
      '"1:Tool Proficiency (Navigator\'s Tools)",' +
      '"1:Lucky"',
  'Noble':
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
  Object.assign({}, SRD5E2024.BACKGROUNDS, PHB5E2024.BACKGROUNDS_ADDED);
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
    '"features.Trickery Domain ? 6:Trickster\'s Transposition",' +
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
    '"features.Psi Warrior ? 3:Psionic Power (Psi Warrior)",' +
    '"features.Psi Warrior ? 3:Protective Field",' +
    '"features.Psi Warrior ? 3:Psionic Strike",' +
    '"features.Psi Warrior ? 3:Telekinetic Movement",' +
    '"features.Psi Warrior ? 7:Telekinetic Adept",' +
    '"features.Psi Warrior ? 10:Guarded Mind",' +
    '"features.Psi Warrior ? 15:Bulwark Of Force",' +
    '"features.Psi Warrior ? 18:Telekinetic Master"',
  'Monk':
    '"features.Warrior Of Mercy ? 3:Hand Of Harm",' +
    '"features.Warrior Of Mercy ? 3:Hand Of Healing",' +
    '"features.Warrior Of Mercy ? 3:Implements Of Mercy",' +
    '"features.Warrior Of Mercy ? 6:Physician\'s Touch",' +
    '"features.Warrior Of Mercy ? 11:Flurry Of Healing And Harm",' +
    '"features.Warrior Of Mercy ? 17:Hand Of Ultimate Mercy",' +
    '"features.Warrior Of Shadow ? 3:Shadow Arts",' +
    '"features.Warrior Of Shadow ? 6:Shadow Step",' +
    '"features.Warrior Of Shadow ? 11:Improved Shadow Step",' +
    '"features.Warrior Of Shadow ? 17:Cloak Of Shadows",' +
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
    '"features.Soulknife ? 3:Psionic Power (Soulknife)",' +
    '"features.Soulknife ? 3:Psi-Bolstered Knack",' +
    '"features.Soulknife ? 3:Psychic Whispers",' +
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
    '"features.Wild Magic Sorcery ? 3:Wild Magic Surge",' +
    '"features.Wild Magic Sorcery ? 3:Tides Of Chaos",' +
    '"features.Wild Magic Sorcery ? 6:Bend Luck",' +
    '"features.Wild Magic Sorcery ? 14:Controlled Chaos",' +
    '"features.Wild Magic Sorcery ? 18:Tamed Surge"',
  'Warlock':
    '"features.Archfey Patron ? 3:Archfey Spells",' +
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
    '"3:Psi Warrior:Fighter Subclass",' +
    '"3:Ambush:Maneuver","3:Bait And Switch:Maneuver",' +
    '"3:Commander\'s Strike:Maneuver","3:Commanding Presence:Maneuver",' +
    '"3:Disarming Attack:Maneuver","3:Distracting Strike:Maneuver",' +
    '"3:Evasive Footwork:Maneuver","3:Feinting Attack:Maneuver",' +
    '"3:Goading Attack:Maneuver","3:Lunging Attack:Maneuver",' +
    '"3:Maneuvering Attack:Maneuver","3:Menacing Attack:Maneuver",' +
    '"3:Parry:Maneuver","3:Precision Attack:Maneuver",' +
    '"3:Pushing Attack:Maneuver","3:Rally:Maneuver","3:Riposte:Maneuver",' +
    '"3:Sweeping Attack:Maneuver","3:Tactical Assessment:Maneuver",' +
    '"3:Trip Attack:Maneuver"',
  'Monk':
    '"3:Warrior Of Mercy:Monk Subclass",' +
    '"3:Warrior Of Shadow:Monk Subclass",' +
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
    '"3:Wild Magic Sorcery:Sorcerer Subclass"',
  'Warlock':
    '"3:Archfey Patron:Warlock Subclass",' +
    '"3:Celestial Patron:Warlock Subclass",' +
    '"3:Great Old One Patron:Warlock Subclass"',
  'Wizard':
    '"3:Abjurer:Wizard Subclass",' +
    '"3:Diviner:Wizard Subclass",' +
    '"3:Illusionist:Wizard Subclass"'
};
PHB5E2024.CLASSES = Object.assign({}, SRD5E2024.CLASSES);
for(let c in PHB5E2024.CLASSES_FEATURES_ADDED)
  PHB5E2024.CLASSES[c] =
    PHB5E2024.CLASSES[c].replace('Features=', 'Features=' + PHB5E2024.CLASSES_FEATURES_ADDED[c] + ',');
for(let c in PHB5E2024.CLASSES_SELECTABLES_ADDED)
  PHB5E2024.CLASSES[c] =
    PHB5E2024.CLASSES[c].replace('Selectables=', 'Selectables=' + PHB5E2024.CLASSES_SELECTABLES_ADDED[c] + ',');
PHB5E2024.DEITIES = Object.assign({}, SRD5E2024.DEITIES);
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
    'Require="level >= 4","dexterity > 13 || constitution >= 13"',
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
PHB5E2024.FEATS = Object.assign({}, SRD5E2024.FEATS, PHB5E2024.FEATS_ADDED);
PHB5E2024.FEATURES_ADDED = {

  // Species

  // Aasimar
  'Celestial Resistance': // ref Volo
    'Section=save Note="Has resistance to necrotic and radiant"',
  'Celestial Revelation':
    'Section=combat,combat ' +
    'Note=' +
      '"Has the Heavenly Wings, Inner Radiance, and Necrotic Shroud features",' +
      '"Can use Heavenly Wings, Inner Radiance, or Necrotic Shroud for 1 min once per long rest"',
  // Darkvision as SRD5E2024
  'Heavenly Wings':'Section=ability Note="Gains a 30\' fly Speed"',
  'Healing Hands': // ref Volo
    'Section=magic ' +
    'Note="Touch heals %{proficiencyBonus}d4 hit points once per long rest"',
  'Inner Radiance': // ref Volo (as Radiant Consumption)
    'Section=combat ' +
    'Note="Emits a bright light in a 10\' radius that inflicts %{proficiencyBonus} HP radiant"',
  'Light Bearer': // ref Volo
    'SpellAbility=Charisma ' +
    'Spells=Light',
  'Necrotic Shroud': // ref Volo
    'Section=combat ' +
    'Note="R10\' Inflicts frightened (save DC %{8+charismaModifier+proficiencyBonus} negates) until the end of the next turn"',

  // Class

  // Barbarian
  // Path Of The Wild Heart
  'Animal Speaker':
    'Section=magic ' +
    'Note="Can cast <i>Beast Sense</i> and <i>Speak With Animals</i> as rituals" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Beast Sense","Speak With Animals"',
  'Aspect Of The Wilds':
    'Section=feature ' +
    'Note="At the end of a long rest, gains a choice of %{features.Darkvision?\'+\':\'\'}60\' Darkvision or a %{speed}\' climb or swim Speed"',
  'Nature Speaker':
    'Section=magic ' +
    'Note="Can cast <i>Commune With Nature</i> as a ritual" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Commune With Nature"',
  'Power Of The Wilds':
    'Section=combat ' +
    'Note="Rage gives a choice of: a %{speed}\' fly Speed when unarmored; adjacent foe disadvantage when attacking anyone but self; melee hits inflict prone on a Large or smaller foe"',
  'Rage Of The Wilds':
    'Section=combat ' +
    'Note="Rage gives a choice of: resistance to damage other than force, necrotic, psychic, and radiant; a Disengage and a Dash when entering rage and as a bonus action each rd during rage; ally advantage on attacks vs. foes adjacent to self"',
  // Path Of The World Tree
  'Battering Roots':
    'Section=combat ' +
    'Note="Has a +10\' reach with heavy and versatile melee weapons and can use the Push and Topple mastery properties with them in addition to their usual mastery properties"',
  'Branches Of The Tree':
    'Section=combat ' +
    'Note="R30\' While raging, can use a reaction at the start of a creature\'s turn to teleport it to a spot adjacent to self and to reduce its speed to 0 until the end of its turn (save DC %{8+strengthModifier+proficiencyBonus} Strength negates)"',
  'Travel Along The Tree':
    'Section=combat Note="Can teleport 60\' when entering rage and as a bonus action each rd during rage; can instead teleport 150\' along with 6 willing targets within 10\' once per rage"',
  'Vitality Of The Tree':
    'Section=combat ' +
    'Note="Entering rage gives self %{levels.Barbarian} temporary hit points and, each turn, allows giving a creature within 10\' %{levels.Barbarian<9?2:levels.Barbarian<16?3:4}d6 temporary hit points until the end of the rage"',
  // Path Of The Zealot
  'Divine Fury':Xanathar.FEATURES['Divine Fury'],
  'Fanatical Focus':
    Xanathar.FEATURES['Fanatical Focus']
    .replace('failed save', 'failed save with a +%{levels.Barbarian<9?2:levels.Barbarian<16?3:4} bonus'),
  'Rage Of The Gods':
    'Section=combat ' +
    'Note="When entering rage, can gain a %{speed}\' fly Speed, resistance to necrotic, psychic, and radiant damage, and reactions that expend a use of Rage to restore %{levels.Barbarian} hit points to a creature within 30\' when it is taken to 0 hit points, for 1 min once per long rest"',
  'Warrior Of The Gods':
    'Section=combat ' +
    // changed effects
    'Note="Can use a bonus action to regain hit points from a pool of %{levels.Barbarian<6?4:levels.Barbarian<12?5:levels.Barbarian<17?6:7}d12 that refills after a long rest"',
  'Zealous Presence':
    Xanathar.FEATURES['Zealous Presence']
    .replace('long rest', 'long rest; can expend uses of Rage for additional uses'),

  // Bard
  // College Of Dance
  'Dazzling Footwork':
    'Section=combat,combat,skill ' +
    'Note=' +
      '"When unarmored and not using a shield, gains +%{charismaModifier} Armor Class and can use Dexterity for unarmed strikes that inflict increased damage",' +
      '"When unarmored and not using a shield, can make an unarmed strike as part of using Bardic Inspiration for an action or reaction",' +
      '"When unarmored and not using a shield, has advantage on Performance checks that involve dancing"',
  'Inspiring Movement':
    'Section=combat ' +
    'Note="When a foe ends its turn within 5\', can use a reaction and expend a use of Bardic Inspiration to allow self and an ally within 30\' to move half Speed without provoking opportunity attacks"',
  'Leading Evasion':
    'Section=save ' +
    'Note="Successful Dexterity saves yield no damage instead of half, and failures yield half damage; can share this benefit with adjacent allies"',
  'Tandem Footwork':
    'Section=combat ' +
    'Note="Can expend a use of Bardic Inspiration to give self and allies within 30\' +1d%{bardicInspirationDie} initiative"',
  // College Of Glamour
  'Beguiling Magic':
    'Section=magic ' +
    'Note="Casting an enchantment or illusion spell allows inflicting a choice of charmed or frightened on a target within 60\' (save Wisdom negates) once per long rest; can expend uses of Bardic Inspiration for additional uses" ' +
      'Spells="Charm Person","Mirror Image"',
  'Mantle Of Inspiration':
    Xanathar.FEATURES['Mantle Of Inspiration']
    .replace(/%{[^}]*. temporary/, '1d%{bardicInspirationDie} * 2 temporary'),
  'Mantle Of Majesty':
    Xanathar.FEATURES['Mantle Of Majesty']
    .replace('long rest', 'long rest; can expend level 3+ spell slots for additional uses'),
  'Unbreakable Majesty':
    'Section=combat ' +
    // changed effects
    'Note="Can use a bonus action to cause foes attacking self to miss with their first attack each rd (save DC %{spellDifficultyClass.B} Charisma negates) for 1 min once per short rest"',
  // College Of Valor
  'Combat Inspiration':PHB5E.FEATURES['Combat Inspiration'],
  'Martial Training':
    'Section=combat,magic ' +
    'Note=' +
      '"Weapon Proficiency (Martial Weapons)/Armor Training (Medium; Shield)",' +
      '"Can use a simple or martial weapon as a bard spellcasting focus"',
  // Extra Attack as SRD5E2024
  'Battle Magic':PHB5E.FEATURES['Battle Magic'],

  // Cleric
  // Light Domain
  'Corona Of Light':
    PHB5E.FEATURES['Corona Of Light']
    .replace('fire', 'Radiance Of The Dawn and fire')
    .replace('1 min', "1 min %{wisdomModifier>1?wisdomModifier+' times':'once'} per long rest"),
  'Improved Warding Flare':PHB5E.FEATURES['Improved Flare'],
  'Light Domain Spells':PHB5E.FEATURES['Light Domain']
    .replaceAll('1:', '3:')
    .replace('Flaming Sphere', 'See Invisibility')
    .replace('Guardian Of Faith', 'Arcane Eye'),
  'Radiance Of The Dawn':PHB5E.FEATURES['Radiance Of The Dawn'],
  'Warding Flare':
    'Section=combat ' +
    // changed effects
    'Note="R30\' Can use a reaction to inflict disadvantage on a foe attack%{combatNotes.improvedWardingFlare?\' and give the attack target 2d6+\'+wisdomModifier+\' temporary hit points\':\'\'} %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per %{combatNotes.improvedWardingFlare?\'short\':\'long\'} rest"',
  // Trickery Domain
  'Blessing Of The Trickster':
    PHB5E.FEATURES['Blessing Of The Trickster']
    .replace('Touched', "R30' Target")
    .replace('for 1 hr', 'until next long rest'),
  'Improved Duplicity':
    'Section=combat ' +
    // changed effects
    'Note="Self and allies have advantage on attacks vs. a foe within 5\' of the Invoke Duplicity duplicate, and a target adjacent to the duplicate regains %{levels.Cleric} hit points when the effect ends"',
  'Invoke Duplicity':
    PHB5E.FEATURES['Invoke Duplicity']
    .replaceAll('improvedDuplicity', 'null'), // suppress Improved effects
  'Trickery Domain Spells':PHB5E.FEATURES['Trickery Domain']
    .replaceAll('1:', '3:')
    .replace('Mirror Image', 'Invisibility')
    .replace('Blink', 'Hypnotic Pattern')
    .replace('Dispel Magic', 'Nondetection')
    .replace('Polymorph', 'Confusion'),
  "Trickster's Transposition":
    'Section=combat ' +
    'Note="Can swap places with an Invoke Duplicity duplicate when creating or moving it"',
  // War Domain
  'Avatar Of Battle':
    PHB5E.FEATURES['Avatar Of Battle']
    .replace(' from nonmagical attacks', ''),
  'Guided Strike':
    'Section=combat ' +
    // changed effects
    'Note="Can use Channel Divinity after a failed attack to add +10 to the roll, or as a reaction to add +10 to a failed attack roll of an ally within 30\'"',
  'War Domain Spells':PHB5E.FEATURES['War Domain']
    .replace('1:', '3:')
    .replace('Divine Favor', 'Guiding Bolt')
    .replace('Stoneskin', 'Fire Shield')
    .replace('Flame Strike', 'Steel Wind Strike'),
  'War Priest':
    PHB5E.FEATURES['War Priest']
    .replace('weapon attack', 'weapon attack or unarmed strike')
    .replace('long rest', 'short rest'),
  "War God's Blessing":
    // changed effects
    'Section=magic ' +
    'Note="Can use Channel Divinity to cast <i>Shield Of Faith</i> or <i>Spiritual Weapon</i>, lasting 1 min, without expending a spell slot"',

  // Druid
  // Circle Of The Moon
  'Circle Forms':
    'Section=magic,magic ' +
    // changed effects
    'Note=' +
      '"Has increased Wild Shape effects",' +
      '"Wild Shape form has an Armor Class of at least %{13+wisdomModifier}"',
  'Circle Of The Moon Spells':
    'Section=magic ' +
    'Note="Can cast Circle Of The Moon Spells while using Wild Shape", ' +
    'Spells=' +
      '"3:Cure Wounds","3:Moonbeam","3:Starry Wisp",' +
      '"5:Conjure Animals",' +
      '"7:Fount Of Moonlight",' +
      '"9:Mass Cure Wounds"',
  'Improved Circle Forms':
    'Section=combat,save ' +
    'Note=' +
      '"Can inflict radiant damage instead of normal attack damage when in Wild Shape",' +
      '"+%{wisdomModifier} Constitution saves when in Wild Shape"',
  'Lunar Form':
    'Section=combat,combat ' +
    'Note=' +
      '"Has increased Moonlight Step effects",' +
      '"Can inflict +2d10 HP radiant on an attack once per turn while in Wild Shape"',
  'Moonlight Step':
    'Section=combat ' +
    'Note="Can use a bonus action to teleport 30\'%{combatNotes.lunarForm?\\", optionally taking along a willing creature within 10\',\\":\'\'} and gain advantage on the next attack before the end of the turn %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest; can expend level 2+ spell slots for additional uses"',
  // Circle Of The Sea
  'Aquatic Affinity':
    'Section=ability,combat ' +
    'Note=' +
      '"Has a %{speed}\' swim Speed",' +
      '"Has increased Wrath Of The Sea effects"',
  'Circle Of The Sea Spells':
    'Spells=' +
      '"3:Fog Cloud","3:Gust Of Wind","3:Ray Of Frost","3:Shatter","3:Thunderwave",' +
      '"5:Lightning Bolt","5:Water Breathing",' +
      '"7:Control Water","7:Ice Storm",' +
      '"9:Conjure Elemental","9:Hold Monster"',
  'Oceanic Gift':
    'Section=combat ' +
    'Note="Can manifest Wrath Of The Sea around and give its benefits to a willing creature within 60\' or expend 2 uses of Wild Shape to manifest it around both a willing creature and self"',
  'Stormborn':
    'Section=ability,save ' +
    'Note=' +
      '"Has a %{speed}\' fly Speed while using Wrath Of The Sea",' +
      '"Has resistance to cold, lightning, and thunder while using Wrath Of The Sea"',
  'Wrath Of The Sea':
    'Section=combat ' +
    'Note="Can use a bonus action and expend a use of Wild Shape to create a %{combatNotes.aquaticAffinity?10:5}\' emanation for 10 min; can be used when created and as a bonus action each rd to inflict on a target %{wisdomModifier>?1}d6 HP cold and a 15\' push (save Constitution negates; Huge and larger creatures are not pushed)"', 
  // Circle Of The Stars
  'Cosmic Omen':
    Tasha.FEATURES['Cosmic Omen']
    .replace('%{proficiencyBonus} times', "%{wisdomModifier>1?wisdomModifier+' times':'once'}"),
  'Full Of Stars':Tasha.FEATURES['Full Of Stars'],
  'Star Map':
    Tasha.FEATURES['Star Map']
    .replace('%{proficiencyBonus} times', "%{wisdomModifier>1?wisdomModifier+' times':'once'}"),
  'Starry Form':Tasha.FEATURES['Starry Form'],
  'Twinkling Constellations':Tasha.FEATURES['Twinkling Constellations'],

  // Fighter
  // Battle Master
  'Combat Superiority':PHB5E.FEATURES['Combat Superiority'],
  'Improved Combat Superiority':
    PHB5E.FEATURES['Improved Combat Superiority']
    .replace('%V', '10'),
  'Know Your Enemy':
    PHB5E.FEATURES['Know Your Enemy']
    .replace('study', 'study once per long rest; can expend superiority dice for additional uses'),
  'Relentless':
    'Section=combat ' +
    // changed effects
    'Note="Can use a d8 instead of a superiority die for a maneuver once per turn"',
  'Student Of War':
    PHB5E.FEATURES['Student Of War']
    .replace(')', ')/Skill Proficiency (Choose 1 from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Persuasion, Perception, Survival)'),
  'Ultimate Combat Superiority':
    PHB5E.FEATURES['Improved Combat Superiority']
    .replace('%V', '12'),
  // Maneuvers
  'Ambush':Tasha.FEATURES.Ambush,
  'Bait And Switch':Tasha.FEATURES['Bait And Switch'],
  "Commander's Strike":
    PHB5E.FEATURES["Commander's Strike"]
    .replace('gain a bonus action directing', 'direct'),
  'Commanding Presence':Tasha.FEATURES['Commanding Presence'],
  'Disarming Attack':PHB5E.FEATURES['Disarming Attack'],
  'Distracting Strike':PHB5E.FEATURES['Distracting Strike'],
  'Evasive Footwork':
    'Section=combat ' +
    // changed effects
    'Note="Can use bonus action and spend a superiority die to Disengage, adding a the roll to Armor Class until the start of the next turn"',
  'Feinting Attack':PHB5E.FEATURES['Feinting Attack'],
  'Goading Attack':PHB5E.FEATURES['Goading Attack'],
  'Lunging Attack':
    'Section=combat ' +
    // changed effects
    'Note="Can use a bonus action and spend a superiority die to Dash and add the roll to the damage from a subsequent attack during the same turn"',
  'Maneuvering Attack':PHB5E.FEATURES['Maneuvering Attack'],
  'Menacing Attack':PHB5E.FEATURES['Menacing Attack'],
  'Parry':PHB5E.FEATURES.Parry
    .replace('dexterityModifier', 'dexterityModifier>?strengthModifier'),
  'Precision Attack':PHB5E.FEATURES['Precision Attack'],
  'Pushing Attack':PHB5E.FEATURES['Pushing Attack'],
  'Rally':PHB5E.FEATURES.Rally
    .replace('Can', "R30' Can")
    .replace('charismaModifier', 'levels.Fighter//2'),
  'Riposte':PHB5E.FEATURES.Riposte,
  'Sweeping Attack':PHB5E.FEATURES['Sweeping Attack'],
  'Tactical Assessment':Tasha.FEATURES['Tactical Assessment'],
  'Trip Attack':PHB5E.FEATURES['Trip Attack'],
  // Eldritch Knight
  'Arcane Charge':PHB5E.FEATURES['Arcane Charge'],
  'Eldritch Strike':PHB5E.FEATURES['Eldritch Strike'],
  'Improved War Magic':PHB5E.FEATURES['Improved War Magic'],
  'War Bond':PHB5E.FEATURES['Weapon Bond'],
  'War Magic':
    'Section=combat ' +
    // changed effects
    'Note="During an Attack action, can cast %{combatNotes.improvedWarMagic?\'2 1-action level 1 or level 2 spells\':\'a 1-action cantrip\'} in place of %{combatNotes.improvedWarMagic?\'2 attacks\':\'1 attack\'}"',
  // Spellcasting as SRD5E2024
  // Psi Warrior
  'Bulwark Of Force':Tasha.FEATURES['Bulwark Of Force'],
  'Guarded Mind':Tasha.FEATURES['Guarded Mind'],
  'Psi-Powered Leap':Tasha.FEATURES['Psi-Powered Leap'],
  'Psionic Power (Psi Warrior)':
    Tasha.FEATURES['Psionic Power (Psi Warrior)']
    .replace('can use a bonus action to regain', 'regains'),
  'Protective Field':Tasha.FEATURES['Protective Field'],
  'Psionic Strike':Tasha.FEATURES['Psionic Strike'],
  'Telekinetic Movement':Tasha.FEATURES['Telekinetic Movement'],
  'Telekinetic Adept':Tasha.FEATURES['Telekinetic Adept'],
  'Telekinetic Master':Tasha.FEATURES['Telekinetic Master'],
  'Telekinetic Thrust':Tasha.FEATURES['Telekinetic Thrust'],

  // Monk
  // Warrior Of Mercy
  'Flurry Of Healing And Harm':
    Tasha.FEATURES['Flurry Of Healing And Harm']
    .replace('ki point', 'focus point'),
  'Hand Of Harm':
    Tasha.FEATURES['Hand Of Harm']
    .replace('ki point', 'focus point'),
  'Hand Of Healing':
    Tasha.FEATURES['Hand Of Healing']
    .replaceAll('ki point', 'focus point')
    .replace('disease or ', ''),
  'Hand Of Ultimate Mercy':
    Tasha.FEATURES['Hand Of Ultimate Mercy']
    .replace('ki point', 'focus point'),
  'Implements Of Mercy':
    Tasha.FEATURES['Implements Of Mercy']
    // remove mask ownership note
    .replace('feature,', '')
    .replace(/Note="[^"]*",/, 'Note='),
  "Physician's Touch":Tasha.FEATURES["Physician's Touch"],
  // Warrior Of Shadow
  'Cloak Of Shadows':
    'Section=magic ' +
    // changed effects
    'Note="Can expend 5 focus points in dim light or darkness to become invisible, move through occupied spaces as difficult terrain, and use Flurry Of Blows without expending addition focus points, for 1 min or until ending a turn in bright light"',
  'Improved Shadow Step':
    'Section=combat ' +
    'Note="Can expend 1 focus point to Shadow Step between lighted areas and to make an unarmed strike after teleporting"',
  'Shadow Arts':
    'Section=feature,magic ' +
    // changed effects
    'Note=' +
      '"Has %{features.Darkvision?\'+\':\'\'}60\' Darkvision",' +
      '"Can spend 1 focus point to cast <i>Darkness</i> without components and can move its effect within 60\' of self each rd" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Minor Illusion","Darkness"',
  'Shadow Step':PHB5E.FEATURES['Shadow Step'],
  // Way Of The Elements
  'Elemental Attunement':
    'Section=combat ' +
    // changed effects
    'Note="Can expend 1 focus point to gain +10\' reach with unarmed strikes that can inflict a choice of acid, cold, fire, lightning, or thunder and an optional 10\' push (save DC %{8+wisdomModifier+proficiencyBonus} Strength negates) instead of normal damage, for 10 min"',
  'Elemental Burst':
    'Section=magic ' +
    'Note="R120\' Expending 2 focus points causes a 20\' radius to inflict 3d%{combatNotes.martialArts} HP of a choice of acid, cold, fire, lightning, or thunder (save DC %{8+wisdomModifier+proficiencyBonus} Dexterity half)"',
  'Elemental Epitome':
    'Section=combat,save ' +
      'Note=' +
        '"Step Of The Wind gives +20 Speed until the end of the turn and inflicts 1d%{combatNotes.martialArts} HP of a choice of acid, cold, fire, lightning, or thunder to targets passed within 5\'/Unarmed strike inflicts +1d%{combatNotes.martialArts} HP once per turn while using Elemental Attunement",' +
        '"Has resistance to a choice of acid, cold, fire, lightning, or thunder each rd while using Elemental Attunement"',
  'Manipulate Elements':
    'SpellAbility=Wisdom ' +
    'Spells=Elementalism',
  'Stride Of The Elements':
    'Section=ability ' +
    'Note="Has %{speed}\' fly and swim Speeds while using Elemental Attunement"',

  // Paladin
  // Oath Of Glory
  'Aura Of Alacrity':
    Tasha.FEATURES['Aura Of Alacrity']
    .replace('5:10', '10:30'),
  'Glorious Defense':Tasha.FEATURES['Glorious Defense'],
  'Inspiring Smite':Tasha.FEATURES['Inspiring Smite'],
  'Living Legend':
    Tasha.FEATURES['Living Legend']
    .replaceAll('1 min', '10 min'),
  'Oath Of Glory Spells':Tasha.FEATURES['Oath Of Glory']
    .replace('Commune', 'Legend Lore')
    .replace('Flame Strike', "Yolanda's Regal Presence"),
  'Peerless Athlete':
    Tasha.FEATURES['Peerless Athlete']
    .replace('ability,', '')
    .replace(/Note="[^"]*",/, 'Note='),
  // Oath Of The Ancients
  'Aura Of Warding':
    PHB5E.FEATURES['Aura Of Warding']
    .replace('spell damage', 'necrotic, psychic, and radiant'),
  'Elder Champion':
    PHB5E.FEATURES['Elder Champion']
    .replace("10'", "%{levels.Paladin<18?10:30}'")
    .replace('long rest', 'long rest; can expend level 5 spell slots for additional uses'),
  "Nature's Wrath":
    PHB5E.FEATURES["Nature's Wrath"]
    .replace("10'", "15'")
    .replace('the target', 'targets')
    .replace('Dexterity or ', '')
    .replace('end)', 'end) for 1 min'),
  'Oath Of The Ancients Spells':PHB5E.FEATURES['Oath Of The Ancients'],
  'Undying Sentinel':
     PHB5E.FEATURES['Undying Sentinel']
     .replace('retain 1 hit point', 'regain %{levels.Paladin*3} hit points')
     .replace('Suffers no debility from aging', 'Does not age visibly'),
  // Oath Of Vengeance
  'Avenging Angel':
    PHB5E.FEATURES['Avenging Angel']
    .replaceAll('1 hr', '10 min')
    .replaceAll('long rest', 'long rest; can expend level 5 spell slots for additional uses'),
  'Oath Of Vengeance Spells':PHB5E.FEATURES['Oath Of Vengeance'],
  'Relentless Avenger':
    PHB5E.FEATURES['Relentless Avenger']
    .replace('move', "reduce the target's Speed to 0 until the end of the current turn and move"),
  'Soul Of Vengeance':PHB5E.FEATURES['Soul Of Vengeance'],
  'Vow Of Enmity':
    PHB5E.FEATURES['Vow Of Enmity']
    .replace("10'", "30'")
    .replace('a bonus action and ', '')
    .replace('1 min', '1 min; can transfer to another target if the current target drops to 0 hit points'),

  // Ranger
  // Beast Master
  'Bestial Fury':
    PHB5E.FEATURES['Bestial Fury']
    .replace('action', "action, and the first companion hit each turn on a <i>Hunter's Mark</i> target inflicts +1d%{magicNotes.foeSlayer?10:6} HP force"),
  'Exceptional Training':
    'Section=combat ' +
    // changed effects
    'Note="Can use a bonus action to command companion to Dash, Disengage, Dodge or Help instead of Attack, and companion attacks can inflict force damage"',
  'Primal Companion':
    'Section=combat ' +
    // changed effects
    'Note="Primal beast companion (armor class %{13+wisdomModifier}; +%{proficiencyBonus} ability checks and saves; +%{spellAttackModifier.R} Beast\'s Strike) attacks when commanded as a bonus action or by foregoing a self attack; can choose after each long rest to summon a Beast of the Land (%{levels.Ranger*5+5} hit points; 40\' Speed and climb Speed; 60\' Darkvision; Beast\'s Strike inflicts 1d8+%{2+wisdomModifier} HP of a choice of bludgeoning, piercing, or slashing, and a hit after a 20\' charge inflicts +1d6 HP and knocked prone (Huge and larger creatures HP only)), Beast of the Sea (%{levels.Ranger*5+5} hit points; 5\' Speed and 60\' swim Speed; 90\' Darkvision; can breathe water; Beast\'s Strike inflicts 1d6+%{2+wisdomModifier} HP of a choice of bludgeoning or piercing and grappled (save DC %{spellDifficultyClass.R} Athletic or Acrobatics escapes), or Beast of the Sky (%{levels.Ranger*4+4} hit points; 10\' Speed and 60\' fly Speed; 60\' Darkvision; flying away provokes no opportunity attacks; Beast\'s Strike inflicts 1d4+%{3+wisdomModifier} HP slashing)"',
  'Share Spells':PHB5E.FEATURES['Share Spells'],
  // Fey Wanderer
  'Beguiling Twist':Tasha.FEATURES['Beguiling Twist'],
  'Dreadful Strikes':Tasha.FEATURES['Dreadful Strikes'],
  'Fey Reinforcements':Tasha.FEATURES['Fey Reinforcements'],
  'Fey Wanderer Spells':
    Tasha.FEATURES['Fey Wanderer Magic']
    .replace('Dispel Magic', 'Summon Fey'),
  'Misty Wanderer':Tasha.FEATURES['Misty Wanderer'],
  'Otherworldly Glamour':Tasha.FEATURES['Otherworldly Glamour'],
  // Gloom Stalker
  'Dread Ambusher':
    'Section=combat,combat ' +
    // changed effects
    'Note=' +
      '"+%V Initiative",' +
      '"Gains +10 Speed during the first rd of combat/Weapon attacks can inflict +2d%{$\\"combatNotes.stalker\'sFlurry\\"?8:6} HP psychic %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  'Gloom Stalker Spells':Xanathar.FEATURES['Gloom Stalker Magic'],
  'Iron Mind':Xanathar.FEATURES['Iron Mind'],
  'Shadowy Dodge':
    Xanathar.FEATURES['Shadowy Dodge']
    .replace(' advantage', " advantage and to teleport 30'"),
  "Stalker's Flurry":
    'Section=combat,combat ' +
    // changed effects
    'Note=' +
      '"Has increased Dread Ambusher effects",' +
      '"After a successful Dread Ambusher attack, can make another attack against a foe adjacent to the target or inflict frightened (save DC %{spellDifficultyClass.R} Wisdom negates) on creatures within 10\' of the target"',
  'Umbral Sight':
    Xanathar.FEATURES['Umbral Sight']
    .replace('30', '60'),

  // Rogue
  // Arcane Trickster
  'Mage Hand Legerdemain':
    PHB5E.FEATURES['Mage Hand Legerdemain']
    .replace(/stow.*traps/, 'make Sleight Of Hand checks'),
  'Magical Ambush':
    PHB5E.FEATURES['Magical Ambush']
    .replace('hidden', 'invisible'),
  'Spell Thief':PHB5E.FEATURES['Spell Thief'],
  // Spellcasting as PHB5E2024
  'Versatile Trickster':
    'Section=combat ' +
    // changed effects
    'Note="Can extend the trip action of Cunning Strike to affect another creature within 5\' of a <i>Mage Hand</i>"',
  // Assassin
  "Assassin's Tools":
    'Section=skill Note="Tool Proficiency (Disguise Kit; Poisoner\'s Kit)"',
  'Assassinate':
    'Section=combat ' +
    // changed effects
    'Note="Has advantage on initiative and on attacks before the target\'s first turn, and a successful Sneak Attack during the first rd inflicts +%{levels.Rogue} HP"',
  'Death Strike':
    PHB5E.FEATURES['Death Strike']
    .replace('surprise attacks inflict', 'Sneak Attack during the first rd inflicts'),
  'Envenom Weapons':
    'Section=combat ' +
    'Note="Cunning Strikes that inflict poisoned also inflict 2d6 HP poison, ignoring resistance, on a failed save"',
  'Infiltration Expertise':
    'Section=combat,skill ' +
    // changed effects
    'Note=' +
      '"Has increased Steady Aim effects",' +
      '"Can mimic another\'s speech and handwriting after an hour\'s study"',
  // Soulknife
  'Homing Strikes':Tasha.FEATURES['Homing Strikes'],
  'Psi-Bolstered Knack':Tasha.FEATURES['Psi-Bolstered Knack'],
  'Psionic Power (Soulknife)':
    Tasha.FEATURES['Psionic Power (Soulknife)']
    .replace('can use a bonus action to regain', 'regains'),
  'Psychic Blades':Tasha.FEATURES['Psychic Blades'],
  'Psychic Teleportation':Tasha.FEATURES['Psychic Teleportation'],
  'Psychic Veil':Tasha.FEATURES['Psychic Veil'],
  'Psychic Whispers':Tasha.FEATURES['Psychic Whispers'],
  'Rend Mind':Tasha.FEATURES['Rend Mind'],
  'Soul Blades':Tasha.FEATURES['Soul Blades'],

  // Sorcerer
  // Aberrant Sorcery
  'Psychic Defenses':Tasha.FEATURES['Psychic Defenses'],
  'Psionic Sorcery':Tasha.FEATURES['Psionic Sorcery'],
  'Psionic Spells':Tasha.FEATURES['Psionic Spells'],
  'Revelation In Flesh':Tasha.FEATURES['Revelation In Flesh'],
  'Telepathic Speech':Tasha.FEATURES['Telepathic Speech'],
  'Warping Implosion':Tasha.FEATURES['Warping Implosion'],
  // Clockwork Sorcery
  'Bastion Of Law':Tasha.FEATURES['Bastion Of Law'],
  'Clockwork Cavalcade':Tasha.FEATURES['Clockwork Cavalcade'],
  'Clockwork Spells':Tasha.FEATURES['Clockwork Magic'],
  'Restore Balance':
    Tasha.FEATURES['Restore Balance']
    .replace('%{proficiencyBonus} times', "%{charismaModifier>1?charismaModifier+' times':'once'}"),
  'Trance Of Order':Tasha.FEATURES['Trance Of Order'],
  // Wild Magic
  'Bend Luck':
    PHB5E.FEATURES['Bend Luck']
    .replace('2 sorcery points', '1 sorcery point'),
  'Controlled Chaos':PHB5E.FEATURES['Controlled Chaos'],
  'Tamed Surge':
    'Section=magic ' +
    'Note="Can add a chosen Wild Magic effect when casting a spell once per long rest"',
  'Tides Of Chaos':
    'Section=combat ' +
    // changed effects
    'Note="Can gain advantage on an attack, ability check, or save once per long rest; subsequently using a spell slot to cast a Sorcerer spell before a long rest automatically causes a Wild Magic Surge and allows an additional use"',
  'Wild Magic Surge':PHB5E.FEATURES['Wild Magic Surge'],

  // Warlock
  // Archfey Patron
  'Archfey Spells':
    'Spells=' +
      '"3:Calm Emotions","3:Faerie Fire","3:Misty Step","3:Phantasmal Force","3:Sleep",' +
      '"5:Blink","5:Plant Growth",' +
      '"7:Dominate Beast","7:Greater Invisibility",' +
      '"9:Dominate Person","9:Seeming"',
  'Bewitching Magic':
    'Section=magic Note="Can cast <i>Misty Step</i> without expending a spell slot as part of casting an enchantment or illusion spell"',
  'Beguiling Defenses':
    'Section=combat,save ' +
    // changed effects
    'Note=' +
      '"Can use a reaction in response to taking damage to reduce the damage taken by half and to inflict psychic damage on the attacker equal to the remaining amount (save Wisdom negates) once per long rest; can expend spell slots for additional uses",' +
      '"Has immunity to charmed"',
  'Misty Escape':
    'Section=combat,magic ' +
    // changed effects
    'Note=' +
      '"Can use a reaction in response to taking damage to cast <i>Misty Step</i>",' +
      '"Has increased Steps Of The Fey effects"',
  'Steps Of The Fey':
    'Section=magic ' +
    'Note="Can cast <i>Misty Step</i> without expending a spell slot %{charismaModifier>1?charismaModifier+\' times\':\'once\'} per long rest, and casting <i>Misty Step</i> can %{magicNotes.mistyEscape?\\"make self invisible until the end of the next turn (attacking, causing damage, or spellcasting ends), inflict 2d10 HP psychic (save Wisdom negates) on creatures within 5\' of the starting or ending point, \\":\'\'}give 1d10 temporary hit points to a creature within 10\' of the ending point%{magicNotes.mistyEscape?\',\':\'\'} or inflict disadvantage on attacks vs. creatures other than self (save Wisdom negates) on creatures within 5\' of the starting point until the start of the next turn"',
  // Celestial Patron
  'Celestial Resilience':
    Xanathar.FEATURES['Celestial Resilience']
    .replace('rest', 'rest and after using Magical Cunning'),
  'Celestial Spells':
    'Spells=' +
      '"3:Aid","3:Cure Wounds","3:Guiding Bolt","3:Lesser Restoration","3:Light","3:Sacred Flame",' +
      '"5:Daylight","5:Revivify",' +
      '"7:Guardian Of Faith","7:Wall Of Fire",' +
      '"9:Greater Restoration","9:Summon Celestial"',
  'Healing Light':Xanathar.FEATURES['Healing Light'],
  'Radiant Soul':
    Xanathar.FEATURES['Radiant Soul']
    .replace('target', 'target once per turn'),
  'Searing Vengeance':
    'Section=combat ' +
    // changed effects
    'Note="R60\' Can cancel a creature\'s death saving throw, restore half its maximum hit points, allow it to stand, and inflict 2d8+%{charismaModifier} HP radiant and blindness for 1 rd on chosen targets within 30\' of it once per long rest"',
  // Great Old One Patron
  'Awakened Mind':
    'Section=skill ' +
    // changed effects
    'Note="R30\' Can use a bonus action to establish telepathic communication in a shared language with the target while within %{charismaModifier>1?charismaModifier+\' miles\':\'1 mile\'} for %{levels.Warlock} minutes"',
  'Clairvoyant Combatant':
    'Section=combat ' +
    'Note="Can use Awakened Mind to inflict disadvantage on the target on attacks vs. self and to give self advantage on attacks vs. the target (save Wisdom negates) once per short rest; can expend spell slots for additional uses"',
  'Create Thrall':
    'Section=magic ' +
    // changed effects
    'Note="Can cast <i>Summon Aberration</i> to last 1 min instead of concentration, and doing so gives the summoned creature %{levels.Warlock+charismaModifier} temporary hit points; once each turn, summoned aberrations inflict additional psychic damage to <i>Hex</i> targets equal to the damage from that spell"',
  'Eldritch Hex':
    'Section=magic ' +
    'Note="Casting <i>Hex</i> inflicts disadvantage on saves that use the chosen ability" ' +
    'Spells=Hex',
  'Great Old One Spells':
    'Spells=' +
      '"3:Detect Thoughts","3:Dissonant Whispers","3:Phantasmal Force","3:Tasha\'s Hideous Laughter",' +
      '"5:Clairvoyance","5:Hunger Of Hadar",' +
      '"7:Confusion","7:Summon Aberration",' +
      '"9:Modify Memory","9:Telekinesis"',
  'Psychic Spells':
    'Section=combat ' +
    'Note="Can inflict psychic damage instead of normal spell damage, and can cast enchantment and illusion spells without verbal or somatic components"',
  'Thought Shield':PHB5E.FEATURES['Thought Shield'],

  // Wizard
  // Abjurer
  'Abjuration Savant':
    SRD5E2024.FEATURES['Evocation Savant']
    .replace('evocation', 'abjuration'),
  'Arcane Ward':PHB5E.FEATURES['Arcane Ward'],
  'Projected Ward':PHB5E.FEATURES['Projected Ward'],
  'Spell Breaker':
    'Section=magic ' +
    'Note="Can cast <i>Dispel Magic</i> as a bonus action and add %{proficiencyBonus} to the check, and a casting of <i>Counterspell</i> or <i>Dispel Magic</i> that fails to negate a spell does not expend a spell slot" ' +
    'Spells=Counterspell,"Dispel Magic"',
  'Spell Resistance':PHB5E.FEATURES['Spell Resistance'],
  // Diviner
  'Divination Savant':
    SRD5E2024.FEATURES['Evocation Savant']
    .replace('evocation', 'divination'),
  'Expert Divination':PHB5E.FEATURES['Expert Divination'],
  'Greater Portent':PHB5E.FEATURES['Greater Portent'],
  'Portent':PHB5E.FEATURES.Portent,
  'The Third Eye':
    PHB5E.FEATURES['The Third Eye']
    .replace('action', 'bonus action')
    .replace(", 60' ethereal sight", '')
    .replace("10' invisibility sight", 'the ability to cast <i>Invisibility</i> without expending a spell slot') + ' ' +
    'Spells=Invisibility',
  // Illusionist
  'Illusion Savant':
    SRD5E2024.FEATURES['Evocation Savant']
    .replace('evocation', 'illusion'),
  'Illusory Reality':PHB5E.FEATURES['Illusory Reality'],
  'Illusory Self':
    PHB5E.FEATURES['Illusory Self']
    .replace('rest', 'rest; can expend level 2+ spell slots for additional uses'),
  'Improved Illusions':
    PHB5E.FEATURES['Improved Minor Illusion']
    .replace('Can', "Can cast illusions without verbal components, cast 10'+ ranged illusions at +60' range, and "),
  'Phantasmal Creatures':
    'Section=magic ' +
    'Note="Can cast illusion versions of <i>Summon Beast</i> and <i>Summon Fey</i> and can cast either of them without expending a spell slot, creating a creature with half hit points, once per long rest" ' +
    'Spells="Summon Beast","Summon Fey"',

  // Feats

  'Crafter':'Section=feature Note="TODO"',
  'Healer':PHB5E.FEATURES.Healer,
  'Lucky':PHB5E.FEATURES.Lucky,
  'Musician':'Section=feature Note="TODO"',
  'Tavern Brawler':PHB5E.FEATURES['Tavern Brawler'],
  'Tough':PHB5E.FEATURES.Tough,

  'Actor':PHB5E.FEATURES.Actor,
  'Athlete':PHB5E.FEATURES.Athlete,
  'Charger':PHB5E.FEATURES.Charger,
  'Chef':'Section=feature Note="TODO"',
  'Crossbow Expert':PHB5E.FEATURES['Crossbow Expert'],
  'Crusher':'Section=feature Note="TODO"',
  'Defensive Duelist':PHB5E.FEATURES['Defensive Duelist'],
  'Dual Wielder':PHB5E.FEATURES['Dual Wielder'],
  'Durable':PHB5E.FEATURES.Durable,
  'Elemental Adept (Acid)':PHB5E.FEATURES['Elemental Adept (Acid)'],
  'Elemental Adept (Cold)':PHB5E.FEATURES['Elemental Adept (Cold)'],
  'Elemental Adept (Fire)':PHB5E.FEATURES['Elemental Adept (Fire)'],
  'Elemental Adept (Lightning)':PHB5E.FEATURES['Elemental Adept (Lightning)'],
  'Elemental Adept (Thunder)':PHB5E.FEATURES['Elemental Adept (Thunder)'],
  'Fey-Touched':'Section=feature Note="TODO"',
  'Great Weapon Master':PHB5E.FEATURES['Great Weapon Master'],
  'Heavily Armored':PHB5E.FEATURES['Heavily Armored'],
  'Heavy Armor Master':PHB5E.FEATURES['Heavy Armor Master'],
  'Inspiring Leader':PHB5E.FEATURES['Inspiring Leader'],
  'Keen Mind':PHB5E.FEATURES['Keen Mind'],
  'Lightly Armored':PHB5E.FEATURES['Lightly Armored'],
  'Mage Slayer':PHB5E.FEATURES['Mage Slayer'],
  'Martial Weapon Training':'Section=feature Note="TODO"',
  'Medium Armor Master':PHB5E.FEATURES['Medium Armor Master'],
  'Moderately Armored':PHB5E.FEATURES['Moderately Armored'],
  'Mounted Combatant':PHB5E.FEATURES['Mounted Combatant'],
  'Observant':PHB5E.FEATURES.Observant,
  'Piercer':'Section=feature Note="TODO"',
  'Poisoner':'Section=feature Note="TODO"',
  'Polearm Master':PHB5E.FEATURES['Polearm Master'],
  'Resilient':PHB5E.FEATURES.Resilient,
  'Ritual Caster':PHB5E.FEATURES['Ritual Caster'],
  'Sentinel':PHB5E.FEATURES.Sentinel,
  'Shadow-Touched':'Section=feature Note="TODO"',
  'Sharpshooter':PHB5E.FEATURES.Sharpshooter,
  'Shield Master':PHB5E.FEATURES['Shield Master'],
  'Skill Expert':'Section=feature Note="TODO"',
  'Skulker':PHB5E.FEATURES.Skulker,
  'Slasher':'Section=feature Note="TODO"',
  'Speedy':'Section=feature Note="TODO"',
  'Spell Sniper':PHB5E.FEATURES['Spell Sniper'],
  'Telekinetic':'Section=feature Note="TODO"',
  'Telepathic':'Section=feature Note="TODO"',
  'War Caster':PHB5E.FEATURES['War Caster'],
  'Weapon Master':PHB5E.FEATURES['Weapon Master'],

  'Blind Fighting':'Section=feature Note="TODO"',
  'Dueling':'Section=feature Note="TODO"',
  'Interception':'Section=feature Note="TODO"',
  'Protection':'Section=feature Note="TODO"',
  'Thrown Weapon Fighting':'Section=feature Note="TODO"',
  'Unarmed Fighting':'Section=feature Note="TODO"',

  'Boon Of Energy Resistance':'Section=feature Note="TODO"',
  'Boon Of Fortitude':'Section=feature Note="TODO"',
  'Boon Of Recovery':'Section=feature Note="TODO"',
  'Boon Of Skill':'Section=feature Note="TODO"',
  'Boon Of Speed':'Section=feature Note="TODO"'

};
PHB5E2024.FEATURES = Object.assign({}, SRD5E2024.FEATURES, PHB5E2024.FEATURES_ADDED);
PHB5E2024.GOODIES = Object.assign({}, SRD5E2024.GOODIES);
PHB5E2024.LANGUAGES = Object.assign({}, SRD5E2024.LANGUAGES);
PHB5E2024.SPECIES_ADDED = {
  'Aasimar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"1:Celestial Resistance","1:Darkvision","1:Healing Hands",' +
      '"1:Light Bearer","5:Celestial Revelation"'
};
PHB5E2024.SPECIES = Object.assign({}, SRD5E2024.SPECIES, PHB5E2024.SPECIES_ADDED);
PHB5E2024.SCHOOLS = Object.assign({}, SRD5E2024.SCHOOLS);
PHB5E2024.SHIELDS = Object.assign({}, SRD5E2024.SHIELDS);
PHB5E2024.SKILLS = Object.assign({}, SRD5E2024.SKILLS);
PHB5E2024.SPELLS_ADDED = {

  'Arcane Gate':PHB5E.SPELLS_ADDED['Arcane Gate'],
  'Arcane Vigor':
    'School=Abjuration ' +
    'Level=S2,W2 ' +
    'Description=' +
      '"TODO"',
  'Armor Of Agathys':PHB5E.SPELLS_ADDED['Armor Of Agathys'],
  'Arms Of Hadar':PHB5E.SPELLS_ADDED['Arms Of Hadar'],
  'Aura Of Life':PHB5E.SPELLS_ADDED['Aura Of Life'],
  'Aura Of Purity':PHB5E.SPELLS_ADDED['Aura Of Purity'],
  'Aura Of Vitality':PHB5E.SPELLS_ADDED['Aura Of Vitality'],

  'Banishing Smite':PHB5E.SPELLS_ADDED['Banishing Smite'],
  'Beast Sense':PHB5E.SPELLS_ADDED['Beast Sense'],
  'Blade Ward':PHB5E.SPELLS_ADDED['Blade Ward'],
  'Blinding Smite':PHB5E.SPELLS_ADDED['Blinding Smite'],

  'Circle Of Power':PHB5E.SPELLS_ADDED['Circle Of Power'],
  'Cloud Of Daggers':PHB5E.SPELLS_ADDED['Cloud Of Daggers'],
  'Compelled Duel':PHB5E.SPELLS_ADDED['Compelled Duel'],
  'Conjure Barrage':PHB5E.SPELLS_ADDED['Conjure Barrage'],
  'Conjure Volley':PHB5E.SPELLS_ADDED['Conjure Volley'],
  'Cordon Of Arrows':PHB5E.SPELLS_ADDED['Cordon Of Arrows'],
  'Crown Of Madness':PHB5E.SPELLS_ADDED['Crown Of Madness'],
  "Crusader's Mantle":PHB5E.SPELLS_ADDED["Crusader's Mantle"],

  'Destructive Wave':PHB5E.SPELLS_ADDED['Destructive Wave'],

  'Elemental Weapon':PHB5E.SPELLS_ADDED['Elemental Weapon'],
  'Ensnaring Strike':PHB5E.SPELLS_ADDED['Ensnaring Strike'],

  'Feign Death':PHB5E.SPELLS_ADDED['Feign Death'],
  'Fount Of Moonlight':
    'School=Evocation ' +
    'Level=B4,D4 ' +
    'Description=' +
      '"Self emits a 20\' radius bright light, gains resistance to radiant, inflicts +2d6 HP radiant, and can use a reaction to inflict blindness on successful attackers until the end of the next turn (save Constitution negates) for concentration up to 10 min"',
  'Friends':PHB5E.SPELLS_ADDED.Friends,

  'Grasping Vine':PHB5E.SPELLS_ADDED['Grasping Vine'],

  'Hail Of Thorns':PHB5E.SPELLS_ADDED['Hail Of Thorns'],
  'Hunger Of Hadar':PHB5E.SPELLS_ADDED['Hunger Of Hadar'],

  "Jallarzi's Storm Of Radiance":
    'School=Evocation ' +
    'Level=K5,W5 ' +
    'Description=' +
      '"TODO"',

  'Lightning Arrow':PHB5E.SPELLS_ADDED['Lightning Arrow'],

  'Mind Sliver':Tasha.SPELLS['Mind Sliver'],

  'Power Word Fortify':
    'School=Enchantment ' +
    'Level=B7,C7 ' +
    'Description=' +
      '"TODO"',

  'Staggering Smite':PHB5E.SPELLS['Staggering Smite'],
  'Steel Wind Strike':Xanathar.SPELLS['Steel Wind Strike'],
  'Summon Aberration':Tasha.SPELLS['Summon Aberration'],
  'Summon Beast':Tasha.SPELLS['Summon Beast'],
  'Summon Celestial':Tasha.SPELLS['Summon Celestial'],
  'Summon Construct':Tasha.SPELLS['Summon Construct'],
  'Summon Elemental':Tasha.SPELLS['Summon Construct'],
  'Summon Fey':Tasha.SPELLS['Summon Fey'],
  'Summon Fiend':Tasha.SPELLS['Summon Fiend'],
  'Summon Undead':Tasha.SPELLS['Summon Undead'],
  'Swift Quiver':PHB5E.SPELLS['Swift Quiver'],
  'Synaptic Static':Xanathar.SPELLS['Synaptic Static'],

  "Tasha's Bubbling Cauldron":
    'School=Conjuration ' +
    'Level=K6,W6 ' +
    'Description=' +
      '"TODO"',
  'Telepathy':PHB5E.SPELLS.Telepathy,
  'Thorn Whip':PHB5E.SPELLS['Thorn Whip'],
  'Thunderclap':Xanathar.SPELLS.Thunderclap,
  'Thunderous Smite':PHB5E.SPELLS['Thunderous Smite'],
  'Toll The Dead':Xanathar.SPELLS['Toll The Dead'],

  'Witch Bolt':PHB5E.SPELLS['Witch Bolt'],
  'Word Of Radiance':Xanathar.SPELLS['Word Of Radiance'],
  'Wrathful Smite':PHB5E.SPELLS['Wrathful Smite'],
  "Yolanda's Regal Presence":
    'School=Enchantment ' +
    'Level=B5,W5 ' +
    'Description="10\' radius inflicts 4d6 HP psychic, knocked prone, and a 10\' push (save Wisdom half HP only) on targets for concentration up to 1 min"'

};
PHB5E2024.SPELLS_LEVELS_ADDED = {
  // TODO
};
PHB5E2024.SPELLS_RENAMED = Object.assign({}, PHB5E.SPELLS_RENAMED);
PHB5E2024.SPELLS = Object.assign({}, SRD5E2024.SPELLS, PHB5E2024.SPELLS_ADDED);
for(let s in PHB5E2024.SPELLS_LEVELS_ADDED)
  PHB5E2024.SPELLS[s] =
    PHB5E2024.SPELLS[s].replace('Level=', 'Level=' + PHB5E2024.SPELLS_LEVELS_ADDED[s] + ',');
for(let s in PHB5E2024.SPELLS_RENAMED) {
  PHB5E2024.SPELLS[PHB5E2024.SPELLS_RENAMED[s]] = PHB5E2024.SPELLS[s];
  delete PHB5E2024.SPELLS[s];
}
PHB5E2024.TOOLS = Object.assign({}, SRD5E2024.TOOLS);
PHB5E2024.WEAPONS = Object.assign({}, SRD5E2024.WEAPONS);

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
PHB5E2024.choiceRules = function(rules, type, name, attrs) {
  SRD5E2024.choiceRules(rules, type, name, attrs);
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

  if(name == 'Bard') {

    rules.defineRule('armorClass', 'combatNotes.dazzlingFootwork.1', '+', null);
    rules.defineRule('attackBonus.Unarmed Strike',
      'combatNotes.dazzlingFootwork.2', '+', null
    );
    rules.defineRule('damageBonus.Unarmed Strike',
      'combatNotes.dazzlingFootwork.2', '+', null
    );
    rules.defineRule
      ('combatNotes.extraAttack', 'bardFeatures.Extra Attack', '^=', '2');
    rules.defineRule('combatNotes.dazzlingFootwork.1',
      'combatNotes.dazzlingFootwork', '?', null,
      'armor', '?', 'source=="None"',
      'shield', '?', 'source=="None"',
      'charismaModifier', '=', null
    );
    rules.defineRule('combatNotes.dazzlingFootwork.2',
      'combatNotes.dazzlingFootwork', '?', null,
      'armor', '?', 'source=="None"',
      'shield', '?', 'source=="None"',
      'dexterityModifier', '=', null,
      'strengthModifier', '+', '-source',
      '', '^', '0'
    );
    rules.defineRule('combatNotes.dazzlingFootwork.3',
      'combatNotes.dazzlingFootwork', '?', null,
      'armor', '?', 'source=="None"',
      'shield', '?', 'source=="None"',
      'bardicInspirationDie', '=', '"1d" + source'
    );
    // TODO multiclass bard/monk? both increase unarmed strike damage
    rules.defineRule
      ('weapons.Unarmed Strike.2', 'combatNotes.dazzlingFootwork.3', '=', null);

  } else if(name == 'Druid') {

    rules.defineRule('magicNotes.circleForms.1',
      'features.Circle Forms', '?', null,
      classLevel, '=', 'source < 6 ? 1 : Math.floor(source / 3)'
    );
    rules.defineRule
      ('magicNotes.wildShape', 'magicNotes.circleForms.1', '=', null);
    rules.defineRule
      ('magicNotes.wildShape.1', 'magicNotes.circleForms', '*', '3');

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
      'combatNotes.improvedCombatSuperiority', '=', '10',
      'combatNotes.ultimateCombatSuperiority', '=', '12'
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'features.Combat Superiority', '?', null,
      'battleMasterLevel', '=', 'source<7 ? 3 : source<10 ? 5 : source<15 ? 7 : 9'
    );
    rules.defineRule('combatNotes.psionicPower(PsiWarrior)',
      classLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule('combatNotes.tripAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('selectableFeatureCount.Fighter (Maneuver)',
      'combatNotes.combatSuperiority.2', '=', null
    );

    let slots = [
      'W1:2@3;3@4;4@7',
      'W2:2@7;3@10',
      'W3:2@13;3@16',
      'W4:1@19'
    ];
    let known = [
      'W0:2@3;3@10',
      'W:3@3;4@4;5@7;6@8;7@10;8@11;9@13;10@14;11@16;12@19;13@20'
    ];
    rules.defineRule('casterLevels.Eldritch Knight',
      'features.Eldritch Knight', '?', null,
      'levels.Fighter','=', null
    );
    SRD5E2024.spellsAvailableRules
      (rules, 'casterLevels.Eldritch Knight', known);
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

  } else if(name == 'Ranger') {

    rules.defineRule('combatNotes.dreadAmbusher', 'wisdomModifier', '=', null);

  } else if(name == 'Rogue') {

    let known = [
      'W0:2@3;3@10',
      'W:3@3;4@4;5@7;6@8;7@10;8@11;9@13;10@14;11@16;12@19;13@20'
    ];
    let slots = [
      'W1:2@3;3@4;4@7',
      'W2:2@7;3@10',
      'W3:2@13;3@16',
      'W4:1@19'
    ];
    rules.defineRule('casterLevels.Arcane Trickster',
      'features.Arcane Trickster', '?', null,
      'levels.Rogue','=', null
    );
    SRD5E2024.spellsAvailableRules
      (rules, 'casterLevels.Arcane Trickster', known);
    QuilvynRules.spellSlotRules(rules, 'casterLevels.Arcane Trickster', slots);
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Arcane Trickster', '^=', null);
    rules.defineRule('combatNotes.psionicPower(Soulknife)',
      classLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule
      ('magicNotes.spellcasting', 'features.Arcane Trickster', '=', '"Wizard"');

  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
PHB5E2024.featRulesExtra = function(rules, name) {

  if(name == 'Medium Armor Master') {
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
