console.log("Hello world")
const gemeni = require("@google/genai");
const  { buildHealthPrompt } = require("./config/prompt");
const { generateText } = require("./config/ai");
require("dotenv").config();


const d1 = "2026-01-28";
const d2 = "2026-02-1";


const data = [
  {
    foodType: 'fats',
    junkFood: 'no',
    mood: 'Good',
    screentime: 5,
    sleepHr: 7,
    status: 'submitted',
    studyHr: 0,
    symptoms: 'anxiety',
    water: 3
  },
  {
    foodType: 'carbs',
    junkFood: 'yes',
    mood: 'Good',
    screentime: 6,
    sleepHr: 7,
    status: 'submitted',
    studyHr: 1,
    symptoms: 'none',
    water: 2
  },
  {
    foodType: 'protein',
    junkFood: 'no',
    mood: 'veryBad',
    screentime: 8,
    sleepHr: 6,
    status: 'submitted',
    studyHr: 3,
    symptoms: 'stomach_discomfort',
    water: 2
  },
  { foodType: 'fats',
    junkFood: 'no',
    mood: 'Good',
    screentime: 8,
    sleepHr: 8,
    status: 'submitted',
    studyHr: 0,
    symptoms: 'stress',
    water: 1.8
  }
]

// function daysBetween(date1,date2){
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     const diffinMs = d2 - d1;
//     return Math.floor(diffinMs/(1000 * 60 * 60 * 24));
// }

// function firstTime(first,today){
//     const gap = daysBetween(first,today);
//     console.log("gappppp",gap);
//     if(gap >= 7){
//         console.log("ai ko call kr diyaa h")
//     } else {
//         console.log(`abhi call nahi krna hai abhi itne ${gap} hi h`)
//     }
// }


async function main() {
    const p = buildHealthPrompt(data);
    const result = await generateText(p);
    console.log("ai se aaya hua data:",result);
    const text = result.candidates[0].content.parts[0].text;
    console.log("text wala data", text)
    
}

main();


// const res = ai.generateText(prompt(userDataArray));

// console.log(res);

