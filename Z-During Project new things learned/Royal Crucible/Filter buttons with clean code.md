# Filter buttons

- Here i apply filter option with minimal and clean code for Gallery.

```js
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={fadeUp}
  viewport={{ once: true, amount: 0.2 }}
>
  <Box
    flexWrap={"wrap"}
    component="ul"
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "40px",
      padding: 0,
      listStyle: "none",
      "& .MuiButton-root": {
        cursor: "pointer",
        color: "#bbb",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "8px 15px",
        borderRadius: "5px",
        transition: "all 0.3s ease",
        "&.filter-active, &:hover": {
          color: "#e3a127",
          backgroundColor: "#2d2d2d",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "1.2rem",
        },
      },
    }}
  >
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid item>
        <Button
          component="li"
          className={filter === "*" ? "filter-active" : ""}
          onClick={() => handleFilter("*")}
        >
          <GridViewIcon /> All Projects
        </Button>
      </Grid>
      <Grid item>
        <Button
          component="li"
          className={filter === "UI/UX Design" ? "filter-active" : ""}
          onClick={() => handleFilter("UI/UX Design")}
        >
          <PhoneAndroidIcon /> UI/UX
        </Button>
      </Grid>
      <Grid item>
        <Button
          component="li"
          className={filter === "Development" ? "filter-active" : ""}
          onClick={() => handleFilter("Development")}
        >
          <CodeIcon /> Development
        </Button>
      </Grid>
      <Grid item>
        <Button
          component="li"
          className={filter === "Photography" ? "filter-active" : ""}
          onClick={() => handleFilter("Photography")}
        >
          <CameraAltIcon /> Photography
        </Button>
      </Grid>
      <Grid item>
        <Button
          component="li"
          className={filter === "Marketing" ? "filter-active" : ""}
          onClick={() => handleFilter("Marketing")}
        >
          <BarChartIcon /> Marketing
        </Button>
      </Grid>
    </Grid>
  </Box>
</motion.div>
```

```SCSS
.gallery-filters {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    padding: 0;
    list-style: none;

    li {
      cursor: pointer;
      color: #bbb;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 15px;
      border-radius: 5px;
      transition: all 0.3s ease;

      &.filter-active,
      &:hover {
        color: #e3a127;
        background-color: #2d2d2d;
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
```
