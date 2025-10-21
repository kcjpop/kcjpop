---
title: 'Learning PEGs in Janet'
---

[PEGs in Janet slides](https://junglecoder.com/talks/PEGs/slides.pdf)

- Number literal

```janet
(peg/match '(capture 0) "abc") #-> ""
(peg/match '(capture 1) "abc") #-> "a"
(peg/match '(capture 2) "abc") #-> "ab"
(peg/match '(capture 3) "abc") #-> "abc"
(peg/match '(capture 4) "abc") #-> nil
(peg/match '(capture -1) "abc") #-> nil
```

- `'foo` matches the string `"foo"` itself
- `(sequence "a" "b" "c")` or `(* "a" "b" "c")` -> `"abc"`
- `(choice "a" "b" "c")` or `(+ "a" "b" "c")` -> `"a"` or `"b"` or `"c"`

```janet
~(repeat 3 :w) "abcd" #-> "abc"
~(repeat 3 :w) "ab" #-> nil

~(between 2 3 :w) "abcd" #-> "abc"
~(between 2 3 :w) "ab" #-> "ab"
~(between 2 3 :w) "a" #-> nil
```

- Split by chars

```janet
~(any (capture :w)) "abc" #->
```
