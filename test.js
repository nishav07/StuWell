console.log("Hello world")

const d1 = "2026-01-28";
const d2 = "2026-02-1";
function daysBetween(date1,date2){
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffinMs = d2 - d1;
    return Math.floor(diffinMs/(1000 * 60 * 60 * 24));
}

function firstTime(first,today){
    const gap = daysBetween(first,today);
    console.log("gappppp",gap);
    if(gap >= 7){
        console.log("ai ko call kr diyaa h")
    } else {
        console.log(`abhi call nahi krna hai abhi itne ${gap}`)
    }
}


firstTime(d1,d2);