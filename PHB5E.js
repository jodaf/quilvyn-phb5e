/*
Copyright 2025, James J. Hayes

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
  SRD5E.combatRules(rules, PHB5E.ARMORS, PHB5E.SHIELDS, PHB5E.WEAPONS);
  SRD5E.magicRules(rules, PHB5E.SCHOOLS, PHB5E.SPELLS);
  SRD5E.identityRules(
    rules, PHB5E.ALIGNMENTS, PHB5E.BACKGROUNDS, PHB5E.CLASSES, PHB5E.DEITIES,
    PHB5E.PATHS, PHB5E.RACES
  );
  SRD5E.talentRules
    (rules, PHB5E.FEATS, PHB5E.FEATURES, PHB5E.GOODIES, PHB5E.LANGUAGES,
     PHB5E.SKILLS, PHB5E.TOOLS);

  Quilvyn.addRuleSet(rules);

}

PHB5E.VERSION = '2.4.2.0';

PHB5E.ALIGNMENTS = Object.assign({}, SRD5E.ALIGNMENTS);
PHB5E.ARMORS = Object.assign({}, SRD5E.ARMORS);
PHB5E.BACKGROUNDS_ADDED = {
  'Charlatan':
    'Equipment=' +
      '"Fine Clothes","Con Tools","Disguise Kit","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Deception; Sleight Of Hand)",' +
      '"1:Tool Proficiency (Disguise Kit; Forgery Kit)",' +
      '"1:False Identity"',
  'Criminal':
    'Equipment=' +
      'Crowbar,"Dark Clothes W/Hood","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Deception; Stealth)",' +
      '"1:Tool Proficiency (Thieves\' Tools; Choose 1 from any Gaming)",' +
      '"1:Criminal Contact"',
  'Entertainer':
    'Equipment=' +
      '"Admirer\'s Favor",Costume,"Musical Instrument","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Acrobatics; Performance)",' +
      '"1:Tool Proficiency (Disguise Kit; Choose 1 from any Musical)",' +
      '"1:By Popular Demand"',
  'Folk Hero':
    'Equipment=' +
      '"Artisan\'s Tools",Clothes,"Iron Pot",Shovel,"10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Animal Handling; Survival)",' +
      '"1:Tool Proficiency (Vehicles (Land); Choose 1 from any Artisan)",' +
      '"1:Rustic Hospitality"',
  'Guild Artisan':
    'Equipment=' +
      '"Artisan\'s Tools","Introduction Letter","Traveler\'s Clothes","15 GP" '+
    'Features=' +
      '"1:Skill Proficiency (Insight; Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Artisan)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Guild Membership"',
  'Hermit':
    'Equipment=' +
      'Clothes,"Herbalism Kit","Scroll Case With Notes","Winter Blanket",' +
      '"5 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Medicine; Religion)",' +
      '"1:Tool Proficiency (Herbalism Kit)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Discovery',
  'Noble':
    'Equipment=' +
      '"Fine Clothes","Pedigree Scroll","Signet Ring","25 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History; Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Gaming)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Position Of Privilege"',
  'Outlander':
    'Equipment=' +
      '"Animal Trophy","Hunting Trap",Staff,"Traveler\'s Clothes","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics; Survival)",' +
      '"1:Tool Proficiency (Choose 1 from any Musical)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Wanderer',
  'Sage':
    'Equipment=' +
      '"Bottle Ink",Clothes,"Letter With an Unanswered Question","Quill",' +
      '"Small Knife","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Arcana; History)",' +
      '"1:Language (Choose 2 from any)",' +
      '1:Researcher',
  'Sailor':
    'Equipment=' +
      '"Belaying Pin",Clothes,"Lucky Charm","50\' Silk Rope","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics; Perception)",' +
      '"1:Tool Proficiency (Navigator\'s Tools; Vehicles (Water))",' +
      '"1:Ship\'s Passage"',
  'Soldier':
    'Equipment=' +
      '"Battle Trophy","Clothes","Gambling Objects","Rank Insignia","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics; Intimidation)",' +
      '"1:Tool Proficiency (Vehicles (Land); Choose 1 from any Gaming)",' +
      '"1:Military Rank"',
  'Urchin':
    'Equipment=' +
      '"City Map",Clothes,"Parent\'s Token","Pet Mouse","Small Knife","10 GP" '+
    'Features=' +
      '"1:Skill Proficiency (Sleight Of Hand; Stealth)",' +
      '"1:Tool Proficiency (Disguise Kit; Thieves\' Tools)",' +
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
    '"bardHasExtraAttack ? 6:Extra Attack",' +
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
    // '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Light Domain ? 17:Corona Of Light",' +
    '"features.Nature Domain ? 1:Acolyte Of Nature",' +
    '"features.Nature Domain ? 1:Bonus Proficiency (Nature Domain)",' +
    '"features.Nature Domain ? 2:Charm Animals And Plants",' +
    '"features.Nature Domain ? 6:Dampen Elements",' +
    // SRD35 defines this '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Nature Domain ? 17:Master Of Nature",' +
    '"features.Tempest Domain ? 1:Bonus Proficiencies (Tempest Domain)",' +
    '"features.Tempest Domain ? 1:Wrath Of The Storm",' +
    '"features.Tempest Domain ? 2:Destructive Wrath",' +
    '"features.Tempest Domain ? 6:Thunderbolt Strike",' +
    // '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Tempest Domain ? 17:Stormborn",' +
    '"features.Trickery Domain ? 1:Blessing Of The Trickster",' +
    '"features.Trickery Domain ? 2:Invoke Duplicity",' +
    '"features.Trickery Domain ? 6:Cloak Of Shadows (Trickery Domain)",' +
    // '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Trickery Domain ? 17:Improved Duplicity",' +
    '"features.War Domain ? 1:Bonus Proficiencies (War Domain)",' +
    '"features.War Domain ? 1:War Priest",' +
    '"features.War Domain ? 2:Guided Strike",' +
    '"features.War Domain ? 6:War God\'s Blessing",' +
    // '"clericHasDivineStrike ? 8:Divine Strike",' +
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
for(let c in PHB5E.CLASSES_FEATURES_ADDED)
  PHB5E.CLASSES[c] =
    PHB5E.CLASSES[c].replace('Features=', 'Features=' + PHB5E.CLASSES_FEATURES_ADDED[c] + ',');
for(let c in PHB5E.CLASSES_SELECTABLES_ADDED)
  PHB5E.CLASSES[c] =
    PHB5E.CLASSES[c].replace('Selectables=', 'Selectables=' + PHB5E.CLASSES_SELECTABLES_ADDED[c] + ',');
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
  'NH-Bahamut':'Alignment="Lawful Good" Domain=Life,War',
  'NH-Blibdoolpoolp':'Alignment="Neutral Evil" Domain=Death-Toa',
  'NH-Corellon Larethian':'Alignment="Chaotic Good" Domain=Light',
  'NH-Deep Sashelas':
    'Alignment="Chaotic Good" Domain=Nature,Tempest',
  'NH-Eadro':'Alignment=Neutral Domain=Nature,Tempest',
  'NH-Garl Glittergold':'Alignment="Lawful Good" Domain=Trickery',
  'NH-Grolantor':'Alignment="Chaotic Evil" Domain=War',
  'NH-Gruumsh':'Alignment="Chaotic Evil" Domain=Tempest,War',
  'NH-Hruggek':'Alignment="Chaotic Evil" Domain=War',
  'NH-Kurtulmak':'Alignment="Lawful Evil" Domain=War',
  'NH-Laogzed':'Alignment="Chaotic Evil" Domain=Death',
  'NH-Lolth':'Alignment="Chaotic Evil" Domain=Trickery',
  'NH-Maglubiyet':'Alignment="Lawful Evil" Domain=War',
  'NH-Moradin':'Alignment="Lawful Good" Domain=Knowledge',
  'NH-Rillifane Rallathil':'Alignment="Chaotic Good" Domain=Nature',
  'NH-Sehanine Moonbow':'Alignment="Chaotic Good" Domain=Knowledge',
  'NH-Sekolah':'Alignment="Lawful Evil" Domain=Nature,Tempest',
  'NH-Semuanya':'Alignment=Neutral Domain=Life',
  'NH-Skerrit':'Alignment=Neutral Domain=Knowledge',
  'NH-Skoraeus Stonebones':'Alignment=Neutral Domain=Knowledge',
  'NH-Surtur':'Alignment="Lawful Evil" Domain=Knowledge,War',
  'NH-Thryn':'Alignment="Chaotic Evil" Domain=War',
  'NH-Tiamat':'Alignment="Lawful Evil" Domain=Trickery',
  'NH-Yondalla':'Alignment="Lawful Good" Domain=Life'
};
PHB5E.DEITIES = Object.assign({}, SRD5E.DEITIES, PHB5E.DEITIES_ADDED);
PHB5E.FEATS = Object.assign({}, SRD5E.FEATS, PHB5E.FEATS_ADDED);
PHB5E.FEATURES_ADDED = {

  // Race

  // Mountain Dwarf
  'Dwarven Armor Training':
    'Section=combat Note="Armor Proficiency (Light; Medium)"',
  'Mountain Dwarf Ability Adjustment':'Section=ability Note="+2 Strength"',
  // Wood Elf
  'Fleet Of Foot':'Section=ability Note="+5 Speed"',
  'Mask Of The Wild':'Section=skill Note="Can hide in light natural coverage"',
  'Wood Elf Ability Adjustment':'Section=ability Note="+1 Wisdom"',
  // Dark Elf
  'Dark Elf Ability Adjustment':'Section=ability Note="+1 Charisma"',
  'Drow Magic':
    'Section=magic ' +
    'Note="Knows the <i>Dancing Lights</i> cantrip%{level<3?\'\':level<5?\' and can cast <i>Faerie Fire</i> once per long rest\':\' and can cast <i>Faerie Fire</i> and <i>Darkness</i> once per long rest\'}" ' +
    'Spells="Dancing Lights","3:Faerie Fire",5:Darkness ' +
    'SpellAbility=Charisma',
  'Drow Weapon Training':
    'Section=combat ' +
    'Note="Weapon Proficiency (Hand Crossbow; Rapier; Shortsword)"',
  'Sunlight Sensitivity':
    'Section=combat,skill ' +
    'Note=' +
      '"Has disadvantage on attacks in direct sunlight",' +
      '"Has disadvantage on sight Perception in direct sunlight"',
  'Superior Darkvision':
    'Section=feature Note="R120\' Sees one light level better"',
  // Stout Halfling
  'Stout Halfling Ability Adjustment':'Section=ability Note="+1 Constitution"',
  'Stout Resilience':
    'Section=save ' +
    'Note="Has advantage vs. poison and resistance to poison damage"',
  // Forest Gnome
  'Forest Gnome Ability Adjustment':'Section=Ability Note="+1 Dexterity"',
  'Natural Illusionist':
    'Section=magic ' +
    'Note="Knows the <i>Minor Illusion</i> cantrip" ' +
    'Spells="Minor Illusion" ' +
    'SpellAbility=Intelligence',
  'Speak With Small Beasts':
    'Section=Feature Note="Can communicate simple ideas with small animals"',

  // Class

  // Barbarian
  // Totem Warrior
  'Aspect Of The Beast (Bear)':
    'Section=ability,ability ' +
    'Note=' +
      '"x2 Carry/x2 Lift",' +
      '"Has advantage on Strength to push, pull, lift, or break"',
  'Aspect Of The Beast (Eagle)':
    'Section=skill ' +
    'Note="Sees 1 mile clearly and suffers no disadvantage on Perception from dim light"',
  'Aspect Of The Beast (Wolf)':
    'Section=skill ' +
    'Note="Can track at a fast pace and Stealth at a normal pace"',
  'Spirit Seeker':
    'Section=magic ' +
    'Note="Can cast ritual <i>Beast Sense</i> and <i>Speak With Animals</i>" ' +
    'Spells="Beast Sense","Speak With Animals"',
  'Spirit Walker':
    'Section=magic ' +
    'Note="Can cast ritual <i>Commune With Nature</i>" ' +
    'Spells="Commune With Nature"',
  'Totemic Attunement (Bear)':
    'Section=combat ' +
    'Note="During rage, adjacent foes suffer disadvantage on attacks on others"',
  'Totemic Attunement (Eagle)':
    'Section=ability Note="Can fly %{speed}\' each rd during rage"',
  'Totemic Attunement (Wolf)':
    'Section=combat ' +
    'Note="During rage, can use a bonus action after a successful melee attack to knock prone a Large or smaller foe"',
  'Totem Spirit (Bear)':
    'Section=save Note="Has resistance to non-psychic damage during rage"',
  'Totem Spirit (Eagle)':
    'Section=Combat ' +
    'Note="During rage, can use a bonus action to Dash, and foes suffer disadvantage on opportunity attacks; heavy armor negates"',
  'Totem Spirit (Wolf)':
    'Section=combat ' +
    'Note="Allies gain advantage on attacks vs. foes adjacent to self during rage"',

  // Bard
  // College Of Valor
  'Battle Magic':
    'Section=Combat ' +
    'Note="Can use a bonus action to make a weapon attack after casting a spell"',
  'Bonus Proficiencies (College Of Valor)':
    'Section=combat ' +
    'Note="Armor Proficiency (Medium; Shield)/Weapon Proficiency (Martial Weapons)"',
  'Combat Inspiration':
    'Section=combat ' +
    'Note="Allies can use a Bardic Inspiration die to boost weapon damage or Armor Class"',
  // Extra Attack as above

  // Cleric
  // Knowledge Domain
  'Blessings Of Knowledge':
    'Section=skill,skill ' +
    'Note=' +
      '"Skill Proficiency (Choose 2 from Arcana, History, Nature, Religion)/Language (Choose 2 from any)",' +
      '"+%{proficiencyBonus} on chosen Blessings of Knowledge skills"',
  'Dampen Elements':
    'Section=magic ' +
    'Note="R30\' Can use a Reaction to grant resistance to immediate acid, cold, fire, lightning, or thunder damage"',
  'Knowledge Domain':
    'Spells=' +
      '"1:Command","1:Identify",' +
      '"3:Augury","3:Suggestion",' +
      '"5:Nondetection","5:Speak With Dead",' +
      '"7:Arcane Eye","7:Confusion",' +
      '"9:Legend Lore","9:Scrying"',
  'Knowledge Of The Ages':
    'Section=skill ' +
    'Note="Can use Channel Divinity to gain proficiency in a chosen skill or tool for 10 min"',
  'Potent Spellcasting':
    'Section=magic Note="+%{wisdomModifier} Cleric cantrip damage"',
  'Read Thoughts':
    'Section=magic ' +
    'Note="R60\' Can use Channel Divinity to read the target\'s thoughts (Wisdom neg and blocks additional uses until a long rest) for 1 min; success allows casting <i>Suggestion</i> on the target with no save" ' +
    'Spells=Suggestion',
  'Visions Of The Past':
    'Section=magic ' +
    'Note="Can gain visions about surroundings or a held object via 1 min meditation once per short rest"',
  // Light Domain
  'Bonus Cantrip (Light Domain)':
    'Section=magic Note="Knows the <i>Light</i> cantrip" Spells=Light',
  'Corona Of Light':
    'Section=magic ' +
    'Note="Can use an action to emit a 60\' bright light that inflicts foe disadvantage on saves vs. fire and radiant spells for 1 min"',
  'Improved Flare':
    'Section=magic ' +
    'Note="R30\' Can use Warding Flare to protect another creature"',
  'Light Domain':
    'Spells=' +
      '"1:Burning Hands","1:Faerie Fire",' +
      '"3:Flaming Sphere","3:Scorching Ray",' +
      '"5:Daylight","5:Fireball",' +
      '"7:Guardian Of Faith","7:Wall Of Fire",' +
      '"9:Flame Strike","9:Scrying"',
  // Potent Spellcasting as above
  'Radiance Of The Dawn':
    'Section=magic ' +
    'Note="R30\' Can use Channel Divinity to dispel magical darkness and to inflict 2d10+%{levels.Cleric} HP radiant (Constitution half) on foes"',
  'Warding Flare':
    'Section=magic ' +
    'Note="R30\' Can use a reaction to inflict disadvantage on a foe attack %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  // Nature Domain
  'Acolyte Of Nature':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows 1 druid cantrip",' +
      '"Skill Proficiency (Choose 1 from Animal Handling, Nature, Survival)"',
  'Bonus Proficiency (Nature Domain)':
    'Section=combat Note="Armor Proficiency (Heavy)"',
  'Charm Animals And Plants':
    'Section=magic ' +
    'Note="R30\' Can use Channel Divinity to charm beasts and plants (Wisdom neg) for 1 min"',
  // Divine Strike as SRD35
  'Master Of Nature':
    'Section=magic Note="Can command charmed animals and plants"',
  'Nature Domain':
    'Spells=' +
      '"1:Animal Friendship","1:Speak With Animals",' +
      '"3:Barkskin","3:Spike Growth",' +
      '"5:Plant Growth","5:Wind Wall",' +
      '"7:Dominate Beast","7:Grasping Vine",' +
      '"9:Insect Plague","9:Tree Stride"',
  // Tempest Domain
  'Bonus Proficiencies (Tempest Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial Weapons)"',
  'Destructive Wrath':
    'Section=magic ' +
    'Note="Can use Channel Divinity to maximize lightning or thunder damage"',
  // Divine Strike as above
  'Stormborn':'Section=ability Note="Has a %{speed}\' fly speed outdoors"',
  'Tempest Domain':
    'Spells=' +
      '"1:Fog Cloud","1:Thunderwave",' +
      '"3:Gust Of Wind","3:Shatter",' +
      '"5:Call Lightning","5:Sleet Storm",' +
      '"7:Control Water","7:Ice Storm",' +
      '"9:Destructive Wave","9:Insect Plague"',
  'Thunderbolt Strike':
    'Section=magic ' +
    'Note="Can cause lightning damage to also push away Large and smaller creatures 10\'"',
  'Wrath Of The Storm':
    'Section=combat ' +
    'Note="Can use a Reaction to inflict 2d8 HP lightning or thunder (Dexterity half) on a successful attacker %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  // Trickery Domain
  'Blessing Of The Trickster':
    'Section=magic ' +
    'Note="Touch gives advantage on Stealth for 1 hr or until given to another target"',
  'Cloak Of Shadows (Trickery Domain)':
    'Section=magic ' +
    'Note="Can use Channel Divinity to make self invisible until the end of the next turn; attacking or casting ends"',
  // Divine Strike as above
  'Improved Duplicity':
    'Section=magic Note="Invoke Duplicity creates 4 duplicates"',
  'Invoke Duplicity':
    'Section=magic ' +
    'Note="R30\' Can use Channel Divinity to create %{magicNotes.improvedDuplicity?\'4 illusionary duplicates\':\'1 illusionary duplicate\'}, moving %{magicNotes.improvedDuplicity?\'each\':\'it\'} up to 30\' each rd to a maximum of 120\' away, gaining advantage on attacks when self and duplicate are each within 5\' of the target, and allowing remote spellcasting for conc up to 1 min"',
  'Trickery Domain':
    'Spells=' +
      '"1:Charm Person","1:Disguise Self",' +
      '"3:Mirror Image","3:Pass Without Trace",' +
      '"5:Blink","5:Dispel Magic",' +
      '"7:Dimension Door","7:Polymorph",' +
      '"9:Dominate Person","9:Modify Memory"',
  // War Domain
  'Avatar Of Battle':
    'Section=save ' +
    'Note="Has resistance to nonmagical bludgeoning, piercing, and slashing damage"',
  'Bonus Proficiencies (War Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial Weapons)"',
  // Divine Strike as above
  'Guided Strike':
    'Section=combat Note="Can use Channel Divinity to give self +10 attack"',
  'War Domain':
    'Spells=' +
      '"1:Divine Favor","1:Shield Of Faith",' +
      '"3:Magic Weapon","3:Spiritual Weapon",' +
      '"5:Crusader\'s Mantle","5:Spirit Guardians",' +
      '"7:Freedom Of Movement","7:Stoneskin",' +
      '"9:Flame Strike","9:Hold Monster"',
  "War God's Blessing":
    'Section=magic ' +
    'Note="R30\' Can use a Reaction and Channel Divinity to give an ally +10 attack"',
  'War Priest':
    'Section=combat ' +
    'Note="Can use a bonus attack to make an extra weapon attack %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',

  // Druid
  // Circle Of The Land
  'Circle Of The Land (Underdark)':
    'Spells=' +
      '"3:Spider Climb","3:Web",' +
      '"5:Gaseous Form","5:Stinking Cloud",' +
      '"7:Greater Invisibility","7:Stone Shape",' +
      '"9:Cloudkill","9:Insect Plague"',
  // Circle Of The Moon
  'Circle Forms':'Section=magic Note="Can Wild Shape into a CR %V creature"',
  'Combat Wild Shape':
    'Section=combat,magic ' +
    'Note=' +
      '"Can use Wild Shape as a bonus action",' +
      '"While using Wild Shape, can spend a spell slot and use a bonus action to regain 1d8 hit points per slot level"',
  'Elemental Wild Shape':
    'Section=magic Note="Can expend 2 Wild Shape uses to become an elemental"',
  'Primal Strike':
    'Section=combat Note="Attacks while using Wild Shape count as magical"',
  'Thousand Forms':
    'Section=magic ' +
    'Note="Can cast <i>Alter Self</i> at will" ' +
    'Spells="Alter Self"',

  // Fighter
  // Battle Master
  'Combat Superiority':
    'Section=combat ' +
    'Note="Can use a d%1 Superiority Die to perform one of %2 chosen Maneuvers %V times per short rest"',
  "Commander's Strike":
    'Section=combat ' +
    'Note="Can use a Superiority Die and forego an attack to gain a bonus action directing an ally to attack; the ally uses a Reaction to attack and adds the Superiority Die to its damage"',
  'Disarming Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and cause the target to drop an item (DC %{maneuverSaveDC} Strength neg)"',
  'Distracting Strike':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and give advantage to the next ally attack against the same foe in the same rd"',
  'Evasive Footwork':
    'Section=combat ' +
    'Note="Can add a Superiority Die to Armor Class during a move"',
  'Feinting Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and use a bonus action to gain advantage on the attack"',
  'Goading Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and inflict disadvantage on foe attacks on others (DC %{maneuverSaveDC} Wisdom neg) until the end of the next turn"',
  'Improved Combat Superiority':
    'Section=combat Note="Superiority Dice increase to d%V"',
  'Know Your Enemy':
    'Section=combat Note="Knows how foe compares to self after 1 min study"',
  'Lunging Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and gain +5\' melee range"',
  'Maneuvering Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and allow an ally to use a Reaction to move half speed with no opportunity attack from the target"',
  'Menacing Attack':
    'Section=combat ' +
    'Note="Can add a Superiority Die to damage and inflict frightened (DC %{maneuverSaveDC} Wisdom neg) until the end of the next turn"',
  'Parry':
    'Section=combat ' +
    'Note="Can use a Reaction to subtract a Superiority Die + %{dexterityModifier} from a foe\'s melee damage to self"',
  'Precision Attack':
    'Section=combat Note="Can add a Superiority Die to an attack"',
  'Pushing Attack':
    'Section=combat ' +
    'Note="Can add Superiority Die to damage and push the Large or smaller target 15\' (DC %{maneuverSaveDC} Strength neg)"',
  'Rally':
    'Section=combat ' +
    'Note="Gives the target a Superiority Die + %{charismaModifier} temporary hit points"',
  'Riposte':
    'Section=combat ' +
    'Note="After a foe melee miss, can spend a Superiority Die and use a Reaction to attack and add the Superiority Die to damage"',
  'Relentless':
    'Section=combat ' +
    'Note="Has a minimum of 1 Superiority Die available after initiative"',
  'Student Of War':
    'Section=feature Note="Tool Proficiency (Choose 1 from any Artisan)"',
  'Sweeping Attack':
    'Section=combat ' +
    'Note="After a successful melee attack, can inflict a Superiority Die HP on a second adjacent foe"',
  'Trip Attack':
    'Section=combat ' +
    'Note="After a successful attack, can knock the Large or smaller target prone (DC %V Strength neg) and add a Superiority Die to damage"',
  // Eldritch Knight
  'Arcane Charge':'Section=magic Note="Can teleport 30\' during Action Surge"',
  'Eldritch Strike':
    'Section=combat ' +
    'Note="Successful attack inflicts disadvantage on the first save vs. a self spell before the end of the next turn"',
  'Improved War Magic':'Section=combat Note="Has increased War Magic effects"',
  // Spellcasting as above
  'War Magic':
    'Section=combat ' +
    'Note="Can use a bonus action to make a weapon attack after casting %{combatNotes.improvedWarMagic?\'any spell\':\'a cantrip\'}"',
  'Weapon Bond':
    'Section=combat ' +
    'Note="Cannot be disarmed from a bonded weapon and can use a bonus action to summon one"',

  // Monk
  // Way Of Shadow
  'Cloak Of Shadows (Way Of Shadow)':
    'Section=Magic ' +
    'Note="Can use an action to become invisible in dim and dark areas; attacking or casting ends"',
  'Opportunist':
    'Section=combat ' +
    'Note="Can use a reaction to attack an adjacent foe damaged by another creature"',
  'Shadow Arts':
    'Section=magic ' +
    'Note="Knows the <i>Minor Illusion</i> cantrip and can spend 2 Ki Points to cast <i>Darkness</i>, <i>Darkvision</i>, <i>Pass Without Trace</i>, or <i>Silence</i>" ' +
    'Spells="Minor Illusion",Darkness,Darkvision,"Pass Without Trace",Silence',
  'Shadow Step':
    'Section=magic ' +
    'Note="Can use a bonus action to teleport 60\' between dim or dark areas and gain advantage on the first melee attack during that turn"',
  // Way Of The Four Elements
  'Breath Of Winter':
    'Section=magic ' +
    'Note="Can spend 6 Ki Points to cast <i>Cone Of Cold</i>" ' +
    'Spells="Cone Of Cold"',
  'Clench Of The North Wind':
    'Section=magic ' +
    'Note="Can spend 3 Ki Points to cast <i>Hold Person</i>" ' +
    'Spells="Hold Person"',
  'Disciple Of The Elements':
    'Section=magic Note="Can select %V elemental disciplines"',
  'Elemental Attunement':
    'Section=magic ' +
    'Note="Can create a harmless instantaneous elemental effect, light or snuff a small flame, chill or warm a 1 lb object for 1 hr, or shape a 1\' cube of earth, fire, water, or mist for 1 min"',
  'Eternal Mountain Defense':
    'Section=magic ' +
    'Note="Can spend 5 Ki Points to cast <i>Stoneskin</i> on self" ' +
    'Spells=Stoneskin',
  'Fangs Of The Fire Snake':
    'Section=magic ' +
    'Note="Can spend 1 Ki Point to make a +10\' unarmed attack, inflicting fire damage, and 1 additional Ki Point to inflict +1d10 HP fire"',
  'Fist Of Four Thunders':
    'Section=magic ' +
    'Note="Can spend 2 Ki Points to cast <i>Thunderwave</i>" ' +
    'Spells=Thunderwave',
  'Fist Of Unbroken Air':
    'Section=magic ' +
    'Note="R30\' Can spend 2+ Ki Points to inflict 3d10+ HP, push 20\', and knock prone (DC %{kiSaveDC} Strength half HP only)"',
  'Flames Of The Phoenix':
    'Section=magic ' +
    'Note="Can spend 4 Ki Points to cast <i>Fireball</i>" ' +
    'Spells=Fireball',
  'Gong Of The Summit':
    'Section=magic ' +
    'Note="Can spend 3 Ki Points to cast <i>Shatter</i>" ' +
    'Spells=Shatter',
  'Mist Stance':
    'Section=magic ' +
    'Note="Can spend 4 Ki Points to cast <i>Gaseous Form</i> on self" ' +
    'Spells="Gaseous Form"',
  'Ride The Wind':
    'Section=magic ' +
    'Note="Can spend 4 Ki Points to cast <i>Fly</i> on self" ' +
    'Spells=Fly',
  'River Of Hungry Flame':
    'Section=magic ' +
    'Note="Can spend 5 Ki Points to cast <i>Wall Of Fire</i>" ' +
    'Spells="Wall Of Fire"',
  'Rush Of The Gale Spirits':
    'Section=magic ' +
    'Note="Can spend 2 Ki Points to cast <i>Gust Of Wind</i>" ' +
    'Spells="Gust Of Wind"',
  'Shape The Flowing River':
    'Section=magic ' +
    'Note="R120\' Can spend 1 Ki Point to freeze, thaw, and shape a 30\' cube of water"',
  'Sweeping Cinder Strike':
    'Section=magic ' +
    'Note="Can spend 2 Ki Points to cast <i>Burning Hands</i>" ' +
    'Spells="Burning Hands"',
  'Water Whip':
    'Section=magic ' +
    'Note="R30\' Can spend 2+ Ki Points to inflict 3d10+ HP bludgeoning and pull 25\' or knock prone (DC %{kiSaveDC} Strength half HP only)"',
  'Wave Of Rolling Earth':
    'Section=magic ' +
    'Note="Can spend 6 Ki Points to cast <i>Wall Of Stone</i>" ' +
    'Spells="Wall Of Stone"',

  // Backgrounds
  'By Popular Demand':
    'Section=Feature ' +
    'Note="May receive welcome and lodging in exchange for performing"',
  'City Secrets':
    'Section=Feature Note="May travel through a city at dbl speed"',
  'Criminal Contact':
    'Section=Feature ' +
    'Note="Knows how to contact a liaison to criminal networks"',
  'Discovery':'Section=Feature Note="Knows a unique and powerful truth"',
  'False Identity':
    'Section=Feature ' +
    'Note="Has a documented second identity and forgery skills"',
  'Guild Membership':
    'Section=Feature Note="May receive assistance from fellow guild members/Must pay 5 gp monthly guild fee"',
  'Military Rank':
    'Section=Feature ' +
    'Note="Receives respect, deference, and lend of resources from fellow soldiers"',
  'Position Of Privilege':
    'Section=Feature ' +
    'Note="Receives welcome from the upper class and deference from commoners"',
  'Researcher':'Section=Feature Note="Knows where and whom to ask about lore"',
  'Rustic Hospitality':
    'Section=Feature Note="May receive shelter from common folk"',
  "Ship's Passage":
    'Section=Feature ' +
    'Note="May receive water passage for self and companions in exchange for labor"',
  'Wanderer':
    'Section=Feature ' +
    'Note="Has an excellent geographic memory and can forage for 6 people"',

  // Paths
  "Nature's Wrath":
    'Section=Magic ' +
    'Note="R10\' May use Channel Divinity to create spectral vines that restrain target (DC %{spellDifficultyClass.P} Dexterity or Strength neg)"',
  "Ranger's Companion":
    'Section=Feature ' +
    'Note="Companion beast up to CR 1/4 gains +%{proficiencyBonus} Armor Class, attack, damage, skills, and saving throws and obeys self commands"',
  "Transmuter's Stone":
    'Section=Magic ' +
    'Note="Stone gives choice of 60\' darkvision, +10\' Speed, proficiency on Constitution saves, or resistance to chosen energy damage; may change effect when casting a transmutation spell"',
  'Abjuration Savant':
    'Section=Magic ' +
    'Note="May copy abjuration spells into spellbook for half cost"',
  'Abjure Enemy':
    'Section=Magic ' +
    'Note="R60\' May use Channel Divinity to halt target (DC %{spellDifficultyClass.P} Wisdom half speed) for 1 min"',
  'Alter Memories':
    'Section=Magic ' +
    'Note="Chosen target becomes unaware of self charm; may also inflict forgetfulness of the preceding %{charismaModifier+1>?1} hrs (DC %{spellDifficultyClass.W} Intelligence neg)"',
  'Arcane Ward':
    'Section=Magic ' +
    'Note="Abjuration casting creates a ward around self that can absorb %{levels.Wizard*2+intelligenceModifier} HP (long rest ends); if taken to 0 HP, abjuration casting restores 2x spell level HP to ward"',
  'Assassin Bonus Proficiencies':
    'Section=Feature Note="Tool Proficiency (Disguise Kit/Poisoner\'s Kit)"',
  'Assassinate':
    'Section=Combat ' +
    'Note="Adv on attack before foe\'s first turn/Successful surprise attack automatically crits"',
  'Aura Of Warding':
    'Section=Save ' +
    'Note="R%{levels.Paladin<18?10:30}\' Self and allies have resistance to spell damage"',
  'Avenging Angel':
    'Section=Ability,Combat ' +
    'Note=' +
      '"60\' fly speed for 1 hr/long rest",' +
      '"R30\' Aura frightens foes (DC %{spellDifficultyClass.P} Wisdom neg; damage ends), giving Adv on ally attacks, for 1 hr/long rest"',
  'Awakened Mind':'Section=Feature Note="R30\' May communicate telepathically"',
  'Beguiling Defenses':
    'Section=Save ' +
    'Note="Immune to charm; may reflect onto caster (DC %{spellDifficultyClass.K} Wisdom neg) for 1 min (damage ends)"',
  'Bend Luck':
    'Section=Magic ' +
    'Note="May spend 2 Sorcery Points to add or subtract 1d4 from a target attack, ability, or save"',
  'Benign Transposition':
    'Section=Magic ' +
    'Note="R30\' May teleport self or swap w/a willing creature 1/long rest or conjuration spell casting"',
  'Bestial Fury':'Section=Feature Note="Companion may make 2 attacks/rd"',
  'Command Undead':
    'Section=Magic ' +
    'Note="R60\' May control undead target (DC %{spellDifficultyClass.W} Charisma neg; Adv if target Intelligence is 8 or higher)"',
  'Conjuration Savant':
    'Section=Magic ' +
    'Note="May copy conjuration spells into spellbook for half cost"',
  'Controlled Chaos':
    'Section=Magic Note="May choose from 2 Wild Magic Surge effects"',
  'Create Thrall':
    'Section=Magic ' +
    'Note="Touch charms incapacitated humanoid and allows telepathic communication"',
  'Dark Delirium':
    'Section=Magic ' +
    'Note="R60\' Target charmed or frightened and unaware of surroundings (DC %{spellDifficultyClass.K} Wisdom neg) for conc up to 1 min 1/short rest"',
  'Death Strike':
    'Section=Combat ' +
    'Note="Inflicts dbl damage on a successful surprise attack (DC %{8+dexterityModifier+proficiencyBonus} Constitution neg)"',
  'Divination Savant':
    'Section=Magic ' +
    'Note="May copy divination spells into spellbook for half cost"',
  'Durable Summons':
    'Section=Magic Note="Summoned creatures gain 30 temporary HP"',
  'Elder Champion':
    'Section=Magic ' +
    'Note="May regain 10 HP/rd, cast paladin spells as a bonus action, and inflict Disadv on saves vs. self spells on foes w/in 10\' for 1 min 1/long rest"',
  'Enchantment Savant':
    'Section=Magic ' +
    'Note="May copy enchantment spells into spellbook for half cost"',
  'Entropic Ward':
    'Section=Combat ' +
    'Note="May use Reaction to inflict Disadv on attack by foe; miss gives self Adv on next attack for 1 rd 1/short rest"',
  'Exceptional Training':
    'Section=Feature ' +
    'Note="May use a bonus action to command companion to Dash, Disengage, or Help instead of Attack/Companion attacks count as magical"',
  'Expert Divination':
    'Section=Magic ' +
    'Note="Casting a divination spell restores a lower expended slot (level 5 maximum)"',
  'Fey Presence':
    'Section=Magic ' +
    'Note="R10\' May inflict choice of charmed or frightened (DC %{spellDifficultyClass.K} Wisdom neg) for 1 rd 1/short rest"',
  'Focused Conjuration':
    'Section=Magic Note="Damage cannot break conjuration concentration"',
  'Greater Portent':'Section=Magic Note="May use Portent 3/long rest"',
  'Grim Harvest':
    'Section=Magic ' +
    'Note="Regains 2x spell level HP (3x for necromantic spells) when self spell kills"',
  'Hypnotic Gaze':
    'Section=Magic ' +
    'Note="May daze adjacent target (DC %{spellDifficultyClass.W} Wisdom neg) 1/long rest"',
  'Illusion Savant':
    'Section=Magic ' +
    'Note="May copy illusion spells into spellbook for half cost"',
  'Illusory Reality':
    'Section=Magic ' +
    'Note="May use a bonus action to make an object in self illusion real for 1 min"',
  'Illusory Self':
    'Section=Magic Note="May use Reaction to cause a foe miss 1/short rest"',
  'Impostor':'Section=Feature Note="May use unerring mimicry w/Adv on Deception to overcome suspicion"',
  'Improved Abjuration':
    'Section=Magic ' +
    'Note="+%{proficiencyBonus} abjuration spell ability checks"',
  'Improved Minor Illusion':
    'Section=Magic ' +
    'Note="Knows <i>Minor Illusion</i> cantrip; effects include both a sound and an image" ' +
    'Spells="Minor Illusion"',
  'Infiltration Expertise':
    'Section=Feature ' +
    'Note="May use 1-week process to create and adopt a different identity"',
  'Instinctive Charm':
    'Section=Magic ' +
    'Note="R30\' May redirect an attack on self to another (DC %{spellDifficultyClass.W} Wisdom neg until a long rest)"',
  'Inured To Undeath':
    'Section=Save ' +
    'Note="Has resistance to necrotic damage and immunity to maximum HP reduction"',
  'Mage Hand Legerdemain':
    'Section=Magic ' +
    'Note="May stow and retrieve objects, pick locks, and disarm traps using an invisible <i>Mage Hand</i>" ' +
    'Spells="Mage Hand"',
  'Magical Ambush':
    'Section=Magic ' +
    'Note="Foe suffers Disadv on save vs. self spell cast from hiding"',
  'Malleable Illusions':
    'Section=Magic Note="May modify self illusions throughout duration"',
  'Master Transmuter':
    'Section=Magic ' +
    'Note="May destroy a transmuter\'s stone to transmute a 5\' cube, remove curses, diseases, and poisons, cast <i>Raise Dead</i>, or restore youth" ' +
    'Spells="Raise Dead"',
  'Minor Alchemy':
    'Section=Magic ' +
    'Note="May change substance of a 1\' cube per 10 min effort for conc up to 1 hr"',
  'Minor Conjuration':
    'Section=Magic Note="R10\' May create a 3\' cube, 10 lb object for 1 hr"',
  'Misty Escape':
    'Section=Magic ' +
    'Note="After taking damage, may use Reaction to teleport 60\' and become invisible for 1 rd (attacking or casting ends) 1/short rest"',
  'Necromancy Savant':
    'Section=Magic ' +
    'Note="May copy necromancy spells into spellbook for half cost"',
  'Portent':
    'Section=Magic ' +
    'Note="May replace self or target attack, ability, or saving throw %{magicNotes.greaterPortent?3:2}/long rest"',
  'Projected Ward':
    'Section=Magic Note="R30\' May use Arcane Ward to absorb damage to others"',
  'Relentless Avenger':
    'Section=Combat Note="May move %{speed//2}\' after a successful OA"',
  'Shapechanger':
    'Section=Magic ' +
    'Note="Knows <i>Polymorph</i>; may transform self into a CR 1 creature 1/short rest" ' +
    'Spells=Polymorph',
  'Share Spells':
    'Section=Magic Note="R30\' May have self spell also affect companion"',
  'Soul Of Vengeance':
    'Section=Combat ' +
    'Note="May use Reaction when Vow Of Enmity target attacks to attempt a melee attack"',
  'Spell Bombardment':
    'Section=Magic ' +
    'Note="May add another die after rolling the maximum on a spell damage die 1/rd"',
  'Spell Resistance':
    'Section=Save ' +
    'Note="Adv on saves vs. spells/Has resistance to spell damage"',
  'Spell Thief':
    'Section=Magic ' +
    'Note="May negate foe spell on self and cast same w/in 8 hours (DC %{8+intelligenceModifier+proficiencyBonus} neg) 1/long rest"',
  'Split Enchantment':
    'Section=Magic Note="May add a second target to an enchantment spell"',
  'The Third Eye':
    'Section=Magic ' +
    'Note="May use an action to gain 60\' darkvision, 60\' ethereal sight, the ability to read any language, or 10\' invisibility sight until next rest, 1 each/short rest"',
  'Thought Shield':
    'Section=Save ' +
    'Note="Immune to telepathy/Has resistance to psychic damage, and psychic damage also affects attacker"',
  'Tides Of Chaos':
    'Section=Feature ' +
    'Note="May gain Adv on an attack, ability, or saving throw 1/long rest or Wild Magic Surge"',
  'Transmutation Savant':
    'Section=Magic ' +
    'Note="May copy transmutation spells into spellbook for half cost"',
  'Turn The Faithless':
    'Section=Magic ' +
    'Note="R30\' May use Channel Divinity to make fiends and fey flee (DC %{spellDifficultyClass.P} Wisdom neg) for 1 min"',
  'Undead Thralls':
    'Section=Magic ' +
    'Note="Knows <i>Animate Dead</i>; casting animates an additional corpse and gives corpses +%{levels.Wizard} HP and +%{proficiencyBonus} damage" ' +
    'Spells="Animate Dead"',
  'Undying Sentinel':
    'Section=Combat,Feature,Save ' +
    'Note=' +
      '"May retain 1 HP when brought to 0 HP 1/long rest",' +
      '"Suffers no debility from aging",' +
      '"Immune to magical aging"',
  'Versatile Trickster':
    'Section=Magic ' +
    'Note="May use a bonus action to direct <i>Mage Hand</i> to distract a foe w/in 5\', gaining Adv on attacks</i>"',
  'Vow Of Enmity':
    'Section=Combat ' +
    'Note="R10\' May use Channel Divinity and a bonus action to give self Adv on attacks against target for 1 min"',
  'Wild Magic Surge':
    'Section=Magic ' +
    'Note="Spellcasting carries a 5% chance of unleashing a random magic effect"',

  // Feats
  'Actor':
    'Section=Ability,Skill ' +
    'Note=' +
      '"+1 Charisma",' +
      '"Adv on Deception and Performance (impersonation)/May mimic others\' speech or sounds"',
  'Alert':
    'Section=Combat,Combat ' +
    'Note=' +
      '"+5 Initiative",' +
      '"Cannot be surprised/Unseen foes gain no Adv on attacks on self"',
  'Athlete':
    'Section=Ability,Ability ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Standing, running long jump, and running high jump each use only 5\' move/May climb at full speed"',
  'Charger':
    'Section=Combat ' +
    'Note="After a 10\' Dash, may use a bonus action to attack (+5 damage) or to push 10\'"',
  'Crossbow Expert':
    'Section=Combat ' +
    'Note="May make multiple attacks w/a proficient crossbow/Suffers no Disadv on a close shot/May use a bonus action to make a hand crossbow attack after a one-handed attack"',
  'Defensive Duelist':
    'Section=Combat ' +
    'Note="May use Reaction to gain +%{proficiencyBonus} Armor Class when wielding a proficient finesse weapon"',
  'Dual Wielder':
    'Section=Combat ' +
    'Note="+1 Armor Class w/two weapons/May use two-weapon fighting w/any one-handed weapons/May draw or stow two weapons at once"',
  'Dungeon Delver':
    'Section=Save,Skill ' +
    'Note=' +
      '"Adv on trap avoidance and resistance/Has resistance to trap damage",' +
      '"Adv on Perception and Investigation (secret door detection)/May search for traps at full speed"',
  'Durable':
    'Section=Ability,Combat ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Regains a minimum of %{constitutionModifier*2>?2} HP from a Hit Die roll"',
  'Elemental Adept (Acid)':
    'Section=Magic ' +
    'Note="Acid spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Cold)':
    'Section=Magic ' +
    'Note="Cold spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Fire)':
    'Section=Magic ' +
    'Note="Fire spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Lightning)':
    'Section=Magic ' +
    'Note="Lightning spells ignore resistance and treat 1s as 2s on damage dice"',
  'Elemental Adept (Thunder)':
    'Section=Magic ' +
    'Note="Thunder spells ignore resistance and treat 1s as 2s on damage dice"',
  'Great Weapon Master':
    'Section=Combat ' +
    'Note="May use a bonus action to attack after crit or reducing foe to 0 HP/May suffer -5 attack w/a heavy weapon to gain +10 damage"',
  'Healer':
    'Section=Feature ' +
    'Note="Using a healer\'s kit to stabilize also restores 1 HP/May use a healer\'s kit to restore 1d6+4 + target HD HP 1/short rest"',
  'Heavily Armored':
    'Section=Ability,Combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"Armor Proficiency (Heavy)"',
  'Heavy Armor Master':
    'Section=Ability,Combat ' +
    'Note=' +
      '"+1 Strength",' +
      '"In heavy armor, suffers -3 HP damage from nonmagical bludgeoning, piercing, and slashing weapons"',
  'Inspiring Leader':
    'Section=Feature Note="R30\' 10-min speech gives 6 allies %{level+charismaModifier} temporary HP 1/short rest/ally"',
  'Keen Mind':
    'Section=Ability,Feature ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"Always knows direction of north and hours until sunrise or sunset/Can recall anything seen or heard during the past month"',
  'Lightly Armored':
    'Section=Ability,Combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Light)"',
  'Linguist':
    'Section=Ability,Feature,Skill ' +
    'Note=' +
      '"+1 Intelligence",' +
      '"May create ciphers (DC %{intelligence+proficiencyBonus} Intelligence decodes)",' +
      '"Language (Choose 3 from any)"',
  'Lucky':
    'Section=Feature ' +
    'Note="May gain Adv on an attack, ability, or saving throw or inflict foe Disadv on self attack 3/long rest"',
  'Mage Slayer':
    'Section=Combat,Save ' +
    'Note=' +
      '"May use Reaction to attack an adjacent caster/Foe suffers Disadv on concentration to maintain a spell",' +
      '"Adv on saves vs. spells cast by adjacent foes"',
  'Magic Initiate (Bard)':
    'Section=Magic ' +
    'Note="Knows 2 B0 spells/May cast chosen B1 spell 1/long rest"',
  'Magic Initiate (Cleric)':
    'Section=Magic ' +
    'Note="Knows 2 C0 spells/May cast chosen C1 spell 1/long rest"',
  'Magic Initiate (Druid)':
    'Section=Magic ' +
    'Note="Knows 2 D0 spells/May cast chosen D1 spell 1/long rest"',
  'Magic Initiate (Sorcerer)':
    'Section=Magic ' +
    'Note="Knows 2 S0 spells/May cast chosen S1 spell 1/long rest"',
  'Magic Initiate (Warlock)':
    'Section=Magic ' +
    'Note="Knows 2 K0 spells/May cast chosen K1 spell 1/long rest"',
  'Magic Initiate (Wizard)':
    'Section=Magic ' +
    'Note="Knows 2 W0 spells/May cast chosen W1 spell 1/long rest"',
  'Martial Adept':
    'Section=Combat Note="Has Combat Superiority feature (2 maneuvers, 1 die)"',
  'Medium Armor Master':
    'Section=Combat,Skill ' +
    'Note=' +
      '"+1 Armor Class in medium armor if Dexterity is at least 16",' +
      '"Suffers no Stealth check penalty in medium armor"',
  'Mobile':
    'Section=Ability,Combat ' +
    'Note=' +
      '"+10 Speed",' +
      '"May Dash at full speed in difficult terrain/Suffers no OA from targeted foe"',
  'Moderately Armored':
    'Section=Ability,Combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Armor Proficiency (Medium/Shield)"',
  'Mounted Combatant':
    'Section=Combat ' +
    'Note="Adv on melee attacks on an unmounted foe smaller than mount/May redirect attack on mount to self/Mount suffers no damage on a successful Dexterity save and half on failure"',
  'Oath Of The Ancients':
    'Spells=' +
      '"3:Ensnaring Strike","3:Speak With Animals",' +
      '5:Moonbeam,"5:Misty Step",' +
      '"9:Plant Growth","9:Protection From Energy",' +
      '"13:Ice Storm",13:Stoneskin,' +
      '"17:Commune With Nature","17:Tree Stride"',
  'Oath Of Vengeance':
    'Spells=' +
      '3:Bane,"3:Hunter\'s Mark",' +
      '"5:Hold Person","5:Misty Step",' +
      '9:Haste,"9:Protection From Energy",' +
      '13:Banishment,"13:Dimension Door",' +
      '"17:Hold Monster",17:Scrying',
  'Observant':
    'Section=Ability,Feature,Skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Intelligence, Wisdom)",' +
      '"May read lips",' +
      '"+5 passive Investigation and Perception"',
  'Polearm Master':
    'Section=Combat ' +
    'Note="May use a bonus action to attack w/polearm butt (inflicts 1d4 HP bludgeoning)/Foe entering polearm reach provokes an OA"',
  'Resilient':
    'Section=Ability,Save ' +
    'Note=' +
      '"Ability Boost (Choose 1 from any)",' +
      '"Save Proficiency (Choose 1 from any)"',
  'Ritual Caster':
    'Section=Magic ' +
    'Note="May cast spells of up to level %{(level+1)//2} from a ritual book"',
  'Savage Attacker':
    'Section=Combat Note="May take the best of two melee damage rolls 1/rd"',
  'Sentinel':
    'Section=Combat ' +
    'Note="Successful OA halts target/May take an OA when an adjacent foe uses Disengage/May use Reaction to attack when an adjacent foe targets another"',
  'Sharpshooter':
    'Section=Combat ' +
    'Note="Suffers no Disadv on attacks at long range/Range attacks ignore 3/4 cover/May suffer -5 attack w/a ranged weapon to gain +10 damage"',
  'Shield Master':
    'Section=Combat,Save ' +
    'Note=' +
      '"May use a bonus action to shove foe after an attack",' +
      '"+2 Dexterity vs. targeted spell or effect/May use Reaction to suffer no damage instead of half on a successful Dexterity save"',
  'Skilled':'Section=Skill Note="Skill Proficiency (Choose 3 from any)"',
  'Skulker':
    'Section=Skill ' +
    'Note="May hide when lightly obscured/Ranged miss does not reveal position/Suffers no Disadv on Perception from dim light"',
  'Spell Sniper':
    'Section=Magic ' +
    'Note="Dbl attack spell range/Spells ignore 3/4 cover/Knows an additional attack cantrip"',
  'Tavern Brawler':
    'Section=Ability,Combat,Combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Strength)",' +
      '"Weapon Proficiency (Improvised)/Unarmed attacks inflict 1d4 HP",' +
      '"May use a bonus action to grapple after a successful unarmed or improvised attack"',
  'Tough':'Section=Combat Note="+%{level*2} Hit Points"',
  'War Caster':
    'Section=Magic ' +
    'Note="Adv on concentration to maintain a spell/May cast when holding a shield and/or weapon/May use Reaction to cast as an OA"',
  'Weapon Master':
    'Section=Ability,Combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Weapon Proficiency (Choose 4 from any)"'

};
PHB5E.FEATURES = Object.assign({}, SRD5E.FEATURES, PHB5E.FEATURES_ADDED);
PHB5E.GOODIES = Object.assign({}, SRD5E.GOODIES);
PHB5E.LANGUAGES = Object.assign({}, SRD5E.LANGUAGES);
PHB5E.PATHS = {};
PHB5E.RACES_ADDED = {
  'Mountain Dwarf':
    SRD5E.RACES['Hill Dwarf']
    .replace('Hill Dwarf Ability Adjustment', 'Mountain Dwarf Ability Adjustment')
    .replace('Dwarven Toughness', 'Dwarven Armor Training'),
  'Wood Elf':
    SRD5E.RACES['High Elf']
    .replace('High Elf Ability Adjustment', 'Wood Elf Ability Adjustment')
    .replace('Cantrip (High Elf)', 'Fleet Of Foot')
    .replace('Extra Language', 'Mask Of The Wild'),
  'Dark Elf':
    SRD5E.RACES['High Elf']
    .replace('High Elf Ability Adjustment', 'Dark Elf Ability Adjustment')
    .replace('Darkvision', 'Superior Darkvision')
    .replace('Elf Weapon Training', 'Drow Weapon Training')
    .replace('Cantrip (High Elf)', 'Drow Magic')
    .replace('Extra Language', 'Sunlight Sensitivity'),
  'Stout Halfling':
    SRD5E.RACES['Lightfoot Halfling']
    .replace('Lightfoot Halfling Ability Adjustment', 'Stout Halfling Ability Adjustment')
    .replace('Naturally Stealthy', 'Stout Resilience'),
  'Forest Gnome':
    SRD5E.RACES['Rock Gnome']
    .replace('Rock Gnome Ability Adjustment', 'Forest Gnome Ability Adjustment')
    .replace("Artificer's Lore", 'Natural Illusionist')
    .replace('Tinker', 'Speak With Small Beasts')
};
PHB5E.RACES = Object.assign({}, SRD5E.RACES, PHB5E.RACES_ADDED);
PHB5E.SCHOOLS = Object.assign({}, SRD5E.SCHOOLS);
PHB5E.SHIELDS = Object.assign({}, SRD5E.SHIELDS);
PHB5E.SKILLS = Object.assign({}, SRD5E.SKILLS);
PHB5E.SPELLS_ADDED = {

  'Arcane Gate':
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description=' +
      '"R10\' Creates a portal pair that can teleport creatures 500\' for conc up to 10 min"',
  'Armor Of Agathys':
    'School=Abjuration ' +
    'Level=K1 ' +
    'AtHigherLevels="gives +5 temporary HP and inflicts +5 HP" ' +
    'Description=' +
      '"Self gains 5 temporary HP, and a successful attacker suffers 5 HP cold, for 1 hr"',
  'Arms Of Hadar':
    'School=Conjuration ' +
    'Level=K1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"10\' radius inflicts 2d6 HP necrotic and no Reaction for 1 rd (Strength half HP only)"',
  'Aura Of Life':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description=' +
      '"30\' radius gives nonhostile creatures resistance to necrotic damage and immunity to maximum HP reduction and raises those w/0 HP to 1 HP for conc up to 10 min"',
  'Aura Of Purity':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description=' +
      '"30\' radius gives nonhostile creatures resistance to poison damage, immunity to disease, and Adv on saves vs. conditions for conc up to 10 min"',
  'Aura Of Vitality':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="R30\' Self may use a bonus action to restore 2d6 HP to target 1/rd for conc up to 1 min"',

  'Banishing Smite':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description=' +
      '"Next successful self weapon attack inflicts +5d10 HP force, plus banishment to home plane or a demiplane for conc up to 1 min if foe is reduced to 50 HP"',
  'Beast Sense':
    'School=Divination ' +
    'Level=D2,R2 ' +
    'Ritual=true ' +
    'Description=' +
      '"Self may perceive through touched willing beast\'s senses for conc up to 1 hr"',
  'Blade Ward':
    'School=Abjuration ' +
    'Level=B0,K0,S0,W0 ' +
    'Description=' +
      '"Self gains resistance to bludgeoning, piercing, and slashing weapon damage for 1 rd"',
  'Blinding Smite':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description=' +
      '"Next successful self weapon attack inflicts +3d8 HP radiant and blinds (Constitution ends) for conc up to 1 min"',

  'Chromatic Orb':
    'School=Evocation ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R90\' Ranged spell inflicts 3d8 HP choice of acid, cold, fire, lightning, poison, or thunder"',
  'Circle Of Power':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description=' +
      '"Allies in a 30\' radius gain Adv on saves vs. magic, and saves yields no damage instead of half, for conc up to 10 min"',
  'Cloud Of Daggers':
    'School=Conjuration ' +
    'Level=B2,K2,S2,W2 ' +
    'AtHigherLevels="inflicts +2d4 HP" ' +
    'Description="R60\' 5\' cube inflicts 4d4 HP slashing for conc up to 1 min"',
  'Compelled Duel':
    'School=Enchantment ' +
    'Level=P1 ' +
    'Description=' +
      '"R30\' Target stays w/in 30\' of self (Wisdom neg) and suffers Disadv on attacks on others for conc up to 1 min; self attacking another or a successful attack on target by an ally ends"',
  'Conjure Barrage':
    'School=Conjuration ' +
    'Level=R3 ' +
    'Description="60\' cone inflicts 3d8 HP weapon type (Dexterity half)"',
  'Conjure Volley':
    'School=Conjuration ' +
    'Level=R5 ' +
    'Description=' +
      '"R150\' 40\' radius inflicts 8d8 HP weapon type (Dexterity half)"',
  'Cordon Of Arrows':
    'School=Transmutation ' +
    'Level=R2 ' +
    'AtHigherLevels="affects +2 pieces" ' +
    'Description=' +
      '"R5\' Four pieces of ammo attack non-designated creatures w/in 30\', inflicting 1d6 HP piercing each (Dexterity neg), for 8 hr"',
  'Crown Of Madness':
    'School=Enchantment ' +
    'Level=B2,K2,S2,W2 ' +
    'Description=' +
      '"R120\' Self may order target\'s attacks each rd (Wisdom ends) for conc up to 1 min"',
  "Crusader's Mantle":
    'School=Evocation ' +
    'Level=P3 ' +
    'Description=' +
      '"Ally attacks in 30\' radius inflict +1d4 HP radiant for conc up to 1 min"',

  'Destructive Wave':
    'School=Evocation ' +
    'Level=P5 ' +
    'Description=' +
      '"30\' radius inflicts 5d6 HP thunder, 5d6 HP choice of radiant or necrotic, and knocked prone (Constitution half HP only)"',
  'Dissonant Whispers':
    'School=Enchantment ' +
    'Level=B1,"K1 [The Great Old One]" ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"R60\' Target suffers 3d6 HP psychic and uses Reaction to flee (Wisdom half HP only)"',

  'Elemental Weapon':
    'School=Transmutation ' +
    'Level=P3 ' +
    'AtHigherLevels="gives +2/+3 attack and +2d4/+3d4 damage at level 5/7" ' +
    'Description=' +
      '"Touched weapon gains +1 attack and +1d4 HP choice of acid, cold, fire, lightning, or thunder for conc up to 1 hr"',
  'Ensnaring Strike':
    'School=Conjuration ' +
    'Level=R1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"Self next successful attack restrains foe and inflicts 1d6 HP/rd piercing (Strength ends) for conc up to 1 min"',

  'Feign Death':
    'School=Necromancy ' +
    'Level=B3,C3,D3,W3 ' +
    'Ritual=true ' +
    'Description=' +
      '"Touched appears dead and gains resistance to non-psychic damage for 1 hr"',
  'Friends':
    'School=Enchantment ' +
    'Level=B0,K0,S0,W0 ' +
    'Description=' +
      '"Self gains on Adv on Charisma w/non-hostile target for conc up to 1 min; target becomes hostile afterward"',

  'Grasping Vine':
    'School=Conjuration ' +
    'Level=D4,R4 ' +
    'Description=' +
      '"R30\' 30\' vine pulls target 20\' each rd (Dexterity neg) for conc up to 1 min"',

  'Hail Of Thorns':
    'School=Conjuration ' +
    'Level=R1 ' +
    'AtHigherLevels="inflicts +1d10 HP (6d10 HP maximum)" ' +
    'Description=' +
      '"Next successful self ranged attack inflicts 1d10 HP piercing in a 5\' radius (Dexterity half) for conc up to 1 min"',
  'Hex':
    'School=Enchantment ' +
    'Level=K1 ' +
    'AtHigherLevels="extends duration to 8/24 hr at level 3/5" ' +
    'Description=' +
      '"R90\' Self attacks on target inflict +1d6 HP necrotic, and target has Disadv on chosen ability, for conc up to 1 hr"',
  'Hunger Of Hadar':
    'School=Conjuration ' +
    'Level=K3 ' +
    'Description=' +
      '"R150\' 20\' radius inflicts 2d6 HP cold at creatures\' start of turn and 2d6 HP acid at creatures\' end of turn for conc up to 1 min"',

  'Lightning Arrow':
    'School=Transmutation ' +
    'Level=R3 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"Next self ranged weapon attack inflicts 8d6 HP lightning on target (miss half) and 2d8 HP lightning to others in a 10\' radius (Dexterity half)"',

  'Phantasmal Force':
    'School=Illusion ' +
    'Level=B2,"K2 [The Archfey]","K2 [The Great Old One]",S2,W2 ' +
    'Description=' +
      '"R60\' Target perceives an illusion that may inflict 1d6 HP psychic/rd (Intelligence neg; Investigation ends) for conc up to 1 min"',
  'Power Word Heal':
    'School=Evocation ' +
    'Level=B9 ' +
    'Description=' +
      '"Touched regains all HP, recovers from charm, fright, paralysis, and stunning, and may use a Reaction to stand from prone"',

  'Ray Of Sickness':
    'School=Necromancy ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' Ranged spell inflicts 2d8 HP poison and poisoned 1 rd (Constitution HP only)",',

  'Searing Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'AtHigherLevels="inflicts +1d6 HP initial" ' +
    'Description=' +
      '"Next successful self weapon attack inflicts +1d6 HP fire, plus 1d6 HP fire/rd (Constitution ends) for conc up to 1 min"',
  'Staggering Smite':
    'School=Evocation ' +
    'Level=P4 ' +
    'Description=' +
      '"Next successful self weapon attack w/in conc up to 1 min inflicts +4d6 HP psychic, Disadv on attacks and ability checks for 1 rd, and no Reaction for 1 rd"',
  'Swift Quiver':
    'School=Transmutation ' +
    'Level=R5 ' +
    'Description=' +
      '"Touched quiver dispenses ammo endlessly and allows two ranged attacks in a bonus action for conc up to 1 min"',

  'Telepathy':
    'School=Evocation ' +
    'Level=W8 ' +
    'Description=' +
      '"Self may communicate mentally with a willing target for 1 dy"',
  'Thorn Whip':
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description=' +
      '"R30\' Ranged spell inflicts %{(level+7)//6}d6 HP and pulls 10\'"',
  'Thunderous Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description=' +
      '"Next successful self weapon attack inflicts +2d6 HP thunder and 10\' push (Strength HP only) for conc up to 1 min"',
  'Tsunami':
    'School=Conjuration ' +
    'Level=D8 ' +
    'Description=' +
      '"RSight 300\'x300\'x50\' wall of water inflicts 6d10 HP bludgeoning (Strength half); moves away 50\'/rd, reducing height by 50\' and damage by 1d10 HP each rd, for conc up to 6 rd"',

  'Witch Bolt':
    'School=Evocation ' +
    'Level=K1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d12 HP initial" ' +
    'Description=' +
      '"R30\' Ranged spell inflicts 1d12 HP lightning/rd for conc up to 1 min"',
  'Wrathful Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description=' +
      '"Next successful self weapon attack inflicts +1d6 HP psychic and frightens (Wisdom ends) for conc up to 1 min"'

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
  'Arcane Sword':"Mordenkainen's Sword",
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
for(let s in PHB5E.SPELLS_LEVELS_ADDED)
  PHB5E.SPELLS[s] =
    PHB5E.SPELLS[s].replace('Level=', 'Level=' + PHB5E.SPELLS_LEVELS_ADDED[s] + ',');
for(let s in PHB5E.SPELLS_RENAMED) {
  PHB5E.SPELLS[PHB5E.SPELLS_RENAMED[s]] = PHB5E.SPELLS[s];
  delete PHB5E.SPELLS[s];
}
PHB5E.TOOLS = Object.assign({}, SRD5E.TOOLS);
PHB5E.WEAPONS = Object.assign({}, SRD5E.WEAPONS);

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

  } else if(name == 'Bard') {

    rules.defineRule
      ('bardHasExtraAttack', 'features.College Of Valor', '=', '1');
    rules.defineRule
      ('combatNotes.extraAttack', 'bardFeatures.Extra Attack', '+=', '1');

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
    rules.defineRule('spellSlots.D0', 'magicNotes.acolyteOfNature', '+=', '1');
    rules.defineRule('casterLevels.D', 'casterLevels.Nature', '=', null);

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

  } else if(name == 'Monk') {

    rules.defineRule('magicNotes.discipleOfTheElements',
      'monkFeatures.Way Of The Four Elements', '?', null,
      classLevel, '=', 'Math.floor( (source + 4) / 5)'
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

  } else if(name == 'Wizard') {

    rules.defineRule // Italics noop
      ('magicNotes.portent', 'magicNotes.greaterPortent', '+', 'null');
    rules.defineRule('magicNotes.invokeDuplicity', // Italics noop
      'magicNotes.improvedDuplicity', '+', 'null'
    );

  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
PHB5E.featRulesExtra = function(rules, name) {

  let matchInfo;

  if((matchInfo = name.match(/Magic\sInitiate\s.(.*)./)) != null) {
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
  } else if(name == 'Weapon Master') {
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.weaponMaster', '+=', '4');
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
    '  Quilvyn allows proficiencies from the PHB Skilled feat to be applied\n' +
    '  only to skills, rather than skills or tools.\n' +
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
