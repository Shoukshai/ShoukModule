const height = Renderer.screen.getHeight();
const width = Renderer.screen.getWidth();

let bossResultSc = " ";
let crimsonResult = " ";
let crimsonResultJoin = " ";
let crimsonResultRegexed = " ";
let bossIsDead = " ";
let bossIsDeadRegexed = " ";

const bossAliveRegex = /§eSlay the boss!§r./gm;
const crimsonActionBarRegex = /(§6(§l)?[0-9]+ᝐ)(§r)?./gm;

let timer = -20;

register("actionBar", (text) => {
    crimsonResult = text.match(crimsonActionBarRegex);
    if (crimsonResult == null) {
        crimsonResult = 0;
    }
}).setCriteria("${crimsonResult}");

register("renderOverlay", myRenderOverlay);

function myRenderOverlay() {
  Renderer.drawString(crimsonResult, width / 1.99, height / 2.08);
}

register("chat", (message, event) => {
    bossIsDead = message.removeFormatting();
    bossIsDeadRegexed = bossIsDead.match(/SLAYER QUEST COMPLETE|SLAYER QUEST FAILED/);
    if (bossIsDeadRegexed != null) {
        ChatLib.chat("Boss took: "+timer*0.05+"s");
        timer = -20;
    }
    // ChatLib.chat(bossIsDeadRegexed);
}).setCriteria("${message}") 

register("tick", () => {
    bossResultSc = Scoreboard.getLines(); // Grab scoreboard lines
    crimsonResultJoin = bossResultSc.join(' '); // Make it a string
    crimsonResultRegexed = crimsonResultJoin.match(bossAliveRegex)
    if (crimsonResultRegexed != null) {
        timer++;
    }
})
