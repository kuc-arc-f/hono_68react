# hono_68react

 Version: 0.9.1

 Author  : 

 date    : 2024/12/19

 update  :

***
### Summary

Workers + React + hono + d1 database + tailwindcss

* Gemini-2.0-flash-exp generate 

***
### build

```
bun run build
bun run dev
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
### Prompt


***
# License

* MIT

***

