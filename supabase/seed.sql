-- =========================================================================
-- NOVERE  ·  Seed data: 12 premium residences
-- Run after 0001_init.sql. Idempotent (truncates + reloads).
-- Images are Unsplash CDN URLs (free for commercial use).
-- =========================================================================

truncate table public.properties restart identity cascade;

insert into public.properties
  (title, description, price, type, deal_type, location, area, bedrooms, bathrooms, images, featured)
values
-- ---- Villas ----
(
  'Villa Belvédère',
  'A serene lakeside villa on the Geneva shoreline, designed by atelier Garcia & Léonard. Limestone façade, oak interiors, infinity pool extending toward the water.',
  18750000, 'villa', 'sale', 'Cologny, Geneva',
  720, 6, 7,
  array[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80&auto=format&fit=crop'
  ],
  true
),
(
  'Villa Mer du Sud',
  'Provençal estate above the Bay of Pampelonne with private vineyards and a 20-metre lap pool. Restored in 2022 under heritage protection.',
  24500000, 'villa', 'sale', 'Saint-Tropez, France',
  890, 7, 8,
  array[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80&auto=format&fit=crop'
  ],
  true
),
(
  'Villa Palmera',
  'Contemporary glass-and-stone residence on Palm Jumeirah, with private beach frontage and unobstructed Atlantis views.',
  9800000, 'villa', 'sale', 'Palm Jumeirah, Dubai',
  640, 5, 6,
  array[
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),
(
  'Villa Cipresso',
  'A Renaissance-era residence above Lake Como, restored with Carrara marble baths and an olive grove of 400 trees.',
  35000, 'villa', 'rent', 'Bellagio, Lake Como',
  1100, 9, 10,
  array[
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),

-- ---- Penthouses ----
(
  'Penthouse Monte-Carlo One',
  'Triplex penthouse at the apex of Monte-Carlo One, with 360° views from Cap Martin to Cap Ferrat. Private rooftop with heated pool.',
  62000000, 'penthouse', 'sale', 'Monte-Carlo, Monaco',
  680, 5, 6,
  array[
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop'
  ],
  true
),
(
  'Sky Loft One Za''abeel',
  'A sculpted duplex penthouse facing the Burj Khalifa skyline, with cantilevered terrace and private sky-pool.',
  14200000, 'penthouse', 'sale', 'Downtown, Dubai',
  520, 4, 5,
  array[
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),
(
  'Penthouse Rive Droite',
  'A discreet 5th-floor penthouse on Geneva''s Right Bank, with copper-clad roof terrace and uninterrupted lake panorama.',
  29500, 'penthouse', 'rent', 'Pâquis, Geneva',
  340, 3, 3,
  array[
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),
(
  'Penthouse Saint-James',
  'Rooftop penthouse on Avenue Saint-Michel with views over the Royal Palace gardens. Cherrywood floors, fireplace in the principal suite.',
  8600000, 'penthouse', 'sale', 'Monte-Carlo, Monaco',
  280, 3, 4,
  array[
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),

-- ---- Apartments ----
(
  'Appartement Rue du Rhône',
  'Belle-époque apartment on Geneva''s prime retail axis. Mouldings preserved, kitchen by Bulthaup, two private parking spaces.',
  6450000, 'apartment', 'sale', 'Eaux-Vives, Geneva',
  220, 3, 3,
  array[
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop'
  ],
  true
),
(
  'Marina Apartment 12B',
  'Two-bedroom marina-front apartment with floor-to-ceiling glazing. Yacht berth available by separate agreement.',
  18900, 'apartment', 'rent', 'Port Hercules, Monaco',
  165, 2, 2,
  array[
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),
(
  'Bulgari Residences B-803',
  'Curated three-bedroom residence within the Bulgari estate, Jumeira Bay. Italian-made millwork, beach-club access.',
  7250000, 'apartment', 'sale', 'Jumeira Bay, Dubai',
  240, 3, 4,
  array[
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80&auto=format&fit=crop'
  ],
  false
),
(
  'Apartment Quai Wilson',
  'South-facing pied-à-terre overlooking Lake Geneva. Restored 19th-century shell, contemporary insertion by Studio Mara.',
  12500, 'apartment', 'rent', 'Pâquis, Geneva',
  120, 2, 2,
  array[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop'
  ],
  false
);

-- =========================================================================
-- Sanity check
-- =========================================================================
-- select count(*) as total,
--        count(*) filter (where featured) as featured_count
--   from public.properties;
