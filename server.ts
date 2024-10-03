import express, {Request, Response} from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from "body-parser"
import OpenAI from "openai";

require('dotenv').config()
const app = express();
const port = 8080;
const genAI = new GoogleGenerativeAI("AIzaSyB6YAX7BQ5-RTwPH0KOIq3VrdtRA_f_Ekg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    app.use(bodyParser());
app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express server!');
});
app.post('/test', async(req: Request, res:Response) => {

const {prompt} = req.body;
// console.log(process.env.API_KEY)
const result = await model.generateContent(prompt);
console.log(result.response.text());
res.send(result.response.text())

// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: prompt,
//         },
//     ],
// });

// res.send(completion.choices[0].message);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});