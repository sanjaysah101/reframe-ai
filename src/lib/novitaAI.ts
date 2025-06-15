import { callNovitaAi } from "./novitaService";

const COMMON_HTML_RULES = `
Strict Rules for HTML Output:
1.  You MUST generate a complete, self-contained HTML document. This means starting with <!DOCTYPE html> and including <html>, <head>, and <body> tags.
2.  The <head> section MUST include a <title> tag (e.g., "<title>Modernized Website</title>") and a <script src="https://cdn.tailwindcss.com"></script> tag to enable Tailwind CSS styling. Do NOT include any other external JavaScript or CSS files.
3.  Use ONLY Tailwind CSS classes for ALL styling within the <body>. Do NOT use inline \`style\` attributes.
4.  Do NOT include any <style> tags within the HTML document.
5.  Do NOT include any <script> tags or any JavaScript within the <body>. JavaScript is only allowed for the Tailwind CDN in the <head>.
6.  The HTML should be well-structured, responsive, and adhere to accessibility best practices (e.g., semantic tags, alt attributes for images).
7.  Focus on clean UX and modern aesthetics. Ensure good color contrast and readable fonts. If a specific theme is provided in the prompt (e.g., 'Sleek Dark Mode', 'Clean Light Mode', 'Vibrant & Playful', 'Professional Corporate', 'Retro Futuristic', 'Minimalist Zen'), the generated HTML's color palette, typography, and overall aesthetic MUST strongly align with that theme. If 'Default (AI's Best Guess)' is chosen, use your best judgment for a contemporary look.
8.  If you need placeholder images, use 'https://picsum.photos/seed/UNIQUE_SEED/WIDTH/HEIGHT' format, replacing UNIQUE_SEED (e.g., image1, image2), WIDTH and HEIGHT appropriately. The generated HTML should be visually appealing. Example: <img src="https://picsum.photos/seed/heroBanner/600/300" alt="Modern Hero Banner">
9.  The root element of your generated HTML's <body> should be designed to fill its container or viewport if appropriate, for example by having classes like 'h-screen flex flex-col' or similar on the <body> or a main wrapper div, depending on the content.
10. Generate rich content, not just a placeholder. Try to infer a realistic page structure based on the input. For example, if it's a forum, show some posts. If it's a shop, show some product cards. Make it look like a real, albeit simplified, modern webpage.
11. Provide ONLY the full HTML document, no surrounding text, markdown, or explanations like "Here is the HTML...". The response must be pure HTML starting with <!DOCTYPE html>.
`;

export async function generateModernizedHtml(description: string, theme: string): Promise<string> {
  const prompt = `You are an expert web developer...
Old Website Description:
---
${description}
---

Desired Modern Theme: ${theme}
---

${COMMON_HTML_RULES}
Generate the full HTML document for the modern version:`;

  return callNovitaAi(prompt);
}

export async function analyzeAndModernizeUrl(url: string, theme: string, originalHTML: string): Promise<string> {
  const prompt = `You are an expert web analyst...
Provided URL:
---
${url}
---

Original HTML Content:
---
${originalHTML}
---

Desired Modern Theme: ${theme}
---

${COMMON_HTML_RULES}
Generate the full HTML document for the modern version:`;

  return callNovitaAi(prompt);
}
