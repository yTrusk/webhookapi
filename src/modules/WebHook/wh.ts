import axios from "axios";
import { whconfig } from "./interfaces/config";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.sentryURL) {
  process.exit(1);
} // If you don't want sentry to help you find errors in the code clear everything about it
Sentry.init({
  dsn: process.env.sentryURL,
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
interface fieldsProps {
  name: string;
  value: string;
  inline: boolean;
}
interface authorProps {
  name: string;
  iconurl?: any;
}

interface embedcreatorprops {
  description?: string;
  title?: string;
  color?: string;
  thumbnail?: string;
  image?: string;
  fields?: fieldsProps[];
  author?: authorProps[];
}
export class WhSender {
  private config: whconfig;

  constructor(config: whconfig = { URL: null }) {
    this.config = config;
  }

  public async Sender(
    props: embedcreatorprops,
    execution?: number,
    interval?: number
  ) {
    let ex = execution as number;
    if (!ex) ex = 1;
    if (ex > 10000) {
      return console.log("You can't send more than 10k");
    }
    let int = interval as number;
    if (!int || int < 100) int = 100;
    const wh: string = this.config.URL as string;
    const embed = {
      title: "",
      description: "",
      color: 0x8300ff,
      author: {
        name: "",
        iconURL: "",
      },
      footer: {
        text: "yTrusk Api",
      },
    };
    if (props.title) embed.title = props.title;
    if (props.description) embed.description = props.description;
    if (props.color) {
      const colorValue = parseInt(props.color, 16);
      if (!isNaN(colorValue)) {
        embed.color = colorValue;
      }
    }
    if (props.author) {
      props.author.forEach((auth) => {
        embed.author.name = auth.name;
        if (auth.iconurl) embed.author.iconURL = auth.iconurl;
      });
    }

    const s = {
      embeds: [embed],
    };
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    setTimeout(async () => {
      try {
        console.log("trying");
        let x = 0;
        while (x < ex) {
          await axios.post(wh, s);
          x++;
          await sleep(int);
        }
      } catch (e) {
        Sentry.captureException(e);
      }
    }, 99);
  }
}
