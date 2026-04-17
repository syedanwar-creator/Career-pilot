const fs = require("fs");
const path = require("path");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function getRequestInfo(request) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  return {
    url,
    pathname: url.pathname,
    searchParams: url.searchParams
  };
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", (chunk) => {
      raw += chunk.toString("utf8");
    });

    request.on("end", () => resolve(raw));
    request.on("error", reject);
  });
}

async function parseJsonBody(request) {
  const raw = await readBody(request);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    const parsingError = new Error("Request body must be valid JSON.");
    parsingError.statusCode = 400;
    throw parsingError;
  }
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    ...extraHeaders
  });
  response.end(payload);
}

function parseCookies(request) {
  const header = request.headers.cookie || "";

  return header.split(";").reduce((cookies, item) => {
    const [name, ...rest] = item.trim().split("=");

    if (!name) {
      return cookies;
    }

    cookies[name] = decodeURIComponent(rest.join("="));
    return cookies;
  }, {});
}

function serveStaticAsset(projectRoot, pathname, response) {
  const requestPath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const assetPath = path.join(projectRoot, normalizedPath);

  if (!assetPath.startsWith(projectRoot)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  fs.readFile(assetPath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendText(response, 404, "Not found");
        return;
      }

      sendText(response, 500, "Internal server error");
      return;
    }

    const extension = path.extname(assetPath);
    const contentType = contentTypes[extension] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
}

module.exports = {
  getRequestInfo,
  parseCookies,
  parseJsonBody,
  sendJson,
  sendText,
  serveStaticAsset
};
