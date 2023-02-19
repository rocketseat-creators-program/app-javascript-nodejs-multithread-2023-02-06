/**
 * Sintaxe:
 *   node index.js 3 000 rocketseat
 */

const { isMainThread, Worker, workerData, parentPort } = require('worker_threads');

if (isMainThread) {
    const { cpus } = require("os");

    const threads = Number.isFinite(Number(process.argv[2])) ? Number(process.argv[2]) : cpus().length;
    const prefix = process.argv[3];
    const input = process.argv.slice(4).join(" ");

    console.log(`Threads Count: ${threads}`);

    const workers = [];
    for (let i = 0; i < threads; i++) {
        const worker = new Worker(__filename, { workerData: { prefix, input } });
        workers.push(worker);
        worker.on('message', message => {
            workers
                .filter(otherWorker => otherWorker !== worker)
                .forEach(otherWorker => otherWorker.terminate());
            console.log(`Worker ${i} / ${message}`);
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
    } while (!hash.startsWith(prefix));
    parentPort.postMessage(`Input: ${input} / Nonce: ${nonce} / Hash: ${hash} / Memory: ${memory}`);
}