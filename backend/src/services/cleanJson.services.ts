
export function cleanAndParseAIJson(input: string): any {
    if (!input || typeof input !== "string") throw new Error("Input must be a string");

    // 1) Remove markdown fences (```json ... ``` or ``` ... ```)
    let s = input.replace(/```json/i, "").replace(/```/g, "").trim();

    // 2) If the entire string is wrapped in quotes, remove them.
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        // remove only if looks like a quoted wrapper (not JSON object)
        // but ensure we don't accidentally remove leading "{" case
        const inner = s.slice(1, -1);
        // if inner contains { or [ then it was likely a quoted JSON string — keep inner
        if (inner.indexOf("{") >= 0 || inner.indexOf("[") >= 0) {
            s = inner;
        }
    }

    // 3) Find first top-level JSON substring by walking chars and tracking state
    const firstObjIndex = Math.min(
        ...["{", "["]
            .map((ch) => s.indexOf(ch))
            .filter((i) => i >= 0)
    );

    if (firstObjIndex === undefined || firstObjIndex === Infinity) {
        throw new Error("No JSON object/array start found in text");
    }

    let i = firstObjIndex;
    let inString = false;
    let escaped = false;
    let depth = 0;
    let startChar = s[firstObjIndex]; // '{' or '['
    let endChar = startChar === "{" ? "}" : "]";

    for (; i < s.length; i++) {
        const ch = s[i];

        if (inString) {
            if (escaped) {
                escaped = false; // skip this char as it is escaped
            } else {
                if (ch === "\\") {
                    escaped = true;
                } else if (ch === '"') {
                    inString = false;
                }
            }
            continue;
        } else {
            if (ch === '"') {
                inString = true;
                continue;
            }

            if (ch === startChar) {
                depth++;
            } else if (ch === endChar) {
                depth--;
                if (depth === 0) {
                    // found matching end
                    const jsonSubstring = s.slice(firstObjIndex, i + 1).trim();

                    // 4) Try parsing (and handle double-escaped JSON strings)
                    let parsed: any = null;
                    let tries = 0;
                    let toParse: any = jsonSubstring;
                    while (tries < 4) {
                        try {
                            parsed = JSON.parse(toParse);
                            // if parse produced a string (double-encoded JSON), try again
                            if (typeof parsed === "string" && parsed.trim().startsWith("{")) {
                                toParse = parsed;
                                tries++;
                                continue;
                            }
                            return parsed;
                        } catch (err) {
                            // If we failed and the string has obvious escaped newlines we can try to normalize:
                            // e.g. replace `\\n` -> `\n` only if JSON.parse fails
                            if (tries === 0) {
                                // attempt to unescape common double-escape sequences
                                // Replace \\n -> \n, \\t -> \t, \\" -> ", \\\\ -> \\
                                toParse = toParse
                                    .replace(/\\\\n/g, "\\n")
                                    .replace(/\\\\r/g, "\\r")
                                    .replace(/\\\\t/g, "\\t")
                                    .replace(/\\\\"/g, '\\"')
                                    .replace(/\\\\\\/g, "\\\\");
                                tries++;
                                continue;
                            }
                            // last resort: remove stray backslashes in front of quotes (dangerous if real escapes needed)
                            if (tries === 1) {
                                toParse = toParse.replace(/\\+"/g, '"');
                                tries++;
                                continue;
                            }
                            // give up after attempts
                            throw new Error("Failed to parse JSON: " + (err as Error).message);
                        }
                    }
                    break;
                }
            }
        }
    }

    throw new Error("Could not extract a complete JSON object from input");
}
