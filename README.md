# News Image — 19 November 2026

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/josecasasgomez7-dot/news-image-nov19/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/josecasasgomez7-dot/news-image-nov19/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

A one-page newspaper front page summing up the day's news for Thursday, 19 November 2026. Built for the make.fun daily News Image bounty.

## What it is

`entry.png` is the finished front page (1024 × 1024): the first Trump–Xi–Putin three-way summit in Shenzhen, the World Court ruling on Myanmar, the third strike on the Crimean Bridge, Anthropic's record IPO, and more, plus an "Also today" strip.

`main.ts` is the entry program. It checks that `entry.png` is a real PNG file and copies it to the output directory.

## How to run

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png`. If `MAKEFUN_OUTPUT_DIR` is not set, the program writes to `/output`.

## Files

- `entry.png` — the finished front page
- `main.ts` — the program
- `LICENSE` — MIT
