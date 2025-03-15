---
date: 2023-03-18
draft: true
---

A LISP to write system apps, why not?

## Hello racket

```racket
#lang racket

; `define` can… define a value
(define msg "hello world")

; or a function
(define (my-app)
  (println msg))

; function application
(my-app)
```

Boolean values are `#t` and `#f`. Anything that isn't `#f` is `#t`.

## Functions

```racket
(define (my-add a b)
  (+ a b))

; function name can contain almost any character,
; except ( ) [ ] { } " , ' ` ; # | \
(define (>=5? x)
  (>= x 5))

; lambda
(lambda (s)
  (string-append s "!"))

; let binding
; let* allows to refer to previous bindings
```

## List

```racket
; define a list
(define lst (list 1 2 3))

; `empty` creates an empty list
(empty) ;; '()

; check if a list is empty
(empty? empty) ;; #t
(empty? lst) ;; #f

; check if a list is NOT empty
(cons? empty) ;; #f
(cons? lst) ;; #t
```

Some operations over lists.

```racket
; get length of a list
(length lst)

; get element by index
(list-ref lst 1) ;; 2

; take the first element
(first lst) ;; 1
(rest lst)  ;; '(2 3)

; combine lists
(append (list 1 2) (list 3 4)) ; '(1 2 3 4)

; check if an element exists in list
(member 5 list) ;; #f
```

Mapping over a list is simple.

```racket
(define (add-bang s)
  (string-append s "!"))

(map add-bang (list "hello" "world")) ;; '("hello!" "world!")

; can also map over multiple lists
(map + (list 1 2 3) (list 4 5 6)) ; '(5 7 9)
```

There are `andmap` and `ormap` that are very similar to `Array.prototype.every()` and `Array.prototype.some()` in JavaScript.

```racket
(andmap even? (list 2 4 6)) ; #t

(andmap even? (list 2 4 6 1)) ; #f

(ormap even? (list 2 4 6 1)) ; #t
```

And of course we have `filter`, `foldl`, `foldr`.

## A taste of recursion

```racket
(define (remove-dups l)
  (cond
    [(empty? l) empty]
    [(empty? (rest l)) l]
    [else
      (let* ([head (first l)]
             [tail (rest l)]
             [next (first tail)])
             (if (equal? head next)
              (remove-dups tail)
              (cons head (remove-dups tail))))]))
```

## On `cons`, `car`, `cdr`, and `.`

They are a bit confusing 😅
