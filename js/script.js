const recipes = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "utama",
    image: "img/nasgor.jpg",
    desc: "Nasi goreng khas Indonesia",
    ingredients: ["Nasi", "Telur", "Kecap", "Bawang"],
    steps: ["Panaskan minyak", "Masukkan bahan", "Aduk rata"]
  },
  {
    id: 2,
    name: "Salad Buah",
    category: "pembuka",
    image: "img/salad.jpg",
    desc: "Salad segar dan sehat",
    ingredients: ["Apel", "Anggur", "Mayones"],
    steps: ["Potong buah", "Campur saus", "Sajikan"]
  },
  {
    id: 3,
    name: "Pancake",
    category: "penutup",
    image: "img/pancake.jpg",
    desc: "Makanan manis untuk dessert",
    ingredients: ["Tepung", "Telur", "Susu"],
    steps: ["Campur bahan", "Masak di teflon", "Sajikan"]
  },
  {
    id: 4,
    name: "Soto Ayam",
    category: "utama",
    image: "img/soto.jpg",
    desc: "Soto ayam hangat dan gurih",
    ingredients: ["Ayam", "Kunyit", "Daun salam"],
    steps: ["Rebus ayam", "Masukkan bumbu", "Sajikan"]
  }
];

const list = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const modal = document.getElementById("modal");

function displayRecipes(data) {
  if (data.length === 0) {
    list.innerHTML = "<p>Tidak ada resep ditemukan</p>";
    return;
  }

  list.innerHTML = data.map(r => `
    <div class="card">
      <img src="${r.image}" alt="${r.name}">
      <div class="card-content">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
        <button onclick="showDetail(${r.id})">Lihat Detail</button>
      </div>
    </div>
  `).join("");
}

function showDetail(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;

  document.getElementById("detail-img").src = r.image;
  document.getElementById("detail-title").textContent = r.name;
  document.getElementById("detail-desc").textContent = r.desc;

  document.getElementById("detail-ingredients").innerHTML =
    r.ingredients.map(i => `<li>${i}</li>`).join("");

  document.getElementById("detail-steps").innerHTML =
    r.steps.map(s => `<li>${s}</li>`).join("");

  modal.classList.remove("hidden");
}

document.getElementById("close").onclick = () => {
  modal.classList.add("hidden");
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
};

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

let timeout;
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(filterData, 300);
});

filter.addEventListener("change", filterData);

displayRecipes(recipes);