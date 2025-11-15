
  function smartFormat(text: string): string {
  if (!text) return text;
  
  // Normalize line endings
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  // 1. Detect pattern: "Word/Phrase: Something..." and make it a heading
  // Matches: "Takeaway:", "Key ingredients:", "Pro tip:", etc.
  text = text.replace(
    /([A-Z][a-z]+(?:\s+[a-z]+){0,3}):\s*([A-Z])/g,
    "\n\n**$1:**\n\n$2"
  );
  
  // 2. Detect bullet point lists (lines starting with -)
  // Ensure they have spacing before the list starts
  text = text.replace(/(\n|^)(?!\s*-\s)([^\n]+)\n(\s*-\s)/g, "$1$2\n\n$3");
  
  // 3. Add spacing between bullet items
  text = text.replace(/(\n-[^\n]+)(\n-)(?!\n)/g, "$1\n$2");
  
  // 4. Detect long sentences (>150 chars) and break at natural points
  const breakLongSentences = (txt: string) => {
    // Split by sentence endings
    const sentences = txt.split(/(?<=[.!?])\s+(?=[A-Z])/);
    let result = "";
    let buffer = "";
    
    for (const sentence of sentences) {
      // Don't break lists, headings, or already formatted content
      if (sentence.match(/^(\s*-|\*\*|#{1,6}\s)/)) {
        if (buffer) {
          result += buffer.trim() + "\n\n";
          buffer = "";
        }
        result += sentence + "\n";
        continue;
      }
      
      buffer += sentence + " ";
      
      // Break if buffer is getting long (>400 chars) or at natural breaks
      if (buffer.length > 400 || sentence.match(/\b(Takeaway|However|Moreover|Additionally|Furthermore)\b/)) {
        result += buffer.trim() + "\n\n";
        buffer = "";
      }
    }
    
    if (buffer.trim()) {
      result += buffer.trim() + "\n\n";
    }
    
    return result;
  };
  
  text = breakLongSentences(text);
  
  // 5. Detect visual/transition cues and add paragraph breaks
  // Pattern: "Verb a noun" at sentence start (Picture a, Imagine a, Visualize a)
  text = text.replace(
    /\s+([A-Z][a-z]+\s+a\s+[a-z]+)/g,
    "\n\n$1"
  );
  
  // 6. Detect statistical/citation patterns and separate them
  // Pattern: numbers with % or "according to"
  text = text.replace(
    /([^.!?]+(?:\d+%|according to[^.!?]+)[^.!?]*[.!?])\s+/g,
    "$1\n\n"
  );
  
  // 7. Convert various list patterns into bullet points
  
  // 7a. Pattern: "Text: - item; - item; - item." (semicolon-separated)
  text = text.replace(
    /([^:.\n]{10,}):\s*((?:-[^;]+;\s*)+(?:-[^;.]+[.;])?)/g,
    (match, intro, items:string) => {
      const bullets = items
        .split(/;\s*/)
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => {
          item = item.replace(/^-\s*/, "");
          item = item.replace(/[.;]$/, "");
          return `- ${item}`;
        })
        .join("\n");
      
      return `\n\n**${intro.trim()}:**\n\n${bullets}\n`;
    }
  );
  
  // 7b. Pattern: "Text: - item - item - item" (just dashes, no separators)
  text = text.replace(
    /([^:.\n]{10,}):\s*((?:-\s*[^\-\n]{3,}(?:\s+|$))+)/g,
    (match, intro, items:string) => {
      // Check if it's already formatted or has semicolons (skip if so)
      if (items.includes(";") || items.includes("\n-")) return match;
      
      const bullets = items
        .split(/\s*-\s*/)
        .map(item => item.trim())
        .filter(item => item.length > 3)
        .map(item => {
          item = item.replace(/[.;,]$/, "");
          return `- ${item}`;
        })
        .join("\n");
      
      return `\n\n**${intro.trim()}:**\n\n${bullets}\n`;
    }
  );
  
  // 7c. Pattern: Existing bullet points that need spacing
  // If we see "Text: - item" already formatted, just add spacing
  text = text.replace(
    /([^:\n]{10,}):\s*(\n?\s*-\s)/g,
    "\n\n**$1:**\n\n$2"
  );
  
  // 7d. Pattern: Measurements list (- item – measurement)
  // Detects: "- rice – 2 cups" or "- item - measurement"
  text = text.replace(
    /((?:^|\n)\s*-\s*[a-z][^\n–-]{2,}\s*[–-]\s*[^\n]+)/gi,
    "\n$1"
  );
  
  // 7e. Convert inline measurement lists to proper bullet format
  // Pattern: "text. - item – measure - item – measure"
  text = text.replace(
    /([.!?])\s+(-\s*[a-z][^\n–-]+\s*[–-]\s*[^\n]+(?:\s+-\s*[a-z][^\n–-]+\s*[–-]\s*[^\n]+)*)/gi,
    (match, punctuation, items:string) => {
      // Split by dash at start of new items
      const bullets = items
        .split(/\s+-\s*/)
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => {
          // Replace the en-dash or hyphen between item and measurement with colon
          item = item.replace(/\s*[–-]\s*/, ": ");
          return `- ${item}`;
        })
        .join("\n");
      
      return `${punctuation}\n\n${bullets}\n`;
    }
  );
  
  // 8. Detect sequential markers and create breaks
  // Pattern: First..., Then..., Next..., Finally...
  text = text.replace(
    /\b(First|Then|Next|Finally|Additionally|Moreover),\s+/gi,
    "\n\n$1, "
  );
  
  // 8. Detect section starters (sentences that introduce lists or sections)
  // Pattern: sentence ending with colon or "are"/"include" before list
  text = text.replace(
    /([^:\n]{20,}(?:are|include|following|basics|needed|required)[^:\n]{0,30}):\s*(?=\n|[A-Z-])/gi,
    "\n\n**$1:**\n\n"
  );
  
  // 9. Detect parenthetical information and ensure it doesn't break flow
  text = text.replace(/\s+\(/g, " (");
  
  // 10. Clean up: remove excessive blank lines
  text = text.replace(/\n{3,}/g, "\n\n");
  
  // 11. Clean up: remove leading/trailing whitespace
  text = text.trim();
  
  // 12. Ensure spacing after bullet list sections
  text = text.replace(/(\n-[^\n]+)(\n)(?=[A-Z][^-])/g, "$1\n\n");
  
  // 13. Fix spacing around bold text
  text = text.replace(/\*\*([^*]+)\*\*\s*/g, "**$1**\n\n");
  
  return text + "\n";
}

export { smartFormat };