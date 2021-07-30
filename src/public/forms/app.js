const element = document.getElementsByTagName("div")[0],
blockElement = element => {
    element.innerHTML === "" ? element.style.display = "none" : element.style.display = "block"
};
blockElement(element)