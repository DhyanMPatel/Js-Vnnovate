# Hover effect in image

- Here i implement hover effect in image when user hover on any perticular image then 2 buttons comes from bottom to top and that will redirect to another page or data.

```js
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={fadeUp}
  viewport={{ once: true, amount: 0.2 }}
  style={{ marginTop: "40px" }}
>
  <Grid container spacing={2} className="isotope-container">
    {filteredItems.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={item.id}>
        <motion.div
          className={`isotope-item ${item.category}`}
          initial="hidden"
          whileInView="visible"
          variants={zoomIn}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="gallery-card">
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              className="gallery-img"
            />

            <Box className="gallery-overlay">
              <Typography variant="body2" color="orange">
                {item.meta}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  className="expand-btn"
                  onClick={() => handleView(item)}
                >
                  <OpenInFullIcon />
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className="detail-btn"
                  href={item.link}
                >
                  <EastIcon />
                </Button>
              </Box>
            </Box>
          </Card>
        </motion.div>
      </Grid>
    ))}
  </Grid>
</motion.div>
```

```SCSS
.gallery .isotope-container .gallery-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}
.gallery .isotope-container .gallery-card .gallery-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.gallery .isotope-container .gallery-card .gallery-overlay {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease, bottom 0.5s ease;

  &:hover {
    opacity: 1;
    bottom: 0;
  }
}
```
