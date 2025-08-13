---
author: Ari Gestetner
date: 2024-01-01
title: Inequality Encoding Fixes 
desc: Inequality encoding fixes for the linearisation of inequalities in the AST. 
    Additionally, this post outlines the encoding of inequalities in the AST and how it works.
img: /content/research/inequalities.png
draft: false
---

Where $E_{1}\leq E_{2}$ then we say $z=0\Rightarrow E_{1}\leq E_{2}$ and $z=1\Rightarrow E_{1}>E_{2} \equiv E_{1}\geq E_{2}+\varepsilon$

Thus we have for $E_{1}\leq E_{2}$
$$
E_{2}+\varepsilon-M+zM\leq E_{1}\leq E_{2}+zM
$$

Similarly, for $E_{1}<E_{2}$ we have $z=0\Rightarrow E_{1}<E_{2}\equiv E_{1}\leq E_{2}-\varepsilon+zM$ and $z=1\Rightarrow E_{1}\geq E_{2}$

Thus for $E_{1}<E_{2}$ we have
$$
E_{2}+zM-M\leq E_{1}\leq E_{2}+zM - \varepsilon
$$


 
## TODO
- [ ] Fix typos in Readme
- [ ] Add global vartype to readme
- [ ] make pr of global vartype
- [x] fix inequality encoding
- [ ] add some documentation how the encoding works (i.e. linearisation)
- [ ] check if I mutate the ast in parse model
- [x] check that the order of operations is correct for linearisation
- [ ] I don't believe it works with equality (I think I know how to add it though)