Here is an explanation of "Week 1" concepts from the sources, formatted for Obsidian markdown:

***

# Week 1: Introduction to Data Visualisation

## What is Visualisation (Vis)?

**Computer-based visualisation systems provide visual representations of datasets designed to help people carry out tasks more effectively**. The primary purpose of visualisation is to **augment human capabilities** rather than to replace people with computational decision-making methods.

### Why do Visualisation?

Visualisation is undertaken for several key reasons:
*   To **analyse data when exact questions are not known in advance**.
*   To allow people to **explore or present large datasets** that would be impossible to draw by hand.
*   To **offload internal cognition and memory usage to the perceptual system** by using external representations (i.e., carefully designed images). Diagrams can support perceptual inferences and speed up search and recognition by organising information spatially.
*   To help people **see the dataset structure in detail**, which is often better than relying on brief summaries. This allows users to confirm expected patterns and find unexpected ones, as well as assess the validity of statistical models.
*   To **handle complexity** in large datasets through interactivity, as simply showing everything at once is often not feasible due to human and display limitations. An interactive display can support many possible queries and investigations at multiple levels of detail.
*   **Images are generally better than numbers** for combining multi-dimensional information into an easily understandable form, and for extracting and emphasising important details.

A classic example illustrating why detailed visualisation is crucial is **Anscombe's Quartet**. This suite of four datasets has identical simple statistical properties (mean, variance, correlation, linear regression lines), but when visually inspected as scatterplots, their structures are immediately obvious and vastly different. This highlights that a single summary often oversimplifies and hides the true structure of data.

### Basic Steps in Building a Data Visualisation
The general steps involved in building a data visualisation include:
*   **Getting data**.
*   **Evaluating data**.
*   **Composing data into useful sets** (building the visualisation).
*   **Reducing data clutter**.
*   **Designing** the visualisation.
*   **Adding user interaction**.

## The Analysis Framework

The book presents a unified **analysis framework** for understanding and designing visualisations, built around **four nested levels of design** and **three fundamental questions**.

### Four Levels of Design
The four nested levels of vis design are:
1.  **Domain Situation:** This top level describes the **specific context of use**, including the target users, their field of interest, their questions, and their data. The outcome at this level is the designer's understanding of the user's needs, often gathered through interviews and observations.
2.  **Task and Data Abstraction:** This level involves **translating the specific domain questions and data into a generic, domain-independent vocabulary** of visualisation. It answers the "why" (task abstraction) and "what" (data abstraction) questions. This often involves **transforming the original data into a new, more suitable form**, rather than just using it as given.
3.  **Visual Encoding and Interaction Idiom:** At this level, the designer decides **how to create and manipulate the visual representation** of the abstract data. An **idiom** is a distinct approach to visual representation. This includes the **visual encoding idiom** (how data is drawn) and the **interaction idiom** (how users manipulate what they see).
4.  **Algorithm:** The innermost level involves the **detailed procedure that allows a computer to efficiently carry out the chosen visual encoding and interaction idioms**. Different algorithms can instantiate the same idiom, with considerations for speed, memory, and accuracy.

### Three Questions
The analysis framework also uses three questions, which correspond to the answers provided by the abstraction and idiom levels:
*   **What?** (Data Abstraction).
*   **Why?** (Task Abstraction).
*   **How?** (Visual Encoding and Interaction Idiom).

## What: Data Abstraction

The design of a visualisation system is heavily influenced by the **kind of data available and its real-world meaning**. To effectively design, one needs to understand both the **semantics** (real-world meaning) and the **types** of data.

### Five Basic Data Types
The framework identifies five fundamental data types:
*   **Items:** Individual entities (e.g., a row in a table, a person, a stock).
*   **Attributes (Variables/Data Dimensions):** Specific properties that can be measured, observed, or logged (e.g., salary, temperature, product ID).
*   **Links:** Relationships between items, typically within a network.
*   **Positions:** Spatial data, providing a location in 2D or 3D space (e.g., latitude-longitude, medical scanner coordinates).
*   **Grids:** Specify how continuous data is sampled, including geometric and topological relationships between cells.

### Dataset Types
Datasets are collections of information, often combinations of the basic data types:
*   **Tables:** Structured with rows (items) and columns (attributes). Can be simple (flat) or multidimensional (multiple keys).
*   **Networks and Trees:** Represent relationships between nodes (items) through links. Trees are a special case of networks with a hierarchical structure (no cycles).
*   **Fields (Continuous):** Contain attribute values from a continuous domain, often sampled on a grid. **Spatial fields** are based on sampling at spatial positions (e.g., temperature across a region). **Scientific visualisation (SciVis)** often deals with spatial fields.
*   **Geometry (Spatial):** Specifies shape information with explicit spatial positions. These datasets are intrinsically spatial and often relate to tasks involving shape understanding (e.g., geographic data).

### Attribute Types
Attributes are categorised based on their inherent properties:
*   **Categorical (Nominal/Qualitative):** Data without an implicit ordering (e.g., gender, hair colour, car brands).
*   **Ordered (Ordinal):** Data with a defined ordering, but arithmetic operations are not meaningful (e.g., age bracket, economic status: low, medium, high).
*   **Quantitative:** Measurements of magnitude that support arithmetic comparison (e.g., currency, voltage, temperature).

