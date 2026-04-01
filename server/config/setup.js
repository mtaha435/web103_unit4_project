import pg from 'pg';

// Hardcoding just for the setup script to guarantee connection
const pool = new pg.Pool({
    user: "web103_unit5_user",
    password: "nnUrSEZzw77n5m1PRZuPwvzQ51ux1QE4",
    host: "dpg-d769rcpr0fns73c5u560-a.oregon-postgres.render.com",
    port: 5432,
    database: "web103_unit5",
    ssl: { rejectUnauthorized: false }
});

const createTableQuery = `
    DROP TABLE IF EXISTS custom_items;
    CREATE TABLE custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        exterior VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        roof VARCHAR(50) NOT NULL,
        total_price INTEGER NOT NULL
    );
`;

const setup = async () => {
    try {
        console.log('Connecting directly to Render...');
        await pool.query(createTableQuery);
        console.log('✅ Success: custom_items table created.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating table:', error);
        process.exit(1);
    }
};

setup();