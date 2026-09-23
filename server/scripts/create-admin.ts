import readline from "readline";
import bcrypt from "bcryptjs";
import { pool } from "../src/db/pool.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

/**
 * Prompts for sensitive input with '*' character masking in terminal
 */
function maskedQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(query);
    const stdin = process.stdin;
    let input = "";

    const wasRaw = stdin.isRaw;
    if (stdin.setRawMode) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const onData = (char: string) => {
      // Return / Enter
      if (char === "\n" || char === "\r" || char === "\u0004") {
        stdin.removeListener("data", onData);
        if (stdin.setRawMode) stdin.setRawMode(wasRaw || false);
        process.stdout.write("\n");
        resolve(input);
      } else if (char === "\u0003") {
        // SIGINT (Ctrl+C)
        process.exit(1);
      } else if (char === "\b" || char === "\x7f") {
        // Backspace
        if (input.length > 0) {
          input = input.slice(0, -1);
          process.stdout.write("\b \b");
        }
      } else {
        input += char;
        process.stdout.write("*");
      }
    };

    stdin.on("data", onData);
  });
}

async function createAdmin() {
  try {
    let username = process.argv[2] || process.env.ADMIN_USERNAME;
    let password = process.argv[3] || process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      username = (await question("Username: ")).trim();
      if (!username) {
        console.error("Username cannot be blank.");
        process.exit(1);
      }

      password = await maskedQuestion("Password (min 8 chars): ");
      if (password.length < 8) {
        console.error("Password must be at least 8 characters long.");
        process.exit(1);
      }

      const confirm = await maskedQuestion("Confirm Password: ");
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

    // Upsert admin user
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
