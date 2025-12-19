# 01 – Python Foundations

> Goal: Build an unshakable base in syntax, data types, and interpreter behavior so every advanced topic feels natural.

## 1. Language Overview

- **Paradigms**: Multi-paradigm (procedural, OOP, functional) with dynamic typing and automatic memory management.
- **Execution Models**: CPython (reference implementation), PyPy (JIT), MicroPython (embedded), Stackless, GraalPy.
- **Versioning**: Focus on Python 3.12+. Learn how to read [PEPs](https://peps.python.org/) to stay updated.

### Interpreter Lifecycle

1. Source code → tokenized → parsed → AST.
2. AST compiled to bytecode (.pyc) stored in `__pycache__`.
3. Bytecode executed by Python Virtual Machine (PVM).

Understanding this flow helps when optimizing, debugging, or reading tracebacks.

## 2. Tooling Setup

| Task                 | Recommendation                                |
| -------------------- | --------------------------------------------- |
| Version Management   | `pyenv` (macOS/Linux), `pyenv-win`, or `asdf` |
| Virtual Environments | `python -m venv`, `virtualenv`, or `conda`    |
| Package Installer    | `pip`, `pipx` for CLIs                        |
| Format/Lint          | `black`, `isort`, `ruff`                      |
| Static Analysis      | `mypy`, `pyright`                             |
| REPL Enhancements    | `ipython`, `ptpython`                         |

## 3. Syntax Essentials

- Indentation defines blocks (4 spaces standard).
- Statements end implicitly (no semicolons needed).
- Use `\` or parentheses for multi-line expressions.
- Comments: `# single line`, `"""docstrings"""` for modules/classes/functions.

```python
# example.py
"""Minimal script showing input/output."""

name = input("Enter your name: ")
print(f"Hello, {name}! Python is ready.")
```

## 4. Primitive Data Types

| Type       | Notes                         | Example                |
| ---------- | ----------------------------- | ---------------------- |
| `int`      | Arbitrary precision           | `age = 42`             |
| `float`    | IEEE-754 double               | `pi = 3.14159`         |
| `bool`     | Subclass of int (`True == 1`) | `is_ready = True`      |
| `complex`  | `a + bj`                      | `root = complex(0, 1)` |
| `str`      | Unicode by default            | `msg = "नमस्ते"`       |
| `bytes`    | Immutable byte sequences      | `data = b"\xff"`       |
| `NoneType` | Absence of value              | `result = None`        |

### Numeric Operations

- `//` (floor division), `%` (mod), `**` (power), bit ops `&, |, ^, <<, >>`.
- Use `decimal.Decimal` for high-precision finance; `fractions.Fraction` for exact rational math.

### String Operations

- Interpolation: f-strings, `str.format`, `%`.
- Immutability → operations create new strings; use `''.join(list_of_strings)`.
- Encoding/decoding via `.encode()` / `.decode()`.

## 5. Composite Data Types

| Type        | Mutability               | Core Use                             |
| ----------- | ------------------------ | ------------------------------------ |
| `list`      | Mutable ordered          | General-purpose sequences            |
| `tuple`     | Immutable ordered        | Heterogeneous records, hashable keys |
| `set`       | Mutable unordered unique | Membership tests O(1)                |
| `frozenset` | Immutable set            | Hashable set ops                     |
| `dict`      | Mutable mapping          | Key-value storage; ordered since 3.7 |

### Literals & Operations

```python
numbers = [1, 2, 3]
tuple_point = (10, 20)
unique_tags = {"ai", "ml", "python"}
config = {"host": "localhost", "port": 5432}
```

- Slicing: `seq[start:stop:step]` works on lists, tuples, strings.
- Unpacking: `a, b, *rest = numbers`.
- Dict comprehension: `{k: len(k) for k in unique_tags}`.

## 6. Type Hints & Static Typing

```python
from typing import Iterable, Any

def mean(values: Iterable[float]) -> float:
    items = list(values)
    if not items:
        raise ValueError("input cannot be empty")
    return sum(items) / len(items)
```

- `typing` module (3.12) adds `typing.TypeAliasType`, `typing.NamedTuple`, pattern matching-friendly types.
- Use `mypy --strict` for catching bugs early.

## 7. I/O Basics

### Reading/Writing Files

```python
from pathlib import Path

def read_config(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")

Path("config.txt").write_text("ENV=prod\n", encoding="utf-8")
```

### CLI Arguments

```python
import argparse

parser = argparse.ArgumentParser(description="Greeter")
parser.add_argument("--name", default="World")
args = parser.parse_args()
print(f"Hello {args.name}")
```

## 8. Error & Exception Basics

- Built-in hierarchy rooted at `BaseException` → `Exception` → specific errors.
- Use `try/except/else/finally` blocks.

```python
try:
    value = float(input("Enter number: "))
except ValueError as exc:
    print("Invalid input", exc)
else:
    print("Squared:", value ** 2)
finally:
    print("Done")
```

## 9. Sample Mini Project (Theory + Practice)

**Goal**: Build a unit converter CLI using core syntax.

```python
# converter.py
from typing import Literal

Rate = dict[tuple[Literal["km", "mi"]], float]
RATES: Rate = {
    ("km", "mi"): 0.621371,
    ("mi", "km"): 1.60934,
}

def convert(value: float, src: str, dst: str) -> float:
    if src == dst:
        return value
    try:
        return value * RATES[(src, dst)]
    except KeyError as exc:
        raise ValueError(f"Unsupported conversion {src}->{dst}") from exc

if __name__ == "__main__":
    amount = float(input("Value: "))
    src_unit = input("Source unit (km/mi): ")
    dst_unit = input("Target unit (km/mi): ")
    print(convert(amount, src_unit, dst_unit))
```

- Demonstrates dicts, typing, exceptions, CLI I/O, and `__name__ == "__main__"` guard.

## 10. Mindset & Best Practices

1. **Readability counts** – follow PEP 8.
2. **Prefer explicit over implicit** – label magic numbers, document functions.
3. **Leverage standard library first** – `itertools`, `functools`, `statistics`, `pathlib` cover most use cases.
4. **Measure before optimizing** – baseline performance using `timeit`/`perf_counter`.
5. **Automate environment setup** – `Makefile` or `tox` ensures reproducibility.

## Further Research Checklist

- CPython internals (`ceval.c`, reference counting, garbage collection tuning).
- Alternative runtimes (Cinder, Mojo, GraalPy) and their performance trade-offs.
- Bytecode inspection with `dis` module and how Python optimizes constants.
- Unicode normalization edge cases (NFC vs NFD) for international products.
- Security implications of `eval`, dynamic imports, and untrusted input handling.
