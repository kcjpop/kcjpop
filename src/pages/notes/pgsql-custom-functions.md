---
layout: ../../layouts/Post.astro
---

# Writing custom functions in PostgreSQL: A beginner guide

\*quite useful when working with [Supabase](https://supabase.com/)

There are 2 (actually many) languages we can use to write functions:

1. Using SQL `language sql`: Maybe the fastest one to get started
2. Using a [procedural language](https://www.postgresql.org/docs/14/xplang.html) such as PL/pgSQL or PL/Python or [PLV8](https://plv8.github.io/) (yep JavaScript runs everywhere).

This note focuses in SQL and PL/pgSQL as I feel like my knowledge about them is quite thin on the ground.

## The first function

A function written in SQL contains a bunch of SQL statements, and returns **the results of the last query** in the list.

```sql
create or replace function my_func() ❶
returns int ❷
language sql ❸
as $$ ❹
  select now();
  select 5 * 2;
$$; ❺
```

❶ Here we define a function named `my_func` without any argument.

❷ Then we tell the type of return value.

❸ The language we're using in function body

❹ $$ is [_dollar-quoting_](https://www.postgresql.org/docs/14/sql-syntax-lexical.html#SQL-SYNTAX-DOLLAR-QUOTING) where we don't have to escape single- and double-quotes.

❺ Don't forget to have semicolon at the end.

To use:

```sql
postgres@db:postgres> select my_func();
+---------+
| my_func |
|---------|
| 10      |
+---------+
```

We can specify `returns void` in ❷ if we don't want to return any value. And for `insert`, `update`, or `delete`, we can use `returning`.

```sql
create or replace function my_func()
returns uuid -- assume that my_table.id has type UUID
language sql
as $$
  insert into my_table values(1, 'foo', now()) returning id;
$$;
```

A function can return multiple rows that have _ONE_ column of the same type by defining `setof sometype`.

```sql
create or replace function my_func()
returns setof int
language sql
as $$
  select * from generate_series(1, 10) as i;
$$;
```

And for multiple rows of multiple columns, we `returns table (column-definitions)`.

```sql
drop function my_func()
create or replace function my_func()
returns table(
  i int,
  ts timestamp
)
language sql
as $$
  select i, now() from generate_series(1, 10) as i;
$$;
```

As we return a table, to use:

```sql
postgres@db:postgres> select * from my_func();
+----+---------------------------+
| i  | ts                        |
|----+---------------------------|
| 1  | 2022-04-19 13:21:36.07908 |
| 2  | 2022-04-19 13:21:36.07908 |
| 3  | 2022-04-19 13:21:36.07908 |
| 4  | 2022-04-19 13:21:36.07908 |
| 5  | 2022-04-19 13:21:36.07908 |
| 6  | 2022-04-19 13:21:36.07908 |
| 7  | 2022-04-19 13:21:36.07908 |
| 8  | 2022-04-19 13:21:36.07908 |
| 9  | 2022-04-19 13:21:36.07908 |
| 10 | 2022-04-19 13:21:36.07908 |
+----+---------------------------+
```

Otherwise, they look like this 🙈.

```sql
postgres@db:postgres> select my_func();
+-----------------------------------+
| my_func                           |
|-----------------------------------|
| (1,"2022-04-19 13:22:51.902983")  |
| (2,"2022-04-19 13:22:51.902983")  |
| (3,"2022-04-19 13:22:51.902983")  |
| (4,"2022-04-19 13:22:51.902983")  |
| (5,"2022-04-19 13:22:51.902983")  |
| (6,"2022-04-19 13:22:51.902983")  |
| (7,"2022-04-19 13:22:51.902983")  |
| (8,"2022-04-19 13:22:51.902983")  |
| (9,"2022-04-19 13:22:51.902983")  |
| (10,"2022-04-19 13:22:51.902983") |
+-----------------------------------+
```

`returns table` is a part of recent SQL standard, and they clearly contain `setof`, so _in my opinion_ it should be preferred.

#### P.S: Functions vs procedures

- Procedures are similar to functions. They are known as _routines_ and can be modify with `alter routine` and `drop routine`. There is no such thing as `create routine`.
- Procedures don't have `returns` clause when `create procedure`, but they can return data via _output parameters_.
- To use a procedure, we use `call procedure_name`.
