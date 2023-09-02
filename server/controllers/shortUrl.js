const { nanoid } = require("nanoid");
const Url = require("../models/urlModels");

const generateUrl = async (req, res) => {
  const { originUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid();

  try {
    let url = await Url.findOne({ originUrl });
    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${base}/${urlId}`;
      url = new Url({
        originUrl,
        shortUrl,
        urlId,
        date: new Date(),
      });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
module.exports = generateUrl;