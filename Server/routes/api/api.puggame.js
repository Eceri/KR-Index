import express from "express";
import fetch from "node-fetch";
import { parse } from "node-html-parser";
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Get");
  /**
   * https://www.plug.game/kingsraid/1030449/posts?menuId=1 Notices
   * https://www.plug.game/kingsraid/1030449/posts?menuId=9 Path Notes
   * https://www.plug.game/kingsraid/1030449/posts?menuId=32 Game Contents
   *
   */
  let data = [];
  for (let i = 0; i < 3; i++) {
    let id = 0;
    switch (i) {
      case 0:
        id = 1;
        break;
      case 1:
        id = 9;
        break;
      case 2:
        id = 32;
        break;

      default:
        break;
    }
    data = [
      ...data,
      ...(await fetch(
        `https://www.plug.game/kingsraid/1030449/posts?menuId=${id}`
      )
        .then((res) => res.text())
        .then((data) => parse(data))
        .then((_html) => _html.querySelectorAll(".frame_plug"))),
    ];
  }

  let _obj = [];

  const decode = (text) =>
    text
      .replace(/&#39;/g, "'")
      .replace(/&lsquo;/g, "‘")
      .replace(/&rsquo;/g, "’")
      .replace(/&ndash;/g, "-");

  data.forEach((_data) =>
    _obj.push({
      title: decode(_data.querySelector(".tit_feed").structuredText),
      description: decode(_data.querySelector(".txt_feed").structuredText),
      url: `https://www.plug.game/kingsraid/1030449/posts/${_data.getAttribute(
        "data-articleid"
      )}`,
      timestamp: _data.querySelectorAll(".time")[1].structuredText,
      author: {
        name: _data.querySelector(".name").rawText,
        url: `https://plug.game${_data
          .querySelector(".name")
          .getAttribute("href")}`,
        icon_url: _data.querySelector(".thumb").getAttribute("src"),
      },
      thumbnail: _data
        .querySelector(".img")
        .getAttribute("style")
        .substr(21)
        .replace(")", ""),
    })
  );

  const hrs = _obj
    .filter((v) => v.timestamp.includes("hrs"))
    .sort((a, b) => a.timestamp < b.timestamp);
  const sortData = _obj
    .filter((v) => !v.timestamp.includes("hrs"))
    .sort((a, b) => a.timestamp < b.timestamp);

  req.app.io.emit("Fetch");
  res.status(200).send([...hrs, ...sortData].slice(0, 5));
  console.log("End GET Route /");
});

export default router;
