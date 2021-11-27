const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * for deployment functions on firebase run this command:
 *
 * firebase deploy --only functions
 *
 */
exports.addAdminRole = functions.https.onCall((data) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`,
      };
    })
    .catch((err) => {
      return err;
    });
});
