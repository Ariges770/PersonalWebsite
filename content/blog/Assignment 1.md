---
date: 2024-08-15
draft: false
---

## Question 1
### 1.a)

![[WhatsApp Image 2024-08-15 at 8.49.32 PM.jpeg|250]]
$\left| \left\{ v \in V(T)| \text{deg}(v) = 1 \right\} \right| = 2$
$\left| \left\{ v \in V(T)| \text{deg}(v) = 3 \right\} \right| = 0$

![[WhatsApp Image 2024-08-15 at 8.49.31 PM (2).jpeg|250]]
$\left| \left\{ v \in V(T)| \text{deg}(v) = 1 \right\} \right| = 3$
$\left| \left\{ v \in V(T)| \text{deg}(v) = 3 \right\} \right| = 1$

![[WhatsApp Image 2024-08-15 at 8.49.31 PM (1).jpeg|250]]
$\left| \left\{ v \in V(T)| \text{deg}(v) = 1 \right\} \right| = 3$
$\left| \left\{ v \in V(T)| \text{deg}(v) = 3 \right\} \right| = 1$

![[WhatsApp Image 2024-08-15 at 8.49.31 PM.jpeg|250]]
$\left| \left\{ v \in V(T)| \text{deg}(v) = 1 \right\} \right| = 4$
$\left| \left\{ v \in V(T)| \text{deg}(v) = 3 \right\} \right| =2$

![[WhatsApp Image 2024-08-15 at 8.49.30 PM.jpeg|250]]
$\left| \left\{ v \in V(T)| \text{deg}(v) = 1 \right\} \right| = 5$
$\left| \left\{ v \in V(T)| \text{deg}(v) = 3 \right\} \right| = 3$

<div style="page-break-after: always;"></div>

---
### 1.b)
Let $T$ be an arbitrary tree with maximum degree 3
Let $n \in \mathbb{N}$ be the number of vertices in $T$
Let $k_{i} \in \mathbb{N}$ be the number of vertices with degree $i$


By the Handshaking Lemma,
$$
\sum_{v \in V(T)}^{} \text{deg}(v) = 1\cdot k_{1} + 2\cdot k_{2} + 3 \cdot k_{3}= 2 \left| E(T) \right| =2(n-1)
$$

Additionally, the number of vertices $n = k_{1} + k_{2} + k_{3}$ 

Thus we can sub the equation for the number of vertices into the equation for the sum of the degrees

$$
\begin{align*}
k_{1} + 2k_{2} + 3k_{3}  & = 2((k_{1}+k_{2}+k_{3}) -1)  \\
\implies -k_{1} + k_{3}  & = -2 \\
\implies k_{1}  & = k_{3}+2
\end{align*}
$$
<div style="page-break-after: always;"></div>

---
### 1.c)
Using similar logic to (1.b) we can use the handshaking lemma to find formula for the number of vertices of degree $1$ in terms of the number of vertices of degree $d$ for all $d \geq 3$.

Let $k_{d}$ be the number of vertices of degree $d$
Using 
$$
\begin{align*}
\sum_{v \in V(G)}^{} \text{deg}(v) = \sum_{d = 1}^{n-1} d\cdot k_{d} = 2|E(G)| = 2(n-1)  
\end{align*}
$$
and 
$$
n = \sum_{d=1}^{n-1} k_{d}
$$
we get
$$
\begin{align*} \\
 & \sum_{d=1}^{n-1} d\cdot k_{d} =  2(n-1)  \\
\implies  & k_{1} + \sum_{d=2}^{n-1} d\cdot k_{d}  = 2\left( \sum_{d=1}^{n-1} k_{d} \right) - 2 \\
\implies &  -k_{1} + \sum_{d=2}^{n-1} (d-2)  \cdot k_{d} =-2 \\
\implies &  k_{1} = 2+\sum_{d=2}^{n-1}  (d-2)\cdot k_{d}
\end{align*}
$$

<div style="page-break-after: always;"></div>

---
### 1.d)
Using the formula from (1.c) we can find the relationship.
Since there are only vertices of degree $1$ and degree $4$ 
then $k_{1} = 2 + (4-2)\cdot k_{4} = 2 + 2\cdot k_{4}$ 

So therefore for $n$ carbon atoms there are $2+2n$ hydrogen atoms

<div style="page-break-after: always;"></div>

---
## Question 2

