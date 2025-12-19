# 04 – Advanced Python Features & Concurrency

> Objective: Exploit Python’s iteration protocols, decorators, and concurrency models to build expressive, high-performance systems.

## 1. Iterators, Generators, and Lazy Evaluation

### 1.1 Iterator Protocol

- Any object implementing `__iter__` returning an iterator with `__next__`.

```python
class Countdown:
    def __init__(self, start: int):
        self.current = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.current < 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value
```

### 1.2 Generators

- Use `yield` to create lazy sequences.

```python
def stream_batches(items, size=32):
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch
```

- Generator expressions: `(x * x for x in range(10))`.

## 2. Decorators & Context Managers

### 2.1 Function Decorators

```python
from functools import wraps
from time import perf_counter

def timed(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        result = fn(*args, **kwargs)
        print(f"{fn.__name__}: {perf_counter() - start:.4f}s")
        return result
    return wrapper
```

### 2.2 Class Decorators & Registries

```python
REGISTRY = {}

def register(name):
    def wrapper(cls):
        REGISTRY[name] = cls
        return cls
    return wrapper
```

### 2.3 Context Managers

- Implement via `with` statement; handles setup/teardown.

```python
from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print("open", name)
    try:
        yield name
    finally:
        print("close", name)
```

## 3. Functional Programming Tools

- `functools` (`lru_cache`, `partial`, `reduce`), `itertools` (`chain`, `groupby`), `operator` (fast attr/item getters).
- Use `lru_cache` to memoize expensive computations.

```python
@functools.lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

## 4. Concurrency Models

### 4.1 Threading

- Shared memory concurrency; subject to GIL (only one thread executes Python bytecode at a time).
- Ideal for I/O-bound tasks.

```python
import threading

def fetch(url):
    ...
threads = [threading.Thread(target=fetch, args=(url,)) for url in urls]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

### 4.2 Multiprocessing

- Bypasses GIL by spawning new interpreter processes.

```python
from multiprocessing import Pool

with Pool() as pool:
    results = pool.map(expensive_fn, inputs)
```

- Be mindful of serialization cost; use shared memory or `multiprocessing.Manager` for coordination.

### 4.3 AsyncIO

- Single-threaded cooperative multitasking; ideal for high-concurrency I/O servers.

```python
import asyncio

async def fetch(session, url):
    async with session.get(url) as resp:
        return await resp.text()

async def main(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

asyncio.run(main(URLS))
```

- Understand event loop, tasks, futures, cancellation, backpressure.

### 4.4 Parallelism for ML/AI

- Use libraries like `joblib`, `Ray`, `Dask` to distribute workloads.
- GPU workloads handled via CUDA bindings (PyTorch, TensorFlow) or `numba.cuda`.

## 5. Memory & Performance Techniques

- `array`, `memoryview`, `struct` for binary data.
- Vectorize with NumPy to leverage C loops.
- Use `cython`, `numba`, or `PyPy` for CPU-bound sections.

### Profiling Stack

| Tool                                 | Use                       |
| ------------------------------------ | ------------------------- |
| `timeit`, `perf_counter`             | Micro-benchmarks          |
| `cProfile`, `profile`                | Function-level stats      |
| `line_profiler`, `py-spy`, `scalene` | Detailed runtime analysis |
| `tracemalloc`                        | Memory leak investigation |

## 6. Introspection & Metaprogramming

- `inspect` module introspects signatures, source, closure variables.
- Dynamic class creation with `type(name, bases, dict)`.
- Use with caution—prefer explicit code unless strong justification.

## 7. Mini Project – Async Web Scraper

```python
import asyncio
import aiohttp
from bs4 import BeautifulSoup

async def fetch_title(session, url):
    async with session.get(url, timeout=10) as response:
        html = await response.text()
        soup = BeautifulSoup(html, "html.parser")
        return soup.title.string if soup.title else "(no title)"

async def gather_titles(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_title(session, url) for url in urls]
        return await asyncio.gather(*tasks)

urls = ["https://python.org", "https://pytorch.org"]
print(asyncio.run(gather_titles(urls)))
```

- Demonstrates async context managers, concurrency, and third-party libs.

## Best Practices

1. Prefer generator pipelines for large datasets; avoid loading entire corpus into memory.
2. Leverage decorators for cross-cutting concerns (logging, caching, rate limiting).
3. Choose concurrency model based on workload: threads (I/O), asyncio (network servers), multiprocessing (CPU), distributed frameworks (massive data).
4. Always protect shared state with locks/queues when using threads.
5. Use structured logging and metrics around async tasks for observability.

## Further Research Checklist

- Async patterns: cancellation choreography, backpressure, `asyncio.StreamReader` for sockets.
- `contextvars` for request-scoped data in async apps.
- Lock-free data structures, `concurrent.futures`, coroutine scheduling internals.
- `multiprocessing.shared_memory` and zero-copy IPC.
- Writing C extensions, Python/C API, and HPy for performance-critical sections.
