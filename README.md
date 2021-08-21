## PHB5E plugin for the Quilvyn RPG character sheet generator

The quilvyn-phb5E package bundles modules that apply additional rules from the
<a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_playershandbook">Fifth Edition Players Handbook</a>

### Requirements

quilvyn-phb5e relies on the 5th Edition SRD module and the core modules
installed by the quilvyn-core package.

### Installation

To use quilvyn-phb5e, unbundle the release package into the plugins/
subdirectory within the Quilvyn installation directory, then append the
following lines to the file plugins/plugins.js:

    RULESETS['D&D 5E'] = {
      url:'PHB5E.js',
      group:'5E',
      require:'5E (SRD only)'
    };

### Usage

Once the PHB5E plugin is installed as described above, start Quilvyn and choose
5E from the Rules menu in the editor window.
