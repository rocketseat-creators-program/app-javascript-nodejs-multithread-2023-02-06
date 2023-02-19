/**
 * Sintaxe:
 *   node index.js 000 rocketseat
 */

const prefix = process.argv[2];
const input = process.argv.slice(3).join(" ");

const { createHash } = require("crypto");
const { freemem, totalmem } = require("os");
let nonce = 0;
let hash;
do {
    nonce++;
    hash = createHash('sha256').update(`${input}${nonce}`).digest('hex');
    memory = ((1 - freemem() / totalmem()) * 100).toFixed(2) + '%';
    console.log(`Input: ${input} / Nonce: ${nonce} / Hash: ${hash} / Memory: ${memory}`);
} while (!hash.startsWith(prefix));
