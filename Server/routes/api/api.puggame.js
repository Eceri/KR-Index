import express from "express";
import fetch from "node-fetch";
import { parse } from "node-html-parser";
const router = express.Router();

const decode = (text) =>
  text
    .replace(/&#39;/g, "'")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ndash;/g, "-");

router.get("/", async (req, res, next) => {
  console.log("Get plug Messages");
  /**
   * https://www.plug.game/kingsraid/1030449/posts?menuId=1 Notices
   * https://www.plug.game/kingsraid/1030449/posts?menuId=9 Path Notes
   * https://www.plug.game/kingsraid/1030449/posts?menuId=32 Game Contents
   *
   */
  let data = [];
  const ids = [1, 9, 32];
  let hrs = "";
  let sortData = "";
  let fetchEnd = false;

  req.app.io.emit("Fetch");

  Promise.all(
    ids.map((id) => {
      fetch(`https://www.plug.game/kingsraid/1030449/posts?menuId=${id}`)
        .then((res) => res.text())
        .then((data) => parse(data))
        .then((_html) => _html.querySelectorAll(".frame_plug"))
        .then((h) => data.push(h))
        .then(() => {
          return data.flat().map((element) => ({
            title: decode(element.querySelector(".tit_feed").structuredText),
            description: decode(
              element.querySelector(".txt_feed").structuredText
            ),
            url: `https://www.plug.game/kingsraid/1030449/posts/${element.getAttribute(
              "data-articleid"
            )}`,
            timestamp: element.querySelectorAll(".time")[1].structuredText,
            author: {
              name: element.querySelector(".name").rawText,
              url: `https://plug.game${element
                .querySelector(".name")
                .getAttribute("href")}`,
              icon_url: element.querySelector(".thumb").getAttribute("src"),
            },
            thumbnail: element
              .querySelector(".img")
              .getAttribute("style")
              .substr(21)
              .replace(")", ""),
          }));
        })
        .then((_obj) => {
          hrs = _obj
            .filter((v) => v.timestamp.includes("hrs"))
            .sort((a, b) => a.timestamp < b.timestamp);
          sortData = _obj
            .filter((v) => !v.timestamp.includes("hrs"))
            .sort((a, b) => a.timestamp < b.timestamp);
          return [...hrs, ...sortData].slice(0, 5);
        })
        .then((result) => {
          fetchEnd === false && res.send(result);
          fetchEnd = true;
        })
        .catch((err) => console.error(err));
    })
  );

  console.log("End GET Route /");
});

export default router;
