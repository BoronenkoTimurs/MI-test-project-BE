import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Example homepage! (With router support)");
});

module.exports = router;
