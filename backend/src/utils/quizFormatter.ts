export function formatQuizData(data: any, type: string) {
    if (!data) throw new Error("Missing quiz data");

    const quizType = data.quizType || type;
    const topic = data.topic || "Untitled Topic";

    // handle weird keys like "questions 1"
    const questions = data.questions || data["questions 1"] || [];

    const formattedQuestions = questions.map((q: any, index: number) => {
        const base = {
            type: quizType,
            title: q.title || `Question ${index + 1}`,
            question: q.question || q.text || "",
            explanation: q.explanation || "",
        };

        switch (quizType) {
            case "mcq":
                return {
                    ...base,
                    options: (q.options || []).map((opt: string, i: number) => ({
                        id: String.fromCharCode(65 + i), // A, B, C, D
                        text: opt,
                    })),
                    answer: q.correctAnswer || q.answer || "",
                };

            case "fillup":
                return {
                    ...base,
                    correctAnswer: q.correctAnswer || "",
                };

            case "codeerror":
                return {
                    ...base,
                    errorCode: q.errorCode || "",
                    task: q.task || "",
                    correctCode: q.correctCode || "",
                };

            default:
                return base;
        }
    });

    return {
        quizType,
        topic,
        questions: formattedQuestions,
    };
}
