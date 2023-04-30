---
date: 2023-04-29
title: 'Clojure for JavaScript developers: Building a web app'
---

Clojure (and LISP in general) has caught my interest since 2016 but I wasn't motivated enough to dive deep into it and build a full-fledged application. That's especially a shame as the project I'm currently in has a Clojure backend. So well, here is my guide to learn Clojure by building a traditional, multi-page web app.

**👩‍💻 Target audiences**: JavaScript devs who know about the language, no matter if they're only working in front (read: React) or back-end (read: Express), or both. No prior knowledge of Clojure/ LISP required.

**📣 Notes**:

- Some parts of this guide feel incomplete as I'm writing along the way.

- The code here may be not idiomatic enough. Please help me fix them by filing an issue in/ sending a PR to [this repo](https://github.com/kcjpop/kcjpop/blob/main/src/content/notes/clojure-for-javascript-devs.md).

**🙌 Acknowledgement:** This post is based on the excellent guide [Learn to build a Clojure web app - a step-by-step tutorial](https://ericnormand.me/guide/clojure-web-tutorial) by Eric Normand.

## Environment setup

Before we get started, we need to install [**Java**](https://clojure.org/guides/install_clojure#java) and Clojure. Please [follow this link](https://clojure.org/guides/install_clojure) to have the OS-specific instructions.

On **MacOS**, we can install with `brew`:

```bash
$ brew install clojure/tools/clojure
```

We also need to install [**Leiningen**](https://leiningen.org/#install) to help creating projects and automate tasks like installing packages (dependencies), running tests, etc. Its counterpart in JS world should be **npm** scripts and [**Yeoman**](https://yeoman.io/).

> Probably nobody is using Yeoman in 2023.

At the time of writing (April 2023), I'm using these on MacOS 13.2.1.

```bash
$ java -version
java version "11.0.11" 2021-04-20 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.11+9-LTS-194)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.11+9-LTS-194, mixed mode)

$ clj --version
Clojure CLI version 1.11.1.1149

$ lein --version
Leiningen 2.10.0 on Java 20 OpenJDK 64-Bit Server VM
```

## Editor setup and create a new project

I'm using VSCode with [**Calva**](https://calva.io) installed. This extension turns VSCode into an integrated, REPL-ready IDE to write Clojure.

Let's create a project. In your terminal:

```bash
$ lein new app my-web-app
Generating a project called my-web-app based on the 'app' template.
```

We'll have a folder `./my-web-app`. Open it in VSCode and Calva will automatically start. It's okay to close the Calva output panel.

Open **Command Palette** by pressing `Cmd + Shift + P`:

- Select **Calva: Start a project REPL and Connect (aka Jack-In)**
- Select **Leiningen** as project type.
- Don't pick any profile
- OK

You will see something like this:

!["VSCode interface when running jack-in to a Clojure project. On right side there is output.calva-repl, and at the bottom there is nrepl running"](/images/calva-jack-in.png)

🔍 [_Click for the full-size image_](/images/calva-jack-in.png)

The terminal panel shows a `nREPL` server is running at port 51661 (yours may be different). You can press the X button to close, or `Cmd + J` to toggle that panel. REPL means Read-Eval-Print-Loop (more about this later).

> VSCode may ask to allow `java` to connect to network to download packages. Choose **Yes**.

On the right side is `output.calva-repl`. Here we can write forms and evaluate them directly.

> To see the different between forms and expression 👉 [Stackoverflow](https://stackoverflow.com/questions/17206657/are-lisp-forms-and-lisp-expressions-same-thing)
>
> But they look the same for me now 🤔

Let's give it a try 😃

```clj
clj꞉my-web-app.core꞉>  ; Use `alt+enter` to evaluate
; Jack-in done.
clj꞉my-web-app.core꞉> (+ 1 1)
2
```

<video controls>
    <source src="/images/output-calva-repl.mp4" type="video/mp4">
</video>

We can also evaluate forms when editing files. Open `src/web/core.clj` and type:

```clj
(+ 1 1)
```

Move the cursor at the end of the line, and press `Ctrl + Enter` to evaluate the current enclosing form.

<video controls>
    <source src="/images/repl.mp4" type="video/mp4">
</video>

>

This setup is ready for learning some Clojure.

## A taste of Clojure

I started by reading [**Clojure for the Brave and True**](https://www.braveclojure.com/foreword/). With the environment and editor setup above, you can jump right into [chapter 3](https://www.braveclojure.com/do-things/) to play along. Probably you can come back here after finishing chapter 5. Below here are some basic building blocks that I think we must know before continuing.

First, let's define some values.

```clj
; Strings are enclosed in double quotes
(def full-name "John Doe")

(def year-of-birth 2000)
```

In JavaScript:

```js
var fullName = 'John'

var yearOfBirth = 20
```

> Note that I use `var` instead of `const/ let` because `def` definitions are available globally.

It feels great when you can use `-` in value names, which isn't allowed in JS. It's common to see values like `map?` or `record->user` in Clojure codebase. Roughly speaking, we can use any character to name a value.

To call a function, we will use `(fn-name arg1 arg2 arg3 …)` syntax. For example,

```clj
(println "Hello world")

; JS equivalence
; console.log('Hello world')
```

As a functional language, functions are everywhere in Clojure, including arithmetic operators like `+`, `-`, `×` or `÷`.

```clj
(+ 1 1) ;; 2
(- 2023 2000) ;; 23
(* 60 60) ;; 3600
(/ 600 10) ;; 60

; We can provide more params
(/ 100 10 2) ;; 5
(+ 1 2 3 4 5 6 7) ;; 8
```

Seeing those operators as functions is the first mind blow I had 😃

Put them altogether:

```clj
(println (str "Hello, " full-name ", age: " (- 2023 year-of-birth)))
; Hello, John Doe, age: 23
; nil

; In JS:
; console.log(`Hello, ${fullName}, age ${2023 - yearOfBirth}`)
```

That's probably enough to start building our web app 😆

### Truthiness

TODO

### Functions

TODO

Clojure comes with a lot of built-in functions and we can look them up in [**Clojuredocs**](https://clojuredocs.org/) to see more example usage.

> Actually the function suggestion in VSCode pulled data from Clojuredocs.

### Vectors and hash maps

TODO

## Build a web server with Jetty

```clj
(ns web.core
  (:require [ring.adapter.jetty :as jetty])
  (:gen-class))

(jetty/run-jetty (fn [_req] {:status 200 :body "Hello" :headers {}})
                 {:port 4001 :join? false})

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
```

```bash
$ curl -v localhost:4001
*   Trying 127.0.0.1:4001...
* Connected to localhost (127.0.0.1) port 4001 (#0)
> GET / HTTP/1.1
> Host: localhost:4001
> User-Agent: curl/8.0.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Tue, 25 Apr 2023 12:32:09 GMT
< Transfer-Encoding: chunked
< Server: Jetty(9.4.51.v20230217)
<
* Connection #0 to host localhost left intact
Hello⏎
```

Let's extract starting server into a function.

```clj
(defn start-server []
  ((jetty/run-jetty (fn [req] (app req))
                           {:port 4001 :join? false}))
```

In REPL:

```clj
clj꞉web.core꞉> (start-server)
```

Let's define an atom to hold our server instance.

```clj
(defonce server (atom nil))

; Update start-server
(defn start-server []
  (reset! server
          (jetty/run-jetty (fn [req] (app req))
                           {:port 4001 :join? false})))

; Stop server
(defn stop-server []
  (when-some [s @server]
    (.stop s)
    (reset! server nil)))
```

Let's change to `aleph`

```clj
:dependencies [[org.clojure/clojure "1.11.1"]
                 [ring/ring-core "1.10.0"]
                 [ring/ring-jetty-adapter "1.10.0"]
                 [aleph "0.6.1"]]
```

```bash
$ curl -v localhost:4001
*   Trying 127.0.0.1:4001...
* Connected to localhost (127.0.0.1) port 4001 (#0)
> GET / HTTP/1.1
> Host: localhost:4001
> User-Agent: curl/8.0.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: Aleph/0.6.1
< Date: Thu, 27 Apr 2023 06:16:49 GMT
< Connection: Keep-Alive
< content-length: 15
<
* Connection #0 to host localhost left intact
Hello World 123⏎
```

Some routes

```clj
(defn app [req]
  (case (:uri req)
    "/" {:status 200 :body "<h1>Hello</h1>" :headers {"Content-Type" "text/html"}}
    "/echo" {:status 200 :body (with-out-str (pprint/pprint req)) :headers {"Content-Type" "text/plain"}}
    {:status 404 :body "Not found" :headers {"Content-Type" "text/plain"}}))
```

Then use `compojure`:

```clj
(defproject web "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [ring/ring-core "1.10.0"]
                 [ring/ring-jetty-adapter "1.10.0"]
                 [aleph "0.6.1"]
                 [compojure "1.7.0"]]
  :plugins [[lein-cljfmt "0.9.2"]]
  :main ^:skip-aot web.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all
                       :jvm-opts ["-Dclojure.compiler.direct-linking=true"]}})
```

```clj

(comp/defroutes app
  (comp/GET "/" [] {:status 200 :body "<h1>Hello</h1>" :headers {"Content-Type" "text/html"}})
  (comp/ANY "/echo" req {:status 200 :body (with-out-str (pprint/pprint req)) :headers {"Content-Type" "text/plain"}})
  (route/not-found {:status 404 :body "Not found" :headers {"Content-Type" "text/plain"}}))
```

## Deploy to Fly.io

Now that we have our app running, it'd be nice to deploy and show it to the world. We can use [**Fly.io**](https://fly.io/).

> You need a credit card to sign up for Fly.io. If you know another service that doesn't require credit card for hobby projects, please let me know 🙇

First we need to [install](https://fly.io/docs/hands-on/install-flyctl/) `flyctl`, the CLI tool to interact with Fly.io. Then we need to sign up/ sign in.

```bash
$ fly auth signup
$ fly auth login
```

When that's done, at the root folder of our project, run:

```bash
$ fly launch
```

Open `fly.toml` and change `services.internal_port` to the running port of our web app. For example,

```toml
…

[[services]]
  protocol = "tcp"
  internal_port = 4001
  processes = ["app"]
…
```

We also need a `Dockerfile`.

Create a `Dockerfile` at our project root folder. Make sure that `EXPOSE` also has the same port value as `services.internal_port`.

```docker
FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /opt/app

COPY target/uberjar/app.jar /opt/app/app.jar

EXPOSE 4001

CMD ["java", "-jar", "/opt/app/app.jar"]
```

Change `project.clj`

```diff
(defproject web "0.1.0-SNAPSHOT"
  …
  :target-path "target/%s"
+  :uberjar-name "app.jar"
  :profiles {:uberjar {:aot :all
                       :jvm-opts ["-Dclojure.compiler.direct-linking=true"]}})
```

In your terminal,

```bash
$ lein uberjar
```

Then

```bash
$ fly deploy
```
