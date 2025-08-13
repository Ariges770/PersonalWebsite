# ETC3550 A1
Ari Gestetner - 33966753

## Question 1

<details class="code-fold">
<summary>Code</summary>

``` r
retail |> autoplot(Turnover, color=plot_colour) +
  labs(title = "Time Series Plot of Retail Data")
```

</details>

![](assignment_1_files/figure-commonmark/unnamed-chunk-2-1.png)

Looking at the plot we can notice a somewhat exponential positive
trend.  
Additionally, we can note some multiplicitive seasonal patterns.  
We can also see some indications of cyclical patterns where there
appears to be a drop in the late 1980’s. Additionally, we can see what
appears to be a drop in the late 2000’s (likely around the 2008 GFC) and
another fall in the early 2020’s (likely due to Covid).

## Question 2

<details class="code-fold">
<summary>Code</summary>

``` r
retail |> gg_season(Turnover, labels = "left")
```

</details>

![](assignment_1_files/figure-commonmark/unnamed-chunk-3-1.png)

By plotting the data with the `gg_season` function we can note some
features of the data.  
Specifically, we are able to notice that as the years increment, so does
the data increase (indicating a positive trend). Furthermore, we can
notice how there is an increase in sales by December and January,
however, there is then a drop in sales during the month of Febuary.  
Additionally, we can note that there are some years with a significant
drop in sales, however, the plot is too clutered to investigate specific
years. Therefore, we will split the data into $2$ years, before and
after the year $2000$

<details class="code-fold">
<summary>Code</summary>

``` r
retail |> 
  filter(Month < yearmonth("Jan 2000")) |>
  gg_season(Turnover) +
  labs(title = "Seasonal plots from before January 2000")
```

</details>

![Prior to Jan
2000](assignment_1_files/figure-commonmark/unnamed-chunk-4-1.png)

<details class="code-fold">
<summary>Code</summary>

``` r
retail |> 
  filter(Month >= yearmonth("Jan 2000")) |>
  gg_season(Turnover) +
  labs(title = "Seasonal plots from after January 2000")
```

</details>

![Post Jan
2000](assignment_1_files/figure-commonmark/unnamed-chunk-4-2.png)

In the first plot we can see a significant drop in the late 1980’s
(Green line) around the end of the year. Furthermore, in the second plot
we can see another significant dip in 2020 (Purple line) which is also
around the time of the covid outbreak.  
Nevertheless, there doesn’t appear to be any significant drops in the
late 2000’s despite what it looked like in the `autoplot` plot.  
Ultimatly, these drops and recoveries are part of the cyclical behaviour
of this data.

## Question 3

<details class="code-fold">
<summary>Code</summary>

``` r
retail |> 
  gg_subseries(Turnover, color=plot_colour) +
  labs(title = "Subseries plot for retail data")
```

</details>

![](assignment_1_files/figure-commonmark/unnamed-chunk-5-1.png)

Taking a look at the `gg_subseries` plot we can note some features which
were hidden in the other 2 plots.  
First, we can notice how there is a dip in the late 2000’s over every
month which is possibly the reason it wasn’t so obvious in the
`gg_season` plot.  
Furthermore, we are also able to notice the how the drop due to covid is
extreme druing the months of March to June. However, after June the drop
seems minimal compared to the earlier months.  
Nevertheless, we can also see some common features with the other 2
plots, mainly the seasonal pattern with the increase in December and
January and the slight dip in Febuary. As well, we can see the strong
trend in the data which exists in every month.

## Question 4

To find a good $\lambda$ value for the Box Cox transformation, we will
first plot the data with $\lambda = 0$ (log transformation) and
$\lambda = 1$ (original data)

<details class="code-fold">
<summary>Code</summary>

``` r
lambda <- 0
retail |> autoplot(box_cox(Turnover, lambda), color = plot_colour) +
  labs(title = glue::glue("Retail Turnover with Box Cox with lambda = {round(lambda, 2)}"), y = glue::glue("box_cox(Turnover, lambda = {round(lambda, 2)})"))
```

</details>

![lambda =
0](assignment_1_files/figure-commonmark/unnamed-chunk-6-1.png)

<details class="code-fold">
<summary>Code</summary>

``` r
lambda <- 1
retail |> autoplot(box_cox(Turnover, lambda), color = plot_colour) +
  labs(title = glue::glue("Retail Turnover with Box Cox with lambda = {round(lambda, 2)}"), y = glue::glue("box_cox(Turnover, lambda = {round(lambda, 2)})"))
```

</details>

![lambda =
1](assignment_1_files/figure-commonmark/unnamed-chunk-6-2.png)

Firstly, we are able to see that the variation clearly looks
multiplicative with the identity transformation. Furthermore, We can see
here that the $\lambda = 0$ transformation is pretty good. however,
there is a bit of variation in the seasonality in the middle of the data
period.  
Now we will use the Guerrero feature and see if it beats the log
function.

<details class="code-fold">
<summary>Code</summary>

``` r
# Attempt guerro first
lambda <- retail |> 
  features(Turnover, features = guerrero) |>
  pull(lambda_guerrero)
retail |> autoplot(box_cox(Turnover, lambda), color = plot_colour) +
  labs(title = glue::glue("Retail Turnover with Box Cox with lambda = {round(lambda, 2)} using Guerrero"), y = glue::glue("box_cox(Turnover, lambda = {round(lambda, 2)})"))
```

</details>

![](assignment_1_files/figure-commonmark/unnamed-chunk-7-1.png)

We can see here that the Guerrero feature doesn’t improve on
$\lambda = 0$, thus we will just use $\lambda = 0$ as it is the simple
log transformation.

## Question 5

<details class="code-fold">
<summary>Code</summary>

``` r
lambda = 0
retail |>
  model(STL(box_cox(Turnover, lambda) ~ season(window = 9) +
    trend(window = 7), robust = TRUE)) |>
  components() |>
  autoplot(color=plot_colour) + labs(title = "STL Decomposition: US retail employment")
```

</details>

![](assignment_1_files/figure-commonmark/unnamed-chunk-8-1.png)

While some seasonality remains in the remainder, we can see some regular
features of the data, such as positive trend and some cyclical
patterns.  
There is one particular feature which stands out in the STL
Decomposition, that is how the seasonality changes as the years
progress. As in in up untill around 2010, we can see that the
December/January increase in sales was much more significant than since
2010. This can be seen by how the peaks seem to be “fatter” in the later
years, whereas, they are a lot narrower in the earlier years. This may
be due to internet shopping which helps consumers make easy purchases at
all times of the year.
