# Short Link Tracker Remover Bot

## Purpose

The Short Link Tracker Remover Bot is designed to enhance user privacy and security by resolving short links and removing potential tracking parameters. Our bot aims to:

1. Resolve shortened URLs to their final destination.
2. Remove tracking parameters from URLs.
3. Provide metadata about the final destination for user information.

## How It Works

1. The bot visits the short link or URL provided.
2. It follows any redirects to reach the final destination.
3. The bot then analyzes the final URL and removes known tracking parameters.
4. Finally, it fetches metadata (title, description, image) from the final page for user preview.

## Identification

Our bot identifies itself with the following User-Agent string:

`Mozilla/5.0 (compatible; tracker-remover/1.0; +https://github.com/Yuiinars/short-link-tracker-remover/blob/main/bot.md)`

## For Webmasters

### Blocking the Bot

If you wish to block our bot from accessing your website, you can do so by adding the following line to your robots.txt file:

```
User-agent: tracker-remover
Disallow: /
```

## Ethical Considerations

We respect website owners' wishes and honor robots.txt directives. Our bot is designed to be lightweight and non-intrusive, making only necessary requests to fulfill its purpose.

If you have any concerns or questions about our bot's behavior, please open an issue on our GitHub repository.

## Contact

For any inquiries or concerns, please open an issue on our GitHub repository:
<https://github.com/Yuiinars/short-link-tracker-remover/issues/new>

We appreciate your understanding and cooperation in making the web a more private and secure place for all users.