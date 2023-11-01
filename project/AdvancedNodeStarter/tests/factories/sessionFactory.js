const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);

/**
 * Create a Fake Session
 *
 * Bypass / Tempering with Google Sign In by generating fake session
 *
 */
module.exports = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(), // assumming using Mongoose model User
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );
  const signature = keygrip.sign("session=" + sessionString);
  return { session: sessionString, sig: signature };
};
