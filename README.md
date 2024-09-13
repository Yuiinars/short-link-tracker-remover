# Short Link Tracker Remover

A high-performance, TypeScript-based API that swiftly intercepts and sanitizes short links, removing tracking parameters.

![TypeScript 100%](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Latest Version](https://img.shields.io/github/v/tag/Yuiinars/short-link-tracker-remover?label=Latest%20Version&style=for-the-badge)

![Powered by Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white) [![Bun.sh Runtime](https://img.shields.io/badge/Bun_Runtime-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

![Cloudflare Turnstile Supported](https://img.shields.io/badge/Cloudflare_Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white) ![](https://img.shields.io/badge/Cheer.IO-E88C1F?style=for-the-badge&logo=cheerio&logoColor=white)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Supported Services](#supported-services)
- [API Docs](#api-docs)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
- [LISENSE](#lisense)

## Features

- [x] :rocket: High performance, scalability, and maintainability
- [x] :broom: Efficient tracking parameter removal from URLs
- [x] :globe_with_meridians: Multiple domain-specific cleaners
- [x] :electric_plug: RESTful API for seamless integration
- [x] :computer: 100% TypeScript implementation
- [x] :shield: Comprehensive SSRF attack defense measures
- [x] :package: Out-of-the-box, user-friendly setup and configuration

## Supported Services

| Service                 | Supported              | domain-specific                   |
| ----------------------- | ---------------------- | --------------------------------- |
| Bilibili                | :white_check_mark: Yes | `bibili.com`, `b23.tv`            |
| Youtube                 | :white_check_mark: Yes | `youtube.com`, `youtu.be`         |
| Weixin                  | :white_check_mark: Yes | `mp.weixin.qq.com`                |
| NetEase Cloud Music     | :white_check_mark: Yes | `music.163.com`, `163cn.tv`       |
| Xiaohongshu             | :white_check_mark: Yes | `xhs.link`, `xiaohongshu.com`     |
| JD.com                  | :white_check_mark: Yes | `3.cn`                            |
| Taobao/GooFish (Xianyu) | :white_check_mark: Yes | `m.tb.cn`, `tb.cn`                |
| Spotify                 | :white_check_mark: Yes | `spotify.app.link`, `spotify.com` |

Welcome to contribute, thanks!

## API Docs

See the [API.md](API.md)

## Requirements

- [Bun](https://bun.sh/) runtime
- Node.js 14+ (for development)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Yuiinars/short-link-tracker-remover.git
cd short-link-tracker-remover
```

2. Install dependencies:

```bash
bun install
```

## Usage

### Configuration

modify `src/config.example.ts` to your needs:

```bash
cp src/config.example.ts src/config.ts
```

### Development

```
bun run dev
```

### Production

```
bun run start
```

## LISENSE

[![GNU GPLv3](https://img.shields.io/github/license/Yuiinars/short-link-tracker-remover?logo=gnu&label=License)](LICENSE)