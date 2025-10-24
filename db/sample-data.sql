-- ==========================================
-- NUQUIZ SAMPLE DATA
-- Middle School Science: States of Matter
-- ==========================================
-- This dataset demonstrates the compare/contrast quiz model
-- Topics → Categories → Attributes → Facts

-- ==========================================
-- TEST USERS (password for all: password123)
-- ==========================================
INSERT INTO users (email, username, password_hash, role) VALUES
    ('admin@test.com', 'Test Admin', '$2b$12$QvJLDpolv0SqEravUDu0jelXO6bGAQgi3wVzPDgUqqJtax.yEAelK', 'admin'),
    ('student@test.com', 'Test Student', '$2b$12$QvJLDpolv0SqEravUDu0jelXO6bGAQgi3wVzPDgUqqJtax.yEAelK', 'student'),
    ('teacher@school.edu', 'Science Teacher', '$2b$12$QvJLDpolv0SqEravUDu0jelXO6bGAQgi3wVzPDgUqqJtax.yEAelK', 'admin')
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role;

-- Sample content packs for different users
INSERT INTO content_packs (name, description, created_by, is_active) VALUES
    ('Middle School Science', 'Fundamental science concepts for grades 6-8',
     (SELECT id FROM users WHERE email = 'teacher@school.edu'), true),
    ('Medical Terminology', 'Common medical terms and definitions',
     (SELECT id FROM users WHERE email = 'admin@test.com'), true),
    ('Anatomy Basics', 'Fundamental anatomy concepts',
     (SELECT id FROM users WHERE email = 'admin@test.com'), true)
ON CONFLICT DO NOTHING;

-- Get the content pack ID for use in knowledge hierarchy
DO $$
DECLARE
    pack_id INTEGER;
    topic_matter_id INTEGER;
    topic_water_id INTEGER;

    -- States of Matter categories
    cat_solid_id INTEGER;
    cat_liquid_id INTEGER;
    cat_gas_id INTEGER;
    cat_plasma_id INTEGER;

    -- Water cycle categories
    cat_evaporation_id INTEGER;
    cat_condensation_id INTEGER;
    cat_precipitation_id INTEGER;

    -- Attributes for states of matter
    attr_shape_id INTEGER;
    attr_volume_id INTEGER;
    attr_particle_id INTEGER;
    attr_compress_id INTEGER;
    attr_examples_id INTEGER;

    -- Attributes for water cycle
    attr_process_id INTEGER;
    attr_location_id INTEGER;
    attr_temp_id INTEGER;
