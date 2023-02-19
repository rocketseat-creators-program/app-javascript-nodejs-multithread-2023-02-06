/**
 * Sintaxe:
 *   node index.js 3 000 rocketseat
 */

const { isMainThread } = require('worker_threads');


if (isMainThread) {
    const threads = process.argv[2];
    const prefix = process.argv[3];
    const input = process.argv.slice(4).join(" ");

    console.log(`threads: ${threads} / prefix: ${prefix} / input: ${input}`);
} else {
    const prefix = "??";
    const input = "??";

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
}