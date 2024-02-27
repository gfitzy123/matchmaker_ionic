const axios = require("axios");
const cors = require("cors");
const util = require("util");
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
const db = admin.firestore();

const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "62693ece2336fa001ae96871",
      "PLAID-SECRET": "1f9b043969ff2e39eaa1e592b19aaf",
    },
  },
});

const client = new PlaidApi(configuration);

// Post
app.post("/create_token", (req, res) => {
  (async () => {
    try {
      const configs = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: "user",
        },
        client_name: "Matchmaker AI",
        products: ["auth"],
        country_codes: ["US"],
        language: "en",
        redirect_uri: "http://localhost:8000/",
      };

      const createTokenResponse = await client.linkTokenCreate(configs);
      prettyPrintResponse(createTokenResponse);
      res
        .status(200)
        .send({ status: "Success", response: createTokenResponse.data });
    } catch (error) {
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

exports.app = functions.https.onRequest(app);