BEGIN
    SELECT id INTO pack_id FROM content_packs WHERE name = 'Middle School Science';

    -- ==========================================
    -- TOPIC 1: STATES OF MATTER
    -- ==========================================

    INSERT INTO knowledge (name, label, type, content_pack_id, order_index)
    VALUES ('states_of_matter', 'States of Matter', 'topic', pack_id, 1)
    RETURNING id INTO topic_matter_id;

    -- Category: SOLID
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_matter_id, 'solid', 'Solid', 'category', pack_id, 1)
    RETURNING id INTO cat_solid_id;

    -- Category: LIQUID
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_matter_id, 'liquid', 'Liquid', 'category', pack_id, 2)
    RETURNING id INTO cat_liquid_id;

    -- Category: GAS
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_matter_id, 'gas', 'Gas', 'category', pack_id, 3)
    RETURNING id INTO cat_gas_id;

    -- Category: PLASMA (bonus - not usually tested)
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_matter_id, 'plasma', 'Plasma', 'category', pack_id, 4)
    RETURNING id INTO cat_plasma_id;

    -- ==========================================
    -- ATTRIBUTES FOR SOLIDS
    -- ==========================================

    -- Attribute: Shape
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_solid_id, 'shape', 'Shape', 'attribute', pack_id, 1)
    RETURNING id INTO attr_shape_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_shape_id, 'definite_shape', 'Definite shape', 'fact', pack_id),
        (attr_shape_id, 'maintains_shape', 'Maintains its own shape', 'fact', pack_id),
        (attr_shape_id, 'rigid_structure', 'Rigid structure', 'fact', pack_id);

    -- Attribute: Volume
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_solid_id, 'volume', 'Volume', 'attribute', pack_id, 2)
    RETURNING id INTO attr_volume_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_volume_id, 'definite_volume', 'Definite volume', 'fact', pack_id),
        (attr_volume_id, 'fixed_volume', 'Fixed volume', 'fact', pack_id);

    -- Attribute: Particle Movement
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_solid_id, 'particle_movement', 'Particle Movement', 'attribute', pack_id, 3)
    RETURNING id INTO attr_particle_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_particle_id, 'vibrate_in_place', 'Particles vibrate in place', 'fact', pack_id),
        (attr_particle_id, 'closely_packed', 'Particles are closely packed', 'fact', pack_id),
        (attr_particle_id, 'low_kinetic_energy', 'Low kinetic energy', 'fact', pack_id);

    -- Attribute: Compressibility
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_solid_id, 'compressibility', 'Compressibility', 'attribute', pack_id, 4)
    RETURNING id INTO attr_compress_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_compress_id, 'not_compressible', 'Not easily compressible', 'fact', pack_id),
        (attr_compress_id, 'incompressible', 'Nearly incompressible', 'fact', pack_id);

    -- Attribute: Examples
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_solid_id, 'examples', 'Examples', 'attribute', pack_id, 5)
    RETURNING id INTO attr_examples_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_examples_id, 'ice', 'Ice', 'fact', pack_id),
        (attr_examples_id, 'rock', 'Rock', 'fact', pack_id),
        (attr_examples_id, 'wood', 'Wood', 'fact', pack_id),
        (attr_examples_id, 'metal', 'Metal', 'fact', pack_id);

    -- ==========================================
    -- ATTRIBUTES FOR LIQUIDS
    -- ==========================================

    -- Attribute: Shape
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_liquid_id, 'shape', 'Shape', 'attribute', pack_id, 1)
    RETURNING id INTO attr_shape_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_shape_id, 'no_definite_shape', 'No definite shape', 'fact', pack_id),
        (attr_shape_id, 'takes_container_shape', 'Takes shape of container', 'fact', pack_id),
        (attr_shape_id, 'flows_freely', 'Flows freely', 'fact', pack_id);

    -- Attribute: Volume
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_liquid_id, 'volume', 'Volume', 'attribute', pack_id, 2)
    RETURNING id INTO attr_volume_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_volume_id, 'definite_volume', 'Definite volume', 'fact', pack_id),
        (attr_volume_id, 'constant_volume', 'Constant volume', 'fact', pack_id);

    -- Attribute: Particle Movement
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_liquid_id, 'particle_movement', 'Particle Movement', 'attribute', pack_id, 3)
    RETURNING id INTO attr_particle_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_particle_id, 'slide_past', 'Particles slide past each other', 'fact', pack_id),
        (attr_particle_id, 'loosely_packed', 'Particles are loosely packed', 'fact', pack_id),
        (attr_particle_id, 'medium_kinetic_energy', 'Medium kinetic energy', 'fact', pack_id);

    -- Attribute: Compressibility
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_liquid_id, 'compressibility', 'Compressibility', 'attribute', pack_id, 4)
    RETURNING id INTO attr_compress_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_compress_id, 'not_compressible', 'Not easily compressible', 'fact', pack_id),
        (attr_compress_id, 'nearly_incompressible', 'Nearly incompressible', 'fact', pack_id);

    -- Attribute: Examples
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_liquid_id, 'examples', 'Examples', 'attribute', pack_id, 5)
    RETURNING id INTO attr_examples_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_examples_id, 'water', 'Water', 'fact', pack_id),
        (attr_examples_id, 'milk', 'Milk', 'fact', pack_id),
        (attr_examples_id, 'oil', 'Oil', 'fact', pack_id),
        (attr_examples_id, 'juice', 'Juice', 'fact', pack_id);

    -- ==========================================
    -- ATTRIBUTES FOR GASES
    -- ==========================================

    -- Attribute: Shape
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_gas_id, 'shape', 'Shape', 'attribute', pack_id, 1)
    RETURNING id INTO attr_shape_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_shape_id, 'no_definite_shape', 'No definite shape', 'fact', pack_id),
        (attr_shape_id, 'fills_container', 'Fills entire container', 'fact', pack_id),
        (attr_shape_id, 'expands_freely', 'Expands freely', 'fact', pack_id);

    -- Attribute: Volume
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_gas_id, 'volume', 'Volume', 'attribute', pack_id, 2)
    RETURNING id INTO attr_volume_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_volume_id, 'no_definite_volume', 'No definite volume', 'fact', pack_id),
        (attr_volume_id, 'variable_volume', 'Variable volume', 'fact', pack_id);

    -- Attribute: Particle Movement
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_gas_id, 'particle_movement', 'Particle Movement', 'attribute', pack_id, 3)
    RETURNING id INTO attr_particle_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_particle_id, 'move_rapidly', 'Particles move rapidly', 'fact', pack_id),
        (attr_particle_id, 'far_apart', 'Particles are far apart', 'fact', pack_id),
        (attr_particle_id, 'high_kinetic_energy', 'High kinetic energy', 'fact', pack_id),
        (attr_particle_id, 'random_motion', 'Random motion', 'fact', pack_id);

    -- Attribute: Compressibility
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_gas_id, 'compressibility', 'Compressibility', 'attribute', pack_id, 4)
    RETURNING id INTO attr_compress_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_compress_id, 'highly_compressible', 'Highly compressible', 'fact', pack_id),
        (attr_compress_id, 'easily_compressed', 'Easily compressed', 'fact', pack_id);

    -- Attribute: Examples
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_gas_id, 'examples', 'Examples', 'attribute', pack_id, 5)
    RETURNING id INTO attr_examples_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_examples_id, 'oxygen', 'Oxygen', 'fact', pack_id),
        (attr_examples_id, 'nitrogen', 'Nitrogen', 'fact', pack_id),
        (attr_examples_id, 'carbon_dioxide', 'Carbon dioxide', 'fact', pack_id),
        (attr_examples_id, 'water_vapor', 'Water vapor', 'fact', pack_id);

    -- ==========================================
    -- ATTRIBUTES FOR PLASMA (bonus fourth state)
    -- ==========================================

    -- Attribute: Shape
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_plasma_id, 'shape', 'Shape', 'attribute', pack_id, 1)
    RETURNING id INTO attr_shape_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_shape_id, 'no_definite_shape', 'No definite shape', 'fact', pack_id),
        (attr_shape_id, 'glowing_appearance', 'Glowing appearance', 'fact', pack_id);

    -- Attribute: Particle Movement
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_plasma_id, 'particle_movement', 'Particle Movement', 'attribute', pack_id, 2)
    RETURNING id INTO attr_particle_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_particle_id, 'ionized_particles', 'Ionized particles', 'fact', pack_id),
        (attr_particle_id, 'very_high_energy', 'Very high kinetic energy', 'fact', pack_id),
        (attr_particle_id, 'conducts_electricity', 'Conducts electricity', 'fact', pack_id);

    -- Attribute: Examples
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_plasma_id, 'examples', 'Examples', 'attribute', pack_id, 3)
    RETURNING id INTO attr_examples_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_examples_id, 'lightning', 'Lightning', 'fact', pack_id),
        (attr_examples_id, 'stars', 'Stars', 'fact', pack_id),
        (attr_examples_id, 'neon_signs', 'Neon signs', 'fact', pack_id);

    -- ==========================================
    -- TOPIC 2: WATER CYCLE (nested under States of Matter)
    -- ==========================================

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_matter_id, 'water_cycle', 'Water Cycle', 'topic', pack_id, 5)
    RETURNING id INTO topic_water_id;

    -- Category: EVAPORATION
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_water_id, 'evaporation', 'Evaporation', 'category', pack_id, 1)
    RETURNING id INTO cat_evaporation_id;

    -- Attribute: Process
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_evaporation_id, 'process', 'Process', 'attribute', pack_id, 1)
    RETURNING id INTO attr_process_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_process_id, 'liquid_to_gas', 'Liquid changes to gas', 'fact', pack_id),
        (attr_process_id, 'requires_heat', 'Requires heat energy', 'fact', pack_id),
        (attr_process_id, 'surface_process', 'Occurs at surface', 'fact', pack_id);

    -- Attribute: Location
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_evaporation_id, 'location', 'Where It Occurs', 'attribute', pack_id, 2)
    RETURNING id INTO attr_location_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_location_id, 'oceans', 'Oceans', 'fact', pack_id),
        (attr_location_id, 'lakes', 'Lakes', 'fact', pack_id),
        (attr_location_id, 'puddles', 'Puddles', 'fact', pack_id);

    -- Category: CONDENSATION
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_water_id, 'condensation', 'Condensation', 'category', pack_id, 2)
    RETURNING id INTO cat_condensation_id;

    -- Attribute: Process
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_condensation_id, 'process', 'Process', 'attribute', pack_id, 1)
    RETURNING id INTO attr_process_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_process_id, 'gas_to_liquid', 'Gas changes to liquid', 'fact', pack_id),
        (attr_process_id, 'releases_heat', 'Releases heat energy', 'fact', pack_id),
        (attr_process_id, 'forms_droplets', 'Forms tiny droplets', 'fact', pack_id);

    -- Attribute: Location
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_condensation_id, 'location', 'Where It Occurs', 'attribute', pack_id, 2)
    RETURNING id INTO attr_location_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_location_id, 'clouds', 'Clouds', 'fact', pack_id),
        (attr_location_id, 'dew', 'Dew on grass', 'fact', pack_id),
        (attr_location_id, 'mirror_fog', 'Fog on mirror', 'fact', pack_id);

    -- Category: PRECIPITATION
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (topic_water_id, 'precipitation', 'Precipitation', 'category', pack_id, 3)
    RETURNING id INTO cat_precipitation_id;

    -- Attribute: Process
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_precipitation_id, 'process', 'Process', 'attribute', pack_id, 1)
    RETURNING id INTO attr_process_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_process_id, 'water_falls', 'Water falls from clouds', 'fact', pack_id),
        (attr_process_id, 'gravity_driven', 'Driven by gravity', 'fact', pack_id),
        (attr_process_id, 'returns_to_earth', 'Returns water to Earth', 'fact', pack_id);

    -- Attribute: Examples (types of precipitation)
    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id, order_index)
    VALUES (cat_precipitation_id, 'examples', 'Types', 'attribute', pack_id, 2)
    RETURNING id INTO attr_examples_id;

    INSERT INTO knowledge (parent_id, name, label, type, content_pack_id)
    VALUES
        (attr_examples_id, 'rain', 'Rain', 'fact', pack_id),
        (attr_examples_id, 'snow', 'Snow', 'fact', pack_id),
        (attr_examples_id, 'sleet', 'Sleet', 'fact', pack_id),
        (attr_examples_id, 'hail', 'Hail', 'fact', pack_id);

END $$;

-- Show what we created
SELECT
    k.type,
    COUNT(*) as count
FROM knowledge k
GROUP BY k.type
ORDER BY
    CASE k.type
        WHEN 'topic' THEN 1
        WHEN 'category' THEN 2
        WHEN 'attribute' THEN 3
        WHEN 'fact' THEN 4
    END;
