/**
 * Sintaxe:
 *   node index.js 000 rocketseat
 */

const prefix = process.argv[2];
const input = process.argv.slice(3).join(" ");

const { createHash } = require("crypto");
let nonce = 0;
let hash;
do {
    nonce++;
    hash = createHash('sha256').update(`${input}${nonce}`).digest('hex');
    console.log(`Input: ${input} / Nonce: ${nonce} / Hash: ${hash}`);
} while (!hash.startsWith(prefix));
