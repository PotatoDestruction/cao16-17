const fetchCars = async () => {
    const res = await fetch(`http://localhost:8080/cars`);

    const cars = await res.json();

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    document.body.append(mainContainer)

   let serverElement = document.querySelector(".server")
   serverElement.textContent = ""

    cars.forEach(car => {
      let carContainer = document.createElement("div");
      carContainer.classList.add("carContainer")

      let carContainerTitle = document.createElement("div");
      carContainerTitle.classList.add("carContainerTitle")
      let plateNumber = document.createElement("h2");
      let title = document.createElement("p");
    

      let carContainerImageWrap = document.createElement("div");
      carContainerImageWrap.classList.add("imageWrap")
      let carContainerImage = document.createElement("img");

      let carContainerDelete = document.createElement("div");
      carContainerDelete.classList.add("deleteContainer")
      let deleteCarElement = document.createElement("p");

      mainContainer.append(carContainer)
      carContainer.append(carContainerTitle, carContainerImageWrap,carContainerDelete)
      carContainerDelete.append(deleteCarElement)
      carContainerImageWrap.append(carContainerImage)
      carContainerTitle.append(plateNumber, title)


      plateNumber.textContent = car.numberplates
      title.textContent = car.title

      carContainerImage.src = car.image

      deleteCarElement.textContent = "Delete"

        carContainerDelete.addEventListener("click", () => {
            const deleteCar = async () => {
                await fetch(`http://localhost:8080/cars/${car.id}`, {
                    method: 'DELETE'
                });
            }
            console.log(car)
            deleteCar();
            carContainer.remove();
        })
        

    })

};

fetchCars()