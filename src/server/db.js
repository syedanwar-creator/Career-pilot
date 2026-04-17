const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(process.cwd(), "data", "app-db.json");

function createDefaultDb() {
  return {
    tenants: [],
    users: [],
    profiles: [],
    proofSessions: [],
    activityLog: [],
    passwordResetTokens: []
  };
}

function ensureDatabase() {
  fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });

  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify(createDefaultDb(), null, 2));
  }
}

function readDb() {
  ensureDatabase();
  const raw = fs.readFileSync(dbFilePath, "utf8");
  const db = JSON.parse(raw);

  if (!Array.isArray(db.passwordResetTokens)) {
    db.passwordResetTokens = [];
  }

  if (!Array.isArray(db.activityLog)) {
    db.activityLog = [];
  }

  if (!Array.isArray(db.tenants)) {
    db.tenants = [];
  }

  if (!Array.isArray(db.users)) {
    db.users = [];
  }

  if (!Array.isArray(db.profiles)) {
    db.profiles = [];
  }

  if (!Array.isArray(db.proofSessions)) {
    db.proofSessions = [];
  }

  return db;
}

function writeDb(db) {
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
}

function mutateDb(mutator) {
  const db = readDb();
  const mutationResult = mutator(db);
  const nextDb =
    mutationResult && typeof mutationResult === "object" && mutationResult.db
      ? mutationResult.db
      : mutationResult || db;

  writeDb(nextDb);

  return mutationResult && typeof mutationResult === "object" && mutationResult.db
    ? mutationResult
    : nextDb;
}

function createRecord(data) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data
  };
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function findUserByEmail(db, email) {
  return db.users.find((user) => user.email.toLowerCase() === String(email || "").toLowerCase()) || null;
}

function findTenantBySlug(db, slug) {
  return db.tenants.find((tenant) => tenant.slug === slug) || null;
}

function getProfileByUserId(db, userId) {
  return db.profiles.find((profile) => profile.userId === userId) || null;
}

function getProofSessionsByUserId(db, userId) {
  return db.proofSessions.filter((session) => session.userId === userId);
}

function logActivity(db, type, details) {
  db.activityLog.unshift(
    createRecord({
      type,
      details,
      timestamp: new Date().toISOString()
    })
  );

  db.activityLog = db.activityLog.slice(0, 250);
}

module.exports = {
  createRecord,
  ensureDatabase,
  findTenantBySlug,
  findUserByEmail,
  getProfileByUserId,
  getProofSessionsByUserId,
  logActivity,
  mutateDb,
  readDb,
  sanitizeUser,
  writeDb
};
