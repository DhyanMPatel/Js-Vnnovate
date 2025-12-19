# 05 – Data Handling, I/O, Errors, Logging, Testing & Packaging

> Objective: Ship production-ready Python services with resilient data flows, instrumentation, and quality gates.

## 1. File & Data Handling

### 1.1 `pathlib` & File APIs

```python
from pathlib import Path
DATA_DIR = Path("data")
(DATA_DIR / "raw").mkdir(parents=True, exist_ok=True)

for path in DATA_DIR.rglob("*.csv"):
    print(path.name, path.stat().st_size)
```

### 1.2 Serialization Formats

| Format       | Library                 | Use Case                           |
| ------------ | ----------------------- | ---------------------------------- |
| JSON         | `json`, `orjson`        | APIs, configs                      |
| YAML         | `pyyaml`, `ruamel.yaml` | Human-friendly configs             |
| CSV          | `csv`, `pandas`         | Tabular data                       |
| Binary       | `pickle`, `cloudpickle` | Quick prototypes (beware security) |
| Avro/Parquet | `fastavro`, `pyarrow`   | Big data pipelines                 |

```python
import json
payload = {"id": 1, "tags": ["ai", "ml"]}
Path("payload.json").write_text(json.dumps(payload, indent=2))
```

## 2. Networking & APIs

- `requests` for synchronous HTTP, `httpx` or `aiohttp` for async.
- Use exponential backoff via `tenacity`.
- Validate payloads with `pydantic` or `marshmallow`.

## 3. Error Handling & Resilience

- Define custom exceptions to categorize failures.

```python
class RetryableError(Exception):
    pass
```

- Wrap critical code with retries/circuit breakers.
- Use `contextlib.suppress` for ignorable errors.

## 4. Logging & Observability

- Standard library `logging` supports hierarchical loggers.

```python
import logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("pipeline")
logger.info("pipeline start")
```

- Structure logs as JSON using `python-json-logger` or `structlog`.
- Emit metrics via `prometheus_client` or `statsd`.
- Trace distributed systems with OpenTelemetry (`opentelemetry-sdk`, `opentelemetry-instrumentation-fastapi`).

## 5. Testing Strategy

### 5.1 Pytest Basics

```python
# tests/test_converter.py
import pytest
from converter import convert

def test_km_to_mi():
    assert convert(1, "km", "mi") == pytest.approx(0.621371)
```

- Use fixtures for reusable resources.
- Parameterize tests: `@pytest.mark.parametrize`.

### 5.2 Property & Hypothesis Testing

- `hypothesis` generates randomized inputs to uncover edge cases.

```python
from hypothesis import given, strategies as st

@given(st.floats(allow_nan=False, allow_infinity=False))
def test_double(x):
    assert double(double(x)) == 4 * x
```

### 5.3 Mocking & Fakes

- `unittest.mock` for patching dependencies.
- Prefer dependency injection over heavy mocking.

## 6. Packaging & Distribution

- Define metadata in `pyproject.toml` (build-backend: `setuptools`, `poetry`, `hatchling`).
- Publish to PyPI/TestPyPI using `twine`.
- Provide console scripts via entry points.

### Example `pyproject.toml` snippet

```toml
[project]
name = "feature-flags"
version = "0.1.0"
dependencies = ["pydantic>=2", "fastapi>=0.111"]

[project.scripts]
feature-flags = "feature_flags.cli:main"
```

## 7. Configuration & Secrets Management

- `.env` files (with `dotenv`) for local dev.
- Use secret managers (AWS Secrets Manager, Vault, GCP Secret Manager) in production.
- Validate configs via `pydantic` models; avoid direct `os.environ` access scattered around.

## 8. Continuous Integration & Delivery

- Standard pipeline: lint → type-check → test → package → deploy.
- Tools: GitHub Actions, GitLab CI, CircleCI, Jenkins.
- Include code coverage (`coverage.py`), security scanning (`bandit`, `pip-audit`).

## 9. Mini Project – ETL Pipeline Skeleton

```python
import logging
from pathlib import Path
import pandas as pd

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("etl")

RAW = Path("data/raw/events.csv")
OUT = Path("data/processed/metrics.parquet")

class DataValidationError(Exception):
    pass

def extract(path: Path) -> pd.DataFrame:
    if not path.exists():
        raise FileNotFoundError(path)
    return pd.read_csv(path)

def transform(df: pd.DataFrame) -> pd.DataFrame:
    if {"user_id", "spend"} - set(df.columns):
        raise DataValidationError("missing required columns")
    df["spend_per_user"] = df.groupby("user_id")["spend"].transform("sum")
    return df

def load(df: pd.DataFrame, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(path)

if __name__ == "__main__":
    logger.info("ETL started")
    data = extract(RAW)
    transformed = transform(data)
    load(transformed, OUT)
    logger.info("ETL finished")
```

- Covers file IO, logging, custom exceptions, data validation, and pandas usage.

## Best Practices

1. Treat data and configs as code; version them when possible.
2. Keep IO boundaries well-defined (adapters) for easier testing.
3. Fail fast with actionable error messages; ensure retries where possible.
4. Centralize logging/metrics to correlate issues quickly.
5. Automate quality gates (lint/type/test) before merging.

## Further Research Checklist

- Data serialization for streaming (Protocol Buffers, Cap’n Proto, Apache Arrow Flight).
- Schema evolution strategies in data lakes/warehouses.
- Observability stacks (ELK, OpenSearch, Honeycomb) and cost optimizations.
- Advanced testing: contract tests, mutation testing (`mutmut`), chaos engineering.
- Supply-chain security (`pip-audit`, `sigstore`, SBOM generation) for enterprise compliance.
