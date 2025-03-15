---
date: 2023-02-26
draft: true
---

## Hello gleam

```gleam
import gleam/io

pub fn main() {
  io.println("hello, friend!")
}
```

stdlib

```gleam
import gleam/string
import gleam/list.{contains}

fn usage() {
  string.append("str", "ing")
}

fn more_usage() {
  [1, 2, 3]
  |> contains(any: 2)
}
```
