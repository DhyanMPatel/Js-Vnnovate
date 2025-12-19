# 03 – Object-Oriented Programming & Design Principles

> Aim: Master Python’s OOP internals, idioms, and enterprise design patterns required for FAANG-scale systems.

## 1. Class Fundamentals

- Classes define blueprints with attributes (data) and methods (behavior).
- `self` refers to instance; `cls` to class.

```python
class FeatureFlag:
    def __init__(self, name: str, enabled: bool = False):
        self.name = name
        self.enabled = enabled

    def toggle(self) -> None:
        self.enabled = not self.enabled
```

### Slots & Memory

- `__slots__` restricts attributes → lower memory, faster attribute access.

```python
class SparseVector:
    __slots__ = ("values",)
    def __init__(self, values: dict[int, float]):
        self.values = values
```

## 2. Data Classes & Records

- Use `@dataclass` for plain data containers.

```python
from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class EmbeddingMeta:
    vector_size: int
    model: str
    trained_on: str
```

- `frozen=True` makes immutable; `slots=True` reduces memory.

## 3. Inheritance & Composition

- Use inheritance for "is-a" relationships; composition for "has-a".
- Prefer shallow hierarchies; use abstract base classes for contracts.

```python
from abc import ABC, abstractmethod

class VectorStore(ABC):
    @abstractmethod
    def upsert(self, vector: list[float], metadata: dict) -> None: ...

class PineconeStore(VectorStore):
    def __init__(self, client):
        self.client = client
    def upsert(self, vector, metadata):
        self.client.upsert(vector, metadata)
```

## 4. Magic (Dunder) Methods

- Enable Pythonic behavior.

| Method                   | Purpose                              |
| ------------------------ | ------------------------------------ |
| `__repr__` / `__str__`   | Debug string vs user-friendly string |
| `__len__`                | Container size                       |
| `__iter__` / `__next__`  | Iteration protocol                   |
| `__enter__` / `__exit__` | Context managers                     |
| `__eq__`, `__lt__`       | Comparisons                          |
| `__hash__`               | Dict/set membership                  |

Example:

```python
class Vector:
    def __init__(self, values: list[float]):
        self.values = values

    def __add__(self, other: "Vector") -> "Vector":
        return Vector([a + b for a, b in zip(self.values, other.values)])

    def __repr__(self) -> str:
        return f"Vector({self.values!r})"
```

## 5. Encapsulation & Properties

- Private convention: `_internal` (protected), `__mangled` (name mangling).
- Use `@property` for computed attributes with validation.

```python
class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def fahrenheit(self) -> float:
        return (self._celsius * 9 / 5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value: float) -> None:
        self._celsius = (value - 32) * 5 / 9
```

## 6. Design Principles (SOLID + Pythonic Twist)

1. **Single Responsibility** – each class handles one actor (e.g., `ConfigLoader`).
2. **Open/Closed** – extend via strategy classes instead of modifying core logic.
3. **Liskov Substitution** – derived classes must honor expectations (method signatures, invariants).
4. **Interface Segregation** – prefer multiple ABCs with focused methods.
5. **Dependency Inversion** – depend on abstractions; inject concrete implementations.

## 7. Patterns Common in FAANG Systems

- **Strategy**: swap algorithms at runtime (e.g., different ranking models).
- **Observer/Event Bus**: decouple producers-consumers.
- **Factory**: configure objects from metadata/config.
- **Adapter**: unify differing API shapes.
- **Decorator (structural)**: extend behavior without subclassing.
- **Repository + Unit of Work** (data layer consistency).

### Strategy Example with Dependency Injection

```python
from typing import Protocol

class Ranker(Protocol):
    def rank(self, items: list[dict]) -> list[dict]: ...

class RecencyRanker:
    def rank(self, items):
        return sorted(items, key=lambda x: x["timestamp"], reverse=True)

class CTRRanker:
    def rank(self, items):
        return sorted(items, key=lambda x: x["ctr"], reverse=True)

class FeedService:
    def __init__(self, ranker: Ranker):
        self.ranker = ranker

    def show_feed(self, items):
        return self.ranker.rank(items)
```

## 8. Mixins & Multiple Inheritance

- Mixins add behavior without state (e.g., `LoggingMixin`).
- `super()` resolves Method Resolution Order (MRO); use `Class.mro()` to inspect.

## 9. Metaclasses & Descriptors (Advanced Theory)

- Metaclasses modify class creation; used for ORMs, registries.
- Descriptors (`__get__`, `__set__`, `__delete__`) power properties, ORM fields.

```python
class PositiveNumber:
    def __set_name__(self, owner, name):
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if value < 0:
            raise ValueError("value must be non-negative")
        setattr(obj, self.private_name, value)

class Account:
    balance = PositiveNumber()
    def __init__(self, balance: float):
        self.balance = balance
```

## 10. Mini Project – Feature Flag Service

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class Flag:
    name: str
    enabled: bool

class Storage(Protocol):
    def fetch(self, name: str) -> Flag | None: ...
    def save(self, flag: Flag) -> None: ...

class InMemoryStorage:
    def __init__(self):
        self._flags: dict[str, Flag] = {}
    def fetch(self, name: str) -> Flag | None:
        return self._flags.get(name)
    def save(self, flag: Flag) -> None:
        self._flags[flag.name] = flag

class FlagService:
    def __init__(self, storage: Storage):
        self.storage = storage

    def is_enabled(self, name: str) -> bool:
        flag = self.storage.fetch(name)
        return flag.enabled if flag else False

    def set_flag(self, name: str, enabled: bool) -> None:
        self.storage.save(Flag(name, enabled))

service = FlagService(InMemoryStorage())
service.set_flag("beta-feed", True)
assert service.is_enabled("beta-feed")
```

- Shows dataclasses, protocols, dependency injection, and high cohesion.

## Best Practices Recap

1. Prefer composition over inheritance; use mixins sparingly.
2. Document class responsibilities; include invariants in docstrings/tests.
3. Use properties/descriptors for validation instead of exposing raw attributes.
4. Keep constructors lightweight; heavy setup → factory/builder.
5. Profile object creation if you instantiate millions of objects (ML pipelines).

## Further Research Checklist

- Custom metaclasses powering ORMs (Django, SQLAlchemy) and pydantic models.
- Event-driven architecture with asyncio + observer pattern.
- Immutability patterns (attrs, pyrsistent) for concurrency safety.
- DDD (Domain-Driven Design) aggregates and how Python projects implement them.
- Advanced dependency injection frameworks (`punq`, `lagom`, `wired`).
