/*
Copyright 2021, James J. Hayes

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
 * not part of the 5E SRD.  The PHB5E function contains methods that load rules
 * for particular parts of the rules; raceRules for character races, magicRules
 * for spells, etc.  These member methods can be called independently in order
 * to use a subset of the 5E PHB.  Similarly, the constant fields of PHB5E
 * (FEATS, BACKGROUNDS, etc.) can be manipulated to modify the choices.
 */
function PHB5E() {

  if(window.SRD5E == null) {
    alert('The PHB5E module requires use of the SRD5E module');
    return;
  }

  let rules = new QuilvynRules('D&D 5E', PHB5E.VERSION);
  PHB5E.rules = rules;
  rules.plugin = PHB5E;

  rules.defineChoice('choices', SRD5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = PHB5E.choiceRules;
  rules.removeChoice = SRD5E.removeChoice;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = PHB5E.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = SRD5E.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E.RANDOMIZABLE_ATTRIBUTES);
  rules.getChoices = SRD5E.getChoices;
  rules.ruleNotes = PHB5E.ruleNotes;

  SRD5E.createViewers(rules, SRD5E.VIEWERS);
  rules.defineChoice('extras',
    'feats', 'featCount', 'sanityNotes', 'selectableFeatureCount',
    'validationNotes'
  );
  rules.defineChoice('preset',
    'background:Background,select-one,backgrounds',
    'race:Race,select-one,races', 'levels:Class Levels,bag,levels');

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, SRD5E.ARMORS, SRD5E.SHIELDS, SRD5E.WEAPONS);
  SRD5E.magicRules(rules, SRD5E.SCHOOLS, PHB5E.SPELLS);
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, PHB5E.BACKGROUNDS, PHB5E.CLASSES, PHB5E.DEITIES,
    PHB5E.PATHS, PHB5E.RACES
  );
  SRD5E.talentRules
    (rules, PHB5E.FEATS, PHB5E.FEATURES, SRD5E.GOODIES, SRD5E.LANGUAGES,
     SRD5E.SKILLS, SRD5E.TOOLS);

  Quilvyn.addRuleSet(rules);

}

PHB5E.VERSION = '2.4.1.0';

PHB5E.BACKGROUNDS_ADDED = {
  'Charlatan':
    'Equipment=' +
      '"Fine Clothes","Con Tools","Disguise Kit","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Deception/Sleight Of Hand)",' +
      '"1:Tool Proficiency (Disguise Kit/Forgery Kit)",' +
      '"1:False Identity"',
  'Criminal':
    'Equipment=' +
      'Crowbar,"Dark Clothes W/Hood","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Deception/Stealth)",' +
      '"1:Tool Proficiency (Thieves\' Tools/Choose 1 from any Game)",' +
      '"1:Criminal Contact"',
  'Entertainer':
    'Equipment=' +
      '"Admirer\'s Favor",Costume,"Musical Instrument","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Acrobatics/Performance)",' +
      '"1:Tool Proficiency (Disguise Kit/Choose 1 from any Music)",' +
      '"1:By Popular Demand"',
  'Folk Hero':
    'Equipment=' +
      '"Artisan\'s Tools",Clothes,"Iron Pot",Shovel,"10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Animal Handling/Survival)",' +
      '"1:Tool Proficiency (Vehicles (Land)/Choose 1 from any Artisan)",' +
      '"1:Rustic Hospitality"',
  'Guild Artisan':
    'Equipment=' +
      '"Artisan\'s Tools","Introduction Letter","Traveler\'s Clothes","15 GP" '+
    'Features=' +
      '"1:Skill Proficiency (Insight/Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Artisan)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Guild Membership"',
  'Hermit':
    'Equipment=' +
      'Clothes,"Herbalism Kit","Scroll Case With Notes","Winter Blanket",' +
      '"5 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Medicine/Religion)",' +
      '"1:Tool Proficiency (Herbalism Kit)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Discovery',
  'Noble':
    'Equipment=' +
      '"Fine Clothes","Pedigree Scroll","Signet Ring","25 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History/Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Game)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Position Of Privilege"',
  'Outlander':
    'Equipment=' +
      '"Animal Trophy","Hunting Trap",Staff,"Traveler\'s Clothes","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Survival)",' +
      '"1:Tool Proficiency (Choose 1 from any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Wanderer',
  'Sage':
    'Equipment=' +
      '"Bottle Ink",Clothes,"Letter W/Unanswered Question","Quill",' +
      '"Small Knife","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Arcana/History)",' +
      '"1:Language (Choose 2 from any)",' +
      '1:Researcher',
  'Sailor':
    'Equipment=' +
      '"Belaying Pin",Clothes,"Lucky Charm","50\' Silk Rope","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Perception)",' +
      '"1:Tool Proficiency (Navigator\'s Tools/Vehicles (Water))",' +
      '"1:Ship\'s Passage"',
  'Soldier':
    'Equipment=' +
      '"Battle Trophy","Clothes","Gambling Objects","Rank Insignia","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Intimidation)",' +
      '"1:Tool Proficiency (Vehicles (Land)/Choose 1 from any Game)",' +
      '"1:Military Rank"',
  'Urchin':
    'Equipment=' +
      '"City Map",Clothes,"Parent\'s Token","Pet Mouse","Small Knife","10 GP" '+
    'Features=' +
      '"1:Skill Proficiency (Sleight Of Hand/Stealth)",' +
      '"1:Tool Proficiency (Disguise Kit/Thieves\' Tools)",' +
      '"1:City Secrets"'
};
PHB5E.BACKGROUNDS =
  Object.assign({}, SRD5E.BACKGROUNDS, PHB5E.BACKGROUNDS_ADDED);
