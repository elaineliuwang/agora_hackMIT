import {PythonShell} from 'python-shell';

export async function myFunction() {
    PythonShell.run('test.py', null).then(messages=>{
      console.log('finished');
    });
}


// export function myFunction() {
//     const fs = require('fs');
//     // const fetch = require('node-fetch'); // Assuming you are using node-fetch in Node.js environment
//     const API_URL = "https://api-inference.huggingface.co/models/ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition";
//     const headers = {
//         "Authorization": "Bearer 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"
//     };
    
//     const pos = ["happy", "calm", "neutral"];
//     const neut = ["neutral", "surprised"];
//     const neg = ["angry", "disgust", "fearful", "sad"]; 
    
//     const dataFolder = "../public/audios";
    
//     async function query(filename) {
//         const data = fs.readFileSync(filename);
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: headers,
//             body: data
//         });
//         return await response.json();
//     }
    
//     async function main() {
//         const inputs = fs.readdirSync(dataFolder).map(file => dataFolder + file);
    
//         if (fs.existsSync("../public/output")) {
//             fs.rmdirSync("../public/output", { recursive: true });
//         }
//         fs.mkdirSync("../public/output");
    
//         const outputList = [];
    
//         for (const filename of inputs) {
//             let posScore = 0, neutScore = 0, negScore = 0;
//             const output = await query(filename);
//             for (const emotion of output) {
//                 const emote = emotion.label;
//                 const score = emotion.score;
//                 if (pos.includes(emote)) posScore += score;
//                 if (neut.includes(emote)) neutScore += score;
//                 if (neg.includes(emote)) negScore += score;
//             }
    
//             const emotionScores = [posScore, neutScore, negScore];
//             const jsonRetDict = {
//                 option: filename,
//                 emotion_scores: emotionScores,
//                 scores: output
//             };
    
//             outputList.push(jsonRetDict);
//         }
    
//         outputList.sort((a, b) => b.emotion_scores[0] - a.emotion_scores[0]);
    
//         fs.writeFileSync("../public/output/outputjson.json", JSON.stringify(outputList, null, 2));
    
//     }
    
//     main().catch(console.error);
// }

