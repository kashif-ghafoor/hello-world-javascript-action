const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  const greetMessage = `Hello ${nameToGreet}!`;
  console.log(greetMessage);
  // write message to greet.txt
  fs.writeFileSync("./greet.txt", greetMessage);
  console.log("greet.txt created");
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  core.setOutput("greeting", greetMessage);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
