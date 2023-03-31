// const fetch = require("node-fetch");
// import fetch from "node-fetch";
const fetch = require("node-fetch");

// This controller is to receive and validate the bvn received from the frontend.
module.exports.bvnInitiate = async (req, res, next) => {
  try {
    const bvn = req.body.bvn;

    const url = `https://api.withmono.com/v2/lookup/bvn/initiate`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mono-sec-key": process.env["MONO_SECRET_KEY"],
      },
      body: JSON.stringify({ bvn }),
    });

    const data = await response.json();

    if (data?.status === "successful") {
      res.status(200).json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// This controller is to provide available means of BVN verification via the phone or email.
// It takes a session id into its headers from the initiate request.
module.exports.verifyOtpDelivery = async (req, res, next) => {
  try {
    const method = req.body.medium;

    const url = `https://api.withmono.com/v2/lookup/bvn/verify`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mono-sec-key": process.env["MONO_SECRET_KEY"],
        "x-session-id": req.body.session_id,
      },
      body: JSON.stringify({ method }),
    });

    const data = await response.json();

    if (data?.status === "successful") {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

// This controller verifies otp and provides the bvn details instantly to the frontend.
// Also, It takes a session id into its headers from the initiate request.
module.exports.fetchDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    const otp = req.body.otp;

    const url = `https://api.withmono.com/v2/lookup/bvn/details`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mono-sec-key": process.env["MONO_SECRET_KEY"],
        "x-session-id": req.body.session_id,
      },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();

    if (data?.status === "successful") {
      res.status(200).json({ data });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
