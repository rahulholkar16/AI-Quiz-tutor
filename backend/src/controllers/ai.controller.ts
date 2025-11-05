import { generateQuizWithGemini } from "../services/AI.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const GernerateAi = asyncHandler(async (req, res) => {
    const { topic, type } = req.body;

    if (!topic || !type) {
        return res
            .status(400)
            .json({ error: "Please provide 'topic' and 'type'." });
    }

    /* if (type === "mcq") {
        systemPrompt += `
        Options:
        A) ...
        B) ...
        C) ...
        D) ...
        Correct Answer: [A/B/C/D]
        Explanation: [brief reason why]
        ---------------------------------
    `;
    } else if (type === "fillup") {
        systemPrompt += `
        FillUp:
        "____" marks the blank.
        Correct Answer: [the filled word/code]
        Explanation: [brief description]
        ---------------------------------
    `;
    } else if (type === "codeerror") {
        systemPrompt += `
            Code With Error:
            \`\`\`js
            // buggy or incomplete code
            \`\`\`
            Task: [what user must fix]
            Correct Solution:
            \`\`\`js
            // fixed code
            \`\`\`
            Explanation: [why it was wrong]
            ---------------------------------
        `;
    }*/

    try {
        const quiz = await generateQuizWithGemini(topic, type);
        res.json( quiz );
    } catch (error) {
        if(error instanceof Error){
            console.error("❌ Gemini API Error:", error.message)
        }
        console.error("❌ not an object Gemini API Error:", error)
        res.status(500).json({
            error: "Failed to generate quiz from Gemini API",
        });
    }
});
