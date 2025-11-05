import axios from "axios";

export async function generateQuiz(topic: string, numQuestions: number = 5) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY missing");

    const prompt = `Generate ${numQuestions} multiple choice questions about ${topic}. 
Return JSON array with fields: text, options (array), answer (0-3), explanation.`;

    const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        },
        { headers: { Authorization: `Bearer ${key}` } }
    );

    const content = res.data.choices[0].message.content;
    const cleaned = content.replace(/```json|```/g, "");
    return JSON.parse(cleaned);
}