Ordered data can also be further classified by their ordering direction: **Sequential** (minimum to maximum), **Diverging** (from a central zero point), or **Cyclic** (values wrap around, like time of day).

## Why: Task Abstraction

The "why" question in the analysis framework focuses on **the user's goals when using a visualisation tool**. Abstracting tasks from domain-specific language into a generic form helps in comparing and reasoning about different user needs.

Task abstraction defines user goals in terms of **actions** and **targets**.

### High-Level Actions (Analyse)
At the highest level, users' goals are categorised as either **consuming** existing information or **producing** new information:

*   **Consume:** The user is absorbing information already generated.
    *   **Discover:** Finding new, unknown knowledge, often involving generating or verifying hypotheses (e.g., scientific exploration).
    *   **Present:** Communicating specific, already understood information to an audience, telling a story with data (e.g., news infographics).
    *   **Enjoy:** Casual engagement driven by curiosity, not a pressing need (e.g., Name Voyager).

*   **Produce:** The user's intent is to generate new material.
    *   **Annotate:** Adding graphical or textual notes to visualisation elements.
    *   **Record:** Saving or capturing visualisation elements as persistent artefacts (e.g., screenshots, interaction logs, analytical provenance).
    *   **Derive (Transform):** Producing **new data elements from existing ones**. This is a **crucial design choice**; designers should consider transforming raw data into a more useful form for the task at hand, rather than just drawing what is given.

### Mid-Level Actions (Search)
These actions describe the nature of searching for elements of interest, based on whether the **target (identity)** and **location** are known:

*   **Lookup:** Both the target and its location are known.
*   **Locate:** The target is known, but its location is unknown.
*   **Browse:** The location is known, but the target is unknown.
*   **Explore:** Neither the target nor its location is known.

### Low-Level Actions (Query)
Once targets are found, users can query them at three scopes:

*   **Identify:** Focus on a **single target** to return its characteristics or specific references.
*   **Compare:** Focus on **multiple targets** to assess their differences or similarities.
*   **Summarise (Overview):** Focus on **all possible targets** to provide a comprehensive view or statistical summary.

## How: Marks and Channels

The "how" question addresses **visual encoding** – the specific way data is visually represented. The core building blocks for visual encoding are **marks** and **channels**.

### Marks
**Marks are basic geometric elements** that depict items or links. They are classified by their spatial dimensions:
*   **Points (0D):** For individual items.
*   **Lines (1D):** For individual items or **connection marks** (showing pairwise relationships, like edges in a network).
*   **Areas (2D):** For individual items or **containment marks** (showing hierarchical relationships through nesting, like in treemaps).

### Channels
**Channels are ways to control the appearance of marks**, independent of their geometric dimensionality. Examples include colour, size, angle, shape, and motion. Channels can be used to redundantly encode the same attribute or to encode different attributes (bivariate/multivariate encoding).

Two key principles guide the use of channels in visual encoding:
*   **Expressiveness Principle:** The visual encoding should express **all and only** the information in the dataset attributes. Ordered data should be shown in a way that is perceptually ordered, and unordered data should not imply an ordering.
*   **Effectiveness Principle:** The importance of an attribute should **match the salience (noticeability)** of the channel used to encode it. More important attributes should use more effective channels.

### Channel Rankings (Effectiveness)
Channels are ranked by their effectiveness for encoding different types of data:
*   **Magnitude Channels (for Ordered Data - e.g., Quantitative, Ordinal)**:
    1.  **Position on common scale (most effective)**.
    2.  Position on unaligned scale.
    3.  Length (1D size).
    4.  Tilt/angle.
    5.  Area (2D size).
    6.  Depth (3D position).
    7.  Color luminance.
    8.  Color saturation.
    9.  Curvature.
    10. Volume (3D size).

*   **Identity Channels (for Categorical Data)**:
    1.  **Spatial region (most effective)**.
    2.  Color hue.
    3.  Motion.
    4.  Shape.

**Spatial position channels (planar position) are the most crucial visual encoding choice** as they dominate the user's mental model of the dataset.

### Factors for Channel Effectiveness
*   **Accuracy:** How precisely humans can perceive differences using a given channel. For example, **length judgements (bar charts) are generally more accurate than angle judgements (pie charts) or area judgements**. Our perceptual system largely operates with relative judgements rather than absolute ones.
*   **Discriminability:** The number of distinct bins or steps perceivable for a channel. Some channels, like linewidth or colour luminance, have a very limited number of discriminable steps (e.g., typically less than five for grayscale when the background is not uniform).
*   **Separability:** Whether different visual channels are perceived independently (separable) or blend together (integral). For instance, position and hue are separable, allowing selective attention to one channel, while width and height of an object are integral, perceived as a single area.
*   **Popout:** The phenomenon where a distinct item immediately stands out from many others. Channels like **color, size, and motion** can create powerful visual popout effects, making selected items highly salient.

***