There exists a $5$-regular graph on $n$ vertices if and only if $n$ is even and $n\geq 6$.

Proof:
($\implies$) Let $G$ be a $5$-regular graph on $n$ vertices. By the handshaking lemma $\sum_{v \in V(G)}^{}\text{deg}(v) = 5\cdot n = 2|E(G)|$
Therefore, $|E(G)| = \frac{5\cdot n}{2}$ which implies $n$ is even
Additionally, $|E(G)| = \frac{5n}{2} \leq  \frac{n(n-1)}{2} \implies n \geq  6$ 
($\impliedby$) We prove that if $n$ is even and $n\geq 6$ then there exists a $5$-regular graph by induction on a graph with $2k$ vertices.
Let $P(k)$ be the statement "there exists a $5$-regular graph on $2k$ vertices".
We want to show that $P(k)$ is true $\forall k\geq 3$.

Consider the base case when $k=3$ such that $K_{6}$ is $5$-regular on $2(3)=6$ vertices.

We now assume $P(k-1)$ is true, that is there exists a $5$-regular graph $G$ with $2(k-1)$ vertices. Let $v_{1}v_{3}$, $v_{1}v_{5}$, $v_{2}v_{4}$ and $v_{2}v_{6}$ be distinct edges in $G$. Let $G'$ be obtained by deleting $v_{1}v_{3}$, $v_{1}v_{5}$, $v_{2}v_{4}$ and $v_{2}v_{6}$ and introducing $2$ new vertices $x$ and $y$ such that $N_{G}(x) = \left\{ v_{1},v_{2},v_{3},v_{4}, y\right\}$ and $N_{G}(y) = \left\{ v_{1},v_{2},v_{5},v_{6},x \right\}$. Then $G'$ is $5$-regular with $2\cdot k$ vertices. Hence, $P(k)$ is true. Therefore, by MI, $P(k)$ holds $\forall k \geq 3$, meaning that for all even $n\geq 6$ there exists a $5$-regular graph. $\blacksquare$
<div style="page-break-after: always;"></div>

---
## Question 3
### 3.a)
We will prove that for $k \geq 2$, for every tree $T$ with $k$ vertices, every graph $G$ with minimum degree at least $k-1$ contains a subgraph isomorphic to $T$ via induction.

Let $P(k)$ be the statement "for every tree $T$ with $k$ vertices, every graph $G$ with minimum degree at least $k-1$ contains a subgraph isomorphic to $T$"

Consider the base case, $k=2$.
All trees with $2$ vertices are isomorphic to the tree $V(T) = \left\{ x,y \right\}$ and $E(T) = \left\{ xy \right\}$. 
Furthermore, any graph $G$ with minimum degree of at least $1$ contains an edge connecting $2$ nodes $u$ and $v$. Thus we can induce a graph $G[\left\{ u,v \right\}] \cong T$, since $G[\left\{ u,v \right\}]$ contains only 2 nodes with a single edge connecting them.

