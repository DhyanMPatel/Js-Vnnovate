# Infinite Animation using CSS

- Use `@keyframes` to create infinite animation.

    ```css
    .hero .visual-content .fluid-shape .fluid-img {
    width: 100%;
    height: 100%;
    background: transparent;
    animation: float 6s easy-in-out infinite; <!-- This is use to give infinite `animation` -->
    }

    @keyframes float {  <!-- @keyframes provide logic for animation -->
    0%{
        transform: translateY(0px);
    }
    50%  {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
    }
    ```