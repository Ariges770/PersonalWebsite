---
date: 2024-09-01
---

## Question 1
First to describe the following graphs, in the bipartite graphs, the red edges indicate an edge which is part of the matching whereas the black edges are dotted out. Furthermore, in the flow networks, the red arcs are the saturated arcs, whereas black arcs are unsaturated. Furthermore, above each vertex, there is a list starting with some value (Inf, None, 0 or 1) this indicates the label of the vertex. Additionally, the remaining values in the list are the flow and capacity of the arc and the order is from top to bottom visually. As in for example [0/1, 1/1, 0/1, 0/1] indicates that the top, 3rd and bottom arcs have 0 flow and capacity of 1 whereas the arc underneath the top and above the 3rd has flow 1.
### a)
![[MatchingPa.svg]]
### b)
![[Flow1b.svg]]
### c) 
Step 1:
![[FlowCiA.svg]]
![[FlowCiB.svg]]
![[Pasted image 20241013234229.png]]
The images above are in order, the labeling process, the updated flow, the labels again and the augmented path.

ii)
![[FlowCiiA.svg]]
![[FlowCiiB.svg]]
![[Pasted image 20241013235659.png]]
The same order applies to this second iteration.

Now the last iteration would just label vertex $x$ and terminate, thus we would find that if $S=\left\{ x \right\}$, then the minimum cut $(S,V-S) = \left\{ x 1111, x 1100, x 1010, x 1001, x 0110, x 0101, x 0011, x 0000 \right\}$ and maximum flow of 8.
### d)
![[MatchingPd.svg]]
<div style="page-break-after: always;"></div>

---
## Question 2
### a)
The following graph displays the graph of $G(T,2)$ where $T$ is the graph drawn in blue and the edges added are drawn in red. Note how this graph is $K_{4}$ thus it is not 3 colourable.
![[Pasted image 20241013232559.png]]
### b)
We will prove that for every tree $T$ with maximum degree 3, that $G(T,2)$ is 4-colourable by induction on $|V(T)|$.
First, we know that $|V(T)|=|V(G(T,2))|$ by the definition of $G$.
Now let $P(n)$ be the statement "For any tree $T$ of $n$ vertices with maximum degree 3, $G(T,2)$ is 4-colourable".

