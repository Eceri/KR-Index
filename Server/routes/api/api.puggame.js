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
  const data = await fetch(
    `https://www.plug.game/kingsraid/1030449/posts?menuId=${req.query.id}`
  )
    .then((res) => res.text())
    .then((data) => parse(data))
    .then((_html) => _html.querySelectorAll(".frame_plug"));

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
      timestamp: _data.querySelectorAll(".time")[1].rawText,
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
  // console.log(_obj);

  res.status(200).send(_obj);
  console.log("End GET Route /");
});

export default router;
