/**
 * Sintaxe:
 *   node index.js 3 000 rocketseat
 */

const { isMainThread, Worker, workerData, parentPort } = require('worker_threads');

if (isMainThread) {
    const threads = process.argv[2];
    const prefix = process.argv[3];
    const input = process.argv.slice(4).join(" ");

    const workers = [];
    for (let i = 0; i < threads; i++) {
        const worker = new Worker(__filename, { workerData: { prefix, input } });
        workers.push(worker);
        worker.on('message', message => {
            if (message === "END") {
                workers
                    .filter(otherWorker => otherWorker !== worker)
                    .forEach(otherWorker => otherWorker.terminate());
            }
        });
    }
} else {
    const prefix = workerData.prefix;
    const input = workerData.input;

    const { createHash } = require("crypto");
    const { freemem, totalmem } = require("os");
    let nonce;
    let hash;
    do {
        nonce = `+${Math.random().toFixed(17).substring(2)}${Math.random().toFixed(17).substring(2)}`;
        hash = createHash('sha256').update(`${input}${nonce}`).digest('hex');
        memory = ((1 - freemem() / totalmem()) * 100).toFixed(2) + '%';
        console.log(`Input: ${input} / Nonce: ${nonce} / Hash: ${hash} / Memory: ${memory}`);
    } while (!hash.startsWith(prefix));
    parentPort.postMessage('END');
}