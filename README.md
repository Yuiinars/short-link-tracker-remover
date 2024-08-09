# Short Link Tracker Remover

A high-performance, TypeScript-based API that swiftly intercepts and sanitizes short links, removing tracking parameters.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Supported Services](#supported-services)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
- [API Docs](#api-docs)
- [LISENSE](#lisense)

## Features

1. High performance, scalability, and maintainability
2. Efficient tracking parameter removal from URLs
3. Multiple domain-specific cleaners
4. RESTful API for seamless integration
5. 100% TypeScript implementation


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

## API Docs

Look at the [code](https://github.com/Yuiinars/short-link-tracker-remover/blob/main/src/routes.ts#L46-L85)

## LISENSE

GNU [GPLv3](LICENSE)