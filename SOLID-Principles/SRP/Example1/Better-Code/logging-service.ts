// --- Logging --- (owned by: infra/devops team)
// import fs from "fs";

class LoggingService {
  log(message: string): void {
    const timestamp = new Date().toISOString();
    // fs.appendFileSync("app.log", `[${timestamp}] ${message}\n`);
    console.log("app.log", `[${timestamp}] ${message}\n`)
  }
}

export {LoggingService}