function customRender(reactElement, container){
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.childNode
    domElement.setAttribute("href", reactElement.props.href)
    domElement.setAttribute("target", reactElement.props.target)

    container.appendChild(domElement)
}


const reactElement = {
    type: 'a',
    props:{
        href: 'https://www.example.com',
        target: "_blank"
    },
    childNode: "This is 'A' tag."
}

customRender(reactElement, document.getElementById("root"))

