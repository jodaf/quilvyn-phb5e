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

/*jshint esversion: 6 */
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

  var rules = new QuilvynRules('D&D 5E', PHB5E.VERSION);
  PHB5E.rules = rules;

  rules.defineChoice('choices', SRD5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = PHB5E.choiceRules;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = PHB5E.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = SRD5E.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E.RANDOMIZABLE_ATTRIBUTES);
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

PHB5E.VERSION = '2.2.1.2';

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
      '"1:Guild Membership" ' +
    'Languages=any',
  'Hermit':
    'Equipment=' +
      'Clothes,"Herbalism Kit","Scroll Case With Notes","Winter Blanket",' +
      '"5 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Medicine/Religion)",' +
      '"1:Tool Proficiency (Herbalism Kit)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Discovery ' +
    'Languages=any',
  'Noble':
    'Equipment=' +
      '"Fine Clothes","Pedigree Scroll","Signet Ring","25 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History/Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Game)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Position Of Privilege" ' +
    'Languages=any',
  'Outlander':
    'Equipment=' +
      '"Animal Trophy","Hunting Trap",Staff,"Traveler\'s Clothes","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Survival)",' +
      '"1:Tool Proficiency (Choose 1 from any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '1:Wanderer ' +
    'Languages=any',
  'Sage':
    'Equipment=' +
      '"Bottle Ink",Clothes,"Letter W/Unanswered Question","Quill",' +
      '"Small Knife","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Arcana/History)",' +
      '"1:Language (Choose 2 from any)",' +
      '1:Researcher ' +
    'Languages=any,any',
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
PHB5E.CLASSES_SELECTABLES_ADDED = {
  'Bard':'"3:College Of Valor:Bard College"',
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
  'Ranger':'"3:Beast Master:Ranger Archetype"',
  'Rogue':
    '"3:Arcane Trickster:Roguish Archetype","3:Assassin:Roguish Archetype"',
  'Sorcerer':'"1:Wild Magic:Sorcerous Origin"',
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
for(var c in PHB5E.CLASSES_SELECTABLES_ADDED) {
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
    'Note="Receive welcome and lodging in exchange for performing"',
  'City Secrets':'Section=feature Note="Travel through city at dbl speed"',
  'Criminal Contact':'Section=feature Note="Know liaison to criminal network"',
  'Discovery':'Section=feature Note="Know unique and powerful truth"',
  'False Identity':
    'Section=feature Note="Have documented 2nd ID and forgery skills"',
  'Guild Membership':
    'Section=feature Note="Receive assistance from fellow guild members"',
  'Military Rank':
    'Section=feature Note="Receive respect and deference from soldiers"',
  'Position Of Privilege':
    'Section=feature Note="Receive respect and deference"',
  'Researcher':'Section=feature Note="Know where and whom to ask about lore"',
  'Rustic Hospitality':
    'Section=feature Note="Receive shelter from common folk"',
  "Ship's Passage":
    'Section=feature ' +
    'Note="Receive water passage for self and companions in exchange for labor"',
  'Wanderer':
    'Section=feature ' +
    'Note="Have excellent geographic memory, can forage for 6 people"',
  // Paths
  "Commander's Strike":
    'Section=combat ' +
    'Note="Forego 1 attack to add Superiority Die to ally attack"',
  "Nature's Wrath":
    'Section=magic ' +
    'Note="R10\' Channel Divinity makes vines restrain foes (DC %V Dex or Str neg)"',
  "Ranger's Companion":
    'Section=feature Note="Companion beast up to CR %V gains +%{proficiencyBonus} AC, attack, damage, skills, and saving throws and obeys self commands"',
  'Student Of War':
    'Section=feature Note="Tool Proficiency (Choose 1 from any Artisan)"',
  "Transmuter's Stone":
    'Section=magic ' +
    'Note="Stone gives 60\' darkvision, +10\' speed, proficiency in constitution, or resistance to chosen energy damage; change effect when casting transmutation spell"',
  "War God's Blessing":
    'Section=magic ' +
    'Note="R30\' Channel Divinity Reaction gives ally +10 attack"',
  'Abjuration Savant':
    'Section=magic Note="Copy abjuration spells into spellbook for half cost"',
  'Abjure Enemy':
    'Section=magic ' +
    'Note="R60\' Channel Divinity halts target for 1 min (DC %V Wis half speed)"',
  'Acolyte Of Nature':
    'Section=magic,skill ' +
    'Note="Additional Druid cantrip",' +
         '"Skill Proficiency (Choose 1 from Animal Handling, Nature, Survival)"',
  'Alter Memories':
    'Section=magic ' +
    'Note="Target unaware of enchantment, forgets %V hrs (DC %1 Int neg)"',
  'Arcane Charge':'Section=magic Note="Teleport 30\' during Action Surge"',
  'Arcane Ward':
    'Section=magic ' +
    'Note="Abjuration casting creates %V HP shield around self until long rest"',
  'Aspect Of The Bear':
    'Section=ability ' +
    'Note="Dbl load and lift, Adv on Str checks to push, pull, lift, or break"',
  'Aspect Of The Eagle':
    'Section=skill ' +
    'Note="See 1 mile clearly, no Disadv on Perception in dim light"',
  'Aspect Of The Wolf':
    'Section=skill Note="Track at fast pace and Stealth at normal pace"',
  'Assassin Bonus Proficiencies':
    'Section=feature Note="Tool Proficiency (Disguise Kit/Poisoner\'s Kit)"',
  'Assassinate':
    'Section=combat ' +
    'Note="Adv on attack before foe\'s first tn, crit on surprise hit"',
  'Aura Of Warding':
    'Section=save ' +
    'Note="R%V\' Gives self and allies resistance to spell damage"',
  'Avatar Of Battle':
    'Section=save ' +
    'Note="Resistance to nonmagical bludgeoning, piercing and slashing damage"',
  'Avenging Angel':
    'Section=ability,combat ' +
    'Note="60\' fly speed 1 hr/long rest",' +
         '"R30\' foes frightened (DC %V Wis neg) 1 hr/long rest"',
  'Awakened Mind':
    'Section=feature Note="R30\' Telepathic communication"',
  'Battle Magic':
    'Section=combat Note="Bonus attack after casting spell"',
  'Bear Totem Spirit':
    'Section=save Note="Resistance to non-psychic damage during rage"',
  'Bear Totemic Attunement':
    'Section=combat ' +
    'Note="Adjacent foes Disadv on attacks on others during self rage"',
  'Beguiling Defenses':
    'Section=save ' +
    'Note="Immune to charm, reflect on caster for conc or 1 min (DC %V Wis neg)"',
  'Bend Luck':
    'Section=magic ' +
    'Note="Spend 2 Sorcery Points to add or subtract 1d4 from target roll"',
  'Benign Transposition':
    'Section=magic ' +
    'Note="R30\' Teleport self or swap w/willing creature 1/long rest or conjuration spell casting"',
  'Bestial Fury':
    'Section=feature Note="Companion makes 2 attacks/rd"',
  'Blessing Of The Trickster':
    'Section=magic Note="Touched Adv Stealth for 1 hr"',
  'Blessings Of Knowledge':
    'Section=skill ' +
    'Note="+2 Language Count/Skill Proficiency (Choose 2 from Arcana, History, Nature, Religion)/Dbl Proficiency Bonus for chosen skills"',
  'Breath Of Winter':
    'Section=magic Note="Spend 6 Ki Points to cast <i>Cone Of Cold</i>"',
  'Charm Animals And Plants':
    'Section=magic Note="R30\' Channel Divinity charms for 1 min (Wis neg)"',
  'Circle Forms':
    'Section=magic Note="Increase Wild Shape CR to %V"',
  'Clench Of The North Wind':
    'Section=magic Note="Spend 3 Ki Points to cast <i>Hold Person</i>"',
  'Cloak Of Shadows':
    'Section=magic ' +
    'Note="Self invisible in dim and unlit areas until attacks or casts"',
  'Combat Inspiration':
    'Section=combat ' +
    'Note="Ally can use Bardic Inspiration die to boost weapon damage or AC"',
  'Combat Superiority':
    'Section=combat ' +
    'Note="Use %Vd%1 Superiority Dice to perform %2 chosen Maneuvers/short rest"',
  'Combat Wild Shape':
    'Section=combat,magic ' +
    'Note="Use Wild Shape as bonus action",' +
         '"Use spell slot to regain (slot level)d8 HP during Wild Shape"',
  'Command Undead':
    'Section=magic ' +
    'Note="R60\' Take control of undead target (DC %V Cha neg (Adv intelligence 8 or higher))"',
  'Conjuration Savant':
    'Section=magic Note="Copy conjuration spells into spellbook for half cost"',
  'Controlled Chaos':
    'Section=magic Note="Choose from 2 Wild Magic Surge effects"',
  'Corona Of Light':
    'Section=magic ' +
    'Note="60\' light inflicts foe Disadv on fire and radiant spells for 1 min"',
  'Create Thrall':
    'Section=magic Note="Touch charms incapacitated humanoid"',
  'Dampen Elements':
    'Section=magic ' +
    'Note="R30\' Use Reaction to grant resistance to acid, cold, fire, lightning, or thunder damage"',
  'Dark Delirium':
    'Section=magic ' +
    'Note="R60\' Target charmed or frightened and unaware of surroundings for conc or 1 min (DC %V Wis neg) 1/long rest"',
  'Death Strike':
    'Section=combat Note="Dbl damage on surprise hit (DC %V Con neg)"',
  'Destructive Wrath':
    'Section=magic ' +
    'Note="Channel Divinity maximizes lightning or thunder damage"',
  'Disarming Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, foe drops item (DC %V Str neg)"',
  'Disciple Of The Elements':
    'Section=magic Note="Select %V elemental disciplines"',
  'Distracting Strike':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, next ally attack against same foe in same rd gains Adv"',
  'Divination Savant':
    'Section=magic Note="Copy divination spells into spellbook for half cost"',
  'Durable Summons':
    'Section=magic Note="Summoned creatures gain +30 temporary HP"',
  'Eagle Totem Spirit':
    'Section=combat ' +
    'Note="Foes Disadv on OA, bonus Dash during rage (heavy armor neg)"',
  'Eagle Totemic Attunement':
    'Section=ability Note="Fly %{speed}\' 1/tn during rage"',
  'Elder Champion':
    'Section=magic ' +
    'Note="Regain 10 HP/rd, cast spells as a bonus action, and inflict Disadv vs. self spells on foes w/in 10\' for 1 min 1/long rest"',
  'Eldritch Strike':
    'Section=combat ' +
    'Note="Inflicts Disadv on saves vs. self spells for 1 rd after hit"',
  'Elemental Attunement':
    'Section=magic ' +
    'Note="Create harmless instantaneous elemental effect, light or snuff small flame, chill or warm 1 lb object for 1 hr, or shape 1\' cu earth, fire, water, or mist for 1 min"',
  'Elemental Wild Shape':
    'Section=magic Note="Use 2 Wild Shape uses to become an elemental"',
  'Enchantment Savant':
    'Section=magic Note="Copy enchantment spells into spellbook for half cost"',
  'Entropic Ward':
    'Section=combat ' +
    'Note="Use Reaction to inflict Disadv on attack by foe, miss gives you Adv on next attack 1/short rest"',
  'Eternal Mountain Defense':
    'Section=magic Note="Spend 5 Ki Points to cast <i>Stoneskin</i> on self"',
  'Evasive Footwork':
    'Section=combat Note="Add Superiority Die to AC during move"',
  'Exceptional Training':
    'Section=feature ' +
    'Note="Companion can Dash, Disengage, Dodge, or Help instead of Attack"',
  'Expert Divination':
    'Section=magic Note="Casting divination spell restores lower spell slot"',
  'Fangs Of The Fire Snake':
    'Section=magic ' +
    'Note="Spend 1 Ki Point for +10\' unarmed reach, 2nd Ki Point to inflict +1d10 HP fire"',
  'Feinting Attack':
    'Section=combat ' +
    'Note="Use bonus action to gain Adv on next attack and add Superiority Die to damage"',
  'Fey Presence':
    'Section=magic ' +
    'Note="R10\' All creatures charmed or frightened for 1 tn (DC %V Wis neg) 1/short rest"',
  'Fist Of Four Thunders':
    'Section=magic Note="Spend 2 Ki Points to cast <i>Thunderwave</i>"',
  'Fist Of Unbroken Air':
    'Section=magic ' +
    'Note="R30\' Spend 2+ Ki Points to inflict 3d10+ HP, push 20\', and knock prone (DC %V Str half HP only)"',
  'Flames Of The Phoenix':
    'Section=magic Note="Spend 4 Ki Points to cast <i>Fireball</i>"',
  'Focused Conjuration':
    'Section=magic Note="Damage cannot break conjuration concentration"',
  'Goading Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, foe attacks on others suffer Disadv for 1 rd (DC %V Wis neg)"',
  'Gong Of The Summit':
    'Section=magic Note="Spend 3 Ki Points to cast <i>Shatter</i>"',
  'Greater Portent':'Section=magic Note="Replace roll 3/long rest"',
  'Grim Harvest':
    'Section=magic ' +
    'Note="Regain 2x spell level HP (3x for necromantic spells) when self spell kills"',
  'Guided Strike':
    'Section=combat Note="Channel Divinity gives self +10 attack"',
  'Hypnotic Gaze':
    'Section=magic Note="R5\' Daze target 1/long rest (DC %V Wis neg)"',
  'Illusion Savant':
    'Section=magic Note="Copy illusion spells into spellbook for half cost"',
  'Illusory Reality':
    'Section=magic Note="Make object in self illusion real for 1 min"',
  'Illusory Self':
    'Section=magic Note="Use Reaction to cause foe miss 1/short rest"',
  'Impostor':
    'Section=feature Note="Unerring mimicry"',
  'Improved Abjuration':
    'Section=magic ' +
    'Note="Add Proficiency Bonus to abjuration spell ability checks"',
  'Improved Combat Superiority':
    'Section=combat Note="Use d%V Superiority Dice"',
  'Improved Duplicity':
    'Section=magic Note="Invoke Duplicity creates 4 duplicates"',
  'Improved Flare':
    'Section=magic Note="Warding Flare protects allies"',
  'Improved Minor Illusion':
    'Section=magic ' +
    'Note="Know <i>Minor Illusion</i>, effect includes both sound and image"',
  'Improved War Magic':'Section=combat Note="Bonus attack after any spell"',
  'Infiltration Expertise':
    'Section=feature Note="Forge and adopt different identities"',
  'Instinctive Charm':
    'Section=magic ' +
    'Note="Redirect self foe attack to closest creature (DC %V Wis neg until long rest)"',
  'Inured To Undeath':
    'Section=save ' +
    'Note="Resistance to necrotic damage, immunity to maximum HP reduction"',
  'Invoke Duplicity':
    'Section=magic ' +
    'Note="R30\' Channel Divinity creates %V, giving Adv on attacks when w/in 5\' and allowing remote spellcasting for conc or 1 min"',
  'Know Your Enemy':
    'Section=combat Note="Know how foe compares to self after 1 min study"',
  'Knowledge Of The Ages':
    'Section=skill ' +
    'Note="Channel Divinity gives proficiency in chosen skill or tool for 10 min"',
  'Light Bonus Cantrip':
    'Section=magic Note="Know <i>Light</i> cantrip"',
  'Lunging Attack':
    'Section=combat ' +
    'Note="Gain +5\' melee range, add Superiority Die to damage"',
  'Mage Hand Legerdemain':
    'Section=magic ' +
    'Note="Stow and retrieve objects, pick locks, and disarm traps via invisible <i>Mage Hand</i>"',
  'Magical Ambush':
    'Section=magic Note="Foe Disadv on self spell save when self hidden"',
  'Malleable Illusions':
    'Section=magic Note="Modify cast illusions throughout duration"',
  'Maneuvering Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, ally can react to move half speed w/no OA from target"',
  'Master Of Nature':
    'Section=magic Note="Command charmed animals, plants"',
  'Master Transmuter':
    'Section=magic ' +
    'Note="Destroy transmuter\'s stone to transmute 5\' cu, remove curses, diseases, and poisons, cast <i>Raise Dead</i>, or restore youth"',
  'Menacing Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, foe frightened for 1 rd (DC %V Wis neg)"',
  'Minor Alchemy':
    'Section=magic Note="Transform 1\' cu/10 min effort for 1 hr"',
  'Minor Conjuration':
    'Section=magic Note="R10\' Create 3\' cu, 10 lb object for 1 hr"',
  'Mist Stance':
    'Section=magic ' +
    'Note="Spend 4 Ki Points to cast <i>Gaseous Form</i> on self"',
  'Misty Escape':
    'Section=magic ' +
    'Note="After damage, teleport 60\' and become invisible for 1 tn 1/short rest"',
  'Nature Bonus Proficiency':'Section=combat Note="Armor Proficiency (Heavy)"',
  'Necromancy Savant':
    'Section=magic Note="Copy necromancy spells into spellbook for half cost"',
  'Opportunist':
    'Section=combat Note="Use Reaction to attack adjacent foe after ally hit"',
  'Parry':
    'Section=combat Note="Reduce damage from foe by Superiority Die + %V"',
  'Portent':
    'Section=magic ' +
    'Note="Replace visible creature\'s attack, ability, or saving throw %V/long rest"',
  'Potent Spellcasting':
    'Section=magic Note="+%1 Cleric cantrip damage"',
  'Precision Attack':
    'Section=combat Note="Add Superiority Die to attack"',
  'Primal Strike':
    'Section=combat Note="Wild Shape attacks count as magical"',
  'Projected Ward':
    'Section=magic Note="R30\' Use Arcane Ward to absorb damage to others"',
  'Pushing Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, push foe 15\' (DC %V Str neg)"',
  'Radiance Of The Dawn':
    'Section=magic ' +
    'Note="R30\' Channel Divinity dispels magic darkness, foes suffer 2d10+%V HP radiant (Con half)"',
  'Rally':
    'Section=combat Note="Chosen ally gains Superiority Die + %V temporary HP"',
  'Read Thoughts':
    'Section=magic ' +
    'Note="R60\' Use Channel Divinity to read thoughts and cast <i>Suggestion</i> for 1 min (Wis neg)"',
  'Relentless':
    'Section=combat Note="Minimum 1 Superiority Die after initiative"',
  'Relentless Avenger':'Section=combat Note="Move %{speed//2}\' after OA hit"',
  'Ride The Wind':
    'Section=magic Note="Spend 4 Ki Points to cast <i>Fly</i> on self"',
  'Riposte':
    'Section=combat ' +
    'Note="Use bonus to attack after foe miss, add Superiority Die to damage"',
  'River Of Hungry Flame':
    'Section=magic Note="Spend 5 Ki Points to cast <i>Wall Of Fire</i>"',
  'Rush Of The Gale Spirits':
    'Section=magic Note="Spend 2 Ki Points to cast <i>Gust Of Wind</i>"',
  'Shadow Arts':
    'Section=magic ' +
    'Note="Know <i>Minor Illusion</i> cantrip, spend 2 Ki Points to cast <i>Darkness</i>, <i>Darkvision</i>, <i>Pass Without Trace</i>, or <i>Silence</i>"',
  'Shadow Step':
    'Section=magic ' +
    'Note="Teleport 60\' between dim or unlit areas, then gain Adv on first melee attack"',
  'Shape The Flowing River':
    'Section=magic ' +
    'Note="R120\' Spend 1 Ki Point to freeze, thaw, and shape 30\' cu water"',
  'Shapechanger':
    'Section=magic ' +
    'Note="Know <i>Polymorph</i>, transform self into CR 1 creature 1/short rest"',
  'Share Spells':
    'Section=feature Note="R30\' Self spell also affects companion"',
  'Soul Of Vengeance':
    'Section=combat ' +
    'Note="Use Reaction for melee attack on Vow Of Enmity target "',
  'Spell Bombardment':
    'Section=magic ' +
    'Note="Add another die when maximum rolled on spell damage die 1/tn"',
  'Spell Resistance':
    'Section=save Note="Adv vs. spells and resistance to spell damage"',
  'Spell Thief':
    'Section=magic ' +
    'Note="Foe spell negated, self cast same w/in 8 hours (DC %V neg) 1/long rest"',
  'Spirit Seeker':
    'Section=magic Note="Ritual <i>Beast Sense</i>, <i>Speak With Animals</i>"',
  'Spirit Walker':
    'Section=magic Note="Ritual <i>Commune With Nature</i>"',
  'Split Enchantment':
    'Section=magic Note="Add second target to enchantment spell"',
  'Stormborn':
    'Section=ability Note="%{speed}\' fly speed outdoors"',
  'Sweeping Attack':
    'Section=combat ' +
    'Note="After hit, inflict Superiority Die HP on adjacent foe"',
  'Sweeping Cinder Strike':
    'Section=magic Note="Spend 2 Ki Points to cast <i>Burning Hands</i>"',
  'Tempest Bonus Proficiencies':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy) and Weapon Proficiency (Martial)"',
  'The Third Eye':
    'Section=magic ' +
    'Note="Use action to gain 60\' darkvision, 60\' ethereal sight, universal language comprehension, or 10\' invisibility sight"',
  'Thought Shield':
    'Section=save ' +
    'Note="Immune to telepathy, resistance to and reflect psychic damage"',
  'Thousand Forms':
    'Section=magic Note="<i>Alter Self</i> at will"',
  'Thunderbolt Strike':
    'Section=magic ' +
    'Note="Lightning damage pushes away Large and smaller creatures 10\'"',
  'Tides Of Chaos':
    'Section=feature ' +
    'Note="Adv on attack, ability, or saving throw 1/long rest (subsequent spell use may cause Wild Magic Surge)"',
  'Transmutation Savant':
    'Section=magic ' +
    'Note="Copy transmutation spells into spellbook for half cost"',
  'Trickster Cloak Of Shadows':
    'Section=magic Note="Channel Divinity makes self invisible 1 tn"',
  'Trip Attack':
    'Section=combat ' +
    'Note="Add Superiority Die to damage, knock foe prone (DC %V Str neg)"',
  'Turn The Faithless':
    'Section=magic ' +
    'Note="R30\' Channel Divinity makes fiends and fey flee for 1 min (DC %V Wis neg)"',
  'Undead Thralls':
    'Section=magic Note="Know <i>Animate Dead</i>, casting animates additional corpse and gives +%V HP and +%1 damage"',
  'Undying Sentinel':
    'Section=combat,feature ' +
    'Note="Keep 1 HP when brought to 0 HP 1/long rest",' +
         '"No debility from aging"',
  'Valor Bonus Proficiencies':
    'Section=combat ' +
    'Note="Armor Proficiency (Medium/Shield) and Weapon Proficiency (Martial)"',
  'Versatile Trickster':
    'Section=magic Note="Distract foe (self Adv attacks) via <i>Mage Hand</i>"',
  'Visions Of The Past':
    'Section=magic ' +
    'Note="1 min meditation gives visions about surroundings or held object"',
  'Vow Of Enmity':
    'Section=combat ' +
    'Note="R10\' Channel Divinity gives self Adv on attacks against target for 1 min"',
  'War Bonus Proficiencies':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy) and Weapon Proficiency (Martial)"',
  'War Magic':'Section=combat Note="Bonus attack after %V"',
  'War Priest':'Section=combat Note="Bonus attack %V/long rest"',
  'Warding Flare':
    'Section=magic ' +
    'Note="R30\' Reaction inflicts foe Disadv on current attack %V/long rest"',
  'Water Whip':
    'Section=magic ' +
    'Note="R30\' Spend 2+ Ki Points to inflict 3d10+ HP bludgeoning and pull 25\' or knock prone (DC %V Str half HP only)"',
  'Wave Of Rolling Earth':
    'Section=magic Note="Spend 6 Ki Points to cast <i>Wall Of Stone</i>"',
  'Weapon Bond':
    'Section=combat Note="Cannot be disarmed, can summon weapon"',
  'Wild Magic Surge':
    'Section=magic Note="5% chance of random magic effect"',
  'Wolf Totem Spirit':
    'Section=combat ' +
    'Note="Allies Adv on attacks vs. foes adjacent to self during rage"',
  'Wolf Totemic Attunement':
    'Section=combat ' +
    'Note="Melee hit during rage knocks prone Large or smaller foe"',
  'Wrath Of The Storm':
    'Section=combat ' +
    'Note="Reaction inflicts 2d8 HP lightning or thunder (Dex half) on successful attacker %V/long rest"',
  // Feats
  'Actor':
    'Section=ability,skill ' +
    'Note="+1 Charisma",' +
         '"Adv Deception (Cha) and Performance (Cha) (impersonating), mimic others\' speech or sounds"',
  'Alert':
    'Section=combat ' +
    'Note="+5 Initiative; cannot be surprised; no Adv to unseen foes"',
  'Athlete':
    'Section=ability ' +
    'Note="+1 Dexterity or Strength; standing, long jump, and running high jump each use only 5\' move; climb at full speed"',
  'Charger':
    'Section=combat ' +
    'Note="After dash, bonus attack inflicts +5 HP damage or bonus 10\' push"',
  'Crossbow Expert':
    'Section=combat ' +
    'Note="Quick load; no Disadv on close shot; bonus hand crossbow shot after one-handed attack"',
  'Defensive Duelist':
    'Section=combat Note="Use Reaction for +%V AC when holding finesse weapon"',
  'Dual Wielder':
    'Section=combat ' +
    'Note="+1 AC w/two weapons; use two-weapon fighting w/any one-handed weapons; draw or stow two weapons at once"',
  'Dungeon Delver':
    'Section=save,skill ' +
    'Note="Adv on trap detection and avoidance and resistance to trap damage",' +
         '"Adv on secret door detection and search for traps at full speed"',
  'Durable':
    'Section=ability,combat ' +
    'Note="+1 Constitution","Minimum %V when regaining HP"',
  'Elemental Adept (Acid)':
    'Section=magic ' +
    'Note="Acid spells ignore resistance; treat 1s as 2s on damage die"',
  'Elemental Adept (Cold)':
    'Section=magic ' +
    'Note="Cold spells ignore resistance; treat 1s as 2s on damage die"',
  'Elemental Adept (Fire)':
    'Section=magic ' +
    'Note="Fire spells ignore resistance; treat 1s as 2s on damage die"',
  'Elemental Adept (Lightning)':
    'Section=magic ' +
    'Note="Lightning spells ignore resistance; treat 1s as 2s on damage die"',
  'Elemental Adept (Thunder)':
    'Section=magic ' +
    'Note="Thunder spells ignore resistance; treat 1s as 2s on damage die"',
  'Great Weapon Master':
    'Section=combat ' +
    'Note="Bonus attack after crit or reducing foe to 0 HP; trade -5 attack w/heavy weapon for +10 damage"',
  'Healer':
    'Section=feature ' +
    'Note="Using healer\'s kit to stabilize also restores 1 HP; healer\'s kit heals 1d6 + 4 + target HD HP 1/short rest"',
  'Heavily Armored':
    'Section=ability,combat Note="+1 Strength","Armor Proficiency (Heavy)"',
  'Heavy Armor Master':
    'Section=ability,combat ' +
    'Note="+1 Strength",' +
         '"DR 3/magic to bludgeoning, piercing, and slashing damage"',
  'Inspiring Leader':
    'Section=feature Note="R30\' 10-min speech gives 6 allies %V temporary HP"',
  'Keen Mind':
    'Section=ability,feature ' +
    'Note="+1 Intelligence",' +
         '"Always know direction of north and hours until sunrise or sunset; recall anything seen or heard during the past month"',
  'Lightly Armored':
    'Section=ability,combat ' +
    'Note="+1 Dexterity or Strength",' +
         '"Armor Proficiency (Light)"',
  'Linguist':
    'Section=ability,feature,skill ' +
    'Note="+1 Intelligence",' +
         '"Create ciphers that require a DC %V Int check to decode",' +
         '"+3 Language Count"',
  'Lucky':
    'Section=feature ' +
    'Note="Adv on attack, ability, or saving throw or foe Disadv on self attack 3/long rest"',
  'Mage Slayer':
    'Section=combat,save ' +
    'Note="Use Reaction to attack adjacent caster; foe Disadv on concentration to maintain spell",' +
         '"Adv on spells by adjacent foes"',
  'Magic Initiate (Bard)':
    'Section=magic Note="Know 2 B0 spells, cast 1 B1 spell/long rest"',
  'Magic Initiate (Cleric)':
    'Section=magic Note="Know 2 C0 spells, cast 1 C1/long rest"',
  'Magic Initiate (Druid)':
    'Section=magic Note="Know 2 D0 spells, cast 1 D1/long rest"',
  'Magic Initiate (Sorcerer)':
    'Section=magic Note="Know 2 S0 spells, cast 1 S1 spell/long rest"',
  'Magic Initiate (Warlock)':
    'Section=magic Note="Know 2 K0 spells, cast 1 K1 spell/long rest"',
  'Magic Initiate (Wizard)':
    'Section=magic Note="Know 2 W0 spells, cast 1 W1 spell/long rest"',
  'Martial Adept':
    'Section=combat Note="Combat Superiority (2 maneuvers, 1 die)"',
  'Medium Armor Master':
    'Section=combat,skill ' +
    'Note="+1 AC in medium armor if Dexterity at least 16",' +
         '"No Stealth check penalty in medium armor"',
  'Mobile':
    'Section=ability,combat ' +
    'Note="+10 Speed",' +
         '"Dash at full speed in difficult terrain, no OA from targeted foe"',
  'Moderately Armored':
    'Section=ability,combat ' +
    'Note="+1 Dexterity or Strength",' +
         '"Armor Proficiency (Medium/Shield)"',
  'Mounted Combatant':
    'Section=combat ' +
    'Note="Adv on melee attacks on unmounted foe smaller than mount, redirect attack on mount to self, mount takes no damage on Dex save, half on fail"',
  'Observant':
    'Section=ability,feature,skill ' +
    'Note="+1 Intelligence or Wisdom",' +
         '"Read lips",' +
         '"+5 passive Investigation and Perception"',
  'Polearm Master':
    'Section=combat ' +
    'Note="Bonus attack w/polearm butt inflicts 1d4 HP bludgeoning, OA when foe enters reach"',
  'Resilient':
    'Section=ability,save ' +
    'Note="+1 Ability Boosts",' +
         '"Save Proficiency (Choose 1 from any)"',
  'Ritual Caster':
    'Section=magic Note="Cast spells from ritual book"',
  'Savage Attacker':
    'Section=combat Note="Take best of two melee damage rolls 1/tn"',
  'Sentinel':
    'Section=combat ' +
    'Note="OA strike halts foe; OA on adjacent foe Disengage; use Reaction to attack when adjacent foe targets other"',
  'Sharpshooter':
    'Section=combat ' +
    'Note="No Disadv at long range, ignore 3/4 cover, trade -5 attack w/ranged weapon for +10 damage"',
  'Shield Master':
    'Section=combat,save ' +
    'Note="Bonus Push during Attack",' +
         '"+2 Dex vs. targeted spell, Dex save yields no damage instead of half"',
  'Skilled':
    'Section=skill Note="Skill Proficiency (Choose 3 from any)"',
  'Skulker':
    'Section=skill ' +
    'Note="Hide when lightly obscured, ranged miss does not reveal position, no Disadv on Perception in dim light"',
  'Spell Sniper':
    'Section=magic ' +
    'Note="Dbl attack spell range, ignore 3/4 cover, know additional attack cantrip"',
  'Tavern Brawler':
    'Section=ability,combat ' +
    'Note="+1 Constitution or Strength",' +
         '"Weapon Proficiency (Improvised)/Unarmed d4 damage/Bonus grapple after Unarmed or Improvised strike"',
  'Tough':'Section=combat Note="+%V HP"',
  'War Caster':
    'Section=magic ' +
    'Note="Adv on concentration to maintain spell, cast when holding shield and/or weapon, use Reaction to cast as OA"',
  'Weapon Master':
    'Section=ability,combat ' +
    'Note="+1 Dexterity or Strength",' +
         '"Weapon Proficiency (Choose 4 from any)"',
  // Races
  'Dark Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Drow Magic':'Section=magic Note="Cast %V"',
  'Drow Weapon Training':
    'Section=combat ' +
    'Note="Weapon Proficiency (Hand Crossbow/Rapier/Shortsword)"',
  'Dwarven Armor Training':'Section=combat Note="Armor Proficiency (Medium)"',
  'Fleet Of Foot':
    'Section=ability Note="+5 Speed"',
  'Forest Gnome Ability Adjustment':
    'Section=ability Note="+2 Intelligence/+1 Dexterity"',
  'Mask Of The Wild':
    'Section=skill Note="Hide in light natural coverage"',
  'Mountain Dwarf Ability Adjustment':
    'Section=ability Note="+2 Constitution/+2 Strength"',
  'Natural Illusionist':
    'Section=magic Note="<i>Minor Illusion</i> cantrip"',
  'Speak With Small Beasts':
    'Section=feature Note="Simple communication with small animals"',
  'Stout Halfling Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Stout Resilience':
    'Section=save Note="Adv vs. poison, resistance to poison damage"',
  'Sunlight Sensitivity':
    'Section=combat,skill ' +
    'Note="Disadv attack in direct sunlight",' +
         '"Disadv sight Perception in direct sunlight"',
  'Superior Darkvision':
    'Section=feature Note="R120\' See one light level better"',
  'Wood Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Wisdom"'
};
PHB5E.FEATURES = Object.assign({}, SRD5E.FEATURES, PHB5E.FEATURES_ADDED);
PHB5E.PATHS_ADDED = {
  'Arcane Trickster':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '3:Spellcasting,"3:Mage Hand Legerdemain","9:Magical Ambush",' +
      '"13:Versatile Trickster","17:Spell Thief" ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      'W1:3=2;4=3;7=4,' +
      'W2:7=2;10=3,' +
      'W3:13=2;16=3,' +
      'W4:19=1',
  'Assassin':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Assassin Bonus Proficiencies",3:Assassinate,' +
      '"9:Infiltration Expertise",13:Impostor,"17:Death Strike"',
  'Battle Master':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Student Of War","3:Combat Superiority","7:Know Your Enemy",' +
      '"10:Improved Combat Superiority",15:Relentless',
  'Beast Master':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Ranger\'s Companion","7:Exceptional Training","11:Bestial Fury",' +
      '"15:Share Spells"',
  'Circle Of The Land (Underdark)':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Druid Bonus Cantrip","2:Natural Recovery","6:Land\'s Stride",' +
      '"10:Nature\'s Ward","14:Nature\'s Sanctuary" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Underdark1:3=2,' +
      'Underdark2:5=2,' +
      'Underdark3:7=2,' +
      'Underdark4:9=2',
  'Circle Of The Moon':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Combat Wild Shape","2:Circle Forms","6:Primal Strike",' +
      '"10:Elemental Wild Shape","14:Thousand Forms"',
  'College Of Valor':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Bonus Skills","3:Combat Inspiration","3:Valor Bonus Proficiencies",' +
      '"6:Extra Attack","14:Battle Magic"',
  'Eldritch Knight':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '3:Spellcasting,"3:Weapon Bond","7:War Magic","10:Eldritch Strike",' +
      '"15:Arcane Charge","18:Improved War Magic" ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      'W0:3=2;10=3,' +
      'W1:3=2;4=3;7=4,' +
      'W2:7=2;10=3,' +
      'W3:13=2;16=3,' +
      'W4:19=1',
  'Knowledge Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Blessings Of Knowledge","2:Knowledge Of The Ages",' +
      '"6:Read Thoughts","8:Potent Spellcasting","17:Visions Of The Past" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Knowledge1:1=2,' +
      'Knowledge2:3=2,' +
      'Knowledge3:5=2,' +
      'Knowledge4:7=2,' +
      'Knowledge5:9=2',
  'Light Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Light Bonus Cantrip","1:Warding Flare","2:Radiance Of The Dawn",' +
      '"6:Improved Flare","8:Potent Spellcasting","17:Corona Of Light" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Light1:1=2,' +
      'Light2:3=2,' +
      'Light3:5=2,' +
      'Light4:7=2,' +
      'Light5:9=2',
  'Nature Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Acolyte Of Nature","1:Nature Bonus Proficiency",' +
      '"2:Charm Animals And Plants","6:Dampen Elements","8:Divine Strike",' +
      '"17:Master Of Nature" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Nature0:1=1,' +
      'Nature1:1=2,' +
      'Nature2:3=2,' +
      'Nature3:5=2,' +
      'Nature4:7=2,' +
      'Nature5:9=2',
  'Oath Of The Ancients':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Nature\'s Wrath","3:Turn The Faithless","7:Aura Of Warding",' +
      '"15:Undying Sentinel","20:Elder Champion" ' +
    'SpellAbility=charisma ' +
    'SpellSlots=' +
      'Ancients1:3=2,' +
      'Ancients2:5=2,' +
      'Ancients3:9=2,' +
      'Ancients4:13=2,' +
      'Ancients5:17=2',
  'Oath Of Vengeance':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Abjure Enemy","3:Vow Of Enmity","7:Relentless Avenger",' +
      '"15:Soul Of Vengeance","20:Avenging Angel" ' +
    'SpellAbility=charisma ' +
    'SpellSlots=' +
      'Vengeance1:3=2,' +
      'Vengeance2:5=2,' +
      'Vengeance3:9=2,' +
      'Vengeance4:13=2,' +
      'Vengeance5:17=2',
  'Path Of The Totem Warrior (Bear)':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Spirit Seeker","3:Bear Totem Spirit","6:Aspect Of The Bear",' +
      '"10:Spirit Walker","14:Bear Totemic Attunement"',
  'Path Of The Totem Warrior (Eagle)':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Spirit Seeker","3:Eagle Totem Spirit","6:Aspect Of The Eagle",' +
      '"10:Spirit Walker","14:Eagle Totemic Attunement"',
  'Path Of The Totem Warrior (Wolf)':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Spirit Seeker","3:Wolf Totem Spirit","6:Aspect Of The Wolf",' +
      '"10:Spirit Walker","14:Wolf Totemic Attunement"',
  'School Of Abjuration':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Abjuration Savant","2:Arcane Ward","6:Projected Ward",' +
      '"10:Improved Abjuration","14:Spell Resistance"',
  'School Of Conjuration':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Conjuration Savant","2:Minor Conjuration","6:Benign Transposition",' +
      '"10:Focused Conjuration","14:Durable Summons"',
  'School Of Divination':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Divination Savant",2:Portent,"6:Expert Divination",' +
      '"10:The Third Eye","14:Greater Portent"',
  'School Of Enchantment':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Enchantment Savant","2:Hypnotic Gaze","6:Instinctive Charm",' +
      '"10:Split Enchantment","14:Alter Memories"',
  'School Of Illusion':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Illusion Savant","2:Improved Minor Illusion",' +
      '"6:Malleable Illusions","10:Illusory Self","14:Illusory Reality"',
  'School Of Necromancy':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Necromancy Savant","2:Grim Harvest","6:Undead Thralls",' +
      '"10:Inured To Undeath","14:Command Undead"',
  'School Of Transmutation':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Transmutation Savant","2:Minor Alchemy","6:Transmuter\'s Stone",' +
      '10:Shapechanger,"14:Master Transmuter"',
  'Tempest Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Tempest Bonus Proficiencies","1:Wrath Of The Storm",' +
      '"2:Destructive Wrath","6:Thunderbolt Strike","8:Divine Strike",' +
      '17:Stormborn ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Tempest1:1=2,' +
      'Tempest2:3=2,' +
      'Tempest3:5=2,' +
      'Tempest4:7=2,' +
      'Tempest5:9=2',
  'The Archfey':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Fey Presence","6:Misty Escape","10:Beguiling Defenses",' +
      '"14:Dark Delirium"',
  'The Great Old One':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
        '"1:Awakened Mind","6:Entropic Ward","10:Thought Shield",' +
        '"14:Create Thrall"',
  'Trickery Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Blessing Of The Trickster","2:Invoke Duplicity",' +
      '"6:Trickster Cloak Of Shadows","8:Divine Strike",' +
      '"17:Improved Duplicity" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Trickery1:1=2,' +
      'Trickery2:3=2,' +
      'Trickery3:5=2,' +
      'Trickery4:7=2,' +
      'Trickery5:9=2',
  'War Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:War Bonus Proficiencies","1:War Priest","2:Guided Strike",' +
      '"6:War God\'s Blessing","8:Divine Strike","17:Avatar Of Battle" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'War1:1=2,' +
      'War2:3=2,' +
      'War3:5=2,' +
      'War4:7=2,' +
      'War5:9=2',
  'Way Of Shadow':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Shadow Arts","6:Shadow Step","11:Cloak Of Shadows",' +
      '17:Opportunist ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      'Shadow0:3=1,' +
      'Shadow2:3=4',
  'Way Of The Four Elements':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Disciple Of The Elements","3:Elemental Attunement"',
  'Wild Magic':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Wild Magic Surge","1:Tides Of Chaos","6:Bend Luck",' +
      '"14:Controlled Chaos","18:Spell Bombardment"'
};
PHB5E.PATHS = Object.assign({}, SRD5E.PATHS, PHB5E.PATHS_ADDED);
PHB5E.RACES_ADDED = {
  'Dark Elf':
    'Features=' +
      '"1:Dark Elf Ability Adjustment","1:Drow Magic",' +
      '"1:Drow Weapon Training","1:Fey Ancestry","1:Keen Senses",' +
      '"1:Sunlight Sensitivity","1:Superior Darkvision",1:Trance ' +
    'Languages=Common,Elvish ' +
    'SpellAbility=charisma ' +
    'SpellSlots=' +
      'Drow0:1=1,' +
      'Drow1:3=1,' +
      'Drow2:5=1',
  'Forest Gnome':
    'Features=' +
      '1:Darkvision,"1:Gnome Cunning","1:Natural Illusionist",' +
      '"1:Forest Gnome Ability Adjustment",1:Slow,1:Small,' +
      '"1:Speak With Small Beasts" ' +
    'Languages=Common,Gnomish ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      'Gnome0:1=1',
  'Mountain Dwarf':
    'Features=' +
      '"1:Tool Proficiency (Choose 1 from Brewer\'s Tools, Mason\'s Tools, Smith\'s Tools)",' +
      '1:Darkvision,"1:Dwarven Armor Training","1:Dwarven Combat Training",' +
      '"1:Dwarven Resilience","1:Mountain Dwarf Ability Adjustment",1:Slow,' +
      '1:Steady,1:Stonecunning ' +
    'Languages=Common,Dwarvish',
  'Stout Halfling':
    'Features=' +
      '1:Brave,"1:Halfling Nimbleness","1:Lucky Halfling",1:Slow,1:Small,' +
      '"1:Stout Halfling Ability Adjustment","1:Stout Resilience" ' +
    'Languages=Common,Halfling',
  'Wood Elf':
    'Features=' +
      '1:Darkvision,"1:Elf Weapon Training","1:Fey Ancestry",' +
      '"1:Fleet Of Foot","1:Keen Senses","1:Mask Of The Wild",1:Trance,' +
      '"1:Wood Elf Ability Adjustment" ' +
    'Languages=Common,Elvish'
};
PHB5E.RACES = Object.assign({}, SRD5E.RACES, PHB5E.RACES_ADDED);
PHB5E.SPELLS_ADDED = {

  'Arcane Gate':
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description="R10\'/500\' Connect portal pair for conc/10 min"',
  'Armor Of Agathys':
    'School=Abjuration ' +
    'Level=K1 ' +
    'Description="Self frosted, +5 HP, 5 HP cold to successful attacker"',
  'Arms Of Hadar':
    'School=Conjuration ' +
    'Level=K1 ' +
    'Description="All in 10\' radius take 2d6 HP necrotic (Str half), no Reaction until next tn"',
  'Aura Of Life':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description="Self 30\' radius gives resistance to necrotic damage, raise nonhostile 0 HP to 1 HP for conc/10 min"',
  'Aura Of Purity':
    'School=Abjuration ' +
    'Level=P4 ' +
    'Description="Self 30\' radius gives resistance to poison damage, no disease, Adv conditions for conc/10 min"',
  'Aura Of Vitality':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="Self 30\' radius heals 2d6 HP designated target 1/rd for conc/1 min"',
  'Banishing Smite':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description="Self attacks +5d10 HP force and banish to home/demiplane if target has less than 50 HP for conc/1 min"',
  'Beast Sense':
    'School=Divination ' +
    'Level=D2,R2 ' +
    'Description="Self use touched beast\'s senses for conc/1 hr"',
  'Blade Ward':
    'School=Abjuration ' +
    'Level=B0,K0,S0,W0 ' +
    'Description="Self resistance to bludgeoning, piercing, and slashing damage for 1 rd"',
  'Blinding Smite':
    'School=Evocation ' +
    'Level=P3 ' +
    'Description="Self next attack +3d8 HP radiant and blind (Con neg) for conc/1 min"',
  'Chromatic Orb':
    'School=Evocation ' +
    'Level=S1,W1 ' +
    'Description="R90\' 4 in hurled sphere 3d8 HP acid/poison/energy"',
  'Circle Of Power':
    'School=Abjuration ' +
    'Level=P5 ' +
    'Description="Allies in 30\' radius from self Adv save vs. magic, neg instead of half for conc/10 min"',
  'Cloud Of Daggers':
    'School=Conjuration ' +
    'Level=B2,K2,S2,W2 ' +
    'Description="R60\' Spinning daggers in 5\' cu 4d4 HP slashing for conc/1 min"',
  'Compelled Duel':
    'School=Enchantment ' +
    'Level=P1 ' +
    'Description="R30\' Target attack only self w/Disadv for conc/1 min (Wis neg)"',
  'Conjure Barrage':
    'School=Conjuration ' +
    'Level=R3 ' +
    'Description="60\' weapon cone 3d8 HP (Dex half)"',
  'Conjure Volley':
    'School=Conjuration ' +
    'Level=R5 ' +
    'Description="R150\' 40\' radius weapon hail 8d8 HP (Dex half)"',
  'Cordon Of Arrows':
    'School=Transmutation ' +
    'Level=R2 ' +
    'Description="Four pieces of ammo attack 30\' 1d6 HP (Dex neg) for 8 hr"',
  'Crown Of Madness':
    'School=Enchantment ' +
    'Level=B2,K2,S2,W2 ' +
    'Description="R120\' Direct charmed creature\'s attacks for conc/1 min (Wis neg)"',
  "Crusader's Mantle":
    'School=Evocation ' +
    'Level=P3,War3 ' +
    'Description="30\' radius allies +1d4 damage for conc/1 min"',
  'Destructive Wave':
    'School=Evocation ' +
    'Level=P5,Tempest5 ' +
    'Description="Targets in 30\' radius 5d6 HP (Con half), prone (Con neg)"',
  'Dissonant Whispers':
    'School=Enchantment ' +
    'Level=B1,K1 ' +
    'Description="R60\' Target 3d6 HP (Wis half), flee (Wis neg)"',
  'Elemental Weapon':
    'School=Transmutation ' +
    'Level=P3 ' +
    'Description="Touched weapon +1 attack, +1d4 damage for conc/1 hr"',
  'Ensnaring Strike':
    'School=Conjuration ' +
    'Level=Ancients1,R1 ' +
    'Description="Successful attack restrains foe, 1d6 HP/tn for conc/1 min (Str neg)"',
  'Feign Death':
    'School=Necromancy ' +
    'Level=B3,C3,D3,W3 ' +
    'Description="Touched appears dead for 1 hr"',
  'Friends':
    'School=Enchantment ' +
    'Level=B0,K0,S0,W0 ' +
    'Description="Self Adv Cha w/target for conc/1 min"',
  'Grasping Vine':
    'School=Conjuration ' +
    'Level=D4,Nature4,R4 ' +
    'Description="R30\' Vine pulls target 20\' for conc/1 min (Dex neg)"',
  'Hail Of Thorns':
    'School=Conjuration ' +
    'Level=R1 ' +
    'Description="Ranged hit followed by 5\' thorn rain 1d10 HP (Dex half)"',
  'Hex':
    'School=Enchantment ' +
    'Level=K1 ' +
    'Description="R90\' Self hits on target +1d6 HP, Disadv chosen ability for conc/1 hr"',
  'Hunger Of Hadar':
    'School=Conjuration ' +
    'Level=K3 ' +
    'Description="R150\' 20\' void 2d6 HP for conc/1 min"',
  'Lightning Arrow':
    'School=Transmutation ' +
    'Level=R3 ' +
    'Description="100\' bolt 8d6 HP (Dex half)"',
  "Mordenkainen's Sword":
    'School=Evocation ' +
    'Level=B7,W7 ' +
    'Description="Force weapon 3d10, move 20\' for conc/1 min"',
  'Phantasmal Force':
    'School=Illusion ' +
    'Level=B2,K2,S2,W2 ' +
    'Description="R60\' target illusion 1d6 HP/rd (Int neg)"',
  'Power Word Heal':
    'School=Evocation ' +
    'Level=B9 ' +
    'Description="Touched regains all HP, uncharmed, unfrightened, unparalyzed, unstunned"',
  'Ray Of Sickness':
    'School=Necromancy ' +
    'Level=S1,W1 ' +
    'Description="R60\' Target 2d8 HP, poisoned 1 tn (Con not poisoned)",',
  'Searing Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description="Hit +1d6 HP, 1d6 HP/tn for conc/1 min (Con no per-tn damage)"',
  'Staggering Smite':
    'School=Evocation ' +
    'Level=P4 ' +
    'Description="Next hit +4d6 HP w/in conc/1 min"',
  'Swift Quiver':
    'School=Transmutation ' +
    'Level=R5 ' +
    'Description="Touched quiver endless ammo, dbl attack for conc/1 min"',
  'Telepathy':
    'School=Evocation ' +
    'Level=W8 ' +
    'Description="Mental communication with ally for 1 dy"',
  'Thorn Whip':
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description="R30\' Vine attacks ${Math.floor((lvl+7)/6)}d6 HP, pulls 10\'"',
  'Thunderous Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description="Next hit 2d6 HP, push 10\' (Str no push)"',
  'Tsunami':
    'School=Conjuration ' +
    'Level=D8 ' +
    'Description="RSight 300\'x300\' wall of water 6d10 HP (Str half), moves away 50\'/tn for conc/6 rd"',
  'Witch Bolt':
    'School=Evocation ' +
    'Level=K1,S1,W1 ' +
    'Description="R30\' Target 1d12/tn for conc/1 min"',
  'Wrathful Smite':
    'School=Evocation ' +
    'Level=P1 ' +
    'Description="Next hit +1d6 HP and frightens (Wis neg) for conc/1 min"'

};
PHB5E.SPELLS_LEVELS_ADDED = {
  'Animal Friendship':'Nature1',
  'Arcane Eye':'Knowledge4',
  'Augury':'Knowledge2',
  'Bane':'Vengeance1',
  'Banishment':'Vengeance4',
  'Barkskin':'Nature2',
  'Black Tentacles':'K4',
  'Blink':'K3,Trickery3',
  'Burning Hands':'Light1',
  'Call Lightning':'Tempest3',
  'Calm Emotions':'K2',
  'Charm Person':'Trickery1',
  'Clairvoyance':'K3',
  'Cloudkill':'Underdark4',
  'Command':'Knowledge1',
  'Commune With Nature':'Ancients5',
  'Confusion':'Knowledge4',
  'Control Water':'Tempest4',
  'Dancing Lights':'Drow0',
  'Darkness':'Drow2,Shadow2',
  'Darkvision':'Shadow2',
  'Daylight':'Light3',
  'Detect Thoughts':'K2',
  'Dimension Door':'Trickery4,Vengeance4',
  'Disguise Self':'Trickery1',
  'Dispel Magic':'Trickery3',
  'Divine Favor':'War1',
  'Dominate Beast':'K4,K4,Nature4',
  'Dominate Person':'K5,Trickery5',
  'Druidcraft':'Nature0',
  'Faerie Fire':'Drow1,K1,Light1',
  'Fireball':'Light3',
  'Flame Strike':'Light5,War5',
  'Flaming Sphere':'Light2',
  'Fog Cloud':'Tempest1',
  'Freedom Of Movement':'War4',
  'Gaseous Form':'Underdark2',
  'Greater Invisibility':'K4,Underdark3',
  'Guardian Of Faith':'Light4',
  'Guidance':'Nature0',
  'Gust Of Wind':'Tempest2',
  'Haste':'Vengeance3',
  'Hideous Laughter':'K1',
  'Hold Monster':'Vengeance5,War5',
  'Hold Person':'Vengeance2',
  'Hunter\'s Mark':'Vengeance1',
  'Ice Storm':'Ancients4,Tempest4',
  'Identify':'Knowledge1',
  'Insect Plague':'Nature5,Tempest5,Underdark4',
  'Legend Lore':'Knowledge5',
  'Magic Weapon':'War2',
  'Mending':'Nature0',
  'Minor Illusion':'Gnome0,Shadow0',
  'Mirror Image':'Trickery2',
  'Misty Step':'Ancients2,Vengeance2',
  'Modify Memory':'Trickery5',
  'Moonbeam':'Ancients2',
  'Nondetection':'Knowledge3',
  'Pass Without Trace':'Shadow2,Trickery2',
  'Plant Growth':'Ancients3,K3,Nature3',
  'Poison Spray':'Nature0',
  'Polymorph':'Trickery4',
  'Produce Flame':'Nature0',
  'Protection From Energy':'Ancients3,Vengeance3',
  'Resistance':'Nature0',
  'Scorching Ray':'Light2',
  'Scrying':'Knowledge5,Light5,Vengeance5',
  'Seeming':'K5',
  'Sending':'K3',
  'Shatter':'Tempest2',
  'Shield Of Faith':'War1',
  'Shillelagh':'Nature0',
  'Silence':'Shadow2',
  'Sleep':'K1',
  'Sleet Storm':'Tempest3',
  'Speak With Animals':'Ancients1,Nature1',
  'Speak With Dead':'Knowledge3',
  'Spider Climb':'Underdark1',
  'Spike Growth':'Nature2',
  'Spirit Guardians':'War3',
  'Spiritual Weapon':'War2',
  'Stinking Cloud':'Underdark2',
  'Stone Shape':'Underdark3',
  'Stoneskin':'Ancients4,War4',
  'Suggestion':'Knowledge2',
  'Telekinesis':'K5',
  'Thunderwave':'Tempest1',
  'Tree Stride':'Ancients5,Nature5',
  'Wall Of Fire':'Light4',
  'Web':'Underdark1',
  'Wind Wall':'Nature3'
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
for(var s in PHB5E.SPELLS_LEVELS_ADDED) {
  PHB5E.SPELLS[s] =
    PHB5E.SPELLS[s].replace('Level=', 'Level=' + PHB5E.SPELLS_LEVELS_ADDED[s] + ',');
}
for(var s in PHB5E.SPELLS_RENAMED) {
  PHB5E.SPELLS[PHB5E.SPELLS_RENAMED[s]] = PHB5E.SPELLS[s];
  delete PHB5E.SPELLS[s];
}
PHB5E.DEITIES_ADDED = {
  // Allow clerics w/no deity to have a domain
  'None':'Domain=' + QuilvynUtils.getKeys(PHB5E.PATHS).filter(x => x.match(/Domain$/)).map(x => x.replace(' Domain', '')).join(','),
  // Forgotten Realms
  'FR-Auril':'Alignment=NE Domain=Nature,Tempest',
  'FR-Azuth':'Alignment=LN Domain=Knowledge',
  'FR-Bane':'Alignment=LE Domain=War',
  'FR-Beshaba':'Alignment=CE Domain=Trickery',
  'FR-Bhaal':'Alignment=NE Domain=Death',
  'FR-Chauntea':'Alignment=NG Domain=Life',
  'FR-Cyric':'Alignment=CE Domain=Trickery',
  'FR-Deneir':'Alignment=NG Domain=Knowledge',
  'FR-Eldath':'Alignment=NG Domain=Life,Nature',
  'FR-Gond':'Alignment=N Domain=Knowledge',
  'FR-Helm':'Alignment=LN Domain=Life,Light',
  'FR-Ilmater':'Alignment=LG Domain=Life',
  'FR-Kelemvor':'Alignment=LN Domain=Death',
  'FR-Lathander':'Alignment=NG Domain=Life,Light',
  'FR-Leira':'Alignment=CN Domain=Trickery',
  'FR-Lliira':'Alignment=CG Domain=Life',
  'FR-Loviatar':'Alignment=LE Domain=Death',
  'FR-Malar':'Alignment=CE Domain=Nature',
  'FR-Mask':'Alignment=CN Domain=Trickery',
  'FR-Mielikki':'Alignment=NG Domain=Nature',
  'FR-Milil':'Alignment=NG Domain=Light',
  'FR-Myrkul':'Alignment=NE Domain=Death',
  'FR-Mystra':'Alignment=NG Domain=Knowledge',
  'FR-Oghma':'Alignment=N Domain=Knowledge',
  'FR-Savras':'Alignment=LN Domain=Knowledge',
  'FR-Selune':'Alignment=CG Domain=Knowledge,Life',
  'FR-Shar':'Alignment=NE Domain=Death,Trickery',
  'FR-Silvanus':'Alignment=N Domain=Nature',
  'FR-Sune':'Alignment=CG Domain=Life,Light',
  'FR-Talona':'Alignment=CE Domain=Death',
  'FR-Talos':'Alignment=CE Domain=Tempest',
  'FR-Tempus':'Alignment=N Domain=War',
  'FR-Torm':'Alignment=LG Domain=War',
  'FR-Tymora':'Alignment=CG Domain=Trickery',
  'FR-Tyr':'Alignment=LG Domain=War',
  'FR-Umberlee':'Alignment=CE Domain=Tempest',
  'FR-Waukeen':'Alignment=N Domain=Knowledge,Trickery',
  // Greyhawk
  'Greyhawk-Beory':'Alignment=N Domain=Nature',
  'Greyhawk-Boccob':'Alignment=N Domain=Knowledge',
  'Greyhawk-Celestian':'Alignment=N Domain=Knowledge',
  'Greyhawk-Ehlonna':'Alignment=NG Domain=Life,Nature',
  'Greyhawk-Erythnul':'Alignment=CE Domain=War',
  'Greyhawk-Fharlanghn':'Alignment=NG Domain=Knowledge,Trickery',
  'Greyhawk-Heironeous':'Alignment=LG Domain=War',
  'Greyhawk-Hextor':'Alignment=LE Domain=War',
  'Greyhawk-Kord':'Alignment=CG Domain=Tempest,War',
  'Greyhawk-Incabulous':'Alignment=NE Domain=Death',
  'Greyhawk-Istus':'Alignment=N Domain=Knowledge',
  'Greyhawk-Iuz':'Alignment=CE Domain=Death',
  'Greyhawk-Nerull':'Alignment=NE Domain=Death',
  'Greyhawk-Obad-Hai':'Alignment=N Domain=Nature',
  'Greyhawk-Olidammara':'Alignment=CN Domain=Trickery',
  'Greyhawk-Pelor':'Alignment=NG Domain=Life,Light',
  'Greyhawk-Pholtus':'Alignment=LG Domain=Light',
  'Greyhawk-Ralishaz':'Alignment=CN Domain=Trickery',
  'Greyhawk-Rao':'Alignment=LG Domain=Knowledge',
  'Greyhawk-St. Cuthbert':'Alignment=LN Domain=Knowledge',
  'Greyhawk-Tharizdun':'Alignment=CE Domain=Trickery',
  'Greyhawk-Trithereon':'Alignment=CG Domain=War',
  'Greyhawk-Ulaa':'Alignment=LG Domain=Life,War',
  'Greyhawk-Vecna':'Alignment=NE Domain=Knowledge',
  'Greyhawk-Wee Jas':'Alignment=LN Domain=Death,Knowledge',
  // Nonhuman
  'NH-Bahamut':'Alignment=LG Domain=Life,War Sphere=Dragon',
  'NH-Blibdoolpoolp':'Alignment=NE Domain=Death Sphere=Kuo-Toa',
  'NH-Corellon Larethian':'Alignment=CG Domain=Light Sphere=Elf',
  'NH-Deep Sashelas':'Alignment=CG Domain=Nature,Tempest Sphere=Elf',
  'NH-Eadro':'Alignment=N Domain=Nature,Tempest Sphere=Merfolk',
  'NH-Garl Glittergold':'Alignment=LG Domain=Trickery Sphere=Gnome',
  'NH-Grolantor':'Alignment=CE Domain=War Sphere="Hill Giant"',
  'NH-Gruumsh':'Alignment=CE Domain=Tempest,War Sphere=Orc',
  'NH-Hruggek':'Alignment=CE Domain=War Sphere=Bugbear',
  'NH-Kurtulmak':'Alignment=LE Domain=War Sphere=Kobold',
  'NH-Laogzed':'Alignment=CE Domain=Death Sphere=Troglodyte',
  'NH-Lolth':'Alignment=CE Domain=Trickery Sphere=Drow',
  'NH-Maglubiyet':'Alignment=LE Domain=War Sphere=Goblinoid',
  'NH-Moradin':'Alignment=LG Domain=Knowledge Sphere=Dwarf',
  'NH-Rillifane Rallathil':'Alignment=CG Domain=Nature Sphere=Elf',
  'NH-Sehanine Moonbow':'Alignment=CG Domain=Knowledge Sphere=Elf',
  'NH-Sekolah':'Alignment=LE Domain=Nature,Tempest Sphere=Sahuagin',
  'NH-Semuanya':'Alignment=N Domain=Life Sphere=Lizardfolk',
  'NH-Skerrit':'Alignment=N Domain=Knowledge Sphere=Centaur',
  'NH-Skoraeus Stonebones':'Alignment=N Domain=Knowledge Sphere="Stone Giant"',
  'NH-Surtur':'Alignment=LE Domain=Knowledge,War Sphere="Fire Giant"',
  'NH-Thryn':'Alignment=CE Domain=War Sphere="Frost Giant"',
  'NH-Tiamat':'Alignment=LE Domain=Trickery Sphere=Dragon',
  'NH-Yondalla':'Alignment=LG Domain=Life Sphere=Halfling'
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
  else if(type == 'Path')
    PHB5E.pathRulesExtra(rules, name);
  else if(type == 'Race')
    PHB5E.raceRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
PHB5E.classRulesExtra = function(rules, name) {
  if(name == 'Monk') {
    rules.defineRule('magicNotes.fistOfUnbrokenAir', 'kiSaveDC', '=', null);
    rules.defineRule('magicNotes.waterWhip', 'kiSaveDC', '=', null);
  } else if(name == 'Paladin') {
    rules.defineRule
      ('combatNotes.avengingAngel', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('magicNotes.abjureEnemy', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ("magicNotes.nature'sWrath", 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('magicNotes.turnTheFaithless', 'spellDifficultyClass.P', '=', null);
  } else if(name == 'Ranger') {
    rules.defineRule
      ("featureNotes.ranger'sCompanion", 'levels.Ranger', '=', '"1/4"');
  } else if(name == 'Warlock') {
    rules.defineRule
      ('magicNotes.darkDelirium', 'spellDifficultyClass.K', '=', null);
    rules.defineRule
      ('magicNotes.feyPresence', 'spellDifficultyClass.K', '=', null);
    rules.defineRule
      ('saveNotes.beguilingDefenses', 'spellDifficultyClass.K', '=', null);
  } else if(name == 'Wizard') {
    rules.defineRule
      ('magicNotes.alterMemories.1', 'spellDifficultyClass.W', '=', null);
    rules.defineRule
      ('magicNotes.commandUndead', 'spellDifficultyClass.W', '=', null);
    rules.defineRule
      ('magicNotes.hypnoticGaze', 'spellDifficultyClass.W', '=', null);
    rules.defineRule
      ('magicNotes.instinctiveCharm', 'spellDifficultyClass.W', '=', null);
  }
};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
PHB5E.featRulesExtra = function(rules, name) {

  var matchInfo;

  if(name == 'Alert') {
    rules.defineRule('initiative', 'combatNotes.alert', '+', '5');
  } else if(name == 'Athlete') {
    rules.defineRule('abilityBoosts', 'abilityNotes.athlete', '+=', '1');
  } else if(name == 'Defensive Duelist') {
    rules.defineRule
      ('combatNotes.defensiveDuelist', 'proficiencyBonus', '=', null);
  } else if(name == 'Durable') {
    rules.defineRule('combatNotes.durable',
      'constitutionModifier', '=', 'Math.max(source * 2, 2)'
    );
  } else if(name == 'Inspiring Leader') {
    rules.defineRule('featureNotes.inspiringLeader',
      'level', '=', null,
      'charismaModifier', '+', null
    );
  } else if(name == 'Lightly Armored') {
    rules.defineRule('abilityBoosts', 'abilityNotes.lightlyArmored', '+=', '1');
  } else if(name == 'Linguist') {
    rules.defineRule('featureNotes.linguist',
      'intelligence', '=', null,
      'proficiencyBonus', '+', null
    );
  } else if((matchInfo = name.match(/Magic\sInitiate\s.(.*)./)) != null) {
    var clas = matchInfo[1];
    var spellCode = clas == 'Warlock' ? 'K' : clas.charAt(0);
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
    'Note="Use %Vd%1 Superiority Dice to perform %2 chosen Maneuvers/short rest"',
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
    var selectables = rules.getChoices('selectableFeatures');
    for(var s in selectables) {
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
  } else if(name == 'Moderately Armored') {
    rules.defineRule
      ('abilityBoosts', 'abilityNotes.moderatelyArmored', '+=', '1');
  } else if(name == 'Observant') {
    rules.defineRule('abilityBoosts', 'abilityNotes.observant', '+=', '1');
  } else if(name == 'Tavern Brawler') {
    rules.defineRule('abilityBoosts', 'abilityNotes.tavernBrawler', '+=', '1');
    rules.defineRule
      ('weapons.Unarmed.2', 'combatNotes.tavernBrawler', '^=', '"1d4"');
  } else if(name == 'Tough') {
    rules.defineRule('combatNotes.tough', 'level', '=', '2 * source');
  } else if(name == 'Weapon Master') {
    rules.defineRule('abilityBoosts', 'abilityNotes.weaponMaster', '+=', '1');
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.weaponMaster', '+=', '4');
  }

};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
PHB5E.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  if(name == 'Arcane Trickster') {

    rules.defineRule('magicNotes.spellThief',
      'intelligenceModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );

  } else if(name == 'Assassin') {

    rules.defineRule('combatNotes.deathStrike',
      'dexterityModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );

  } else if(name == 'Battle Master') {

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
      pathLevel, '=', 'source<7 ? 4 : source<15 ? 5 : 6'
    );
    rules.defineRule('combatNotes.combatSuperiority.1',
      'combatNotes.improvedCombatSuperiority', '=', null
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      pathLevel, '=', 'source<7 ? 3 : source<10 ? 5 : source<15 ? 7 : 9'
    );
    rules.defineRule
      ('combatNotes.disarmingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.goadingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.improvedCombatSuperiority',
      pathLevel, '=', 'source<18 ? 10 : 12'
    );
    rules.defineRule('combatNotes.menacingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.parry', 'dexterityModifier', '=', null);
    rules.defineRule('combatNotes.pushingAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('combatNotes.rally', 'charismaModifier', '=', null);
    rules.defineRule('combatNotes.tripAttack', 'maneuverSaveDC', '=', null);
    rules.defineRule('selectableFeatureCount.Fighter (Maneuver)',
      'combatNotes.combatSuperiority.2', '=', null
    );

  } else if(name == 'Circle Of The Moon') {

    rules.defineRule
      ('magicNotes.wildShape.1', 'magicNotes.circleForms', '=', null);
    rules.defineRule('magicNotes.circleForms',
      pathLevel, '=', 'source < 6 ? 1 : Math.floor(source / 3)'
    );

  } else if(name == 'College Of Valor') {

    rules.defineRule('bardExtraAttacks',
      'bardFeatures.Extra Attack', '?', null,
      pathLevel, '=', 'source<6 ? null : 1'
    );
    rules.defineRule('combatNotes.extraAttack', 'bardExtraAttacks', '+=', null);
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Medium',
      'combatNotes.valorBonusProficiencies', '=', '1'
    );
    rules.defineRule('armorProficiency.Shield',
      'combatNotes.valorBonusProficiencies', '=', '1'
    );
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.valorBonusProficiencies', '=', '1'
    );

  } else if(name == 'Eldritch Knight') {

    rules.defineRule('combatNotes.warMagic',
      pathLevel, '=', '"cantrip"',
      'combatNotes.improvedWarMagic', '=', '"any spell"'
    );

  } else if(name == 'Knowledge Domain') {

    rules.defineRule
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
    rules.defineRule
      ('skillChoices.Arcana', 'skillNotes.blessingsOfKnowledge', '=', '1');
    rules.defineRule
      ('skillChoices.History', 'skillNotes.blessingsOfKnowledge', '=', '1');
    rules.defineRule
      ('skillChoices.Nature', 'skillNotes.blessingsOfKnowledge', '=', '1');
    rules.defineRule
      ('skillChoices.Religion', 'skillNotes.blessingsOfKnowledge', '=', '1');

  } else if(name == 'Light Domain') {

    rules.defineRule
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
    rules.defineRule('magicNotes.radianceOfTheDawn', pathLevel, '=', null);
    rules.defineRule
      ('magicNotes.wardingFlare', 'wisdomModifier', '=', 'Math.max(source, 1)');

  } else if(name == 'Nature Domain') {

    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1',
      pathLevel, '=', '"cold, fire, or lightning"'
    );
    rules.defineRule
      ('skillChoices.Animal Handling', 'skillNotes.acolyteOfNature', '=', '1');
    rules.defineRule
      ('skillChoices.Nature', 'skillNotes.acolyteOfNature', '=', '1');
    rules.defineRule
      ('skillChoices.Survival', 'skillNotes.acolyteOfNature', '=', '1');

  } else if(name == 'Oath Of The Ancients') {

    rules.defineRule
      ('saveNotes.auraOfWarding', pathLevel, '=', 'source<18 ? 10 : 30');

  } else if(name == 'Path Of The Totem Warrior (Bear)') {

    rules.defineRule('carry', 'abilityNotes.aspectOfTheBear', '*', '2');
    rules.defineRule('lift', 'abilityNotes.aspectOfTheBear', '*', '2');

  } else if(name == 'School Of Abjuration') {

    rules.defineRule('magicNotes.arcaneWard',
      pathLevel, '=', 'source * 2',
      'intelligenceModifier', '+', null
    );

  } else if(name == 'School Of Divination') {

    rules.defineRule('magicNotes.portent',
      pathLevel, '=', '2',
      'magicNotes.greaterPortent', '^', '3'
    );

  } else if(name == 'School Of Enchantment') {

    rules.defineRule('magicNotes.alterMemories',
      'charismaModifier', '=', 'Math.max(source + 1, 1)'
    );

  } else if(name == 'School Of Necromancy') {

    rules.defineRule('magicNotes.undeadThralls', pathLevel, '=', null);
    rules.defineRule
      ('magicNotes.undeadThralls.1', 'proficiencyBonus', '=', null);

  } else if(name == 'Tempest Domain') {

    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1', pathLevel, '=', '"thunder"');
    rules.defineRule('combatNotes.wrathOfTheStorm',
      'wisdomModifier', '=', 'Math.max(source, 1)'
    );
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Heavy',
      'combatNotes.tempestBonusProficiencies', '=', '1'
    );
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.tempestBonusProficiencies', '=', '1'
    );

  } else if(name == 'Trickery Domain') {

    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1', pathLevel, '=', '"poison"');
    rules.defineRule('magicNotes.invokeDuplicity',
      pathLevel, '=', '"1 illusionary duplicate"',
      'magicNotes.improvedDuplicity', '=', '"4 illusionary duplicates"'
    );

  } else if(name == 'War Domain') {

    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule
      ('combatNotes.divineStrike.1', pathLevel, '=', '"weapon damage type"');
    rules.defineRule
      ('combatNotes.warPriest', 'wisdomModifier', '=', 'Math.max(source, 1)');
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Heavy', 'combatNotes.warBonusProficiencies', '=', '1');
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.warBonusProficiencies', '=', '1'
    );

  } else if(name == 'Way Of The Four Elements') {

    rules.defineRule('magicNotes.discipleOfTheElements',
      'monkFeatures.Way Of The Four Elements', '?', null,
      pathLevel, '=', 'Math.floor( (source + 4) / 5)'
    );
    rules.defineRule('selectableFeatureCount.Monk (Elemental Discipline)',
      'magicNotes.discipleOfTheElements', '=', null
    );

  }

};

/*
 * Defines in #rules# the rules associated with race #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
PHB5E.raceRulesExtra = function(rules, name) {
  if(name == 'Dark Elf') {
    rules.defineRule('magicNotes.drowMagic',
      'race', '?', 'source == "Dark Elf"',
      'level', '=',
        'source<3 ? "<i>Dancing Lights</i> cantrip" : ' +
        'source<5 ? "<i>Dancing Lights</i> cantrip, <i>Faerie Fire</i> 1/long rest" : ' +
        '"<i>Dancing Lights</i> cantrip, <i>Faerie Fire</i> 1/long rest, <i>Darkness</i> 1/long rest"'
    );
  }
};

/* Returns an array of plugins upon which this one depends. */
PHB5E.getPlugins = function() {
  var result = [SRD5E];
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
