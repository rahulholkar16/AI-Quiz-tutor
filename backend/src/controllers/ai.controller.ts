import { generateQuizWithGemini } from "../services/AI.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const GernerateAi = asyncHandler(async (req, res) => {
    const { topic, type, questionNo } = req.body;

    if (!topic || !type) {
        return res
            .status(400)
            .json({ error: "Please provide 'topic' and 'type'." });
    }

    
    try {
        const quiz = await generateQuizWithGemini(topic, type, questionNo);
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
