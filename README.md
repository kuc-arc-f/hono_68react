# hono_68react

 Version: 0.9.1

 Author  : 

 date    : 2024/12/19

 update  : 2024/12/22

***
### Summary

Workers + React + hono + d1 database + tailwindcss

* Gemini-2.0-flash-exp generate 

***
### build

```
yarn dev
```

***
### setting
* wrangler.toml

```
name = "hono_68"
main = "src/index.ts"
compatibility_date = "2024-12-19"

compatibility_flags = [ "nodejs_compat" ]
assets = { directory = "public" }

# [vars]
# MY_VAR = "my-variable"

[[d1_databases]]
binding = "DB"
database_name = ""
database_id = ""

```
***
* tailwindcss
```
npx tailwindcss -i ./src/main.css -o ./public/main.css --watch
```

***
### example
* todo18 : React 18, gemini generate
* react19 : React 19 example
* vuecdn: Vue 3 example
* todo20: Vue 3 , gemini generate

***
### Prompt

* todo18
* https://gist.github.com/kuc-arc-f/699dbbcff2a8fb00c4730813916652ba

***
# License

* MIT

***

