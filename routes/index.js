var express = require("express");
const linksDB = require("./users");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let data = "";
  res.render("home", { data: data });
});

router.post("/", async (req, res) => {
  const largeLink = req.body.urlInput;
  let customLink = req.body.customLink;
  if (customLink == "") {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    customLink = result;
  }

  // check if custom link is already available in db
  // ++ TODO ++

  // get date and time
  const d = new Date();
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-IN");
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let actualDate = dateString;
  let actualTime = hour + ":" + minutes + ":" + seconds;
  // over: get date and time

  const shortnLink = await linksDB.create({
    fullUrl: largeLink,
    shortnUrl: customLink,
    shortnTime: actualTime,
    shortnDate: actualDate,
  });
  req.flash("info", shortnLink);
  let data = req.flash("info");
  let baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  data[0].shortnUrl = baseUrl + data[0].shortnUrl;
  res.render("home", { data: data[0] });
});

router.get("/:shortnData", async (req, res) => {
  const shortFragment = req.params.shortnData;
  const findLink = await linksDB.find({ shortnUrl: shortFragment });
  let fullLink = findLink[0];
  fullLink = fullLink.fullUrl;
  res.redirect(fullLink);
});

module.exports = router;
