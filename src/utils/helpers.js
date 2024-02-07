export function extractJSON(str) {
    const regex = /```json([\s\S]*?)```/g
    const match = regex.exec(str)
    if (match) {
        const jsonString = match[1].trim()
        return JSON.parse(jsonString)
    }
    return null
}

export function parseJsonFromResponse(response) {
    // Remove the "```json" and "```" markers
    const jsonStr = response.replace('```json\n', '').replace('\n```', '')
    // Parse the JSON string into a JavaScript object
    const jsonObject = JSON.parse(jsonStr)
    return jsonObject
}
