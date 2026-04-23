const recipes = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "utama",
    image: "https://source.unsplash.com/400x300/?fried-rice",
    desc: "Nasi goreng khas Indonesia",
    ingredients: ["Nasi", "Telur", "Kecap", "Bawang"],
    steps: ["Panaskan minyak", "Masukkan bahan", "Aduk rata"]
  },
  {
    id: 2,
    name: "Salad Buah",
    category: "pembuka",
    image: "https://source.unsplash.com/400x300/?fruit-salad",
    desc: "Salad segar dan sehat",
    ingredients: ["Apel", "Anggur", "Mayones"],
    steps: ["Potong buah", "Campur saus", "Sajikan"]
  },
  {
    id: 3,
    name: "Pancake",
    category: "penutup",
    image: "https://source.unsplash.com/400x300/?pancake",
    desc: "Makanan manis untuk dessert",
    ingredients: ["Tepung", "Telur", "Susu"],
    steps: ["Campur bahan", "Masak di teflon", "Sajikan"]
  }
];

const list = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");

function displayRecipes(data) {
  list.innerHTML = "";
  data.forEach(r => {
    list.innerHTML += `
      <div class="card">
        <img src="${r.image}">
        <div class="card-content">
          <h3>${r.name}</h3>
          <p>${r.desc}</p>
          <button onclick="showDetail(${r.id})">Lihat Detail</button>
        </div>
      </div>
    `;
  });
}

function showDetail(id) {
  const r = recipes.find(x => x.id === id);

  document.getElementById("detail-img").src = r.image;
  document.getElementById("detail-title").innerText = r.name;
  document.getElementById("detail-desc").innerText = r.desc;

  document.getElementById("detail-ingredients").innerHTML =
    r.ingredients.map(i => `<li>${i}</li>`).join("");

  document.getElementById("detail-steps").innerHTML =
    r.steps.map(s => `<li>${s}</li>`).join("");

  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("close").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};

searchInput.addEventListener("input", filterData);
filter.addEventListener("change", filterData);

function filterData() {
  const search = searchInput.value.toLowerCase();
  const category = filter.value;

  const filtered = recipes.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(search) ||
      r.ingredients.join(" ").toLowerCase().includes(search);

    const matchCategory =
      category === "all" || r.category === category;

    return matchSearch && matchCategory;
  });

  displayRecipes(filtered);
}

// Init
displayRecipes(recipes);