import { shadowGenerate } from "./utils.js";
import UIwrapper from "./classes/UIClass.js";
import GetData from "./classes/GetDataFromApiClass.js";
const luminate = 0.15;
const URL_POKEMON = new URL("https://pokeapi.co/api/v2/pokemon/");
const URL_GENERATION = new URL("https://pokeapi.co/api/v2/generation/");
const uiwrapper = new UIwrapper("");

document.documentElement.style.setProperty(
  "--ligth-shadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--bg-wrapper"),
    luminate
  )
);
document.documentElement.style.setProperty(
  "--dark-shadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--bg-wrapper"),
    -luminate
  )
);
document.documentElement.style.setProperty(
  "--blue-Lshadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--blue-color"),
    luminate
  )
);
document.documentElement.style.setProperty(
  "--blue-Dshadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--blue-color"),
    -luminate
  )
);
document.documentElement.style.setProperty(
  "--yellow-Lshadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--yellow-color"),
    luminate
  )
);
document.documentElement.style.setProperty(
  "--yellow-Dshadow",
  shadowGenerate(
    document.documentElement.style.getPropertyValue("--yellow-color"),
    -luminate
  )
);

(function () {
  let nro = Math.floor(Math.random() * 905);
  let card = GetData.getDataOne(URL_POKEMON + nro.toString()).then(
    (elem) =>
      (document.getElementById("cardHeader").innerHTML =
        elem.renderCard("pokeHeader"))
  );
  setInterval(() => {
    nro = Math.floor(Math.random() * 905);
    card = GetData.getDataOne(URL_POKEMON + nro.toString()).then(
    (elem) =>
        (document.getElementById("cardHeader").innerHTML =
            elem.renderCard("pokeHeader"))
    );
  }, 8000);
})();

(async function changeRegion(url) {
    uiwrapper.setDataPoke = await GetData.getDataAll(url);
    uiwrapper.filterChain();

    document.getElementById("region").addEventListener("change", function () {
        if (this.value === "") {
            changeRegion(URL_POKEMON + "?offset=0&limit=905");
            return;
        }
        changeRegion(URL_GENERATION + this.value);
        uiwrapper.resetPage();
    });  
})(URL_GENERATION + "1");

document.getElementById("search").addEventListener("input", function () {
  uiwrapper.filterKeys.searchKey = this.value;
  uiwrapper.filterChain();
});
document.getElementById("type").addEventListener("change", function () {
  uiwrapper.filterKeys.typeKey = this.value;
  uiwrapper.filterChain();
  
});  
document.getElementById('next')
.addEventListener('click', ()=>{
  uiwrapper.nextPage();
});
document.getElementById('prev')
.addEventListener('click', ()=>{
    uiwrapper.prevPage();
});

document.getElementById('wrapper')
.addEventListener('click', function(e){
  if (e.target.classList[0] === 'pokeCard') {
    console.log(e.target.id);
  }
})
