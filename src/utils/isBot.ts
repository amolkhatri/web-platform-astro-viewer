/**
 * Detects if the user-agent string belongs to a bot/crawler
 * @param userAgent - The user-agent string from the request headers
 * @returns true if the user-agent is identified as a bot, false otherwise
 */
export function isBot(userAgent: string): boolean {
  console.log(userAgent);
  if (!userAgent) {
    return false;
  }

  const botPatterns = [
    // Search engine crawlers
    /googlebot/i,
    /bingbot/i,
    /slurp/i, // Yahoo
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /sogou/i,
    /exabot/i,
    
    // Social media bots
    /facebookexternalhit/i,
    /facebookcatalog/i,
    /twitterbot/i,
    /linkedinbot/i,
    /pinterest/i,
    /instagrambot/i,
    
    // Messaging/preview bots
    /slackbot/i,
    /telegrambot/i,
    /whatsapp/i,
    /skypeuripreview/i,
    
    // Other crawlers
    /applebot/i,
    /discordbot/i,
    /redditbot/i,
    /semrushbot/i,
    /ahrefsbot/i,
    /mj12bot/i,
    /dotbot/i,
    /rogerbot/i,
    
    // Generic bot indicators
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ];

  return botPatterns.some(pattern => pattern.test(userAgent));
}
