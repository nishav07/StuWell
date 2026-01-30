const mongoose = require('mongoose');

const res = main().then(res => console.log("connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS_URL);
}
