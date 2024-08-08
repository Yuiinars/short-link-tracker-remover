# Short Link Tracker Remover

A high-performance, TypeScript-based API that swiftly intercepts and sanitizes short links, removing tracking parameters.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Hidden dangers](#hidden-dangers)
- [Features](#features)
- [Implementation](#implementation)
- [Supported Services](#supported-services)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
- [LISENSE](#lisense)

## Hidden dangers

Shortened URLs often conceal sophisticated tracking mechanisms, covertly harvesting data during redirection:
- Activation timestamp
- Sharer's unique identifier
- Device specifications
- Geolocation
- Potentially sensitive personal information

This data enables platforms to establish user relationship graphs, optimize recommendation algorithms, conduct targeted advertising, and analyze user behavior patterns.

## Features

1. High performance, scalability, and maintainability
2. Efficient tracking parameter removal from URLs
3. Multiple domain-specific cleaners
4. RESTful API for seamless integration
5. 100% TypeScript implementation

## Implementation

The server-side component handles the entire process:
1. Receives the short URL
2. Resolves it to the full URL with trackers
3. Applies sophisticated cleaning algorithms to remove tracking parameters
4. Returns a clean, tracker-free URL


## Supported Services

| Service             | Supported | domain-specific               |
| ------------------- | --------- | ----------------------------- |
| Bilibili            | Yes       | `bibili.com`, `b23.tv`        |
| Youtube             | Yes       | `youtube.com`, `youtu.be`     |
| Weixin              | Yes       | `mp.weixin.qq.com`            |
| NetEase Cloud Music | Yes       | `music.163.com`, `163cn.tv`   |
| Xiaohongshu         | (WIP)     | `xhs.link`, `xiaohongshu.com` |
| Taobao              | (WIP)     | `t.cn`                        |

Welcome to contribute, thanks!

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

Configuration is stored in `./src/config.ts`, you can modify it to fit your needs.

### Development

```
bun run dev
```

### Production

```
bun run build
bun run start
```


## LISENSE

GNU [GPLv3](LICENSE)