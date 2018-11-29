A simple tool to plot values from stdin into your terminal.
===========================================================

This work is pretty much inspired in [cli-plot](https://github.com/Tabcorp/cli-plot), with
slightly differences internally and visually.


## How to use it

```bash
for i in {1..50}; do
  echo $RANDOM;
  sleep 1;
done

You can pipe it to generate a chart right there in your terminal.
It will push new values from the right every time they arrive on stdin.
Note: input values must be separated by a new line.

```bash
./random.sh | plot
```

![Screenshot](https://github.com/calvernaz/plt/blob/master/plot.gif)

## Arguments

- `plt -w 100`: graph width (in terminal rows)
- `plt -h 10`: graph height (in terminal rows)