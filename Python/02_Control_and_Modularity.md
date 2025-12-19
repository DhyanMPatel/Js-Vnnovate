# 02 – Control Flow & Modularity

> Objective: Command every branch, loop, and function shape while understanding how Python organizes code into reusable chunks.

## 1. Decision-Making Structures

### 1.1 `if/elif/else`

- Python evaluates expressions top-down.
- Truthiness rules: non-zero numbers, non-empty containers ⇒ `True`.

```python
def classify(score: float) -> str:
    if score >= 90:
        return "Outstanding"
    elif score >= 75:
        return "Strong"
    elif score >= 60:
        return "Average"
    else:
        return "Needs improvement"
```

### 1.2 Structural Pattern Matching (`match`)

- Introduced in Python 3.10 for expressive branching.

```python
match command:
    case {"op": "create", "payload": data}:
        handle_create(data)
    case {"op": "delete", "id": int(item_id)} if item_id > 0:
        handle_delete(item_id)
    case _:
        raise ValueError("Unsupported command")
```

- Supports guards, sequence patterns, class patterns, and `match`-`case` fallthrough is not automatic.

## 2. Looping Constructs

### 2.1 `for` loops

- Iterate over any iterable; prefer enumerations/zip for clarity.

```python
for idx, feature in enumerate(["clicks", "spend", "ctr"], start=1):
    print(idx, feature)
```

### 2.2 `while` loops & `else`

```python
while attempts := attempts + 1:
    if condition:
        break
else:
    print("loop ended naturally")
```

- `else` executes when loop exits without `break`.

### 2.3 Comprehensions

- List/set/dict comprehensions & generator expressions enable concise transformations.

```python
growth = [value / prev - 1 for prev, value in zip(series, series[1:])]
unique_pairs = {(i, j) for i in range(3) for j in range(i + 1, 3)}
score_map = {user.id: user.score for user in users}
```

## 3. Functions & Abstractions

### 3.1 Defining Functions

- Default arguments evaluated once; use `None` sentinel for mutables.

```python
def append_event(event: dict, cache: list | None = None) -> list:
    cache = cache or []
    cache.append(event)
    return cache
```

### 3.2 First-Class & Higher-Order Functions

- Functions can be passed, stored, returned.

```python
from collections.abc import Callable

Pipeline = list[Callable[[str], str]]

def run(text: str, steps: Pipeline) -> str:
    for step in steps:
        text = step(text)
    return text
```

### 3.3 Lambda & Partial Functions

```python
normalize = lambda x: (x - mean) / std
from functools import partial
prod = partial(reduce, operator.mul)
```

### 3.4 Recursion

- Tail recursion not optimized; prefer loops when depth large.

```python
def depth_first(tree: dict[str, list[str]], root: str, visited=None):
    visited = visited or set()
    if root in visited:
        return visited
    visited.add(root)
    for child in tree.get(root, []):
        depth_first(tree, child, visited)
    return visited
```

## 4. Modules & Imports

### 4.1 Module Structure

- Every `.py` file is a module; directories with `__init__.py` are packages.
- Use relative imports inside packages (`from .utils import slugify`).

### 4.2 Execution Context

- On import, top-level code executes once and module object cached in `sys.modules`.
- Guard scripts with `if __name__ == "__main__":`.

### 4.3 Namespaces & `__all__`

- Use `__all__` to control `from module import *`.
- Keep modules cohesive; break into packages when >300 lines or multiple concepts.

## 5. Packaging & Dependency Management

### 5.1 Project Layout (src layout recommended)

```
project/
├── pyproject.toml  # build metadata (PEP 621)
├── src/
│   └── package_name/
│       ├── __init__.py
│       ├── core.py
│       └── config.py
└── tests/
```

- Use `poetry`, `pdm`, or `hatch` for dependency/version management.

### 5.2 Import Mechanics (Theory Focus)

- Python searches `sys.meta_path` finders; default order: builtins, frozen modules, import path entries.
- Custom import hooks can load modules from databases, zip files, or encrypted bundles (used in enterprise systems).

## 6. Config Management & Environment Separation

- Use `.env` files + `python-dotenv` or `pydantic-settings` for validated configs.
- Provide typed config objects to avoid scattered globals.

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    feature_flags: list[str] = []

settings = Settings(_env_file=".env")
```

## 7. Mini Project – Modular CLI Toolkit

**Goal**: Build a command router using submodules.

```
python_toolkit/
├── __init__.py
├── commands/
│   ├── __init__.py
│   ├── greet.py
│   └── stats.py
└── cli.py
```

`commands/greet.py`

```python
def run(args):
    print(f"Hello, {args.name}! Today is {args.date}")
```

`commands/stats.py`

```python
import statistics as stats

def run(args):
    series = list(map(float, args.values))
    print("mean:", stats.fmean(series))
    print("stdev:", stats.pstdev(series))
```

`cli.py`

```python
import argparse
from importlib import import_module

COMMANDS = {
    "greet": "python_toolkit.commands.greet",
    "stats": "python_toolkit.commands.stats",
}

parser = argparse.ArgumentParser()
sub = parser.add_subparsers(dest="command", required=True)

sub_greet = sub.add_parser("greet")
sub_greet.add_argument("name")
sub_greet.add_argument("date")

sub_stats = sub.add_parser("stats")
sub_stats.add_argument("values", nargs="+")

if __name__ == "__main__":
    args = parser.parse_args()
    module = import_module(COMMANDS[args.command])
    module.run(args)
```

- Demonstrates subcommands, dynamic imports, modular design.

## 8. Best Practices

1. Keep functions short and focused; pure functions ease testing.
2. Embrace docstrings + type hints for every public API.
3. Structure packages to isolate domains (config, services, adapters).
4. Avoid circular imports; break shared logic into dedicated modules.
5. Provide CLI entry points via `python -m package.cli` for reproducibility.

## Further Research Checklist

- Advanced pattern matching (PEP 702) and exhaustiveness checking tools.
- Plugin systems (`importlib.metadata.entry_points`) used in extensible apps.
- Runtime code generation & dynamic module loading safety considerations.
- Packaging for multiple interpreters (PyPy, CPython) and native wheels.
- Namespaces packages (PEP 420) and their deployment in monorepos.
