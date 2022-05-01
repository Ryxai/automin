import {randomUUID} from "crypto";
import {hash, compare} from "bcrypt";
import {env} from "process";
import {exec} from "child_process";
import {writeFileSync} from "fs";

const salt_rounds = env.SALT_ROUNDS || 12;
const token = randomUUID();
writeFileSync("keyfile", token);
hash(token, salt_rounds).then(
  res => {
    compare(token, res).then(r => console.log(`Keys ${r ? "" : "don't "}match`));
    res.replace(/$/g,"\$"); 
    writeFileSync("hashedkeyfile", res);
    exec(`heroku config:set APIKEY=$(cat hashedkeyfile | sed '/^$/d; /#[[:print:]]*$/d')`); 
  }
);
