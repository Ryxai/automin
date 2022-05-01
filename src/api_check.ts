import {compare} from 'bcrypt';
import {readFileSync} from 'fs';

const token = readFileSync("keyfile").toString();
const hashed_token = readFileSync("hashedkeyfile").toString();
compare(token, hashed_token)
  .then(
    r => 
    console.log(`Post keygen check: key and hash ${r ? "" : "do not "}match`));
