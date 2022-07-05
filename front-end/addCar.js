const addCar = async (car) =>{
    await fetch(`http://localhost:8080/cars`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(car)
    })
}



document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()

    let title = document.getElementById("title").value;
    let image = document.getElementById("image").value;
    let price = document.getElementById("price").value;
    let numberplates = document.getElementById("numberplates").value;

    let carObject = {
        title: title,
        image: image,
        price: Number(price),
        numberplates: numberplates.toUpperCase()
    }

    console.log(carObject)
    addCar(carObject)

    document.querySelector("form").reset();

    let message = document.getElementById("message")
    message.textContent = "Car succesfuly added!"
    message.style.color = "green"
    message.style.fontSize = "30px"


    setTimeout(() => message.textContent = "", 5000);

})





    

