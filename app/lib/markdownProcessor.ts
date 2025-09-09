// app/lib/markdownProcessor.ts - Align with existing site typography patterns

export function processMarkdownWithComponents(content: string): string {
  return content;
}

// Process markdown HTML to match the inline styles used throughout the site
export function enhanceMarkdownHTML(htmlContent: string): string {
  let processedContent = htmlContent;

  // Apply the same inline styles that work on certification pages
  processedContent = processedContent.replace(
    /<h2>/g,
    '<h2 class="text-2xl font-bold text-slate-900 mb-6" style="font-family: Work Sans, system-ui, sans-serif; font-weight: 700;">'
  );

  processedContent = processedContent.replace(
    /<h3>/g,
    '<h3 class="text-xl font-bold text-slate-900 mb-4" style="font-family: Work Sans, system-ui, sans-serif; font-weight: 700;">'
  );

  processedContent = processedContent.replace(
    /<h4>/g,
    '<h4 class="text-lg font-semibold text-slate-900 mb-3" style="font-family: Work Sans, system-ui, sans-serif; font-weight: 600;">'
  );

  // Apply the same paragraph styling as certification pages
  processedContent = processedContent.replace(
    /<p>/g,
    '<p class="text-lg text-slate-600 leading-relaxed mb-4">'
  );

  // Apply list styling that matches the site
  processedContent = processedContent.replace(
    /<ul>/g,
    '<ul class="text-lg text-slate-600 leading-relaxed mb-4 ml-6 list-disc space-y-2">'
  );

  processedContent = processedContent.replace(
    /<li>/g,
    '<li class="text-lg text-slate-600">'
  );

  // Apply strong text styling
  processedContent = processedContent.replace(
    /<strong>/g,
    '<strong class="font-semibold text-slate-900">'
  );

  // Apply link styling that matches the site
  processedContent = processedContent.replace(
    /<a href="/g,
    '<a class="text-blue-600 hover:text-blue-700 hover:underline transition-colors" href="'
  );

  return processedContent;
}
