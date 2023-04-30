---
date: 2023-04-29
title: 'Clojure for JavaScript developers: Building a web server'
---

Open Command Pallete by pressing Cmd + Shift + P, then pick **Calva: Start a project REPL and Connect (aka Jack-In)**. You will be asked to select the project type -> Leiningen. Don't pick any profile. OK

VSCode may ask to allow `java` to connect to network => Yes

`output.calva-repl` will open automatically.

```clj
clj꞉web.core꞉> 
; Jack-in done.
clj꞉web.core꞉> 
```

Open `src/web/core.clj` and type

```clj
(+ 1 1)
```

And press Ctrl + Enter to evaluate the form.

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

Cmd + J to hide panel in VSCode
