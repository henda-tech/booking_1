const fs = require("fs");
const jwk = require("pem-jwk");

const pubKey = fs.readFileSync("public.pem");
const jwkKey = jwk.pem2jwk(pubKey);

jwkKey.kid = "auth-key-1"; // key ID
jwkKey.use = "sig";        // for signing JWTs

const jwks = { keys: [jwkKey] };

fs.mkdirSync(".well-known", { recursive: true });
fs.writeFileSync(".well-known/jwks.json", JSON.stringify(jwks, null, 2));

console.log("JWKS created at .well-known/jwks.json ✅");