PHB5E.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"features.Path Of The Totem Warrior ? 3:Spirit Seeker",' +
    '"features.Path Of The Totem Warrior ? 10:Spirit Walker",' +
    '"features.Path Of The Totem Warrior (Bear) ? 3:Totem Spirit (Bear)",' +
    '"features.Path Of The Totem Warrior (Bear) ? 6:Aspect Of The Beast (Bear)",' +
    '"features.Path Of The Totem Warrior (Bear) ? 14:Totemic Attunement (Bear)",'+
    '"features.Path Of The Totem Warrior (Eagle) ? 3:Totem Spirit (Eagle)",' +
    '"features.Path Of The Totem Warrior (Eagle) ? 6:Aspect Of The Beast (Eagle)",' +
    '"features.Path Of The Totem Warrior (Eagle) ? 14:Totemic Attunement (Eagle)",' +
    '"features.Path Of The Totem Warrior (Wolf) ? 3:Totem Spirit (Wolf)",' +
    '"features.Path Of The Totem Warrior (Wolf) ? 6:Aspect Of The Beast (Wolf)",' +
    '"features.Path Of The Totem Warrior (Wolf) ? 14:Totemic Attunement (Wolf)"',
  'Bard':
    '"features.College Of Valor ? 3:Bonus Skills",' +
    '"features.College Of Valor ? 3:Combat Inspiration",' +
    '"features.College Of Valor ? 3:Bonus Proficiencies (College Of Valor)",' +
    '"features.College Of Valor ? 6:Extra Attack",' +
    '"features.College Of Valor ? 14:Battle Magic"',
  'Cleric':
    '"features.Knowledge Domain ? 1:Blessings Of Knowledge",' +
    '"features.Knowledge Domain ? 2:Knowledge Of The Ages",' +
    '"features.Knowledge Domain ? 6:Read Thoughts",' +
    '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Knowledge Domain ? 17:Visions Of The Past",' +
    '"features.Light Domain ? 1:Bonus Cantrip (Light Domain)",' +
    '"features.Light Domain ? 1:Warding Flare",' +
    '"features.Light Domain ? 2:Radiance Of The Dawn",' +
    '"features.Light Domain ? 6:Improved Flare",' +
    '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Light Domain ? 17:Corona Of Light",' +
    '"features.Nature Domain ? 1:Acolyte Of Nature",' +
    '"features.Nature Domain ? 1:Bonus Proficiency (Nature Domain)",' +
    '"features.Nature Domain ? 2:Charm Animals And Plants",' +
    '"features.Nature Domain ? 6:Dampen Elements",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Nature Domain ? 17:Master Of Nature",' +
    '"features.Tempest Domain ? 1:Bonus Proficiencies (Tempest Domain)",' +
    '"features.Tempest Domain ? 1:Wrath Of The Storm",' +
    '"features.Tempest Domain ? 2:Destructive Wrath",' +
    '"features.Tempest Domain ? 6:Thunderbolt Strike",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Tempest Domain ? 17:Stormborn",' +
    '"features.Trickery Domain ? 1:Blessing Of The Trickster",' +
    '"features.Trickery Domain ? 2:Invoke Duplicity",' +
    '"features.Trickery Domain ? 6:Cloak Of Shadows (Trickery Domain)",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Trickery Domain ? 17:Improved Duplicity",' +
    '"features.War Domain ? 1:Bonus Proficiencies (War Domain)",' +
    '"features.War Domain ? 1:War Priest",' +
    '"features.War Domain ? 2:Guided Strike",' +
    '"features.War Domain ? 6:War God\'s Blessing",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.War Domain ? 17:Avatar Of Battle"',
  'Druid':
    '"features.Circle Of The Moon ? 2:Combat Wild Shape",' +
    '"features.Circle Of The Moon ? 2:Circle Forms",' +
    '"features.Circle Of The Moon ? 6:Primal Strike",' +
    '"features.Circle Of The Moon ? 10:Elemental Wild Shape",' +
    '"features.Circle Of The Moon ? 14:Thousand Forms"',
  'Fighter':
    '"features.Battle Master ? 3:Student Of War",' +
    '"features.Battle Master ? 3:Combat Superiority",' +
    '"features.Battle Master ? 7:Know Your Enemy",' +
    '"features.Battle Master ? 10:Improved Combat Superiority",' +
    '"features.Battle Master ? 15:Relentless",' +
    '"features.Eldritch Knight ? 3:Spellcasting",' +
    '"features.Eldritch Knight ? 3:Weapon Bond",' +
    '"features.Eldritch Knight ? 7:War Magic",' +
    '"features.Eldritch Knight ? 10:Eldritch Strike",' +
    '"features.Eldritch Knight ? 15:Arcane Charge",' +
    '"features.Eldritch Knight ? 18:Improved War Magic"',
  'Monk':
    '"features.Way Of Shadow ? 3:Shadow Arts",' +
    '"features.Way Of Shadow ? 6:Shadow Step",' +
    '"features.Way Of Shadow ? 11:Cloak Of Shadows (Way Of Shadow)",' +
    '"features.Way Of Shadow ? 17:Opportunist",' +
    '"features.Way Of The Four Elements ? 3:Disciple Of The Elements",' +
    '"features.Way Of The Four Elements ? 3:Elemental Attunement"',
  'Paladin':
    '"features.Oath Of The Ancients ? 3:Nature\'s Wrath",' +
    '"features.Oath Of The Ancients ? 3:Turn The Faithless",' +
    '"features.Oath Of The Ancients ? 7:Aura Of Warding",' +
    '"features.Oath Of The Ancients ? 15:Undying Sentinel",' +
    '"features.Oath Of The Ancients ? 20:Elder Champion",' +
    '"features.Oath Of Vengeance ? 3:Abjure Enemy",' +
    '"features.Oath Of Vengeance ? 3:Vow Of Enmity",' +
    '"features.Oath Of Vengeance ? 7:Relentless Avenger",' +
    '"features.Oath Of Vengeance ? 15:Soul Of Vengeance",' +
    '"features.Oath Of Vengeance ? 20:Avenging Angel"',
  'Ranger':
    '"features.Beast Master ? 3:Ranger\'s Companion",' +
    '"features.Beast Master ? 7:Exceptional Training",' +
    '"features.Beast Master ? 11:Bestial Fury",' +
    '"features.Beast Master ? 15:Share Spells"',
  'Rogue':
    '"features.Arcane Trickster ? 3:Spellcasting",' +
    '"features.Arcane Trickster ? 3:Mage Hand Legerdemain",' +
    '"features.Arcane Trickster ? 9:Magical Ambush",' +
    '"features.Arcane Trickster ? 13:Versatile Trickster",' +
    '"features.Arcane Trickster ? 17:Spell Thief",' +
    '"features.Assassin ? 3:Assassin Bonus Proficiencies",' +
    '"features.Assassin ? 3:Assassinate",' +
    '"features.Assassin ? 9:Infiltration Expertise",' +
    '"features.Assassin ? 13:Impostor",' +
    '"features.Assassin ? 17:Death Strike"',
  'Sorcerer':
    '"features.Wild Magic ? 1:Wild Magic Surge",' +
    '"features.Wild Magic ? 1:Tides Of Chaos",' +
    '"features.Wild Magic ? 6:Bend Luck",' +
    '"features.Wild Magic ? 14:Controlled Chaos",' +
    '"features.Wild Magic ? 18:Spell Bombardment"',
  'Warlock':
    '"features.The Archfey ? 1:Fey Presence",' +
    '"features.The Archfey ? 6:Misty Escape",' +
    '"features.The Archfey ? 10:Beguiling Defenses",' +
    '"features.The Archfey ? 14:Dark Delirium",' +
    '"features.The Great Old One ? 1:Awakened Mind",' +
    '"features.The Great Old One ? 6:Entropic Ward",' +
    '"features.The Great Old One ? 10:Thought Shield",' +
    '"features.The Great Old One ? 14:Create Thrall"',
  'Wizard':
    '"features.School Of Abjuration ? 2:Abjuration Savant",' +
    '"features.School Of Abjuration ? 2:Arcane Ward",' +
    '"features.School Of Abjuration ? 6:Projected Ward",' +
    '"features.School Of Abjuration ? 10:Improved Abjuration",' +
    '"features.School Of Abjuration ? 14:Spell Resistance",' +
    '"features.School Of Conjuration ? 2:Conjuration Savant",' +
    '"features.School Of Conjuration ? 2:Minor Conjuration",' +
    '"features.School Of Conjuration ? 6:Benign Transposition",' +
    '"features.School Of Conjuration ? 10:Focused Conjuration",' +
    '"features.School Of Conjuration ? 14:Durable Summons",' +
    '"features.School Of Divination ? 2:Divination Savant",' +
    '"features.School Of Divination ? 2:Portent",' +
    '"features.School Of Divination ? 6:Expert Divination",' +
    '"features.School Of Divination ? 10:The Third Eye",' +
    '"features.School Of Divination ? 14:Greater Portent",' +
    '"features.School Of Enchantment ? 2:Enchantment Savant",' +
    '"features.School Of Enchantment ? 2:Hypnotic Gaze",' +
    '"features.School Of Enchantment ? 6:Instinctive Charm",' +
    '"features.School Of Enchantment ? 10:Split Enchantment",' +
    '"features.School Of Enchantment ? 14:Alter Memories",' +
    '"features.School Of Illusion ? 2:Illusion Savant",' +
    '"features.School Of Illusion ? 2:Improved Minor Illusion",' +
    '"features.School Of Illusion ? 6:Malleable Illusions",' +
    '"features.School Of Illusion ? 10:Illusory Self",' +
    '"features.School Of Illusion ? 14:Illusory Reality",' +
    '"features.School Of Necromancy ? 2:Necromancy Savant",' +
    '"features.School Of Necromancy ? 2:Grim Harvest",' +
    '"features.School Of Necromancy ? 6:Undead Thralls",' +
    '"features.School Of Necromancy ? 10:Inured To Undeath",' +
    '"features.School Of Necromancy ? 14:Command Undead",' +
    '"features.School Of Transmutation ? 2:Transmutation Savant",' +
    '"features.School Of Transmutation ? 2:Minor Alchemy",' +
    '"features.School Of Transmutation ? 6:Transmuter\'s Stone",' +
    '"features.School Of Transmutation ? 10:Shapechanger",' +
    '"features.School Of Transmutation ? 14:Master Transmuter"'
};
PHB5E.CLASSES_SELECTABLES_ADDED = {
  'Barbarian':
    '"3:Path Of The Totem Warrior (Bear):Primal Path",' +
    '"3:Path Of The Totem Warrior (Eagle):Primal Path",' +
    '"3:Path Of The Totem Warrior (Wolf):Primal Path"',
  'Bard':
    '"3:College Of Valor:Bard College"',
  'Cleric':
    '"deityDomains =~ \'Knowledge\' ? 1:Knowledge Domain:Divine Domain",' +
    '"deityDomains =~ \'Light\' ? 1:Light Domain:Divine Domain",' +
    '"deityDomains =~ \'Nature\' ? 1:Nature Domain:Divine Domain",' +
    '"deityDomains =~ \'Tempest\' ? 1:Tempest Domain:Divine Domain",' +
    '"deityDomains =~ \'Trickery\' ? 1:Trickery Domain:Divine Domain",' +
    '"deityDomains =~ \'War\' ? 1:War Domain:Divine Domain"',
  'Druid':
    '"2:Circle Of The Land (Underdark):Druid Circle",' +
    '"2:Circle Of The Moon:Druid Circle"',
  'Fighter':
    '"3:Battle Master:Martial Archetype",' +
    '"3:Eldritch Knight:Martial Archetype",' +
    '"3:Commander\'s Strike:Maneuver","3:Disarming Attack:Maneuver",' +
    '"3:Distracting Strike:Maneuver","3:Evasive Footwork:Maneuver",' +
    '"3:Feinting Attack:Maneuver","3:Goading Attack:Maneuver",' +
    '"3:Lunging Attack:Maneuver","3:Maneuvering Attack:Maneuver",' +
    '"3:Menacing Attack:Maneuver","3:Parry:Maneuver",' +
    '"3:Precision Attack:Maneuver","3:Pushing Attack:Maneuver",' +
    '"3:Rally:Maneuver","3:Riposte:Maneuver",' +
    '"3:Sweeping Attack:Maneuver","3:Trip Attack:Maneuver"',
  'Monk':
    '"3:Way Of The Four Elements:Monastic Tradition",' +
    '"3:Way Of Shadow:Monastic Tradition",' +
    '"17:Breath Of Winter:Elemental Discipline",' +
    '"6:Clench Of The North Wind:Elemental Discipline",' +
    '"17:Eternal Mountain Defense:Elemental Discipline",' +
    '"3:Fangs Of The Fire Snake:Elemental Discipline",' +
    '"3:Fist Of Four Thunders:Elemental Discipline",' +
    '"3:Fist Of Unbroken Air:Elemental Discipline",' +
    '"11:Flames Of The Phoenix:Elemental Discipline",' +
    '"6:Gong Of The Summit:Elemental Discipline",' +
    '"11:Mist Stance:Elemental Discipline",' +
    '"11:Ride The Wind:Elemental Discipline",' +
    '"17:River Of Hungry Flame:Elemental Discipline",' +
    '"3:Rush Of The Gale Spirits:Elemental Discipline",' +
    '"3:Shape The Flowing River:Elemental Discipline",' +
    '"3:Sweeping Cinder Strike:Elemental Discipline",' +
    '"3:Water Whip:Elemental Discipline",' +
    '"17:Wave Of Rolling Earth:Elemental Discipline"',
  'Paladin':
    '"3:Oath Of The Ancients:Sacred Oath","3:Oath Of Vengeance:Sacred Oath"',
  'Ranger':
    '"3:Beast Master:Ranger Archetype"',
  'Rogue':
    '"3:Arcane Trickster:Roguish Archetype","3:Assassin:Roguish Archetype"',
  'Sorcerer':
    '"1:Wild Magic:Sorcerous Origin"',
  'Warlock':
    '"1:The Archfey:Otherworldly Patron",' +
    '"1:The Great Old One:Otherworldly Patron"',
  'Wizard':
    '"2:School Of Abjuration:Arcane Tradition",' +
    '"2:School Of Conjuration:Arcane Tradition",' +
    '"2:School Of Divination:Arcane Tradition",' +
    '"2:School Of Enchantment:Arcane Tradition",' +
    '"2:School Of Illusion:Arcane Tradition",' +
    '"2:School Of Necromancy:Arcane Tradition",' +
    '"2:School Of Transmutation:Arcane Tradition"'
};
PHB5E.CLASSES = Object.assign({}, SRD5E.CLASSES);
for(let c in PHB5E.CLASSES_FEATURES_ADDED) {
  PHB5E.CLASSES[c] =
    PHB5E.CLASSES[c].replace('Features=', 'Features=' + PHB5E.CLASSES_FEATURES_ADDED[c] + ',');
}
for(let c in PHB5E.CLASSES_SELECTABLES_ADDED) {
  PHB5E.CLASSES[c] =
    PHB5E.CLASSES[c].replace('Selectables=', 'Selectables=' + PHB5E.CLASSES_SELECTABLES_ADDED[c] + ',');
}
PHB5E.FEATS_ADDED = {
  'Alert':
    '',
  'Athlete':
    '',
  'Actor':
    '',
  'Charger':
    '',
  'Crossbow Expert':
    'Imply="weapons.Hand Crossbow || weapons.Heavy Crossbow || weapons.Light Crossbow"',
  'Defensive Duelist':
    'Require="dexterity >= 13"',
  'Dual Wielder':
    '',
  'Dungeon Delver':
    '',
  'Durable':
    '',
  'Elemental Adept (Acid)':
    'Require="casterLevel >= 1"',
  'Elemental Adept (Cold)':
    'Require="casterLevel >= 1"',
  'Elemental Adept (Fire)':
    'Require="casterLevel >= 1"',
  'Elemental Adept (Lightning)':
    'Require="casterLevel >= 1"',
  'Elemental Adept (Thunder)':
    'Require="casterLevel >= 1"',
  'Great Weapon Master':
    '',
  'Healer':
    '',
  'Heavily Armored':
    'Require="armorProficiency.Medium"',
  'Heavy Armor Master':
    'Require="armorProficiency.Heavy"',
  'Inspiring Leader':
    'Require="charisma >= 13"',
  'Keen Mind':
    '',
  'Lightly Armored':
    '',
  'Linguist':
    '',
  'Lucky':
    '',
  'Mage Slayer':
    '',
  'Magic Initiate (Bard)':
    '',
  'Magic Initiate (Cleric)':
    '',
  'Magic Initiate (Druid)':
    '',
  'Magic Initiate (Sorcerer)':
    '',
  'Magic Initiate (Warlock)':
    '',
  'Magic Initiate (Wizard)':
    '',
  'Martial Adept':
    '',
  'Medium Armor Master':
    'Require="armorProficiency.Medium || armorProficiency.Heavy"',
  'Mobile':
    '',
  'Moderately Armored':
    'Require="armorProficiency.Light"',
  'Mounted Combatant':
    '',
  'Observant':
    '',
  'Polearm Master':
    '',
  'Resilient':
    '',
  'Ritual Caster':
    'Require="intelligence >= 13 || wisdom >= 13"',
  'Savage Attacker':
    '',
  'Sentinel':
    '',
  'Sharpshooter':
    '',
  'Shield Master':
    'Imply="shield != \'None\'"',
  'Skilled':
    '',
  'Skulker':
    'Require="dexterity >= 13"',
  'Spell Sniper':
    'Require="casterLevel >= 1"',
  'Tavern Brawler':
    '',
  'Tough':
    '',
  'War Caster':
    'Require="casterLevel >= 1"',
  'Weapon Master':
    ''
};
PHB5E.FEATS = Object.assign({}, SRD5E.FEATS, PHB5E.FEATS_ADDED);
PHB5E.FEATURES_ADDED = {
  // Backgrounds
  'By Popular Demand':
    'Section=feature ' +
    'Note="May receive welcome and lodging in exchange for performing"',
  'City Secrets':
    'Section=feature Note="May travel through a city at dbl speed"',
  'Criminal Contact':
    'Section=feature ' +
    'Note="Knows a liaison to criminal networks and local underworld connections"',
  'Discovery':'Section=feature Note="Knows a unique and powerful truth"',
  'False Identity':
    'Section=feature Note="Has a documented second ID and forgery skills"',
  'Guild Membership':
    'Section=feature Note="May receive assistance from fellow guild members"',
  'Military Rank':
    'Section=feature ' +
    'Note="Receives respect and deference from fellow soldiers"',
  'Position Of Privilege':
    'Section=feature ' +
    'Note="Receives welcome from the upper class and deference from commoners"',
  'Researcher':'Section=feature Note="Knows where and whom to ask about lore"',
  'Rustic Hospitality':
    'Section=feature Note="May receive shelter from common folk"',
  "Ship's Passage":
    'Section=feature ' +
    'Note="May receive water passage for self and companions in exchange for labor"',
  'Wanderer':
    'Section=feature ' +
    'Note="Has an excellent geographic memory and can forage for 6 people"',
  // Paths
  "Commander's Strike":
    'Section=combat ' +
    'Note="May forego 1 attack to add a Superiority Die to an ally\'s attack"',
  "Nature's Wrath":
    'Section=magic ' +
    'Note="R10\' May use Channel Divinity to create spectral vines that restrain target (DC %V Dexterity or Strength neg)"',
  "Ranger's Companion":
    'Section=feature ' +
    'Note="Companion beast up to CR %V gains +%{proficiencyBonus} AC, attack, damage, skills, and saving throws and obeys self commands"',
  'Student Of War':
    'Section=feature Note="Tool Proficiency (Choose 1 from any Artisan)"',
  "Transmuter's Stone":
    'Section=magic ' +
    'Note="Stone gives choice of 60\' darkvision, +10\' speed, proficiency in constitution saves, or resistance to chosen energy damage; may change effect when casting a transmutation spell"',
  "War God's Blessing":
    'Section=magic ' +
    'Note="R30\' May use Reaction and Channel Divinity to give an ally a +10 attack"',
  'Abjuration Savant':
    'Section=magic ' +
    'Note="May copy abjuration spells into spellbook for half cost"',
  'Abjure Enemy':
    'Section=magic ' +
    'Note="R60\' May use Channel Divinity to halt target (DC %V Wisdom half speed) for 1 min"',
  'Acolyte Of Nature':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows 1 D0 cantrip",' +
      '"Skill Proficiency (Choose 1 from Animal Handling, Nature, Survival)"',
  'Alter Memories':
    'Section=magic ' +
    'Note="Target becomes unaware of self charm and forgets preceding %V hrs (DC %1 Intelligence neg)"',
  'Arcane Charge':'Section=magic Note="May teleport 30\' during Action Surge"',
  'Arcane Ward':
    'Section=magic ' +
    'Note="Abjuration casting creates a %V HP shield around self until next long rest"',
  'Aspect Of The Beast (Bear)':
    'Section=ability ' +
    'Note="Dbl load and lift, Adv on Strength to push, pull, lift, or break"',
  'Aspect Of The Beast (Eagle)':
    'Section=skill ' +
    'Note="Sees 1 mile clearly and suffers no Disadv on Perception in dim light"',
  'Aspect Of The Beast (Wolf)':
    'Section=skill Note="May track at fast pace and Stealth at normal pace"',
  'Assassin Bonus Proficiencies':
    'Section=feature Note="Tool Proficiency (Disguise Kit/Poisoner\'s Kit)"',
  'Assassinate':
    'Section=combat ' +
    'Note="Adv on attack before foe\'s first turn/Successful surprise attack automatically crits"',
  'Aura Of Warding':
    'Section=save Note="R%V\' Self and allies have resistance to spell damage"',
  'Avatar Of Battle':
    'Section=save ' +
    'Note="Resistance to nonmagical bludgeoning, piercing and slashing damage"',
  'Avenging Angel':
    'Section=ability,combat ' +
    'Note=' +
      '"60\' fly speed for 1 hr/long rest",' +
      '"R30\' Frightens foes (DC %V Wisdom neg) for 1 hr/long rest"',
  'Awakened Mind':'Section=feature Note="R30\' May communicate telepathically"',
  'Battle Magic':
    'Section=combat Note="May make a bonus attack after casting a spell"',
  'Beguiling Defenses':
    'Section=save ' +
    'Note="Immune to charm; may reflect onto caster (DC %V Wisdom neg) for conc or 1 min"',
  'Bend Luck':
    'Section=magic ' +
    'Note="May spend 2 Sorcery Points to add or subtract 1d4 from a target attack, ability, or save"',
  'Benign Transposition':
    'Section=magic ' +
    'Note="R30\' May teleport self or swap w/a willing creature 1/long rest or conjuration spell casting"',
  'Bestial Fury':'Section=feature Note="Companion makes 2 attacks/rd"',
  'Blessing Of The Trickster':
    'Section=magic Note="Touch gives target Adv on Stealth for 1 hr"',
  'Blessings Of Knowledge':
    'Section=skill,skill ' +
    'Note=' +
      '"Skill Proficiency (Choose 2 from Arcana, History, Nature, Religion)/Language (Choose 2 from any)",' +
      '"+%{proficiencyBonus} on chosen skills"',
  'Bonus Cantrip (Light Domain)':
    'Section=magic Note="Knows <i>Light</i> cantrip"',
  'Bonus Proficiencies (College Of Valor)':
    'Section=combat ' +
    'Note="Armor Proficiency (Medium/Shield)/Weapon Proficiency (Martial)"',
  'Bonus Proficiency (Nature Domain)':
    'Section=combat Note="Armor Proficiency (Heavy)"',
  'Bonus Proficiencies (Tempest Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial)"',
  'Bonus Proficiencies (War Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial)"',
  'Breath Of Winter':
    'Section=magic Note="May spend 6 Ki Points to cast <i>Cone Of Cold</i>"',
  'Charm Animals And Plants':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to charm beasts and plants (Wisdom neg) for 1 min"',
  'Circle Forms':'Section=magic Note="May Wild Shape into a CR %V creature"',
  'Clench Of The North Wind':
    'Section=magic Note="May spend 3 Ki Points to cast <i>Hold Person</i>"',
  'Cloak Of Shadows (Way Of Shadow)':
    'Section=magic ' +
    'Note="May become invisible in dim and unlit areas (attacking or casting ends)"',
  'Cloak Of Shadows (Trickery Domain)':
    'Section=magic ' +
    'Note="May use Channel Divinity to make self invisible for 1 rd"',
  'Combat Inspiration':
    'Section=combat ' +
    'Note="Ally may use a Bardic Inspiration die to boost weapon damage or AC"',
  'Combat Superiority':
    'Section=combat ' +
    'Note="May use %Vd%1 Superiority Dice to perform %2 chosen Maneuvers/short rest"',
  'Combat Wild Shape':
    'Section=combat,magic ' +
    'Note=' +
      '"May use Wild Shape as a bonus action",' +
      '"May use a spell slot to regain (slot level)d8 HP during Wild Shape"',
  'Command Undead':
    'Section=magic ' +
    'Note="R60\' May control undead target (DC %V Charisma neg; Adv if intelligence is 8 or higher)"',
  'Conjuration Savant':
    'Section=magic ' +
    'Note="May copy conjuration spells into spellbook for half cost"',
  'Controlled Chaos':
    'Section=magic Note="May choose from 2 Wild Magic Surge effects"',
  'Corona Of Light':
    'Section=magic ' +
    'Note="60\' light inflicts foe Disadv on saves vs. fire and radiant spells for 1 min"',
  'Create Thrall':'Section=magic Note="Touch charms incapacitated humanoid"',
  'Dampen Elements':
    'Section=magic ' +
    'Note="R30\' May use Reaction to grant resistance to immediate acid, cold, fire, lightning, or thunder damage"',
  'Dark Delirium':
    'Section=magic ' +
    'Note="R60\' Target charmed or frightened and unaware of surroundings (DC %V Wisdom neg) for conc or 1 min 1/short rest"',
  'Death Strike':
    'Section=combat Note="Dbl damage on a successful surprise attack (DC %V Con neg)"',
  'Destructive Wrath':
    'Section=magic ' +
    'Note="May use Channel Divinity to maximize lightning or thunder damage"',
  'Disarming Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and to cause foe to drop an item (DC %V Strength neg)"',
  'Disciple Of The Elements':
    'Section=magic Note="May select %V elemental disciplines"',
  'Distracting Strike':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and to give Adv to the next ally attack against the same foe in the same rd"',
  'Divination Savant':
    'Section=magic ' +
    'Note="May copy divination spells into spellbook for half cost"',
  'Durable Summons':
    'Section=magic Note="Summoned creatures gain 30 temporary HP"',
  'Elder Champion':
    'Section=magic ' +
    'Note="Regains 10 HP/rd, may cast spells as a bonus action, and inflicts Disadv on saves vs. self spells on foes w/in 10\' for 1 min 1/long rest"',
  'Eldritch Strike':
    'Section=combat ' +
    'Note="Successful attack inflicts Disadv on saves vs. self spells for 1 rd"',
  'Elemental Attunement':
    'Section=magic ' +
    'Note="May create a harmless instantaneous elemental effect, light or snuff small flame, chill or warm 1 lb object for 1 hr, or shape 1\' cu earth, fire, water, or mist for 1 min"',
  'Elemental Wild Shape':
    'Section=magic Note="May use 2 Wild Shape uses to become an elemental"',
  'Enchantment Savant':
    'Section=magic ' +
    'Note="May copy enchantment spells into spellbook for half cost"',
  'Entropic Ward':
    'Section=combat ' +
    'Note="May use Reaction to inflict Disadv on attack by foe/Miss gives self Adv on next attack 1/short rest"',
  'Eternal Mountain Defense':
    'Section=magic ' +
    'Note="May spend 5 Ki Points to cast <i>Stoneskin</i> on self"',
  'Evasive Footwork':
    'Section=combat Note="May add a Superiority Die to AC during move"',
  'Exceptional Training':
    'Section=feature ' +
    'Note="Companion can Dash, Disengage, or Help instead of Attack/Companion attacks count as magical"',
  'Expert Divination':
    'Section=magic ' +
    'Note="Casting a divination spell restores a lower spell slot"',
  'Fangs Of The Fire Snake':
    'Section=magic ' +
    'Note="May spend 1 Ki Point for +10\' unarmed reach or 2 Ki Points to inflict +1d10 HP fire"',
  'Feinting Attack':
    'Section=combat ' +
    'Note="May use a bonus action to gain Adv on next attack on adjacent foe and add a Superiority Die to damage"',
  'Fey Presence':
    'Section=magic ' +
    'Note="R10\' May make all creatures choice of charmed or frightened (DC %V Wisdom neg) for 1 rd 1/short rest"',
  'Fist Of Four Thunders':
    'Section=magic Note="May spend 2 Ki Points to cast <i>Thunderwave</i>"',
  'Fist Of Unbroken Air':
    'Section=magic ' +
    'Note="R30\' May spend 2+ Ki Points to inflict 3d10+ HP, push 20\', and knock prone (DC %V Strength half HP only)"',
  'Flames Of The Phoenix':
    'Section=magic Note="May spend 4 Ki Points to cast <i>Fireball</i>"',
  'Focused Conjuration':
    'Section=magic Note="Damage cannot break conjuration concentration"',
  'Goading Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and inflict Disadv on foe attacks on others (DC %V Wisdom neg) for 1 rd"',
  'Gong Of The Summit':
    'Section=magic Note="May spend 3 Ki Points to cast <i>Shatter</i>"',
  'Greater Portent':'Section=magic Note="May replace roll 3/long rest"',
  'Grim Harvest':
    'Section=magic ' +
    'Note="Regains 2x spell level HP (3x for necromantic spells) when self spell kills"',
  'Guided Strike':
    'Section=combat Note="May use Channel Divinity to give self +10 attack"',
  'Hypnotic Gaze':
    'Section=magic Note="R5\' May daze target (DC %V Wisdom neg) 1/long rest"',
  'Illusion Savant':
    'Section=magic ' +
    'Note="May copy illusion spells into spellbook for half cost"',
  'Illusory Reality':
    'Section=magic Note="May make object in self illusion real for 1 min"',
  'Illusory Self':
    'Section=magic Note="May use Reaction to cause a foe miss 1/short rest"',
  'Impostor':'Section=feature Note="May use unerring mimicry"',
  'Improved Abjuration':
    'Section=magic ' +
    'Note="+%{proficiencyBonus} abjuration spell ability checks"',
  'Improved Combat Superiority':
    'Section=combat Note="Superiority Dice increase to d%V"',
  'Improved Duplicity':
    'Section=magic Note="Invoke Duplicity creates 4 duplicates"',
  'Improved Flare':
    'Section=magic Note="Warding Flare also protects allies"',
  'Improved Minor Illusion':
    'Section=magic ' +
    'Note="Knows <i>Minor Illusion</i> cantrip; effects include both sound and image"',
  'Improved War Magic':
    'Section=combat Note="May make a bonus attack after any spell"',
  'Infiltration Expertise':
    'Section=feature Note="May forge and adopt different identities"',
  'Instinctive Charm':
    'Section=magic ' +
    'Note="R30\' May redirect a foe attack on self to another (DC %V Wisdom neg until long rest)"',
  'Inured To Undeath':
    'Section=save ' +
    'Note="Has resistance to necrotic damage and immunity to maximum HP reduction"',
  'Invoke Duplicity':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to create %V, giving Adv on attacks when w/in 5\' and allowing remote spellcasting for conc or 1 min"',
  'Know Your Enemy':
    'Section=combat Note="Knows how foe compares to self after 1 min study"',
  'Knowledge Of The Ages':
    'Section=skill ' +
    'Note="May use Channel Divinity to gain proficiency in chosen skill or tool for 10 min"',
  'Lunging Attack':
    'Section=combat ' +
    'Note="+5\' melee range/May add a Superiority Die to damage"',
  'Mage Hand Legerdemain':
    'Section=magic ' +
    'Note="May stow and retrieve objects, pick locks, and disarm traps using an invisible <i>Mage Hand</i>"',
  'Magical Ambush':
    'Section=magic ' +
    'Note="Foe suffers Disadv on save vs. self spell cast from hiding"',
  'Malleable Illusions':
    'Section=magic Note="May modify cast illusions throughout duration"',
  'Maneuvering Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage/Ally can use Reaction to move half speed w/no OA from target"',
  'Master Of Nature':
    'Section=magic Note="May command charmed animals and plants"',
  'Master Transmuter':
    'Section=magic ' +
    'Note="May destroy a transmuter\'s stone to transmute 5\' cu, remove curses, diseases, and poisons, cast <i>Raise Dead</i>, or restore youth"',
  'Menacing Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and inflict frightened (DC %V Wisdom neg) for 1 rd"',
  'Minor Alchemy':
    'Section=magic Note="May transform 1\' cu per 10 min effort for 1 hr"',
  'Minor Conjuration':
    'Section=magic Note="R10\' May create 3\' cu, 10 lb object for 1 hr"',
  'Mist Stance':
    'Section=magic ' +
    'Note="May spend 4 Ki Points to cast <i>Gaseous Form</i> on self"',
  'Misty Escape':
    'Section=magic ' +
    'Note="After taking damage, may teleport 60\' and become invisible for 1 rd 1/short rest"',
  'Necromancy Savant':
    'Section=magic ' +
    'Note="May copy necromancy spells into spellbook for half cost"',
  'Opportunist':
    'Section=combat ' +
    'Note="May use Reaction to attack an adjacent foe after a successful ally attack"',
  'Parry':
    'Section=combat ' +
    'Note="May subtract a Superiority Die + %V from self damage by a foe"',
  'Portent':
    'Section=magic ' +
    'Note="May replace target attack, ability, or saving throw %V/long rest"',
  'Potent Spellcasting':'Section=magic Note="+%1 Cleric cantrip damage"',
  'Precision Attack':
    'Section=combat Note="May add a Superiority Die to attack"',
  'Primal Strike':'Section=combat Note="Wild Shape attacks count as magical"',
  'Projected Ward':
    'Section=magic Note="R30\' May use Arcane Ward to absorb damage to others"',
  'Pushing Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and push a foe 15\' (DC %V Strength neg)"',
  'Radiance Of The Dawn':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to dispel magical darkness; foes suffer 2d10+%V HP radiant (Con half)"',
  'Rally':
    'Section=combat Note="Chosen ally gains Superiority Die + %V temporary HP"',
  'Read Thoughts':
    'Section=magic ' +
    'Note="R60\' May use Channel Divinity to read thoughts and cast <i>Suggestion</i> (no save) for 1 min"',
  'Relentless':
    'Section=combat Note="Has a minimum of 1 Superiority Die after initiative"',
  'Relentless Avenger':
    'Section=combat Note="May move %{speed//2}\' after a successful OA"',
  'Ride The Wind':
    'Section=magic Note="May spend 4 Ki Points to cast <i>Fly</i> on self"',
  'Riposte':
    'Section=combat ' +
    'Note="May use Reaction to attack after a foe miss and add a Superiority Die to damage"',
  'River Of Hungry Flame':
    'Section=magic Note="May spend 5 Ki Points to cast <i>Wall Of Fire</i>"',
  'Rush Of The Gale Spirits':
    'Section=magic Note="May spend 2 Ki Points to cast <i>Gust Of Wind</i>"',
  'Shadow Arts':
    'Section=magic ' +
    'Note="Knows <i>Minor Illusion</i> cantrip and may spend 2 Ki Points to cast <i>Darkness</i>, <i>Darkvision</i>, <i>Pass Without Trace</i>, or <i>Silence</i>"',
  'Shadow Step':
    'Section=magic ' +
    'Note="May teleport 60\' between dim or unlit areas, then gain Adv on first melee attack"',
  'Shape The Flowing River':
    'Section=magic ' +
    'Note="R120\' May spend 1 Ki Point to freeze, thaw, and shape 30\' cu water"',
  'Shapechanger':
    'Section=magic ' +
    'Note="Knows <i>Polymorph</i>; may transform self into a CR 1 creature 1/short rest"',
  'Share Spells':
    'Section=magic Note="R30\' May have self spell also affect companion"',
  'Soul Of Vengeance':
    'Section=combat ' +
    'Note="May use Reaction for a melee attack on Vow Of Enmity target "',
  'Spell Bombardment':
    'Section=magic ' +
    'Note="May add another die after rolling the maximum on a spell damage die 1/rd"',
  'Spell Resistance':
    'Section=save ' +
    'Note="Adv on saves vs. spells/Has resistance to spell damage"',
  'Spell Thief':
    'Section=magic ' +
    'Note="May negate foe spell and cast same w/in 8 hours (DC %V neg) 1/long rest"',
  'Spirit Seeker':
    'Section=magic ' +
    'Note="May cast ritual <i>Beast Sense</i> and <i>Speak With Animals</i>"',
  'Spirit Walker':
    'Section=magic Note="May cast ritual <i>Commune With Nature</i>"',
  'Split Enchantment':
    'Section=magic Note="May add a second target to an enchantment spell"',
  'Stormborn':
    'Section=ability Note="%{speed}\' fly speed outdoors"',
  'Sweeping Attack':
    'Section=combat ' +
    'Note="After a successful attack, may inflict a Superiority Die HP on an adjacent foe"',
  'Sweeping Cinder Strike':
    'Section=magic Note="May spend 2 Ki Points to cast <i>Burning Hands</i>"',
  'The Third Eye':
    'Section=magic ' +
    'Note="May use an action to gain 60\' darkvision, 60\' ethereal sight, universal language comprehension, or 10\' invisibility sight"',
  'Thought Shield':
    'Section=save ' +
    'Note="Immune to telepathy, has resistance to psychic damage, and psychic damage also affects attacker"',
  'Thousand Forms':'Section=magic Note="May cast <i>Alter Self</i> at will"',
  'Thunderbolt Strike':
    'Section=magic ' +
    'Note="Lightning damage pushes away Large and smaller creatures 10\'"',
  'Tides Of Chaos':
    'Section=feature ' +
    'Note="May gain Adv on an attack, ability, or saving throw 1/long rest; subsequent spell use may cause a Wild Magic Surge"',
  'Totem Spirit (Bear)':
    'Section=save Note="Has resistance to non-psychic damage during rage"',
  'Totem Spirit (Eagle)':
    'Section=combat ' +
    'Note="May take a bonus Dash and inflict Disadv on foe OA during rage (heavy armor neg)"',
  'Totem Spirit (Wolf)':
    'Section=combat ' +
    'Note="Allies gain Adv on attacks vs. foes adjacent to self during rage"',
  'Totemic Attunement (Bear)':
    'Section=combat ' +
    'Note="During rage, adjacent foes suffer Disadv on attacks on others"',
  'Totemic Attunement (Eagle)':
    'Section=ability Note="Fly %{speed}\' 1/rd during rage"',
  'Totemic Attunement (Wolf)':
    'Section=combat ' +
    'Note="Successful melee attack during rage knocks prone a Large or smaller foe"',
  'Transmutation Savant':
    'Section=magic ' +
    'Note="May copy transmutation spells into spellbook for half cost"',
  'Trip Attack':
    'Section=combat ' +
    'Note="May add a Superiority Die to damage and knock foe prone (DC %V Strength neg)"',
  'Turn The Faithless':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to cause fiends and fey to flee (DC %V Wisdom neg) for 1 min"',
  'Undead Thralls':
    'Section=magic Note="Knows <i>Animate Dead</i>; casting animates an additional corpse and gives +%V HP and +%1 damage"',
  'Undying Sentinel':
    'Section=combat,feature ' +
    'Note=' +
      '"May retain 1 HP when brought to 0 HP 1/long rest",' +
      '"Suffers no debility from aging"',
  'Versatile Trickster':
    'Section=magic ' +
    'Note="May distract foe, gaining Adv on attacks, via <i>Mage Hand</i>"',
  'Visions Of The Past':
    'Section=magic ' +
    'Note="May gain visions about surroundings or a held object via 1 min meditation 1/short rest"',
  'Vow Of Enmity':
    'Section=combat ' +
    'Note="R10\' May use Channel Divinity to give self Adv on attacks against target for 1 min"',
  'War Magic':'Section=combat Note="May make a bonus attack after casting %V"',
  'War Priest':'Section=combat Note="May make a bonus attack %V/long rest"',
  'Warding Flare':
    'Section=magic ' +
    'Note="R30\' May use Reaction to inflict Disadv on a foe attack %V/long rest"',
  'Water Whip':
    'Section=magic ' +
    'Note="R30\' May spend 2+ Ki Points to inflict 3d10+ HP bludgeoning and pull 25\' or knock prone (DC %V Strength half HP only)"',
  'Wave Of Rolling Earth':
    'Section=magic Note="May spend 6 Ki Points to cast <i>Wall Of Stone</i>"',
  'Weapon Bond':
    'Section=combat Note="Cannot be disarmed; may summon weapon"',
  'Wild Magic Surge':
    'Section=magic Note="5% chance of random magic effect"',
  'Wrath Of The Storm':
    'Section=combat ' +
    'Note="May use Reaction to inflict 2d8 HP lightning or thunder (Dexterity half) on successful attacker %V/long rest"',
  // Feats
  'Actor':
    'Section=ability,skill ' +
    'Note=' +
      '"+1 Charisma",' +
      '"Adv on Deception and Performance (impersonating)/May mimic others\' speech or sounds"',
  'Alert':
    'Section=combat,combat ' +
    'Note=' +
      '"+5 Initiative",' +
      '"Cannot be surprised/Unseen foes do not have Adv"',
  'Athlete':
    'Section=ability,ability ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Standing, long jump, and running high jump each use only 5\' move/May climb at full speed"',
  'Charger':
    'Section=combat ' +
    'Note="Bonus attack after Dash inflicts +5 HP damage or +10\' push"',
  'Crossbow Expert':
    'Section=combat ' +
    'Note="May make multiple attacks w/a proficient crossbow/Suffers no Disadv on a close shot/May take a bonus hand crossbow shot after a one-handed attack"',
  'Defensive Duelist':
    'Section=combat Note="May use Reaction for +%V AC when holding a finesse weapon"',
  'Dual Wielder':
    'Section=combat ' +
    'Note="+1 AC w/two weapons/May use two-weapon fighting w/any one-handed weapons/May draw or stow two weapons at once"',
  'Dungeon Delver':
    'Section=save,skill ' +
    'Note=' +
      '"Adv on trap detection and avoidance/Has resistance to trap damage",' +
      '"Adv on secret door detection/May search for traps at full speed"',
  'Durable':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Recovers a minimum of %{constitutionModifier*2>?2} HP from a Hit Die roll"',
  'Elemental Adept (Acid)':
    'Section=magic ' +
    'Note="Acid spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Cold)':
    'Section=magic ' +
    'Note="Cold spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Fire)':
    'Section=magic ' +
    'Note="Fire spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Lightning)':
    'Section=magic ' +
    'Note="Lightning spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Thunder)':
    'Section=magic ' +
    'Note="Thunder spells ignore resistance and treat 1s as 2s on damage dice"',
  'Great Weapon Master':
    'Section=combat ' +
    'Note="May make a bonus attack after crit or reducing foe to 0 HP/May suffer -5 attack w/a heavy weapon to gain +10 damage"',
  'Healer':
    'Section=feature ' +
    'Note="Using a healer\'s kit to stabilize also restores 1 HP/May use a healer\'s kit to restore 1d6 + 4 + target HD HP 1/short rest"',
  'Heavily Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"Armor Proficiency (Heavy)"',
  'Heavy Armor Master':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"Has DR 3/magic to bludgeoning, piercing, and slashing damage"',
  'Inspiring Leader':
    'Section=feature Note="R30\' 10-min speech gives 6 allies %V temporary HP"',
  'Keen Mind':
    'Section=ability,feature ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"Always knows direction of north and hours until sunrise or sunset/Can recall anything seen or heard during the past month"',
  'Lightly Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Light)"',
  'Linguist':
    'Section=ability,feature,skill ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"May create ciphers (DC %V Intelligence decodes)",' +
      '"Language (Choose 3 from any)"',
  'Lucky':
    'Section=feature ' +
    'Note="May gain Adv on an attack, ability, or saving throw or inflict foe Disadv on self attack 3/long rest"',
  'Mage Slayer':
    'Section=combat,save ' +
    'Note=' +
      '"May use Reaction to attack an adjacent caster/Foe suffers Disadv on concentration to maintain spell",' +
      '"Adv on spells by adjacent foes"',
  'Magic Initiate (Bard)':
    'Section=magic Note="Knows 2 B0 spells/May cast 1 B1 spell/long rest"',
  'Magic Initiate (Cleric)':
    'Section=magic Note="Knows 2 C0 spells/May cast 1 C1 spell/long rest"',
  'Magic Initiate (Druid)':
    'Section=magic Note="Knows 2 D0 spells/May cast 1 D1 spell/long rest"',
  'Magic Initiate (Sorcerer)':
    'Section=magic Note="Knows 2 S0 spells/May cast 1 S1 spell/long rest"',
  'Magic Initiate (Warlock)':
    'Section=magic Note="Knows 2 K0 spells/May cast 1 K1 spell/long rest"',
  'Magic Initiate (Wizard)':
    'Section=magic Note="Knows 2 W0 spells/May cast 1 W1 spell/long rest"',
  'Martial Adept':
    'Section=combat Note="Has Combat Superiority feature (2 maneuvers, 1 die)"',
  'Medium Armor Master':
    'Section=combat,skill ' +
    'Note=' +
      '"+1 AC in medium armor if Dexterity is at least 16",' +
      '"Suffers no Stealth check penalty in medium armor"',
  'Mobile':
    'Section=ability,combat ' +
    'Note=' +
      '"+10 Speed",' +
      '"May Dash at full speed in difficult terrain/Suffers no OA from targeted foe"',
  'Moderately Armored':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Medium/Shield)"',
  'Mounted Combatant':
    'Section=combat ' +
    'Note="Adv on melee attacks on an unmounted foe smaller than mount/May redirect attack on mount to self/Mount takes no damage on successful Dexterity save and half on fail"',
  'Observant':
    'Section=ability,feature,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Intelligence, Wisdom)",' +
      '"May read lips",' +
      '"+5 passive Investigation and Perception"',
  'Polearm Master':
    'Section=combat ' +
    'Note="Bonus attack w/polearm butt inflicts 1d4 HP bludgeoning/May take OA when a foe enters reach"',
  'Resilient':
    'Section=ability,save ' +
    'Note=' +
      '"Ability Boost (Choose 1 from any)",' +
      '"Save Proficiency (Choose 1 from any)"',
  'Ritual Caster':'Section=magic Note="May cast spells from a ritual book"',
  'Savage Attacker':
    'Section=combat Note="May take the best of two melee damage rolls 1/rd"',
  'Sentinel':
    'Section=combat ' +
    'Note="Successful OA halts foe/May take an OA when an adjacent foe uses Disengage/May use Reaction to attack when an adjacent foe targets another"',
  'Sharpshooter':
    'Section=combat ' +
    'Note="Suffers no Disadv on attacks at long range/Range attacks ignore 3/4 cover/May suffer -5 attack w/ranged weapon to gain +10 damage"',
  'Shield Master':
    'Section=combat,save ' +
    'Note=' +
      '"May make a bonus Push during Attack",' +
      '"+2 Dexterity vs. targeted spell/Successful Dexterity save yields no damage instead of half"',
  'Skilled':'Section=skill Note="Skill Proficiency (Choose 3 from any)"',
  'Skulker':
    'Section=skill ' +
    'Note="May hide when lightly obscured/Ranged miss does not reveal position/Suffers no Disadv on Perception in dim light"',
  'Spell Sniper':
    'Section=magic ' +
    'Note="Dbl attack spell range/Spells ignore 3/4 cover/Knows an additional attack cantrip"',
  'Tavern Brawler':
    'Section=ability,combat,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Strength)",' +
      '"Weapon Proficiency (Improvised)/Unarmed attacks inflict 1d4 HP",' +
      '"May make a bonus grapple after a successful Unarmed or Improvised attack"',
  'Tough':'Section=combat Note="+%V HP"',
  'War Caster':
    'Section=magic ' +
    'Note="Adv on concentration to maintain spell/May cast when holding a shield and/or weapon/May use Reaction to cast as an OA"',
  'Weapon Master':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Weapon Proficiency (Choose 4 from any)"',
  // Races
  'Dark Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Drow Magic':'Section=magic Note="Knows <i>Dancing Lights</i> cantrip%1"',
  'Drow Weapon Training':
    'Section=combat ' +
    'Note="Weapon Proficiency (Hand Crossbow/Rapier/Shortsword)"',
  'Dwarven Armor Training':'Section=combat Note="Armor Proficiency (Medium)"',
  'Fleet Of Foot':'Section=ability Note="+5 Speed"',
  'Forest Gnome Ability Adjustment':
    'Section=ability Note="+2 Intelligence/+1 Dexterity"',
  'Mask Of The Wild':'Section=skill Note="May hide in light natural coverage"',
  'Mountain Dwarf Ability Adjustment':
    'Section=ability Note="+2 Constitution/+2 Strength"',
  'Natural Illusionist':
    'Section=magic Note="Knows <i>Minor Illusion</i> cantrip"',
  'Speak With Small Beasts':
    'Section=feature Note="May communicate with small animals"',
  'Stout Halfling Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Stout Resilience':
    'Section=save Note="Adv on saves vs. poison/Has resistance to poison damage"',
  'Sunlight Sensitivity':
    'Section=combat,skill ' +
    'Note=' +
      '"Disadv on attack in direct sunlight",' +
      '"Disadv on sight Perception in direct sunlight"',
  'Superior Darkvision':
    'Section=feature Note="R120\' Sees one light level better"',
  'Wood Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Wisdom"'
};
PHB5E.FEATURES = Object.assign({}, SRD5E.FEATURES, PHB5E.FEATURES_ADDED);
PHB5E.PATHS = Object.assign({}, SRD5E.PATHS);
PHB5E.RACES_ADDED = {
  'Dark Elf':
    'Features=' +
      '"1:Language (Common/Elvish)",' +
      '"1:Dark Elf Ability Adjustment","1:Drow Magic",' +
      '"1:Drow Weapon Training","1:Fey Ancestry","1:Keen Senses",' +
      '"1:Sunlight Sensitivity","1:Superior Darkvision",1:Trance',
  'Forest Gnome':
    'Features=' +
      '"1:Language (Common/Gnomish)",' +
      '1:Darkvision,"1:Gnome Cunning","1:Natural Illusionist",' +
      '"1:Forest Gnome Ability Adjustment",1:Slow,1:Small,' +
      '"1:Speak With Small Beasts"',
  'Mountain Dwarf':
    'Features=' +
      '"1:Language (Common/Dwarvish)",' +
      '"1:Tool Proficiency (Choose 1 from Brewer\'s Tools, Mason\'s Tools, Smith\'s Tools)",' +
      '1:Darkvision,"1:Dwarven Armor Training","1:Dwarven Combat Training",' +
      '"1:Dwarven Resilience","1:Mountain Dwarf Ability Adjustment",1:Slow,' +
      '1:Steady,1:Stonecunning',
  'Stout Halfling':
    'Features=' +
      '"1:Language (Common/Halfling)",' +
      '1:Brave,"1:Halfling Nimbleness","1:Lucky Halfling",1:Slow,1:Small,' +
      '"1:Stout Halfling Ability Adjustment","1:Stout Resilience"',
  'Wood Elf':
    'Features=' +
      '"1:Language (Common/Elvish)",' +
      '1:Darkvision,"1:Elf Weapon Training","1:Fey Ancestry",' +
      '"1:Fleet Of Foot","1:Keen Senses","1:Mask Of The Wild",1:Trance,' +
      '"1:Wood Elf Ability Adjustment"'
};
PHB5E.RACES = Object.assign({}, SRD5E.RACES, PHB5E.RACES_ADDED);
PHB5E.SPELLS_ADDED = {

  'Arcane Gate':
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description="R10\'/500\' Creates teleportation portal pair for conc or 10 min"',
  'Armor Of Agathys':
    'School=Abjuration ' +
    'Level=K1 ' +
    'AtHigherLevels="gives +5 temporary HP and inflicts +5 HP cold" ' +
    'Description="Self gains +5 temporary HP, successful attacker suffers 5 HP cold for 1 hr"',
  'Arms Of Hadar':
    'School=Conjuration ' +
    'Level=K1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description="10\' radius inflicts 2d6 HP necrotic and no Reaction (Strength half, no loss of Reaction) for 1 rd"',
  'Aura Of Life':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description="30\' radius gives resistance to necrotic damage, raises nonhostile creatures w/0 HP to 1 HP for conc or 10 min"',
  'Aura Of Purity':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description="30\' radius gives resistance to poison damage, immunity to disease, and Adv on conditions for conc or 10 min"',
  'Aura Of Vitality':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="R30\' Target heals 2d6 HP 1/rd for conc or 1 min"',

  'Banishing Smite':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description="Self attacks inflict +5d10 HP force, banish to home or demiplane when target reduced to 50 HP for conc or 1 min"',
  'Beast Sense':
    'School=Divination ' +
    'Level=D2,R2 ' +
    'Description="Self perceives through touched beast\'s senses for conc or 1 hr"',
  'Blade Ward':
    'School=Abjuration ' +
    'Level=B0,K0,S0,W0 ' +
    'Description="Self gains resistance to bludgeoning, piercing, and slashing damage for 1 rd"',
  'Blinding Smite':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="Self attack inflicts +3d8 HP radiant and blinds (Constitution neg) for conc or 1 min"',

  'Chromatic Orb':
    'School=Evocation ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description="R90\' Ranged spell inflicts 3d8 HP acid, cold, fire, lightning, poison, or energy"',
  'Circle Of Power':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description="Allies in 30\' radius gain Adv on save vs. magic and saves yields no damage instead of half for conc or 10 min"',
  'Cloud Of Daggers':
    'School=Conjuration ' +
    'Level=B2,K2,S2,W2 ' +
    'AtHigherLevels="inflicts +2d4 HP" ' +
    'Description="R60\' 5\' cu inflicts 4d4 HP slashing for conc or 1 min"',
  'Compelled Duel':
    'School=Enchantment ' +
    'Level=P1 ' +
    'Description="R30\' Target stays w/in 30\' of self, suffers Disadv on attacks on others (Wisdom neg) for conc or 1 min"',
  'Conjure Barrage':
    'School=Conjuration ' +
    'Level=R3 ' +
    'Description="60\' cone inflicts 3d8 HP weapon type (Dexterity half)"',
  'Conjure Volley':
    'School=Conjuration ' +
    'Level=R5 ' +
    'Description="R150\' 40\' radius inflicts 8d8 HP weapon type (Dexterity half)"',
  'Cordon Of Arrows':
    'School=Transmutation ' +
    'Level=R2 ' +
    'AtHigherLevels="affects +2 pieces" ' +
    'Description="R5\' Four pieces of ammo attack w/in 30\', inflict 1d6 HP piercing (Dexterity neg) for 8 hr"',
  'Crown Of Madness':
    'School=Enchantment ' +
    'Level=B2,K2,S2,W2 ' +
    'Description="R120\' Self directs target\'s attacks (Wisdom neg) for conc or 1 min"',
  "Crusader's Mantle":
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="Allies in 30\' radius inflict +1d4 HP radiant for conc or 1 min"',

  'Destructive Wave':
    'School=Evocation ' +
    'Level=P5 ' +
    'Description="30\' radius inflicts 5d6 HP thunder and knocks prone (Constitution half HP, not prone)"',
  'Dissonant Whispers':
    'School=Enchantment ' +
    'Level=B1,"K1 [The Great Old One]" ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description="R60\' Target suffers 3d6 HP psychic and flees (Wisdom half, need not flee)"',

  'Elemental Weapon':
    'School=Transmutation ' +
    'Level=P3 ' +
    'AtHigherLevels="gives +2/+3 attack and +2d4/+3d4 HP at level 5/7" ' +
    'Description="Touched weapon gains +1 attack and +1d4 HP acid, cold, fire, lightning, or thunder for conc or 1 hr"',
  'Ensnaring Strike':
    'School=Conjuration ' +
    'Level=R1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description="Successful attack restrains foe and inflicts 1d6 HP/rd piercing (Strength neg) for conc or 1 min"',

  'Feign Death':
    'School=Necromancy ' +
    'Level=B3,C3,D3,W3 ' +
    'Description="Touched appears dead for 1 hr"',
  'Friends':
    'School=Enchantment ' +
    'Level=B0,K0,S0,W0 ' +
    'Description="Self gains on Adv on Charisma w/target for conc or 1 min"',

  'Grasping Vine':
    'School=Conjuration ' +
    'Level=D4,R4 ' +
    'Description="R30\' Vine pulls target 20\' (Dexterity neg) for conc or 1 min"',

  'Hail Of Thorns':
    'School=Conjuration ' +
    'Level=R1 ' +
    'AtHigherLevels="inflicts +1d10 HP (6d10 max)" ' +
    'Description="5\' radius inflicts 1d10 HP piercing (Dexterity half) following a successful ranged attack"',
  'Hex':
    'School=Enchantment ' +
    'Level=K1 ' +
    'AtHigherLevels="extends duration to 8/24 hr at level 3/5" ' +
    'Description="R90\' Self hits on target inflict +1d6 HP necrotic, target has Disadv on chosen ability for conc or 1 hr"',
  'Hunger Of Hadar':
    'School=Conjuration ' +
    'Level=K3 ' +
    'Description="R150\' 20\' void inflicts 2d6 HP cold (start of turn) and 2d6 HP acid (end of turn) for conc or 1 min"',

  'Lightning Arrow':
    'School=Transmutation ' +
    'Level=R3 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description="Ranged weapon inflicts 8d6 HP lightning on target and 2d8 HP lightning in 10\' radius (Dexterity half)"',

  "Mordenkainen's Sword":
    'School=Evocation ' +
    'Level=B7,W7 ' +
    'Description="R60\' Self controls force weapon (melee spell attack inflicts 3d10 HP force, moves 20\'/rd) for conc or 1 min"',

  'Phantasmal Force':
    'School=Illusion ' +
    'Level=B2,"K2 [The Archfey]","K2 [The Great Old One]",S2,W2 ' +
    'Description="R60\' Target perceives illusion that can inflict 1d6 HP psychic/rd (Intelligence neg) for conc or 1 min"',
  'Power Word Heal':
    'School=Evocation ' +
    'Level=B9 ' +
    'Description="Touched regains all HP and becomes uncharmed, unfrightened, unparalyzed, and unstunned"',

  'Ray Of Sickness':
    'School=Necromancy ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description="R60\' Target suffers 2d8 HP poison and poisoned 1 rd (Constitution not poisoned)",',

  'Searing Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'AtHigherLevels="inflicts +1d6 HP initial" ' +
    'Description="Self weapon inflicts +1d6 HP fire, target suffers 1d6 HP fire/rd (Constitution ends per-rd damage) for conc or 1 min"',
  'Staggering Smite':
    'School=Evocation ' +
    'Level=P4 ' +
    'Description="Next successful attack w/in conc or 1 min inflicts +4d6 HP psychic, Disadv on attacks and ability checks, and no Reaction for 1 rd"',
  'Swift Quiver':
    'School=Transmutation ' +
    'Level=R5 ' +
    'Description="Touched quiver contains endless ammo, gives extra attack for conc or 1 min"',

  'Telepathy':
    'School=Evocation ' +
    'Level=W8 ' +
    'Description="Self communicates with ally mentally for 1 dy"',
  'Thorn Whip':
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description="R30\' Ranged spell inflicts %{(level+7)//6}d6 HP and pulls 10\'"',
  'Thunderous Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description="Next successful attack w/in conc or 1 min inflicts +2d6 HP thunder and pushes 10\' (Strength no push)"',
  'Tsunami':
    'School=Conjuration ' +
    'Level=D8 ' +
    'Description="RSight 300\'x300\' wall of water inflicts 6d10 HP bludgeoning (Strength half), moves away 50\'/rd for conc or 6 rd"',

  'Witch Bolt':
    'School=Evocation ' +
    'Level=K1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d12 HP initial" ' +
    'Description="R30\' Ranged spell inflicts 1d12 HP lightning/rd for conc or 1 min"',
  'Wrathful Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description="Next successful attack w/in conc or 1 min inflicts +1d6 HP psychic and frightens (Wisdom no fright)"'

};
PHB5E.SPELLS_LEVELS_ADDED = {
  'Black Tentacles':'"K4 [The Great Old One]"',
  'Blink':'"K3 [The Archfey]"',
  'Calm Emotions':'"K2 [The Archfey]"',
  'Clairvoyance':'"K3 [The Great Old One]"',
  'Detect Thoughts':'"K2 [The Great Old One]"',
  'Dominate Beast':'"K4 [The Archfey]","K4 [The Great Old One]"',
  'Dominate Person':'"K5 [The Archfey]","K5 [The Great Old One]"',
  'Faerie Fire':'"K1 [The Archfey]"',
  'Greater Invisibility':'"K4 [The Archfey]"',
  'Hideous Laughter':'"K1 [The Great Old One]"',
  'Plant Growth':'"K3 [The Archfey]"',
  'Seeming':'"K5 [The Archfey]"',
  'Sending':'"K3 [The Great Old One]"',
  'Sleep':'"K1 [The Archfey]"',
  'Telekinesis':'"K5 [The Great Old One]"'
};
PHB5E.SPELLS_RENAMED = {
  'Acid Arrow':"Melf's Acid Arrow",
  'Arcane Hand':"Bigby's Hand",
  "Arcanist's Magic Aura":"Nystul's Magic Aura",
  'Black Tentacles':"Evard's Black Tentacles",
  'Faithful Hound':"Mordenkainen's Faithful Hound",
  'Floating Disk':"Tenser's Floating Disk",
  'Freezing Sphere':"Otiluke's Freezing Sphere",
  'Hideous Laughter':"Tasha's Hideous Laughter",
  'Instant Summons':"Drawmij's Instant Summons",
  'Irresistible Dance':"Otto's Irresistible Dance",
  'Magnificent Mansion':"Mordenkainen's Magnificent Mansion",
  'Private Sanctum':"Mordenkainen's Private Sanctum",
  'Resilient Sphere':"Otiluke's Resilient Sphere",
  'Secret Chest':"Leomund's Secret Chest",
  'Telepathic Bond':"Rary's Telepathic Bond",
  'Tiny Hut':"Leomund's Tiny Hut"
};
PHB5E.SPELLS = Object.assign({}, SRD5E.SPELLS, PHB5E.SPELLS_ADDED);
for(let s in PHB5E.SPELLS_LEVELS_ADDED) {
  PHB5E.SPELLS[s] =
    PHB5E.SPELLS[s].replace('Level=', 'Level=' + PHB5E.SPELLS_LEVELS_ADDED[s] + ',');
}
for(let s in PHB5E.SPELLS_RENAMED) {
  PHB5E.SPELLS[PHB5E.SPELLS_RENAMED[s]] = PHB5E.SPELLS[s];
  delete PHB5E.SPELLS[s];
}
PHB5E.DEITIES_ADDED = {
  // Forgotten Realms
  'FR-Auril':'Alignment="Neutral Evil" Domain=Nature,Tempest',
  'FR-Azuth':'Alignment="Lawful Neutral" Domain=Knowledge',
  'FR-Bane':'Alignment="Lawful Evil" Domain=War',
  'FR-Beshaba':'Alignment="Chaotic Evil" Domain=Trickery',
  'FR-Bhaal':'Alignment="Neutral Evil" Domain=Death',
  'FR-Chauntea':'Alignment="Neutral Good" Domain=Life',
  'FR-Cyric':'Alignment="Chaotic Evil" Domain=Trickery',
  'FR-Deneir':'Alignment="Neutral Good" Domain=Knowledge',
  'FR-Eldath':'Alignment="Neutral Good" Domain=Life,Nature',
  'FR-Gond':'Alignment=Neutral Domain=Knowledge',
  'FR-Helm':'Alignment="Lawful Neutral" Domain=Life,Light',
  'FR-Ilmater':'Alignment="Lawful Good" Domain=Life',
  'FR-Kelemvor':'Alignment="Lawful Neutral" Domain=Death',
  'FR-Lathander':'Alignment="Neutral Good" Domain=Life,Light',
  'FR-Leira':'Alignment=CN Domain=Trickery',
  'FR-Lliira':'Alignment="Chaotic Good" Domain=Life',
  'FR-Loviatar':'Alignment="Lawful Evil" Domain=Death',
  'FR-Malar':'Alignment="Chaotic Evil" Domain=Nature',
  'FR-Mask':'Alignment=CN Domain=Trickery',
  'FR-Mielikki':'Alignment="Neutral Good" Domain=Nature',
  'FR-Milil':'Alignment="Neutral Good" Domain=Light',
  'FR-Myrkul':'Alignment="Neutral Evil" Domain=Death',
  'FR-Mystra':'Alignment="Neutral Good" Domain=Knowledge',
  'FR-Oghma':'Alignment=Neutral Domain=Knowledge',
  'FR-Savras':'Alignment="Lawful Neutral" Domain=Knowledge',
  'FR-Selune':'Alignment="Chaotic Good" Domain=Knowledge,Life',
  'FR-Shar':'Alignment="Neutral Evil" Domain=Death,Trickery',
  'FR-Silvanus':'Alignment=Neutral Domain=Nature',
  'FR-Sune':'Alignment="Chaotic Good" Domain=Life,Light',
  'FR-Talona':'Alignment="Chaotic Evil" Domain=Death',
  'FR-Talos':'Alignment="Chaotic Evil" Domain=Tempest',
  'FR-Tempus':'Alignment=Neutral Domain=War',
  'FR-Torm':'Alignment="Lawful Good" Domain=War',
  'FR-Tymora':'Alignment="Chaotic Good" Domain=Trickery',
  'FR-Tyr':'Alignment="Lawful Good" Domain=War',
  'FR-Umberlee':'Alignment="Chaotic Evil" Domain=Tempest',
  'FR-Waukeen':'Alignment=Neutral Domain=Knowledge,Trickery',
  // Greyhawk
  'Greyhawk-Beory':'Alignment=Neutral Domain=Nature',
  'Greyhawk-Boccob':'Alignment=Neutral Domain=Knowledge',
  'Greyhawk-Celestian':'Alignment=Neutral Domain=Knowledge',
  'Greyhawk-Ehlonna':'Alignment="Neutral Good" Domain=Life,Nature',
  'Greyhawk-Erythnul':'Alignment="Chaotic Evil" Domain=War',
  'Greyhawk-Fharlanghn':'Alignment="Neutral Good" Domain=Knowledge,Trickery',
  'Greyhawk-Heironeous':'Alignment="Lawful Good" Domain=War',
  'Greyhawk-Hextor':'Alignment="Lawful Evil" Domain=War',
  'Greyhawk-Kord':'Alignment="Chaotic Good" Domain=Tempest,War',
  'Greyhawk-Incabulous':'Alignment="Neutral Evil" Domain=Death',
  'Greyhawk-Istus':'Alignment=Neutral Domain=Knowledge',
  'Greyhawk-Iuz':'Alignment="Chaotic Evil" Domain=Death',
  'Greyhawk-Nerull':'Alignment="Neutral Evil" Domain=Death',
  'Greyhawk-Obad-Hai':'Alignment=Neutral Domain=Nature',
  'Greyhawk-Olidammara':'Alignment=CN Domain=Trickery',
  'Greyhawk-Pelor':'Alignment="Neutral Good" Domain=Life,Light',
  'Greyhawk-Pholtus':'Alignment="Lawful Good" Domain=Light',
  'Greyhawk-Ralishaz':'Alignment=CN Domain=Trickery',
  'Greyhawk-Rao':'Alignment="Lawful Good" Domain=Knowledge',
  'Greyhawk-St. Cuthbert':'Alignment="Lawful Neutral" Domain=Knowledge',
  'Greyhawk-Tharizdun':'Alignment="Chaotic Evil" Domain=Trickery',
  'Greyhawk-Trithereon':'Alignment="Chaotic Good" Domain=War',
  'Greyhawk-Ulaa':'Alignment="Lawful Good" Domain=Life,War',
  'Greyhawk-Vecna':'Alignment="Neutral Evil" Domain=Knowledge',
  'Greyhawk-Wee Jas':'Alignment="Lawful Neutral" Domain=Death,Knowledge',
  // Nonhuman
  'NH-Bahamut':'Alignment="Lawful Good" Domain=Life,War Sphere=Dragon',
  'NH-Blibdoolpoolp':'Alignment="Neutral Evil" Domain=Death Sphere=Kuo-Toa',
  'NH-Corellon Larethian':'Alignment="Chaotic Good" Domain=Light Sphere=Elf',
  'NH-Deep Sashelas':
    'Alignment="Chaotic Good" Domain=Nature,Tempest Sphere=Elf',
  'NH-Eadro':'Alignment=Neutral Domain=Nature,Tempest Sphere=Merfolk',
  'NH-Garl Glittergold':'Alignment="Lawful Good" Domain=Trickery Sphere=Gnome',
  'NH-Grolantor':'Alignment="Chaotic Evil" Domain=War Sphere="Hill Giant"',
  'NH-Gruumsh':'Alignment="Chaotic Evil" Domain=Tempest,War Sphere=Orc',
  'NH-Hruggek':'Alignment="Chaotic Evil" Domain=War Sphere=Bugbear',
  'NH-Kurtulmak':'Alignment="Lawful Evil" Domain=War Sphere=Kobold',
  'NH-Laogzed':'Alignment="Chaotic Evil" Domain=Death Sphere=Troglodyte',
  'NH-Lolth':'Alignment="Chaotic Evil" Domain=Trickery Sphere=Drow',
  'NH-Maglubiyet':'Alignment="Lawful Evil" Domain=War Sphere=Goblinoid',
  'NH-Moradin':'Alignment="Lawful Good" Domain=Knowledge Sphere=Dwarf',
  'NH-Rillifane Rallathil':'Alignment="Chaotic Good" Domain=Nature Sphere=Elf',
  'NH-Sehanine Moonbow':'Alignment="Chaotic Good" Domain=Knowledge Sphere=Elf',
  'NH-Sekolah':'Alignment="Lawful Evil" Domain=Nature,Tempest Sphere=Sahuagin',
  'NH-Semuanya':'Alignment=Neutral Domain=Life Sphere=Lizardfolk',
  'NH-Skerrit':'Alignment=Neutral Domain=Knowledge Sphere=Centaur',
  'NH-Skoraeus Stonebones':
    'Alignment=Neutral Domain=Knowledge Sphere="Stone Giant"',
  'NH-Surtur':
    'Alignment="Lawful Evil" Domain=Knowledge,War Sphere="Fire Giant"',
  'NH-Thryn':'Alignment="Chaotic Evil" Domain=War Sphere="Frost Giant"',
  'NH-Tiamat':'Alignment="Lawful Evil" Domain=Trickery Sphere=Dragon',
  'NH-Yondalla':'Alignment="Lawful Good" Domain=Life Sphere=Halfling'
};
PHB5E.DEITIES = Object.assign({}, SRD5E.DEITIES, PHB5E.DEITIES_ADDED);

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
PHB5E.choiceRules = function(rules, type, name, attrs) {
  SRD5E.choiceRules(rules, type, name, attrs);
  if(type == 'Class')
    PHB5E.classRulesExtra(rules, name);
  else if(type == 'Feat')
    PHB5E.featRulesExtra(rules, name);
  else if(type == 'Race')
    PHB5E.raceRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
PHB5E.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Barbarian') {

    rules.defineRule('carry', 'abilityNotes.aspectOfTheBeast(Bear)', '*', '2');
    rules.defineRule('lift', 'abilityNotes.aspectOfTheBeast(Bear)', '*', '2');
    rules.defineRule('features.Path Of The Totem Warrior',
      'features.Path Of The Totem Warrior (Bear)', '=', '1',
      'features.Path Of The Totem Warrior (Eagle)', '=', '1',
      'features.Path Of The Totem Warrior (Wolf)', '=', '1'
    );
    SRD5E.featureSpells
      (rules, 'Spirit Seeker', 'R', null, ['Beast Sense,Speak With Animals']);
    SRD5E.featureSpells
      (rules, 'Spirit Walker', 'R', null, ['Commune With Nature']);
    SRD5E.featureSpells(rules, 'Commune With Nature', 'Spirit Walker', 'R', 5);

  } else if(name == 'Bard') {

    rules.defineRule('bardExtraAttacks',
      'bardFeatures.Extra Attack', '?', null,
      classLevel, '=', 'source<6 ? null : 1'
    );
    rules.defineRule('combatNotes.extraAttack', 'bardExtraAttacks', '+=', null);
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Medium',
      'combatNotes.bonusProficiencies(CollegeOfValor)', '=', '1'
    );
    rules.defineRule('armorProficiency.Shield',
      'combatNotes.bonusProficiencies(CollegeOfValor)', '=', '1'
    );
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.bonusProficiencies(CollegeOfValor)', '=', '1'
    );

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
    rules.defineRule('magicNotes.potentSpellcasting.1',
      'features.Potent Spellcasting', '?', null,
      'wisdomModifier', '=', null
    );
    rules.defineRule('magicNotes.radianceOfTheDawn', classLevel, '=', null);
    rules.defineRule
      ('magicNotes.wardingFlare', 'wisdomModifier', '=', 'Math.max(source, 1)');
    rules.defineRule
      ('combatNotes.divineStrike', classLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1',
      'features.Divine Strike', '?', null,
      'features.Nature Domain', '=', '"cold, fire, or lightning"',
      'features.Tempest Domain', '=', '"thunder"',
      'features.Trickery Domain', '=', '"poison"',
      'features.War Domain', '=', '"weapon damage type"'
    );
    rules.defineRule('spellSlots.D0', 'magicNotes.acolyteOfNature', '+=', '1');
    rules.defineRule('spellCasterLevel.D', 'casterLevels.Nature', '=', null);
    rules.defineRule('combatNotes.wrathOfTheStorm',
      'wisdomModifier', '=', 'Math.max(source, 1)'
    );
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Heavy',
      'combatNotes.bonusProficiencies(TempestDomain)', '=', '1'
    );
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.bonusProficiencies(TempestDomain)', '=', '1'
    );
    rules.defineRule('magicNotes.invokeDuplicity',
      classLevel, '=', '"1 illusionary duplicate"',
      'magicNotes.improvedDuplicity', '=', '"4 illusionary duplicates"'
    );
    rules.defineRule
      ('combatNotes.warPriest', 'wisdomModifier', '=', 'Math.max(source, 1)');
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Heavy', 'combatNotes.bonusProficiencies(WarDomain)', '=', '1');
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.bonusProficiencies(WarDomain)', '=', '1'
    );

    SRD5E.featureSpells(rules, 'Read Thoughts', 'C', null, ['Suggestion']);
    SRD5E.featureSpells(rules, 'Bonus Cantrip (Light Domain)', 'C', null, ['Light']);
    SRD5E.featureSpells(
      rules, 'Knowledge Domain', 'C', classLevel, [
      '1:Command', '1:Identify',
      '3:Augury', '3:Suggestion',
      '5:Nondetection', '5:Speak With Dead',
      '7:Arcane Eye', '7:Confusion',
      '9:Legend Lore', '9:Scrying'
    ]);
    SRD5E.featureSpells(
      rules, 'Light Domain', 'C', classLevel, [
      '1:Burning Hands', '1:Faerie Fire',
      '3:Flaming Sphere', '3:Scorching Ray',
      '5:Daylight', '5:Fireball',
      '7:Guardian Of Faith', '7:Wall Of Fire',
      '9:Flame Strike', '9:Scrying'
    ]);
    SRD5E.featureSpells(
      rules, 'Nature Domain', 'C', classLevel, [
      '1:Animal Friendship', '1:Speak With Animals',
      '3:Barkskin', '3:Spike Growth',
      '5:Plant Growth', '5:Wind Wall',
      '7:Dominate Beast', '7:Grasping Vine',
      '9:Insect Plague', '9:Tree Stride'
    ]);
    SRD5E.featureSpells(
      rules, 'Tempest Domain', 'C', classLevel, [
      '1:Fog Cloud', '1:Thunderwave',
      '3:Gust Of Wind', '3:Shatter',
      '5:Call Lightning', '5:Sleet Storm',
      '7:Control Water', '7:Ice Storm',
      '9:Destructive Wave', '9:Insect Plague'
    ]);
    SRD5E.featureSpells(
      rules, 'Trickery Domain', 'C', classLevel, [
      '1:Charm Person', '1:Disguise Self',
      '3:Mirror Image', '3:Pass Without Trace',
      '5:Blink', '5:Dispel Magic',
      '7:Dimension Door', '7:Polymorph',
      '9:Dominate Person', '9:Modify Memory'
    ]);
    SRD5E.featureSpells(
      rules, 'War Domain', 'C', classLevel, [
      '1:Divine Favor', '1:Shield Of Faith',
      '3:Magic Weapon', '3:Spiritual Weapon',
      '5:Crusader\'s Mantle', '5:Spirit Guardians',
      '7:Freedom Of Movement', '7:Stoneskin',
      '9:Flame Strike', '9:Hold Monster'
    ]);

  } else if(name == 'Druid') {

    rules.defineRule
      ('magicNotes.wildShape.1', 'magicNotes.circleForms', '=', null);
    rules.defineRule('magicNotes.circleForms',
      classLevel, '=', 'source < 6 ? 1 : Math.floor(source / 3)'
    );

    SRD5E.featureSpells(rules, 'Thousand Forms', 'D', null, ['Alter Self']);
    SRD5E.featureSpells(
      rules, 'Circle Of The Land (Underdark)', 'D', classLevel, [
      '3:Spider Climb', '3:Web',
      '5:Gaseous Form', '5:Stinking Cloud',
      '7:Greater Invisibility', '7:Stone Shape',
      '9:Cloudkill', '9:Insect Plague'
    ]);

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
    rules.defineRule
      ('combatNotes.disarmingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.goadingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.improvedCombatSuperiority',
      classLevel, '=', 'source<18 ? 10 : 12'
    );
    rules.defineRule('combatNotes.menacingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.parry', 'dexterityModifier', '=', null);
    rules.defineRule('combatNotes.pushingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.rally', 'charismaModifier', '=', null);
    rules.defineRule('combatNotes.tripAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('selectableFeatureCount.Fighter (Maneuver)',
      'combatNotes.combatSuperiority.2', '=', null
    );
    rules.defineRule('combatNotes.warMagic',
      classLevel, '=', '"cantrip"',
      'combatNotes.improvedWarMagic', '=', '"any spell"'
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

  } else if(name == 'Monk') {

    rules.defineRule('magicNotes.discipleOfTheElements',
      'monkFeatures.Way Of The Four Elements', '?', null,
      classLevel, '=', 'Math.floor( (source + 4) / 5)'
    );
    rules.defineRule('selectableFeatureCount.Monk (Elemental Discipline)',
      'magicNotes.discipleOfTheElements', '=', null
    );
    rules.defineRule('magicNotes.fistOfUnbrokenAir', 'kiSaveDC', '=', null);
    rules.defineRule('magicNotes.waterWhip', 'kiSaveDC', '=', null);

    SRD5E.featureSpells(
      rules, 'Shadow Arts', 'M', null,
      ['Darkness,Darkvision,Minor Illusion,Pass Without Trace,Silence']
    );
    SRD5E.featureSpells
      (rules, 'Fist Of Four Thunders', 'M', null, ['Thunderwave']);
    SRD5E.featureSpells
      (rules, 'Sweeping Cinder Strike', 'M', null, ['Burning Hands']);
    SRD5E.featureSpells
      (rules, 'Clench Of The North Wind', 'M', null, ['Hold Person']);
    SRD5E.featureSpells(rules, 'Gong Of The Summit', 'M', null, ['Shatter']);
    SRD5E.featureSpells
      (rules, 'Rush Of The Gale Spirits', 'M', null, ['Gust Of Wind']);
    SRD5E.featureSpells(rules, 'Gong Of The Summit', 'M', null, ['Shatter']);
    SRD5E.featureSpells
      (rules, 'Flames Of The Phoenix', 'M', null, ['Fireball']);
    SRD5E.featureSpells(rules, 'Mist Stance', 'M', null, ['Gaseous Form']);
    SRD5E.featureSpells(rules, 'Ride The Wind', 'M', null, ['Fly']);
    SRD5E.featureSpells
      (rules, 'Eternal Mountain Defense', 'M', null, ['Stoneskin']);
    SRD5E.featureSpells
      (rules, 'River Of Hungry Flame', 'M', null, ['Wall Of Fire']);
    SRD5E.featureSpells(rules, 'Breath Of Winter', 'M', null, ['Cone Of Cold']);
    SRD5E.featureSpells
      (rules, 'Wave Of Rolling Earth', 'M', null, ['Wall Of Stone']);

  } else if(name == 'Paladin') {

    rules.defineRule
      ('combatNotes.avengingAngel', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('magicNotes.abjureEnemy', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ("magicNotes.nature'sWrath", 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('magicNotes.turnTheFaithless', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('saveNotes.auraOfWarding', classLevel, '=', 'source<18 ? 10 : 30');

    SRD5E.featureSpells(
      rules, 'Oath Of The Ancients', 'P', classLevel, [
      '3:Ensnaring Strike', '3:Speak With Animals',
      '5:Moonbeam', '5:Misty Step',
      '9:Plant Growth', '9:Protection From Energy',
      '13:Ice Storm', '13:Stoneskin',
      '17:Commune With Nature', '17:Tree Stride'
    ]);
    SRD5E.featureSpells(
      rules, 'Oath Of Vengeance', 'P', classLevel, [
      '3:Bane', '3:Hunter\'s Mark',
      '5:Hold Person', '5:Misty Step',
      '9:Haste', '9:Protection From Energy',
      '13:Banishment', '13:Dimension Door',
      '17:Hold Monster', '17:Scrying'
    ]);

  } else if(name == 'Ranger') {

    rules.defineRule
      ("featureNotes.ranger'sCompanion", classLevel, '=', '"1/4"');

  } else if(name == 'Rogue') {

    rules.defineRule('combatNotes.deathStrike',
      'dexterityModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );
    rules.defineRule('magicNotes.spellThief',
      'intelligenceModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );

    SRD5E.featureSpells
      (rules, 'Mage Hand Legerdemain', 'W', null, ['Mage Hand']);
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

  } else if(name == 'Warlock') {

    rules.defineRule
      ('magicNotes.darkDelirium', 'spellDifficultyClass.K', '=', null);
    rules.defineRule
      ('magicNotes.feyPresence', 'spellDifficultyClass.K', '=', null);
    rules.defineRule
      ('saveNotes.beguilingDefenses', 'spellDifficultyClass.K', '=', null);

  } else if(name == 'Wizard') {

    rules.defineRule('magicNotes.alterMemories',
      'charismaModifier', '=', 'Math.max(source + 1, 1)'
    );
    rules.defineRule('magicNotes.alterMemories.1',
      'features.Alter Memories', '?', null,
      'spellDifficultyClass.W', '=', null
    );
    rules.defineRule('magicNotes.arcaneWard',
      classLevel, '=', 'source * 2',
      'intelligenceModifier', '+', null
    );
    rules.defineRule
      ('magicNotes.commandUndead', 'spellDifficultyClass.W', '=', null);
    rules.defineRule
      ('magicNotes.hypnoticGaze', 'spellDifficultyClass.W', '=', null);
    rules.defineRule
      ('magicNotes.instinctiveCharm', 'spellDifficultyClass.W', '=', null);
    rules.defineRule('magicNotes.portent',
      classLevel, '=', '2',
      'magicNotes.greaterPortent', '^', '3'
    );
    rules.defineRule('magicNotes.undeadThralls', classLevel, '=', null);
    rules.defineRule('magicNotes.undeadThralls.1',
      'features.Undead Thralls', '?', null,
      'proficiencyBonus', '=', null
    );

    SRD5E.featureSpells
      (rules, 'Improved Minor Illusion', 'W', null, ['Minor Illusion']);
    SRD5E.featureSpells(rules, 'Undead Thralls', 'W', null, ['Animate Dead']);
    SRD5E.featureSpells(rules, 'Shapechanger', 'W', null, ['Polymorph']);
    SRD5E.featureSpells(rules, 'Master Transmuter', 'W', null, ['Raise Dead']);

  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
PHB5E.featRulesExtra = function(rules, name) {

  let matchInfo;

  if(name == 'Alert') {
    rules.defineRule('initiative', 'combatNotes.alert', '+', '5');
  } else if(name == 'Defensive Duelist') {
    rules.defineRule
      ('combatNotes.defensiveDuelist', 'proficiencyBonus', '=', null);
  } else if(name == 'Inspiring Leader') {
    rules.defineRule('featureNotes.inspiringLeader',
      'level', '=', null,
      'charismaModifier', '+', null
    );
  } else if(name == 'Linguist') {
    rules.defineRule('featureNotes.linguist',
      'intelligence', '=', null,
      'proficiencyBonus', '+', null
    );
  } else if((matchInfo = name.match(/Magic\sInitiate\s.(.*)./)) != null) {
    let clas = matchInfo[1];
    let spellCode = clas == 'Warlock' ? 'K' : clas.charAt(0);
    rules.defineRule('casterLevels.' + spellCode,
      'magicNotes.magicInitiate(' + clas + ')', '^=', '1'
    );
    rules.defineRule('spellSlots.' + spellCode + '0',
      'magicNotes.magicInitiate(' + clas + ')', '+=', '2'
    );
    rules.defineRule('spellSlots.' + spellCode + '1',
      'magicNotes.magicInitiate(' + clas + ')', '+=', '1'
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
      'armorWeight', '=', 'source == 2 ? 1 : null'
    );
  } else if(name == 'Tavern Brawler') {
    rules.defineRule
      ('weapons.Unarmed.2', 'combatNotes.tavernBrawler', '^=', '"1d4"');
  } else if(name == 'Tough') {
    rules.defineRule('combatNotes.tough', 'level', '=', '2 * source');
  } else if(name == 'Weapon Master') {
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.weaponMaster', '+=', '4');
  }

};

/*
 * Defines in #rules# the rules associated with race #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
PHB5E.raceRulesExtra = function(rules, name) {
  if(name == 'Dark Elf') {
    rules.defineRule('magicNotes.drowMagic.1',
      'race', '?', 'source == "Dark Elf"',
      'level', '=',
        'source<3 ? "" : ' +
        'source<5 ? ", cast <i>Faerie Fire</i> 1/long rest" : ' +
        '", cast <i>Faerie Fire</i> and <i>Darkness</i> 1/long rest"'
    );
    SRD5E.featureSpells(
      rules, 'Drow Magic', 'B', 'level',
      ['Dancing Lights',
       '3:Faerie Fire',
       '5:Darkness']
    );
    rules.defineRule('spellCasterLevel.Drow Magic',
      'features.Drow Magic', '?', null,
      'level', '=', null
    );
    rules.defineRule('casterLevels.B',
      'spellCasterLevel.Drow Magic', '^=', null
    );
  } else if(name == 'Forest Gnome') {
    SRD5E.featureSpells
      (rules, 'Natural Illusionist', 'W', null, ['Minor Illusion']);
    rules.defineRule('spellCasterLevel.Natural Illusionist',
      'features.Natural Illusionist', '?', null,
      'level', '=', null
    );
    rules.defineRule('casterLevels.W',
      'spellCasterLevel.Natural Illusionist', '^=', null
    );
  }
};

/* Returns an array of plugins upon which this one depends. */
PHB5E.getPlugins = function() {
  let result = [SRD5E];
  if(window.Tasha != null &&
     QuilvynUtils.getKeys(PHB5E.rules.getChoices('selectableFeatures'), /Peace Domain/).length > 0)
    result.unshift(Tasha);
  if(window.Volo != null &&
     (Volo.CHARACTER_RACES_IN_PLAY || Volo.MONSTROUS_RACES_IN_PLAY))
    result.unshift(Volo);
  if(window.Xanathar != null &&
     QuilvynUtils.getKeys(PHB5E.rules.getChoices('selectableFeatures'), /Forge Domain/).length > 0)
    result.unshift(Xanathar);
  return result;
};

/* Returns HTML body content for user notes associated with this rule set. */
PHB5E.ruleNotes = function() {
  return '' +
    '<h2>D&D 5E Quilvyn Plugin Notes</h2>\n' +
    'D&D 5E Quilvyn Plugin Version ' + PHB5E.VERSION + '\n' +
    '<h3>Limitations</h3>\n' +
    '<ul>\n' +
    '  <li>\n' +
    '    Quilvyn allows proficiencies from the PHB Skilled feat to be\n' +
    '    applied only to skills, rather than skills or tools.\n' +
    '  </li>\n' +
    '</ul>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s D&D 5E rule set is unofficial Fan Content permitted under ' +
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
