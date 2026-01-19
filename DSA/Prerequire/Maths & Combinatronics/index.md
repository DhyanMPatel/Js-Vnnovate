# 🧮 Mathematical Foundations for DSA

> **Master the math behind coding interviews**

## 📊 Learning Progress Tracker

| Topic                  | Status         | Level        | Practice File                                    |
| ---------------------- | -------------- | ------------ | ------------------------------------------------ |
| Even & Odd Numbers     | ⏳ Not Started | Beginner     | [evenOdd.js](./evenOdd.js)                       |
| Floor & Ceiling        | ⏳ Not Started | Beginner     | [floorCeiling.js](./floorCeiling.js)             |
| Sum of Natural Numbers | ⏳ Not Started | Beginner     | [sumNatural.js](./sumNatural.js)                 |
| GCD & LCM              | ⏳ Not Started | Intermediate | [gcdLcm.js](./gcdLcm.js)                         |
| Perfect Numbers        | ⏳ Not Started | Intermediate | [perfectNumbers.js](./perfectNumbers.js)         |
| Finding Factors        | ⏳ Not Started | Intermediate | [factors.js](./factors.js)                       |
| Number Systems         | ⏳ Not Started | Intermediate | [numberSystems.js](./numberSystems.js)           |
| Prime Numbers          | ✅ Completed   | Advanced     | [isPrime.js](./isPrime.js)                       |
| Sieve of Eratosthenes  | ✅ Completed   | Advanced     | [sieve.js](./sieve.js)                           |
| Prime Factorization    | ✅ Completed   | Advanced     | [primeFactorization.js](./primeFactorization.js) |
| Modular Arithmetic     | ⏳ Not Started | Advanced     | [modularArithmetic.js](./modularArithmetic.js), [powMod.js](./powMod.js)   |

**Legend**: ⏳ Not Started | 🔄 In Progress | ✅ Completed | ❌ Need Review

---

## 🔢 Even & Odd Numbers

**The Rule**: A number is even if it's divisible by 2 (`n % 2 == 0`), otherwise it's odd.

**Quick Examples**:

- 4 % 2 == 0 → Even
- 7 % 2 == 1 → Odd
- 0 % 2 == 0 → Even

**Why it matters**: Helps with array indexing, alternating patterns, and pairing problems.

---

## 📐 Floor & Ceiling

**Floor**: Greatest integer ≤ number

- `floor(3.8) = 3` (round down)
- `floor(5.1) = 5` (round down)

**Ceiling**: Smallest integer ≥ number

- `ceil(3.2) = 4` (round up)
- `ceil(7.9) = 8` (round up)

**Real-world examples**:

- `floor(10/3) = 3` → 3 full teams
- `ceil(10/3) = 4` → Need 4 rooms

---

## ➕ Sum of Natural Numbers

**Formula**: Sum of first n numbers = `n(n+1)/2`

**Magic Examples**:

- Sum 1 to 10: `10×11/2 = 55`
- Sum 1 to 100: `100×101/2 = 5050`
- Sum 1 to 5: `5×6/2 = 15`

**Superpower**: Calculate sums in O(1) instead of O(n)!

---

## 🤝 GCD (Greatest Common Divisor)

**Definition**: Largest number that divides both numbers

**Euclidean Algorithm**: `gcd(a,b) = gcd(b, a%b)`

**Step-by-step example**: `gcd(48, 18)`

1. `gcd(48, 18) = gcd(18, 48%18) = gcd(18, 12)`
2. `gcd(18, 12) = gcd(12, 18%12) = gcd(12, 6)`
3. `gcd(12, 6) = gcd(6, 12%6) = gcd(6, 0)`
4. `gcd(6, 0) = 6`

**Quick examples**:

- `gcd(12, 8) = 4`
- `gcd(17, 13) = 1` (coprime)
- `gcd(30, 45) = 15`

---

## 📅 LCM (Least Common Multiple)

**Definition**: Smallest number divisible by both numbers

**Formula**: `lcm(a,b) = (a × b) / gcd(a,b)`

**Examples**:

- `lcm(4, 6) = (4×6)/gcd(4,6) = 24/2 = 12`
- `lcm(5, 7) = (5×7)/gcd(5,7) = 35/1 = 35`
- `lcm(8, 12) = (8×12)/gcd(8,12) = 96/4 = 24`

**Real use**: Find when events repeat together (like buses arriving same time).

---

## 🌟 Perfect Numbers

**Definition**: Number equals sum of its proper divisors

**Example**: 6

- Divisors of 6: 1, 2, 3
- Sum: 1 + 2 + 3 = 6

**More examples**:

- 28: 1 + 2 + 4 + 7 + 14 = 28
- 496: 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248 = 496

**Fun fact**: Perfect numbers are very rare!

---

## 🔍 Finding Factors

**Smart Method**: Check only up to √n

**Why**: Factors come in pairs! If `i` divides `n`, then `n/i` also divides `n`.

**Example**: Find factors of 36 (√36 = 6)

