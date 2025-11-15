// we might need this later

// export const normalizeToArray = (text: string): string[] => {
//   // Unescape literal '\n' into real newlines
//   const clean = text.replace(/\\n/g, '\n');

//   return clean
//     .replace(/\r/g, '')
//     .replace(/\n{2,}/g, '\n')
//     .replace(/\*\*/g, '')
//     .replace(/^\d+\.\s*/gm, '')
//     .replace(/^[•\-\*]\s*/gm, '')
//     .trim()
//     .split('\n')
//     .map(line => line.trim())
//     .filter(Boolean);
// };
