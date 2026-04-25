## PHB5E plugin for the Quilvyn RPG character sheet generator

The quilvyn-phb5E package bundles modules that apply additional rules from the
<a href="https://marketplace.dndbeyond.com/core-rules/players-handbook?pid=SRC-00002">Fifth Edition Players Handbook</a> and the <a href="https://marketplace.dndbeyond.com/category/3709000?pid=DB3709000">5.5 Edition Players Handbook</a>

### Requirements

quilvyn-phb5e relies on the 5th Edition SRD SRD modules installed by the
quilvyn-5E package and the core modules installed by the quilvyn-core package.
The 5.5 Edition plugin also relies on the Tasha and Xanathar modules installed
by the quilvyn-5e-supplements package.

### Installation

To use quilvyn-phb5e, unbundle the release package, making sure that the
contents of the plugins/ subdirectory are placed into the corresponding Quilvyn
installation subdirectory, then append the following lines to the file
plugins/plugins.js:

    RULESETS['D&D 5E'] = {
      url:'plugins/PHB5E.js',
      group:'5E',
      require:'SRD5E.js'
    };
    RULESETS['D&D 5.5E'] = {
      url:'plugins/PHB5E2024.js',
      group:'5E',
      require:['PHB5E.js', 'SRD5E2024.js', 'Tasha.js', 'Xanathar.js']
    };

### Usage

Once the PHB5E plugin is installed as described above, start Quilvyn and check
the box next to "D&D 5E" or "D&D 5.5E" from the rule sets menu in the initial
window.
