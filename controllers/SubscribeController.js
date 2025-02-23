const Subscribe = require("../models/SubscribeModel");

exports.createSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const existingSubscriber = await Subscribe.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const newSubscriber = new Subscribe({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful", subscriber: newSubscriber });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
