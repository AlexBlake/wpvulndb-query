# wpvulndb-query
Quick nodejs solution to checking vulnerabilities listed on wpvulndb.com, useful for maintaining your own small sites, this DB of vulnerabilities is great.
Check them out at https://wpvulndb.com/

# Usage
Just run the following command and it will call each line in the plugins.txt file as a query to the wpvulndb API
``` js
    node index.js
```
Output is saved as JSON in the `output/` folder marked with dateTime stamp on name.

# ToDo's
- Add main WP vulnerability checks
- Add theme checking
- Add ability to place versions in input files & remove non relevant results for those versions
- Add ability to pass input file(s) as argument(s) (usefull maybe?)