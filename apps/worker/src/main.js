const concurrency = Number(process.env.WORKER_CONCURRENCY || 5);

console.log(`Career Pilot worker scaffold started with concurrency ${concurrency}.`);
