"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = 8080;
const genAI = new generative_ai_1.GoogleGenerativeAI("AIzaSyB6YAX7BQ5-RTwPH0KOIq3VrdtRA_f_Ekg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.use((0, body_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello from TypeScript Express server!');
});
app.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    // console.log(process.env.API_KEY)
    const result = yield model.generateContent(prompt);
    console.log(result.response.text());
    res.send(result.response.text());
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
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
