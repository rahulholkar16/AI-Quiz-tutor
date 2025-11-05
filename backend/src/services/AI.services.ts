import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { cleanGeminiJSON } from "./cleanOutput.services.js";

dotenv.config();
// console.log("api ", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateQuizWithGemini = async (topic: string, type: string) => {
    const prompt = `
        You are a coding quiz generator AI.
        Generate 2 beginner-level ${type.toUpperCase()} questions related to "${topic}".
        Return the result **strictly as valid JSON**, not markdown, not text.

        JSON FORMAT EXAMPLES:

        If type = "mcq":
        {
        "quizType": "mcq",
        "topic": "${topic}",
        "questions 1": [
            {
            "title": "Understanding useState",
            "question": "Which hook allows you to manage state?",
            "options": ["useState", "useEffect", "useMemo", "useRef"],
            "correctAnswer": "useState",
            "explanation": "useState helps manage component state."
            }
        ]
        }

            If type = "fillup":
            {
            "quizType": "fillup",
            "topic": "${topic}",
            "questions 1": [
                {
                "title": "Variable Declaration",
                "question": "The keyword '____' declares a variable that cannot be reassigned.",
                "correctAnswer": "const",
                "explanation": "'const' creates immutable variables."
                }
            ]
            }

            If type = "codeerror":
            {
            "quizType": "codeerror",
            "topic": "${topic}",
            "questions": [
                {
                "title": "Missing return statement",
                "question 1": "The function should return the sum but prints undefined.",
                "errorCode": "function add(a,b){ console.log(a+b); }",
                "task": "Fix to return the sum instead of logging it.",
                "correctCode": "function add(a,b){ return a+b; }",
                "explanation": "Missing 'return' caused undefined."
                }
            ]
            }

            Remember:
            - Always return pure JSON.
            - No markdown, no extra text.
            - 2 questions per request.
            `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    console.log("result is going on  : ", result.response);
    //if(type == "codeerror") return result.response
    const data = cleanGeminiJSON(result.response.text());
    return data;
};
