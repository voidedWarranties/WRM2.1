import { Command } from "discord.js-commando";

import fs from "fs";
import path from "path";

export default class PlayFileCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            group: "wrm2",
            memberName: "play",
            description: "Play a file.",
            examples: [";play rickroll.ogg"],
            args: [
                {
                    key: "string",
                    prompt: "What do you want to play?",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, { string }) {
        msg.delete();
        fs.readdir(path.join(__dirname, "../../assets/audio/"), (err, files) => {
            console.log("Finding files in audio folder.");
            if(files.indexOf(string) > -1) {
                console.log("File is valid.");
                if(msg.member.voiceChannel) {
                    console.log(`Playing: ${string}`);
                    msg.member.voiceChannel.join().then(conn => {
                        var readStream = fs.createReadStream(path.join(__dirname, `../../assets/audio/${string}`));
                        var dispatcher = conn.playStream(readStream);
                        dispatcher.on("end", () => {
                            conn.disconnect();
                        });
                    });
                }
            }
        });
        
    }
}