For the case $P(1)$, since $T$ only has a single vertex, then $|V(G(T,2)|=1$. This implies that $G(T,2)$ is 4-colourable (since it is 1-colourable).

Now for $n\geq 2$ suppose $P(n-1)$ is true.
Let $T$ be an arbitrary tree with $n$ vertices and maximum degree 3. Let $\ell$ be a leaf vertex in $T$. Let $x$ be the only vertex adjacent to $\ell$. Now by the definition of $T$ we know that $|N_{T}(x)|\leq 3$ since $\delta(T)\leq 3$. However, we also know that $\ell \in N_{T}(x)$, therefore, $|N_{T}(x)\backslash \left\{ \ell \right\}|\leq 2$. Furthermore, we can note that since every vertex $u \in N_{T}(x)\backslash \left\{ \ell \right\}$ has $\texttt{dist}(\ell,u)=2$, therefore, any vertex $v \in N_{T}(u)\backslash \left\{ u \right\}$ has a distance greater than 2 (since for any 2 distinct vertices $u,v \in T$ there is only one unique $uv$-path between them).
Now consider $T-\ell$, by our inductive hypothesis, we know that $G(T-\ell,2)$ is 4-colourable. 
Furthermore, we also know that $\text{deg}_{G(T,2)}(\ell) = |\left\{ x \right\}\cup (N_{T}(x)\backslash \left\{ \ell \right\})|\leq 3$. Therefore, there are at most 3 colours assigned to the neighbours of $\ell$. So we can assign an unused colour to $\ell$. Therefore, since $G(T-\ell,2)$ is 4-colourable and we can assign $\ell$ a colour without needing a 5th colour. Then $G(T,2)$ is 4-colourable.

Thus, by the Principle of Mathematical Induction $P(n)$ is true $\forall n\geq 1$. $\square$ 
### c)
Below is a graph of $G(T,3)$ where $T$ is drawn in blue and and the edges added to create $G(T,3)$ are drawn in red. Note how this graph is $K_{6}$ thus it is not 5-colourable.
![[Pasted image 20241013232737.png]]
### d)
Proof: Every tree $T$ with maximum degree 3, $G(T,3)$ is 6-colourable.

We will begin by showing that for any rooted tree $T$ with maximum degree 3, root $r$ and $|V(T)|\geq 5$, there exists 2 distinct leaves, $\ell_{1}$ and $\ell_{2}$ such that $N_{T}(\ell_{1}) = N_{T}(\ell_{2}) = \left\{ x \right\}$ where $x$ is the parent of $\ell_{1}$ and $\ell_{2}$.   

For some rooted tree $T$, we will call 2 vertices $x,y \in V(T)$ ***siblings*** if they both share a parent.

First, let $T$ be an arbitrary rooted tree where every vertex $x \in V(T)$ we have $\text{deg}(x)=3$ or $\text{deg}(x)=1$ when $x$ is a leaf with $|V(T)|\geq 5$ and root $r$.
Let $\ell \in V(T)$ be a leaf with maximal distance from $r$ and let $u\in V(T)$ be the parent of $\ell$. Since $|V(T)|\geq 5$ and $\ell$ has maximal distance from $r$, then $u\neq r$ (since $\text{deg}(r)=3$ there would be a leaf with larger distance from $r$ than $\ell$). 
Let $\ell'$ be a child of $u$ such that $\ell\neq \ell'$, which we can note that $\text{dist}(\ell, r) = \text{dist}(\ell',r)$. However, we can also note that $\ell'$ is also a leaf being that if it had a child $x$ then $\text{dist}(x, r) > \text{dist}(\ell, r)$ which would mean that $\ell$ wasn't the leaf with maximum distance from $r$. Therefore both $\ell$ and $\ell'$ are maximum distance from $r$.

Let a tree be ***3-maximal*** if every vertex of the tree has degree 3 except for the leaves which have degree 1.

We will now show for any 3-maximal tree $T$ that $G(T,3)$ is 5-degenerate by induction on $|V(T)|$.

First, we know that $|V(T)|=|V(G(T,3))|$ by the definition of $G$.
Now let $P(n)$ be the statement "For any 3-maximal tree $T$ of $n$ vertices, $G(T,3)$ is 5-degenerate".
Consider the case of $n\leq 6$. Any graph $G$ with $|V(G)|\leq 6$ is 5-degenerate since the maximum degree of such a graph is 5. Therefore, for a 3-maximal tree $T$ with $n\leq 6$ vertices, $G(T,3)$ must be 5-degenerate.

Now consider $n\geq 7$, suppose $P(n-1)$ is true.
Let $T$ be a 3-maximal tree with $n$ vertices. Let $\ell_{1}, \ell_{2} \in V(T)$ be leaves such that $N_{T}(\ell_{1}) = N_{T}(\ell_{2}) = \left\{ x \right\}$ where $x \in V(T)$ is a vertex which is adjacent to both $\ell_{1}$ and $\ell_{2}$. 
Now let $D_{i}(\ell_{1})$ for $i \in \left\{ 1,2,3 \right\}$ be the sets of vertices of distance $i$ from $\ell_{1}$. 
Since $\text{deg}(\ell_{1})=1$ we know that $D_{1}(\ell_{1}) = N_{T}(\ell_{1}) = \left\{ x \right\}$.
We also know that since $T$ is 3-maximal, then $\text{deg}(x)=3$, thus $D_{2}(\ell_{1})=N_{T}(x)\backslash \left\{ \ell_{1} \right\} = \left\{ \ell_{2},y \right\}$ (we remove $\ell_{1}$ since it has shorter distance than 2) where $y\in V(T)$ is a 3rd vertex adjacent to $x$ (we already have $\ell_{1}$ and $\ell_{2}$). Lastly, we have $D_{3}(\ell_{1})=N_{T}(y)\backslash \left\{ x \right\}$ (we remove $x$ since $x$ has distance shorter than 3 to $\ell_{1}$), since we know $1\leq \text{deg}(y)\leq 3$ then we know $0\leq D_{3}(\ell_{1})\leq 2$. 
Furthermore, for every vertex $v \in D_{3}(\ell_{1})$, every vertex $u \in N_{T}(v)\backslash D_{2}(\ell_{1})$ has distance $\text{dist}(u,\ell_{1})\geq 4$, thus we only need to consider $D_{1}(\ell_{1}),D_{2}(\ell_{1})$ and $D_{3}(\ell_{1})$.
Now for the graph $G(T-\ell_{1},3)$ we have $|V(G(T-\ell_{1},3))|=n-1$ thus by our inductive hypothesis, is 5-degenerate. However, since for $G$ we add edges between any vertices with distance less than or equal to 3, we can consider $\ell_{1}$. Mainly, the set of vertices in $T$ with distance less than or equal to 3 is given by $D = D_{1}(\ell_{1})\cup D_{2}(\ell_{1})\cup D_{3}(\ell_{1})$ and we know $|D| \leq 1+2+2$ since $|D_{1}(\ell_{1})| = 1$, $|D_{2}(\ell_{1})|=2$ and $|D_{3}(\ell_{1})| \leq  2$. 
Nevertheless, since $G(T-\ell_{1},3)$ is 5-degenerate and $\text{deg}_{G(T,3)}(\ell_{1})\leq 3$ then we know that any subgraph of $G(T,3)$ will have minimum degree at most 5.
Thus by the Principle of Mathematical Induction $P(n)$ is true $\forall n\geq 1$.

We can now also consider a non 3-maximal tree $T$ with maximum degree of 3.
Since such a tree would reduce the size of any vertices neighbourhood (before it had either 3 elements or 1, now it can also have 2), the above proof still remains valid.

Now we can use Theorem 28 from the notes which states that any $k$-degenerate graph is $(k+1)$-colourable.
Thus, since $G(T,3)$ is 5-degenerate, it is 6-colourable. $\square$
<div style="page-break-after: always;"></div>

---
## Question 3
### a) 
Bellow is a drawing of the graph in (a) with the blue edges used to indicate which edges and vertices are used to find a subdivision of the graph which is also a subdivision of $K_{3,3}$
![[Pasted image 20241013233237.png]]
Looking at both graphs it is easy to see that the second graph is a subdivision of the first graph. Furthermore, it is also easy to notice that the second graph is a subdivision of $K_{3,3}$. Thus by Kuratowski's theorem, we know that the graph in (a) is non planar
![[Pasted image 20241013233231.png]]
### b)
Below is a drawing of the graph in (b) with no edge crossings. Since such a drawing exists, thus the graph in (b) is planar.
![[Pasted image 20241013233122.png]]
<div style="page-break-after: always;"></div>

---
## Question 5
### (a)
A graph $G$ has no $\Theta$ subgraph if and only if every block of $G$ is either an isolated vertex, a bridge or a cycle.

proof:
($\implies$)
Consider a graph $G$ with no $\Theta$ subgraph then none of the blocks of $G$ can contain a $\Theta$ subgraph either (otherwise $G$ would contain a $\Theta$ subgraph).
Now consider the blocks consisting of either an isolated vertex or a bridge. We can easily see that for an isolated vertex $v$ there does not exist a path from $v$ to $v$. Furthermore, for a bridge with vertices $u,v$ there only exists $1$ internally disjoint path from $u$ to $v$.
If we now consider the maximal biconnected blocks, let $B$ be a biconnected block. Now, suppose, by way of contradiction that $B$ is not a cycle. 
By biconnectivity, any 2 vertices $u,v\in V(B)$ there exists a cycle through them. Let $C$ be the cycle subgraph of $B$ with the most vertices. Let $B' = B-E(C)$ be the graph with the edges of $C$ removed. Now, by our assumption, since $B$ is not a cycle, then $|E(B')|\neq 0$, otherwise, $E(B)=E(C)$ which implies $B$ is a cycle. Now let $x,y \in V(B')\cap V(C)$ be 2 distinct vertices such that there exists an $xy$-path in $B'$ between them (since there is at least 1 edge in $E(B')$ we know that such a path exists). Now since $x,y\in V(C)$, there exists 2 internally disjoint $xy$-paths in $C$. Additionally, there exists at least 1 internally disjoint $xy$-path between them. Therefore, in $B'\cap C$ there exists at least 3 internally disjoint $xy$-paths, thus we have a contradiction. Therefore, $B$ can only be a cycle.

($\impliedby$)
We will now prove the contrapositive, such that if a graph $G$ has a $\Theta$ subgraph then there exists a block which is not cycle, bridge or isolated vertex. Let $G$ be a graph with a $\Theta$ subgraph
We can note that a $\Theta$ graph consists of at least 4 vertices since there must exist a vertex $v$ with $\text{deg}(v)\geq 3$ in order to have 3 internally disjoint paths. Furthermore, we can also note that a $\Theta$ graph has no cut vertex and that it is connected. Therefore, a $\Theta$ graph is a biconnected graph. Additionally, the blocks of $G$ consist of isolated vertices, bridges and maximal biconnected graphs. Since a $\Theta$ graph has more than 4 vertices, it can't be a subgraph of an isolated vertex or a bridge, therefore, it is a subgraph of some maximal biconnected block $B$. However, we can easily note that $B$ is not a cycle (since the $\Theta$ subgraph is not a cycle).
Thus, we have shown that if a graph $G$ has a $\Theta$ subgraph, then there exists a block $B$ of $G$ which is not an isolated vertex, bridge or a cycle
$\square$
### (b) 
We can find that the maximum number of edges occurs when every block is a triangle, this yields the following equations.

If $b$ is the number of blocks in $G$ then the number of edges is $e = n + (b-1)$.
This is due to each block sharing a vertex (if they don't then we can't maximise the number of edges).
However, we can find using the number of vertices in such a graph that $b = \frac{n-1}{2}$ therefore $|E(G)| \leq  n + (b-1) = n + \frac{n-1}{2}-1 = \frac{2n-2+n-1}{2} = \frac{3(n-1)}{2}$. 

Thus $|E(G)|\leq \frac{3(n-1)}{2}$ with equality for even $n$ when $G$ is connected and every block is a triangle and $|E(G)|=\left\lfloor  \frac{3(n-1)}{2}  \right\rfloor$ for odd $n$ when $G$ is connected, a single block is a bridge and the remaining blocks are triangles.

Proof:
We will prove that $|E(G)|\leq \frac{3(n-1)}{2}$ via induction on the number of vertices.

Let $P(n)$ be the statement "A graph $G$ with no $\Theta$ subgraph has $|E(G)|\leq \frac{3(n-1)}{2}$."

Let's first consider the case of $P(1)$. Since there is only a single vertex then $\frac{3((1)-1)}{2} = 0$ and $|E(G)|=0$, thus $P(1)$ is true.

Now for $n\geq 2$ suppose $P(n-1)$ is true.
Let $G$ be a graph with no $\Theta$ subgraph, Let $v \in V(G)$.

Case 1: There exists an isolated vertex $v$.
If we were to delete vertex $v$ we would get a graph $G-v$ which would also not have a $\Theta$ subgraph, thus $G$ would have $n-1$ vertices and by our inductive hypothesis has $|E(G-v)|\leq \frac{3((n-1)-1)}{2}$. However since $E(G-v)=E(G)$ then we know that $|E(G-v)|\leq \frac{3((n-1)-1)}{2} < \frac{3(n-1)}{2}$ as required.

Case 2: There exists a vertex $v$ with $\text{deg}(v)=1$.
If a vertex has degree of 1, 


### (c)
A graph $G$ with no $\Theta$ subgraphs and with odd $n$ vertices has $|E(G)|=\frac{3(n-1)}{2}$ if and only if every block is a triangle and $G$ is connected.

Alternatively, for a graph $G$ with no $\Theta$ subgraphs and with odd $n$ vertices has $|E(G)| = \left\lfloor  \frac{3(n-1)}{2}  \right\rfloor$ if and only if $G$ is connected, 1 block is a bridge or a 4-cycle and the remaining blocks are triangles.