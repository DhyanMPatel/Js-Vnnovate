# Here I used Swiper for Testimonial

- Testimonial automatically slide in certain time period with Framer motion.

```js

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


<motion.div
  className="testimonial-section"
  initial="hidden"
  whileInView="visible"
  variants={fadeUp}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
  <Grid container spacing={5} className="testimonial-grid">
    <Grid item xs={12} lg={4}>
      <motion.div
        className="testimonial-intro"
        initial="hidden"
        whileInView="visible"
        variants={fadeRight}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Typography variant="h3" component="h3">
          Our Clients Speak Highly
        </Typography>
        <Typography variant="body1" component="p">
          Hear directly from those who have experienced the impact of our
          partnership and achieved their strategic goals.
        </Typography>
        <Box className="swiper-nav-buttons">
          <Button className="btn slider-prev">
            <ChevronLeftIcon className="" />
          </Button>
          <Button className="btn slider-next">
            <ChevronRightIcon className="" />
          </Button>
        </Box>
      </motion.div>
    </Grid>
    <Grid item xs={12} lg={8} className="testimonial-slider">
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={fadeLeft}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          <SwiperSlide>
            <Box className="testimonial-item">
              <Box className="rating mb-3">
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              </Box>
              <Typography variant="body1" component="p">
                "Their strategic vision and unwavering commitment to results
                provided exceptional value. Our operational efficiency has
                significantly improved."
              </Typography>
              <Box className="client-info mt-4">
                <img
                  src={person1Img}
                  className="client-img"
                  alt="Client"
                  loading="lazy"
                />
                <Box>
                  <Typography variant="h6" component="h6" mb={0}>
                    Eleanor Vance
                  </Typography>
                  <Typography variant="body2" component="span">
                    Operations Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="testimonial-item">
              <Box className="rating mb-3">
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              </Box>
              <Typography variant="body1" component="p">
                "Their strategic vision and unwavering commitment to results
                provided exceptional value. Our operational efficiency has
                significantly improved."
              </Typography>
              <Box className="client-info mt-4">
                <img
                  src={person1Img}
                  className="client-img"
                  alt="Client"
                  loading="lazy"
                />
                <Box>
                  <Typography variant="h6" component="h6" mb={0}>
                    Eleanor Vance
                  </Typography>
                  <Typography variant="body2" component="span">
                    Operations Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="testimonial-item">
              <Box className="rating mb-3">
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              </Box>
              <Typography variant="body1" component="p">
                "Their strategic vision and unwavering commitment to results
                provided exceptional value. Our operational efficiency has
                significantly improved."
              </Typography>
              <Box className="client-info mt-4">
                <img
                  src={person1Img}
                  className="client-img"
                  alt="Client"
                  loading="lazy"
                />
                <Box>
                  <Typography variant="h6" component="h6" mb={0}>
                    Eleanor Vance
                  </Typography>
                  <Typography variant="body2" component="span">
                    Operations Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </Grid>
  </Grid>
</motion.div>
```
