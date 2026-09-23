import readline from "readline";
import bcrypt from "bcryptjs";
import { pool } from "../src/db/pool.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => 
  new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    let username = process.argv[2] || process.env.ADMIN_USERNAME;
    let password = process.argv[3] || process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      username = await question("Username: ");
      password = await question("Password (min 8 chars): ");
      
      if (password.length < 8) {
        console.error("Password must be at least 8 characters long.");
        process.exit(1);
      }

      const confirm = await question("Confirm Password: ");
      if (password !== confirm) {
        console.error("Passwords do not match.");
        process.exit(1);
      }
    } else {
      if (password.length < 8) {
        console.error("Password must be at least 8 characters long.");
        process.exit(1);
      }
    }

    const hash = await bcrypt.hash(password, 12);
    
    // Upsert or insert admin user
    await pool.query(
      `INSERT INTO users (username, password, role) 
       VALUES ($1, $2, 'admin')
       ON CONFLICT (username) 
       DO UPDATE SET password = EXCLUDED.password`,
      [username, hash]
    );

    console.log(`Admin user '${username}' created/updated successfully.`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    rl.close();
    await pool.end();
  }
}

createAdmin();
