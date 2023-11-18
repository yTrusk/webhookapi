import * as readlineSync from "readline-sync";

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

export function embedcreator(props: embedcreatorprops) {
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

  const a = {
    embeds: [embed],
  };
  return a;
}

export function consoleresponse(question: string, hide?: boolean): string {
  let a = hide;
  if (!a) a = false;
  const whurl = readlineSync.question(question, {
    hideEchoBack: a,
  });

  return whurl;
}
