import express from "express";
import fetch from "node-fetch";
import axios from "axios";
import { parse } from "node-html-parser";
const router = express.Router();

const decode = (text) =>
  text
    .replace(/&#39;/g, "'")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ndash;/g, "-");

const getData = async (url) => {
  return await axios
    .get(url)
    .then((res) => res.data)
    .then((data) => parse(data))
    .then((_html) => _html.querySelectorAll(".frame_plug"))
    .then((h) => {
      return h.flat().map((element) => ({
        title: decode(element.querySelector(".tit_feed").structuredText),
        description: decode(element.querySelector(".txt_feed").structuredText),
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
    });
};

router.get("/", async (req, res, next) => {
  console.log("Get plug Messages");
  /**
   * https://www.plug.game/kingsraid/1030449/posts?menuId=1 Notices
   * https://www.plug.game/kingsraid/1030449/posts?menuId=9 Path Notes
   * https://www.plug.game/kingsraid/1030449/posts?menuId=32 Game Contents
   *
   */
  let notes = null;
  let path = null;
  let content = null;
  let all = [];

  notes = await notices();
  path = await gameContent();
  content = await patchNotes();

  all = [...notes, ...path, ...content];

  all.sort((a, b) => a.timestamp - b.timestamp);

  res.send(all);
  console.log("End GET Route /");
});

const notices = async () => {
  return getData(`https://www.plug.game/kingsraid/1030449/posts?menuId=1`);
};

const patchNotes = async () => {
  return getData(`https://www.plug.game/kingsraid/1030449/posts?menuId=9`);
};

const gameContent = async () => {
  return getData(`https://www.plug.game/kingsraid/1030449/posts?menuId=32`);
};

export default router;
