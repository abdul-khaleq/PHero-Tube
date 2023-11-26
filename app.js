const allCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("sort-by-views").addEventListener('click', function () {
        data.data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
        displayALl(data.data);
      });
      data.data.length ? displayALl(data.data) : noDataFound()
      // displayALl(data.data);
    });
}
allCategory(1000);
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => categories(data.data))
}
loadCategories();

const categories = (data) => {
  let categories = document.getElementById("categories");
  data.forEach((category) => {
    const btn = document.createElement("button");
    btn.innerText = category.category;
    let id = category.category_id;
    btn.addEventListener('click', (e) => {
      allCategory(id);

      var active = document.querySelector(".active");
      if (active !== null) {
        active.classList.remove("active");
      }
      e.target.className = "active";

    })
    categories.appendChild(btn);
  });
}

// const allCategory = (id) => {
//   fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
//     .then((res) => res.json())
//     // .then((data) => displayALl(data.data));
//     .then((data) => data.data.length ? displayALl(data.data) : noDataFound());
// };

// function sortByViews(data) {
//   data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
// }



const noDataFound = () => {
  const showCtegory = document.getElementById("show-category");
  showCtegory.classList.remove("row-cols-md-4");
  showCtegory.innerHTML = "";
  const div = document.createElement("div");
  // showCtegory.classList.add("data-not-found");
  div.innerHTML = `
    <div class="d-flex justify-content-center align-items-center text-center h-100">
    <div class="my-5 py-5">
    <img src="./images/Icon.png" alt="">
    <h3>Oops!! Sorry, There is no content here</h3></div>
    </div>
    `;
  showCtegory.appendChild(div);
}
function secondsToHourMin(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);

  var hDisplay = h > 0 ? h + (" hrs ") : "";
  var mDisplay = m > 0 ? m + (" min ago") : "";
  return hDisplay + mDisplay;
}
const displayALl = (data) => {

  const showCtegory = document.getElementById("show-category");
  showCtegory.classList.add("row-cols-md-4");
  showCtegory.innerHTML = "";
  data.forEach((category) => {
    const col = document.createElement("div");
    col.classList.add("col")
    col.innerHTML = `
        <div class="card h-100 border-0">
          <div class="position-relative">
            <img src=${category.thumbnail} class="card-img-top" alt="...">
            <span class="text-bg-dark p-1 m-2 rounded position-absolute bottom-0 end-0">${secondsToHourMin(category.others.posted_date)}</span>
          </div>
          <div class="card-body row">
            <div class="col-3">
              <img src=${category.authors[0].profile_picture} class="img-fluid rounded-circle" alt="...">
            </div>
            <div class="col-9">
              <h5 class="card-title">${category.title}</h5>
              <p class="card-text">${category.authors[0].profile_name} ${category.authors[0].verified ? '<i class="fa-solid fa-certificate ms-2 text-info"></i>' : ""}</p>
              <small class="text-body-secondary">${category.others.views}</small>
            </div>
          </div>
        </div>
    `;
    showCtegory.appendChild(col);
  });
}
