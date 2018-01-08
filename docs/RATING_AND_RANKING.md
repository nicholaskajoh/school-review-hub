# Rating and Ranking Spec
In SRH, a user rates 2 schools by comparing them to each other under a number of criteria. Say we have the following criteria:

- Serene environment for learning
- Notable alumni
- Science & technology infrastructure

If Ada compares LASU and UI, she may choose LASU as the best under _Serene environment for learning_ and _Science & technology infrastructure_ and UI as the best under _Notable alumni_. This implies that under her rating, LASU scores 2 and UI scores 1.

Ade may carry out his own rating of LASU against UI resulting in 0 for LASU and 3 for UI.

Say Bola rates LASU and UI too, the results may yield 1 for LASU and 2 for UI.

Then again, Ada may rate UI against ABU resulting in 2 for UI and 1 for ABU.

---

We can combine the rating scores of LASU and UI against each other to see which ranks higher:

```
lasu = 2 + 0 + 1 # equals 3
ui = 1 + 3 + 2 # equals 6
```

UI ranks higher as can be seen from the figures above.

It makes sense to normalize the cumulative rating as the number of criteria and number of raters may change with time.

We can use fractional rating scores where the denominator is the number of criteria like so:

```
lasu = 2/3 + 0/3 + 1/3 # equals 1
ui = 1/3 + 3/3 + 2/3 # equals 2
```

Next we divide by the number of raters:
```
lasu = (2/3 + 0/3 + 1/3) / 3 # equals 1/3
ui = (1/3 + 3/3 + 2/3) / 3 # equals 2/3
```

The total rating for UI (for example) is the sum of all the ratings of UI against other schools. For instance:

```
ui_lasu = 1/2
ui_abu = 1/3
ui_unn = 4/5
ui_cu = 8/15
ui_total = 2.166666667
```

Dividing by the number of schools compared against, we arrive at a share, representative of the percentage each school scores in relation to the others:
```
ui_share = 2.166666667/4 # equals 0.54166666675
```

Multiplying by 1000 (arbitrary) and approximating to arrive at a more friendly figure, we derive the ranting of UI like so:
```
rating = 0.54166666675 x 1000 # equals 542
```

---

Schools are ranked by their rating. The school with the highest rating is ranked number 1. The second highest is ranked number 2 and so on.