Now assume $P(k-1)$ is true.
Let $T_{k}$ be an arbitrary tree with $n$ nodes and $G$ a graph with minimum degree $k-1$. 
Since every tree has a leaf, we can take some arbitrary leaf $x$ with neighbour $y$ from $T_{k}$ and remove it from $T_{k}$.
Thus, $T_{k} - x$ now has $k-1$ nodes and $G$ has minimum degree at least $k-2$ (since every node has at least $k-1$ degree). By induction, $G$ contains a subgraph $T_{G}'$ isomorphic to $T_{k} - x$. 
Let $y' \in V(T_{G}')$ be the vertex corresponding to $y \in V(T_{k} - x)$.
Since, every $v \in V(G)$ has $\text{deg}(v) \geq k-1$ and since $|V(G)| > |V(T_{G}')| = k-1$ then there exists $x' \in N_{G}(y')$ where $x' \notin V(T_{G}')$.
Now, let $T_{G}$ be the tree constructed by adding vertex $x'$ to $T_{G}'$ and edge $x'y'$. Since $T_{k}$ and $T_{G}$ have the same features, therefore, $T_{k} \cong T_{G}$. 
Thus by mathematical induction, $P(k)$ holds $\forall k \geq 2$ $\blacksquare$ 

<div style="page-break-after: always;"></div>

---
### 3.b)
We can show that $k-1$ is the best possible minimum degree of graph $G$ ($\forall k \geq 2$)

If the minimum degree of $G$ is $k-2$ then we can construct an $(k-2)$-regular graph (which has to have even $k$ since $|E(G)| = \frac{k(k-2)}{2}$)
Now let's construct a star $S_{k}$ with $k$ vertices and $k-1$ leaves and a vertex $u$ with degree $k-1$. 
However, since every vertex $v$ in $G$ has $\text{deg}(v) = k-2$ then there does not exist a vertex with degree $k-1$ thus $S_{k}$ can't be a subgraph of $G$. 
Therefore, since for all even $k$ there exists a tree $S_{k}$ and graph $G$ where $G$ doesn't contain a subgraph isomorphic to $S_{k}$ then $\forall k \geq 2$ the minimum degree of $G$ has to be at least $k-1$ $\blacksquare$ 
<div style="page-break-after: always;"></div>

---
## Question 5
We will prove by induction that if $T_1$ and $T_{2}$ are spanning trees of connected graph $G$, then $T_{1}$ can be transformed to $T_{2}$ through a sequence of intermediate spanning trees of $G$, each arising from the previous tree by deleting one edge and adding one edge.



Let $G$ be an arbitrary connected graph
Let $T_{1},T_{2}$ be spanning trees of $G$

Let $E_{1} = E(G[T_{1}])$
Let $E_{2} = E(G[T_{2}])$
Let $T^{(n)}$ be a spanning tree of $G$ with $n=\left| E(G[T^{(n)}]) \backslash E_{1} \right|$ being the number of edges in $T^{(n)}$ which aren't in $T_{1}$ 

Let $P(n)$ be the statement "there exists a sequence of spanning trees of $G$ $(T_{1},T^{(1)},\dots,T^{(n-1)},T^{(n)})$ transforming $T_{1}$ to $T^{(n)}$ each arising from the previous tree by removing an edge then adding an edge"

Consider the base case when $n=0$
Then we have the sequence $(T_{1})$ or $(T^{(0)})$, since $T_{1}$ is the same tree as $T^{(0)}$ then there does exist a sequence of spanning trees transforming $T_{1}$ to $T^{(0)}$ (we can remove an edge then add the same edge back). Thus $P(0)$ is true.

Now let's assume $P(n-1)$ is true. Meaning that there exists a sequence $(T_{1},T^{(1)},\dots,T^{(n-1)})$ each arising from the previous by removing an edge then adding an edge.
Now if $E(T^{(n-1)})\neq E(T_{2})$ take $T^{(n-1)}$ and an edge $e \in E(T^{(n-1)}) \backslash E_{2}$ from $T^{(n-1)}$ that isn't in the edge set of $T_{2}$ and delete it. Since every edge in a tree is a bridge, then $T^{(n-1)} - e$ is a forest with $2$ components, $C_{1}$ and $C_{2}$. Since $T_{2}$ is a spanning tree of $G$ and $V(T^{(n-1)} - e) = V(G) = V(T_{2}) = V(C_{1}) \cup V(C_{2})$ and $T_{2}$ is connected with no cycles then $\exists u \in V(C_{1})$ and $\exists v \in V(C_{2})$ such that $uv \in E(T_{2}) \backslash E(T^{(n-1)})$. Then we can let $T^{(n)} = (C_{1} + C_{2}) + uv$ which is a tree being that there are no cycles in $C_{1}$ or $C_{2}$ and they are both separate components so the only path between $u$ and $v$ is the edge $uv$.
If $E(T^{(n-1)}) = E(T_{2})$ then we can choose some edge $e \in E(T_{n-1})$, remove it then add it back to get $T^{(n)}$.
Thus there exists a sequence of spanning trees of $G$ $(T_{1},T^{(1)},\dots,T^{(n-1)},T^{(n)})$ transforming $T_{1}$ to $T^{(n)}$ each arising from the previous tree by removing an edge then adding an edge, so therefore by induction, $P(n)$ is true $\forall n\geq 0$.

Now, when forming next tree, we only add an edge which exists in $T_{2}$ then within $n \leq |V(G)| - 1$ steps, $E(T^{(n)}) = E(T_{2})$. Thus if $T_1$ and $T_{2}$ are spanning trees of connected graph $G$, then $T_{1}$ can be transformed to $T_{2}$ through a sequence of intermediate spanning trees of $G$, each arising from the previous tree by deleting one edge and adding one edge. $\blacksquare$ 