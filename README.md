# Short Link Tracker Remover

A high-performance, TypeScript-based API that swiftly intercepts and sanitizes short links, removing tracking parameters.

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

GNU [GPLv3](LICENSE)