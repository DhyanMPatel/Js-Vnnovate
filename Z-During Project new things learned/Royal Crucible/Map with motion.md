# Map with motion

- Here i used iframe with framer motion to show map in the app.

```js
<motion.div
  className="map-section"
  initial="hidden"
  whileInView="visible"
  variants={fadeUp}
  viewport={{ once: true, amount: 0.2 }}
  style={{ marginTop: "40px" }}
  transition={{ duration: 0.5 }}
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
    width="100%"
    height="500"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</motion.div>
```
