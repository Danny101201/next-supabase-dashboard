## Tables

```sh
permission_table:{
    id: uuid,
    role: text,
    status: text, (active,unActive),
    created_at: date,
    member_id: uuid
}
```

```sh
member_table:{
    id: uuid,
    name: text,
    created_at: date,
}
```

```sh
todo_table:{
    id: uuid,
    title: text,
    completed: boolean,
    created_at: date,
    created_by: uuid (foreign_key member_id)
}
```
