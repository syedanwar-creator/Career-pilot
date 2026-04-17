const { spawn } = require("child_process");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const children = [];

function run(name, args) {
  const child = spawn(npmCommand, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    env: process.env
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      return;
    }

    if (typeof code === "number" && code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code);
    }
  });

  children.push(child);
}

function shutdown(exitCode = 0) {
  while (children.length) {
    const child = children.pop();

    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log("Starting development mode...");
console.log("Frontend: http://127.0.0.1:5173");
console.log("Backend API: http://127.0.0.1:3000");

run("dev:server", ["run", "dev:server"]);
run("dev:client", ["run", "dev:client"]);