- Check 1: 1 and 36 → add both
- Check 2: 2 and 18 → add both
- Check 3: 3 and 12 → add both
- Check 4: 4 and 9 → add both
- Check 5: 36%5 ≠ 0 → skip
- Check 6: 6 and 6 → add once

**Result**: 1, 2, 3, 4, 6, 9, 12, 18, 36

**Speed**: O(√n) instead of O(n) - huge improvement!

---

## 🔢 Number Systems: Decimal to Binary

**Method**: Divide by 2, store remainders, reverse them

**Example**: Convert 13 to binary

1. 13 ÷ 2 = 6 remainder 1
2. 6 ÷ 2 = 3 remainder 0
3. 3 ÷ 2 = 1 remainder 1
4. 1 ÷ 2 = 0 remainder 1

**Remainders**: 1, 0, 1, 1 (bottom to top)
**Result**: 13₁₀ = 1101₂

**More examples**:

- 5 → 101
- 10 → 1010
- 8 → 1000

---

## � Prime Numbers

**Definition**: Natural number > 1 with exactly two divisors: 1 and itself

**Examples**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...

**Quick Check**:

- 2: Divisors {1, 2} Prime
- 4: Divisors {1, 2, 4} Not prime (3 divisors)
- 1: Only divisor {1} Not prime (needs exactly 2)

---

## 🔍 Prime Number Algorithms

### Basic Primality Test

**Method**: Try dividing by all numbers from 2 to n-1

**Example**: Is 7 prime?

- 7 % 2 = 1
- 7 % 3 = 1
- 7 % 4 = 3
- 7 % 5 = 2
- 7 % 6 = 1
  **Result**: 7 is prime!

**Problem**: Too slow for large numbers (O(n))

---

### Optimized Method: Square Root Check

**Genius Idea**: Only check up to √n

**Why it works**: If n has a factor > √n, it must have a matching factor < √n

**Example**: Is 29 prime? (√29 ≈ 5.4, so check 2, 3, 4, 5)

- 29 % 2 = 1
- 29 % 3 = 2
- 29 % 4 = 1
- 29 % 5 = 4
  **Result**: 29 is prime!

**Speed**: O(√n) instead of O(n) - massive improvement!

**More examples**:

- Is 17 prime? (√17 ≈ 4.1, check 2, 3, 4)
- Is 25 prime? (√25 = 5, check 2, 3, 4, 5)
  - 25 % 5 = 0 Not prime!

---

## �🎯 Sieve of Eratosthenes

**Superpower**: Find ALL primes up to n in one go!

**Method**:

1. List all numbers 2 to n
2. Start with 2, cross out all multiples
3. Move to next uncrossed number, repeat
4. Uncrossed numbers are prime!

**Example**: Find primes up to 20

```
Start: 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20

Step 1 (p=2): 2 3 × 5 × 7 × 9  × 11  × 13  × 15  × 17  × 19  ×
Step 2 (p=3): 2 3 × 5 × 7 × ×  × 11  × 13  × ×  × 17  × 19  ×
Step 3 (p=5): 2 3 × 5 × 7 × ×  × 11  × 13  × ×  × 17  × 19  ×

Primes: 2, 3, 5, 7, 11, 13, 17, 19
```

**Speed**: O(n log log n) - lightning fast for finding many primes!

---

## 🔢 Prime Factorization Techniques

### Optimized Trial Division

**Method**: Try dividing n by all numbers up to √n, starting from 2

**Steps**:

1. After removing all factors of 2, check only odd numbers
2. If n is still greater than 1, it's a prime factor itself

**Example**: Factorize 84

- 84 ÷ 2 = 42 → factor: 2
- 42 ÷ 2 = 21 → factor: 2
- 21 ÷ 3 = 7 → factor: 3
- 7 is prime → factor: 7
  **Result**: 84 = 2² × 3 × 7

### Sieve + SPF (Smallest Prime Factor)

**Method**: Precompute smallest prime factor for every number up to n

**Steps**:

1. Use modified sieve to store SPF for each number
2. To factorize any number, repeatedly look up spf[n] and divide
3. Collect prime factors efficiently

**Advantage**: O(log n) factorization after O(n log log n) preprocessing

### Number of Prime Factors

**Formula**: If prime factorization of n is:

```
n = p₁^e₁ × p₂^e₂ × ... × pₖ^eₖ
```

**Total number of divisors**: (e₁ + 1) × (e₂ + 1) × ... × (eₖ + 1)

**Example**: 72 = 2³ × 3²

- Exponents: 3 and 2
- Total divisors: (3+1) × (2+1) = 4 × 3 = 12
  **Divisors**: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72

**Why it matters**: Each exponent eᵢ gives us (eᵢ + 1) choices (from pᵢ⁰ to pᵢ^eᵢ) in forming a divisor.

---

## 🔢 Modular Arithmetic

**Definition**: System where numbers "wrap around" after reaching a certain value (modulus)

**Basic Operation**: `a % m = remainder when a is divided by m`

### Addition Modulo

