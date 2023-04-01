import http from "http";
import * as fs from "fs/promises";
import * as links from "./links.mjs";

const port = 200;

function getRequestData(req) {
  if (req.url === "/") {
    const status = 200;
    return JSON.stringify({
      status,
      topBanner: links.topBanner,
      hotelDetails: links.hotelDetails,
      room1: links.room1,
      room2: links.room2,
      room3: links.room3,
      chooseHotel: links.chooseHotel,
      poolImg: links.poolImg,
      forestImg: links.forestImg,
      wellnessService: links.wellnessService,
      giftCardService: links.giftCardService,
      spaService: links.spaService,
      adventureService: links.adventureService,
      showRooms: links.showRooms,
      travelImg1: links.travelImg1,
      travelImg2: links.travelImg2,
      travelImg3: links.travelImg3,
      helloImg: links.helloImg,
      reviews: links.reviews,
      tripImg: links.tripImg,
    });
  } else {
    return JSON.stringify("Page not available.");
  }
}

const server = http.createServer((req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    const formDataBase = [];
    req.on("data", (formDataParts) => {
      formDataBase.push(formDataParts);
    });
    req.on("end", () => {
      let fullFormdata = Buffer.concat(formDataBase).toString();
      if (fullFormdata.length > 0) {
        (async function () {
          const dataFromFile = await fs.readFile("./formData.txt", "utf8");
          fullFormdata = `${fullFormdata} ; ${dataFromFile}`;
          await fs.writeFile("./formData.txt", fullFormdata);
        })();
      }
    });
    res.end(getRequestData(req));
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log("Server started ... ");
});
