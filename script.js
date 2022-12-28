const box = document.querySelector(".container");

const getCats = function () {
  fetch("https://sb-cats.herokuapp.com/api/2/alien/show")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.data.forEach((el) => {
        let card = `
                    <div
                        class="card">
                        <img class="cat_img" src=${el.img_link} alt="фото кота">
                        <h4>${el.name}</h4>
                    </div>
                `;
        box.innerHTML += card;
      });
    });
};
getCats();

const form = document.forms.addCat;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = {};
  for (let i = 0; i < form.elements.length; i++) {
    const el = form.elements[i];
    if (el.name && el.value) {
      body[el.name] = el.value;
    }
  }
  console.log(body);
  fetch("https://sb-cats.herokuapp.com/api/2/alien/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ok") {
        box.innerHTML = "";
        getCats();
      }
    });
});
const openPopUp = document.getElementById("open_pop_up");
const closePopUp = document.getElementById("pop_up_close");
const popUp = document.getElementById("pop_up");

openPopUp.addEventListener("click", function (e) {
  e.preventDefault();
  popUp.classList.add("active");
});
closePopUp.addEventListener("click", () => {
  popUp.classList.remove("active");
});