**Formula**: `(a + b) % m = [(a % m) + (b % m)] % m`

**Purpose**: Ensures results stay within bounds after addition

### Subtraction Modulo

**Formula**: `(a - b) % m = [(a % m) - (b % m) + m] % m`

**Key Point**: Adding `m` before applying modulus avoids negative results

### Multiplication Modulo

**Formula**: `(a × b) % m = [(a % m) × (b % m)] % m`

**Use Case**: Avoiding overflow in large calculations

### Division Modulo

**Challenge**: Cannot divide directly in modular arithmetic

**Solution**: Use modular inverse: `(a/b) % m = (a × b⁻¹) % m`

### Modular Inverse using Fermat's Little Theorem

**Condition**: `gcd(b, m) = 1` and `m` is prime

**Formula**: `b⁻¹ ≡ b^(m-2) % m`

**Implementation**: Use modular exponentiation to calculate `b^(m-2) % m`

### Binary Exponentiation

**Purpose**: Calculate `a^b % m` efficiently in `O(log b)` time

**Method**: Break power into squares: `a^b = a^1 × a^2 × a^4 × ...`

**Optimization**: Only include terms where the bit in `b` is set (1)

**Real-world Applications**:

- Cryptography (RSA, Diffie-Hellman)
- Hash functions and checksums
- Circular buffers and arrays
- Game development (circular worlds)

---

## 🎯 Quick Reference

| Concept       | Formula/Rule              | Example                   |
| ------------- | ------------------------- | ------------------------- |
| Even Check    | `n % 2 == 0`              | 8 % 2 = 0                 |
| Floor         | `Math.floor(x)`           | floor(3.7) = 3            |
| Ceiling       | `Math.ceil(x)`            | ceil(2.1) = 3             |
| Sum 1 to n    | `n(n+1)/2`                | Sum 1-5 = 15              |
| GCD           | `gcd(a,b) = gcd(b,a%b)`   | gcd(12,8) = 4             |
| LCM           | `(a×b)/gcd(a,b)`          | lcm(4,6) = 12             |
| Perfect       | Sum of proper divisors    | 6 = 1+2+3                 |
| Factors       | Check to √n               | Factors of 16: 1,2,4,8,16 |
| Binary        | Divide by 2 method        | 10 → 1010                 |
| Prime Check   | Test to √n                | 17 is prime               |
| Sieve         | Cross out multiples       | Find all primes ≤ 100     |
| Factorization | Trial division/SPF        | 84 = 2² × 3 × 7           |
| Divisor Count | (e₁+1)×(e₂+1)×...         | 72 has 12 divisors        |
| Mod Add       | (a+b)%m = [(a%m)+(b%m)]%m | (17+23)%7 = 5             |
| Mod Mul       | (a×b)%m = [(a%m)×(b%m)]%m | (17×23)%7 = 2             |
| Mod Inverse   | b⁻¹ ≡ b^(m-2)%m           | 3⁻¹%7 = 5 (3×5≡1 mod 7)   |
| Binary Exp    | a^b % m in O(log b)       | 2^10%1000 = 24            |

---

## 💡 Pro Tips

1. **Memorize formulas** - They save time in interviews
2. **Practice with examples** - Build intuition
3. **Understand the 'why'** - Helps with variations
4. **Code it yourself** - Reinforces learning

**Ready for practice?** Try these concepts in coding problems!

---

## 🎯 Quick Navigation by Learning Level

### 🟢 Beginner Level

- [Even & Odd Numbers](./evenOdd.js) - Basic number properties
- [Floor & Ceiling](./floorCeiling.js) - Number rounding operations
- [Sum of Natural Numbers](./sumNatural.js) - Mathematical formulas

### 🟡 Intermediate Level

- [GCD & LCM](./gcdLcm.js) - Number theory fundamentals
- [Perfect Numbers](./perfectNumbers.js) - Special number properties
- [Finding Factors](./factors.js) - Efficient factorization
- [Number Systems](./numberSystems.js) - Binary conversions

### 🔴 Advanced Level

- [Prime Numbers](./isPrime.js) ✅ - Primality testing
- [Sieve of Eratosthenes](./sieve.js) ✅ - Multiple prime generation
- [Prime Factorization](./primeFactorization.js) ✅ - Trial division & SPF methods
- [Modular Arithmetic](./modularArithmetic.js) - Binary exponentiation & modular inverse

---

## 📈 Your Learning Journey

**Current Progress**: 3/10 topics completed (30%)
**Focus Area**: Continue with Intermediate topics
**Next Recommended**: [Even & Odd Numbers](./evenOdd.js) (Beginner) or [GCD & LCM](./gcdLcm.js) (Intermediate)

**How to Use This Tracker**:

1. ✅ Mark topics as completed when you finish the practice file
2. 🔄 Mark as "In Progress" while working on a topic
3. ❌ Mark as "Need Review" if you want to revisit
4. Click on file links to jump directly to practice code

**Pro Tip**: Complete topics in order from Beginner → Intermediate → Advanced for best learning progression!
