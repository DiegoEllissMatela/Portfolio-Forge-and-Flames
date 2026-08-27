export const MENU_ITEMS = [
    // Featured
    {
        id: 'grand-tomahawk',
        category: 'cuts',
        title: 'The Grand Tomahawk',
        subtitle: '40oz Dry-Aged Long-Bone Ribeye',
        price: '₱9,500',
        desc: 'Aged 45 days in our Himalayan salt vault. Charred at 1,200°F over white oak, basted in bone marrow tallow, and sliced tableside. Served with a flight of house compound butters and black garlic jus.',
        pairing: '2018 Opus One Cabernet Sauvignon',
        badges: ['GF', 'FOR TWO'],
        featured: true,
        img: new URL('../design/images/menu-tomahawk.jpg', import.meta.url).href
    },
    // Starters
    {
        id: 'bone-marrow-toast',
        category: 'starters',
        title: 'Bone Marrow Toast',
        price: '₱1,350',
        desc: 'Wood-fired sourdough, roasted garlic jam, pickled shallots, fresh parsley salad with fleur de sel.',
        pairing: '2021 Napa Valley Cabernet Sauvignon',
        badges: ['DF']
    },
    {
        id: 'charred-spanish-octopus',
        category: 'starters',
        title: 'Charred Spanish Octopus',
        price: '₱1,580',
        desc: 'Smoked paprika aioli, crispy fingerling potatoes, salsa verde, charred lemon.',
        pairing: '2022 Albariño, Rías Baixas',
        badges: ['GF', 'DF']
    },
    {
        id: 'a5-wagyu-sliders',
        category: 'starters',
        title: 'A5 Wagyu Sliders (3pcs)',
        price: '₱1,800',
        desc: 'Truffle pecorino fondue, caramelized sweet onions, toasted milk brioche.',
        pairing: 'Smoked Old Fashioned',
        badges: ['Chef Pick']
    },
    {
        id: 'steak-tartare',
        category: 'starters',
        title: 'Steak Tartare aux Truffes',
        price: '₱1,450',
        desc: 'Hand-cut prime tenderloin, cured egg yolk, caperberries, grilled levain crisps.',
        pairing: 'Champagne Brut Nature',
        badges: ['DF']
    },
    // Cuts
    {
        id: 'bone-in-ribeye',
        category: 'cuts',
        title: 'Bone-In Ribeye (24oz)',
        price: '₱4,850',
        desc: '24oz prime cut, heavily marbled, crusted in coarse sel gris and marrow tallow butter.',
        pairing: '2019 Barolo DOCG',
        badges: ['GF', '45-Day Aged'],
        img: new URL('../design/images/dish-ribeye.jpg', import.meta.url).href
    },
    {
        id: 'prime-porterhouse',
        category: 'cuts',
        title: 'Prime Porterhouse (32oz)',
        price: '₱6,800',
        desc: 'Combination of tender tenderloin and rich New York strip on bone.',
        pairing: '2020 Bordeaux Grand Cru',
        badges: ['GF', 'FOR TWO']
    },
    {
        id: 'a5-miyazaki-striploin',
        category: 'cuts',
        title: 'A5 Miyazaki Striploin (8oz)',
        price: '₱7,900',
        desc: 'Authentic Japanese black cattle wagyu with BMS 11 rating, seared on binchotan coals.',
        pairing: 'Hibiki Japanese Harmony Highball',
        badges: ['GF', 'A5 Wagyu']
    },
    {
        id: 'wood-fired-filet-mignon',
        category: 'cuts',
        title: 'Wood-Fired Filet Mignon (10oz)',
        price: '₱3,950',
        desc: 'Center-cut tenderloin basted in duck fat herb butter, red wine shallot reduction.',
        pairing: '2019 Willamette Valley Pinot Noir',
        badges: ['GF']
    },
    // Pit
    {
        id: 'a5-wagyu-brisket',
        category: 'pit',
        title: 'A5 Wagyu Brisket (14-Hour Smoked)',
        price: '₱3,250',
        desc: 'Miyazaki wagyu flat, deeply barked with toasted peppercorn and brushed with honey gastrique.',
        pairing: 'Bourbon Barrel Stout',
        badges: ['GF', 'Cherry Wood'],
        img: new URL('../design/images/dish-brisket.jpg', import.meta.url).href
    },
    {
        id: 'iberico-pork-chops',
        category: 'pit',
        title: 'Oak-Smoked Iberico Pork Chops',
        price: '₱2,850',
        desc: 'Acorn-fed Spanish black pig, stone-ground mustard glaze, charred heirloom peaches.',
        pairing: '2020 Rioja Gran Reserva',
        badges: ['GF', 'DF']
    },
    {
        id: 'pit-smoked-duck-breast',
        category: 'pit',
        title: 'Pit-Smoked Maple Duck Breast',
        price: '₱2,600',
        desc: 'Crispy skin, blackberry balsamic reduction, parsnip purée, pickled mustard seeds.',
        pairing: '2021 Oregon Pinot Noir',
        badges: ['GF']
    },
    // Sides
    {
        id: 'truffle-bone-marrow-mac',
        category: 'sides',
        title: 'Truffle & Bone Marrow Mac',
        price: '₱850',
        desc: 'Aged gruyère, smoked gouda, black winter truffle crust, toasted breadcrumbs.',
        pairing: 'Chardonnay, Sonoma Coast',
        badges: ['Chef Pick']
    },
    {
        id: 'charred-broccolini',
        category: 'sides',
        title: 'Charred Wood-Fired Broccolini',
        price: '₱650',
        desc: 'Calabrian chili oil, shaved pecorino romano, toasted garlic crisps.',
        pairing: 'Sauvignon Blanc',
        badges: ['GF']
    },
    {
        id: 'duck-fat-potatoes',
        category: 'sides',
        title: 'Crispy Duck Fat Potatoes',
        price: '₱720',
        desc: 'Triple-cooked Yukon golds, rosemary sea salt, smoked garlic aioli.',
        pairing: 'Craft IPA',
        badges: ['GF', 'DF']
    },
    {
        id: 'ember-roasted-carrots',
        category: 'sides',
        title: 'Ember-Roasted Heritage Carrots',
        price: '₱680',
        desc: 'Whipped goat cheese, spiced wildflower honey, pistachio dukkah.',
        pairing: 'Dry Riesling',
        badges: ['GF']
    },
    // Libations
    {
        id: 'smoked-hickory-old-fashioned',
        category: 'libations',
        title: 'The Smoked Hickory Old Fashioned',
        price: '₱750',
        desc: 'Small batch bourbon, charred oak bitters, demerara, torched orange peel cloche smoke.',
        pairing: 'Recommended with Signature Steaks',
        badges: ['Cocktail']
    },
    {
        id: 'charcoal-mezcal-paloma',
        category: 'libations',
        title: 'Activated Charcoal Mezcal Paloma',
        price: '₱720',
        desc: 'Artisanal mezcal, fresh ruby red grapefruit, smoked sea salt rim, agave.',
        pairing: 'Recommended with Starters',
        badges: ['Cocktail', 'DF']
    },
    {
        id: 'opus-one-vintage',
        category: 'libations',
        title: '2018 Opus One, Napa Valley (Bottle)',
        price: '₱42,000',
        desc: 'Cabernet Sauvignon blend. Notes of cassis, black cherry, dark chocolate and briar wood.',
        pairing: 'Optimal Pairing: The Grand Tomahawk',
        badges: ['Cellar Vault']
    },
    {
        id: 'chateau-margaux',
        category: 'libations',
        title: '2015 Château Margaux Premier Grand Cru',
        price: '₱78,000',
        desc: 'Legendary Bordeaux. Pure velvet, cedar, violets, and concentrated black fruit.',
        pairing: 'Optimal Pairing: A5 Miyazaki Wagyu',
        badges: ['Cellar Vault']
    }
];
