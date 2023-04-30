---
---

## Hello Zig

```zig
const std = @import("std");
const print = std.debug.print;

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hei, {s}", .{"maailma"});
}
```
