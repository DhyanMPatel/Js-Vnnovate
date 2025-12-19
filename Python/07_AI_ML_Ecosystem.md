# 07 – AI/ML Ecosystem & Career-Ready Stack

> Objective: Build a full-stack understanding of Python’s scientific ecosystem, from data ingestion through model deployment, to match FAANG-level AI/ML expectations.

## 1. Core Scientific Computing Libraries

| Layer             | Libraries                                           | Notes                                                                     |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| Numeric Backbone  | **NumPy**, **SciPy**, **JAX**                       | Vectorized arrays, linear algebra, FFTs, automatic differentiation (JAX). |
| Data Manipulation | **pandas**, **Polars**, **Dask DataFrame**          | Tabular data, lazy evaluation, out-of-core processing.                    |
| Visualization     | **Matplotlib**, **Seaborn**, **Plotly**, **Altair** | Static and interactive charts; Plotly Dash for dashboards.                |
| Statistics        | **statsmodels**, **prophet**                        | Time-series, regression diagnostics.                                      |

### Example: NumPy + pandas synergy

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(seed=42)
data = pd.DataFrame({
    "user_id": rng.integers(1, 5, size=10),
    "score": rng.normal(loc=0, scale=1, size=10),
})
summary = data.groupby("user_id").score.agg(["mean", "std"])
print(summary)
```

## 2. Classical Machine Learning Stack

| Stage           | Tools                                                        |
| --------------- | ------------------------------------------------------------ |
| Preprocessing   | `scikit-learn`, `category_encoders`, `imbalanced-learn`      |
| Modeling        | `scikit-learn` estimators, `xgboost`, `lightgbm`, `catboost` |
| Pipelines       | `sklearn.pipeline`, `feature-engine`, `skrub`                |
| Model Selection | `GridSearchCV`, `RandomizedSearchCV`, `Optuna`, `Ray Tune`   |

### Theory Essentials

- Bias/variance trade-off, regularization methods, evaluation metrics.
- Feature engineering, leakage prevention, cross-validation strategies.

### Example: End-to-end scikit-learn pipeline

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

numeric = ["age", "balance"]
categorical = ["region"]

preprocess = ColumnTransformer(
    [
        ("num", StandardScaler(), numeric),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
    ]
)

model = Pipeline([
    ("prep", preprocess),
    ("clf", RandomForestClassifier(n_estimators=300, max_depth=12)),
])

scores = cross_val_score(model, X, y, cv=5, scoring="roc_auc")
print(scores.mean())
```

## 3. Deep Learning Frameworks

| Library                     | Highlights                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **PyTorch**                 | Dynamic computation graphs, strong research adoption, TorchScript, distributed training (`torch.distributed`). |
| **TensorFlow/Keras**        | Production pipelines via TF Serving, XLA compilation, TPU support.                                             |
| **JAX/Flax**                | Functional approach, auto-differentiation, TPU/GPU-first.                                                      |
| **MindSpore, PaddlePaddle** | Additional ecosystems (Huawei, Baidu) worth awareness for global roles.                                        |

### PyTorch Training Skeleton

```python
import torch
from torch import nn, optim
from torch.utils.data import DataLoader

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class Classifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, output_dim),
        )
    def forward(self, x):
        return self.net(x)

model = Classifier(100, 256, 10).to(device)
optimizer = optim.AdamW(model.parameters(), lr=3e-4)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    model.train()
    for batch in DataLoader(train_ds, batch_size=128, shuffle=True):
        x, y = [t.to(device) for t in batch]
        optimizer.zero_grad()
        loss = criterion(model(x), y)
        loss.backward()
        optimizer.step()
```

## 4. NLP & CV Ecosystems

- **Transformers**: Hugging Face `transformers`, `accelerate`, `datasets`.
- **Tokenization**: `sentencepiece`, `tokenizers` (Rust-backed), `spaCy`.
- **CV**: `torchvision`, `opencv-python`, `mmcv` (OpenMMLab), `detectron2`.
- **Speech**: `torchaudio`, `espnet`, `Coqui TTS`.

### Inference Example with Hugging Face

```python
from transformers import pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
print(summarizer("Python powers AI workflows.", max_length=20))
```

## 5. Data Engineering + MLOps

| Component             | Libraries/Tools                                     |
| --------------------- | --------------------------------------------------- |
| Orchestration         | Apache Airflow, Prefect, Dagster                    |
| Feature Stores        | Feast, Tecton, Hopsworks                            |
| Data Storage          | Delta Lake, Iceberg, BigQuery, Snowflake connectors |
| Experiment Tracking   | MLflow, Weights & Biases, Neptune.ai                |
| Model Serving         | FastAPI, BentoML, TorchServe, NVIDIA Triton         |
| Distributed Training  | Horovod, DeepSpeed, Ray Train                       |
| Hyperparameter Tuning | Optuna, Ax, Ray Tune                                |

### FastAPI Inference Service

```python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model.joblib")

class Payload(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(payload: Payload):
    pred = model.predict([payload.features])[0]
    return {"prediction": pred}
```

## 6. Deployment Patterns

1. **Batch Scoring** – schedule jobs to generate predictions using Spark/Ray.
2. **Online Serving** – low-latency APIs behind load balancers; use model versioning.
3. **Streaming** – integrate with Kafka, Flink for real-time features.
4. **Edge/On-device** – optimize with ONNX Runtime, TensorRT, Core ML.

### Model Packaging Tips

- Export to ONNX for interoperability.
- Use `torchscript`, `tf.saved_model` for prod.
- Containerize with Docker; pass configs via env vars.

## 7. Responsible AI & Security

- Bias detection: `aif360`, `fairlearn`.
- Privacy: differential privacy libraries (`tensorflow-privacy`, `Opacus`).
- Model monitoring: drift detection (`evidently`, `whylogs`).
- Secure supply chain: signed artifacts, reproducible builds.

## 8. Learning Roadmap to FAANG AI Roles

1. **Math Refresh** – linear algebra, calculus, probability, optimization.
2. **ML Foundations** – complete Andrew Ng or CS229 equivalent; implement algorithms from scratch.
3. **Deep Learning Mastery** – read "Dive Into Deep Learning", implement CNNs/RNNs/Transformers.
4. **Systems & MLOps** – build an end-to-end project: data ingestion → model training → CI/CD → monitoring.
5. **Research Literacy** – summarize latest papers (NeurIPS, ICML, CVPR), recreate key experiments.
6. **Interview Prep** – practice ML system design, coding, and math derivations.

## 9. Capstone Project Ideas

- **Recommendation System**: data collection, feature store, factorization machine, online serving.
- **LLM-powered Support Bot**: retrieval-augmented generation (RAG) with vector DBs (FAISS, Pinecone).
- **Real-Time Fraud Detection**: streaming ingestion (Kafka), online learning models, dashboards.
- **Multimodal Search**: combine CLIP embeddings for images + text search, deploy via FastAPI.

## 10. Further Research & External Resources to Gather

- Company's proprietary datasets and annotation tools.
- Internal accelerators (TPU pods, Meta’s Zeus, AWS Trainium) and how to access them.
- Cutting-edge training techniques: LoRA, QLoRA, MoE, diffusion models, retrieval-augmented transformers.
- Compliance requirements (GDPR, HIPAA, SOC2) for AI deployments.
- Advanced compiler stacks: TVM, Triton, CUDA Graphs.
- RLHF pipelines, synthetic data generation, and guardrail frameworks (Llama Guard, NeMo Guardrails).
