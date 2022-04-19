Obviously we can define custom functions in PgSQL. There are 2 (actually many) languages we can use to write functions:

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

❶ Here we define a function named `my_func` without any argument
❷ Then we tell the type of return value
❸ The language we're using in function body
❹ $$ is [_dollar-quoting_](https://www.postgresql.org/docs/14/sql-syntax-lexical.html#SQL-SYNTAX-DOLLAR-QUOTING) where we don't have to escape single- and double-quotes. It's used quite often when writing functions.
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

A function can return multiple rows by defining `SETOF sometype` or `TABLE (column_definitions)`.

> **Functions vs procedures**
>
> - Procedures are similar to functions. They are known as _routines_ and can be modify with `alter routine` and `drop routine`. There is no such thing as `create > routine`.
> - Procedures don't have `returns` clause when `create procedure`, but they can return data via _output parameters_.
> - To use a procedure, we use `call procedure_name`.
