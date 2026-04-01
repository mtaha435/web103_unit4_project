import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This version is more aggressive at finding the root .env
dotenv.config({ path: path.join(process.cwd(), '.env') })

// Let's add a fallback check
if (!process.env.PGHOST) {
    // If it's still missing, try the relative path one last time
    dotenv.config({ path: path.resolve(__dirname, '../../.env') })
}

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)