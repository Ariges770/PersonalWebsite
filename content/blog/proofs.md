---
author: Ari Gestetner
date: 2023-10-01
---

## What is a proof
* A step by step argument
* Should be verifiable and finite
* Every statement must be something we already know from the start such as a definition, axiom or previously-proved theorem
* Or a logical consequence of some conjunction of previous statements
* If you've previously established $P$
* and also that $P\Rightarrow Q$
* then you can deduce $Q$
* Or if you've established $P_1,P_2, \dots , P_n$
* and also that $(P_1\land P_2 \land \dots \land P_n) \Rightarrow Q$
* then you can deduce $Q$
## Finding proofs
* To prove subset ralations $A\subseteq B$ (where $A$ and $B$ are sets)
1. Take a general member of $A$, and give it a name ("let $x \in A$")
2. Use definition of $A$ to say something about $x$
3. Follow through the logical consequences of that
4. aiming to prove that $x$ also satisfies the definition of $B$

* To prove set equality "$A=B$" prove $A\subseteq B$ and $B \subseteq A$
* To prove numerical equality "$A=B$" prove $A\leq B$ and $B \leq A$
## Types of proofs
### Proof by construction
* Also known as proof by example
* Can be used where the theorem asserts the existence of some object with a specific property just give the example, show it has the property
### Proof by cases
* Also known as proof by exhaustion or (if lots of cases) "brute force"
* Identify and prove a number of different cases which cover all possibilities 
### Proof by contradiction
* Also known as "reduction ad absurdum"
* Start by assuming the negation of the statement you want to prove
* Deduce a contradiction
* Therefore, the statement must be true
### Proof by induction
* Prove base case $P(1)$ 
* then prove inductive case where $\exists k > n: P(k)$ is true which implies $P(k+1)$ is true 

## Good proofs
### Theorem: There are infinitely many primes
* Proof:
* Assume by way of contradiction that there are finitely many primes
* Let $n$ be the number of primes
* Let $p_1,p_2,\dots ,p_n$ be all the primes
* Define $q := p_1\cdot ,p_2 \cdot \dots \cdot p_n + 1$
* This is bigger than any prime $p_n$
* Therefore $q$ must be a composite of primes
* However, $\forall p_i$, if you divide $q$ by $p_i$ you will get a remainder of $1$ by our construction
* So $q$ cannot be a multiple of $p_i$ therefore $q$ cannot be a multiple of any prime number
* Thus by way of contradiction there is no largest prime $\square$ 

### Definition: A set is countable
* A set is countable if either
	* It is finite, *or*
	* It can be put in one-to-one correspondence (i.e. bijection) with $\mathbb N$ 
* For example the set of all FIT2014 students is finite,
* The sets $\mathbb N$, $\mathbb Z$ and $\Sigma ^*$ can all be put in one-to-one correspondence with $\mathbb N$

* However, the set of all sets of strings is not countable
* The sets of all languages is not countable

### Theorem: The set of all languages is uncountable
* Proof:
* Suppose by way of contradiction that the set of all languages is countable
* Since we know it's not finite, there must be a bijection between $\mathbb N$ and {all languages}
* Let the members of the set of all languages be $L_m,m\in \mathbb N$
* Recall, that the set of all strings is countable so we can list them as $x_n, n\in \mathbb N$
* Define a language $\hat L$ as follows: $\forall n \in \mathbb N: x_n \in \hat L \Leftrightarrow x_n \centernot \in L_n$ 
* We have constructed $\hat L$ so that, for each $n$, it differs from $L_n$ in whether or not it contains $x_n$
* So it differs from all languages, yet is it a language, this is a **contradiction**
* $\therefore$ The set of all languages is uncountable $\square$ 
## Bad proofs
### From a falsehood you can prove anything
* Recall that $P\Rightarrow Q$: always true if $P$ is False regardless of $Q$
* $2+2 = 5$
* $4=5$
* $1=2$
* |{McTaggart, The Pope}| $=2$
* |{McTaggart, The Pope}| $=1$ as $1=2$
* $\therefore$ McTaggart is the Pope

### Induction flaws
* In an induction proof a lack of a base step allows for invalid proofs
* Additionally proving a base of $k=1$ and using $k\geq 2$ allows for some strange behaviour such as with the proof that every word is uniform (made up of only one letter (lecture 2.2))
## Ugly proofs
* Often long and not to the point
* However, there may be some uses like for example proving no formula using basic arithmetic operations for the 5th power polynomial or higher

