import { consoleresponse } from "../src/modules/WebHook/functions/functions";
import { WhSender } from "../src/modules/WebHook/wh";

const whurl = consoleresponse("Type your discord url webhook: ", false);
console.log("Url:", whurl);

const wh = new WhSender({
  URL: whurl,
});
const msg1 = consoleresponse("Type your embed description: ", false);
const msg2 = consoleresponse("Type your embed title: ", false);
const msg3 = consoleresponse("Write how many times you want it to be sent: ");
const msg4 = consoleresponse("Write the time interval (min 100): ");
wh.Sender({ description: msg1, title: msg2 }, parseInt(msg3), parseInt(msg4));
