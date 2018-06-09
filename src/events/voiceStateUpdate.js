import config from "../config.json";

import fs from "fs";
import path from "path";
import prism from "prism-media";

export default async (oldMember, newMember) => {
    if(newMember.id === config.owner_id && newMember.voiceChannel) {
        newMember.voiceChannel.join().then(conn => {
            var readStream = fs.createReadStream(path.join(__dirname, `../assets/audio/${config.egg_filename}`));
            var dispatcher = conn.playStream(readStream);
            dispatcher.on("end", () => {
                conn.disconnect();  
            });
        });
    } else if(newMember.id === config.owner_id && !(newMember.voiceChannel) && oldMember.voiceChannel) {
        oldMember.voiceChannel.leave();
    }
}