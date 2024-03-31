
let wallet = 200000000;
let price;
let product = 1;
let productionRate = 0;
let wareHouse = 600;
let CurrWorker = 0;
let rawMade = 1000;
let tax = 0;
let playerLevel = 1;
let salary = 50;
let progressBar1Width, progressBar2Width = 50;
let Timerdifficulty = 1000;
let BankLimit,BankMax;
let countdown;

// DOM elemanlarını al
const company = document.getElementById("companyName");
const sale_price = document.getElementById("sale-price");
const sale_price2 = document.getElementById("sale-price2");
const productDisplay = document.getElementById("productDisplay");
const walletDisplay = document.getElementById("wallet");
const countdownDisplay = document.getElementById("countdown");
const PPerSec = document.getElementById("PPerSec");
const buyButtons = document.querySelectorAll(".buy-worker");
const rawMadeDisplay = document.getElementById("rawMade");
const TotalWorkers = document.getElementById("totalWorkers");
const TaxDisplay = document.getElementById("tax");
const TaxDisplay2 = document.getElementById("TaxDisplay2");
const LevelDisplay = document.getElementById("level");
const rawMadeBar = document.getElementById("rawMadeBar");
const wareHouseBar = document.getElementById("wareHouseBar");
const salePriceBar = document.getElementById("salePriceBar");
const customRange = document.getElementById("customRange");
const AssetButtons = document.querySelectorAll('.AssetButton');
const modalTax = document.getElementById("modalTax");
const modalBank = document.getElementById("modalBank");
const modalWorker = document.getElementById("modalWorker");

function startGame() {
    const companyName = document.getElementById('companyInput').value;
    const sector = document.getElementById('sectorSelect').value;
    const difficulty = document.querySelector('input[name="difficultyRadio"]:checked').value;

  // Şirket ayarlarını kaydet
  const settings = {
    companyName: companyName,
    sector: sector,
    difficulty: difficulty
  };


  if(companyName == ""){
    company.innerText  = "Anonim şirket";
  }else{
    company.innerText = settings.companyName + " Şirketi";
  }
  
const dropdownInput = document.getElementById('sectorSelect');

dropdownInput.addEventListener('change', function() {
  const selectedValue = dropdownInput.value;

  const updatedValueSpans = document.querySelectorAll('.itemName');
  
  updatedValueSpans.forEach(function(span) {
    span.textContent = selectedValue;
  });
});

  const updatedValueSpans = document.querySelectorAll('.itemName');
  updatedValueSpans.forEach(function(span) {
    span.textContent = dropdownInput.value;
  });
  
if(settings.difficulty === "normal"){
  Timerdifficulty = 1000;
}else if(settings.difficulty === "hard"){
  Timerdifficulty = 300;
}
// Kaydedilen ayarları konsola yazdır
console.log("Zorluk Seviyesi: " + Timerdifficulty);
  
// Her saniyede ürün üretme
const productionInterval = setInterval(produce, Timerdifficulty);

  document.getElementById("startBTN").click();

}


function updateDisplays() {
  sale_price.innerText = price + " ₺";
  sale_price2.innerText = price + " ₺";
  walletDisplay.innerText = addCommas(wallet);
  productDisplay.innerText = addCommas(product);
  rawMadeDisplay.innerText = addCommas(rawMade);
  TotalWorkers.innerText = addCommas(CurrWorker);
  PPerSec.innerText = addCommas(productionRate);
  LevelDisplay.innerText = playerLevel;
}
updateDisplays()
updateTax();

function produce() {
  if (rawMade <= 50) {
    console.log("Ham madde tükendi, üretim durduruldu.");
    
  } else if(product >= wareHouse) {
    console.log("Depo doldu");
  }else{

    // Ham madde miktarı negatif olmasın, minimum 0 olarak ayarla
    rawMade = Math.max(rawMade - 5 * productionRate, 0);

    product += productionRate;
    updateRawMadeBar(rawMade-product,rawMade);
    updateWareHouseBar(product,wareHouse);
    updateDisplays();
  }
}

function updateTax(){
  if(tax == 0){
    TaxDisplay.innerText = "Güncel Borç bulunmamaktadır!";
    TaxDisplay2.innerText = "0 ₺";
  }
  else{
    TaxDisplay.innerText = tax + " ₺";
    TaxDisplay2.innerText = tax + " ₺";
  }
}

// Satışı gerçekleştir
function Sell(){
  wallet += product * price;
  console.log("Ürün satışından " + product * price +"₺ kazanıldı")
  
  switch(Timerdifficulty){
    case 1000:
      tax += product+1;
    case 300:
      tax+= product+3;
  }
  product = 0;
  updateDisplays();
  updateTax();
  
}

/* Ham madde alımı */
function buyRawAll() {
  rawMade += wallet;
  wallet = 0;
  updateDisplays();
}
function buyRawHalf() {
  rawMade += parseInt(wallet / 2);
  wallet = parseInt(wallet / 2); // Bölme işlemi sonucunu kayan noktalı sayıya dönüştür
  updateDisplays();
}

function buyRawValue() {
  let inputQuantity = parseInt(document.querySelector('#quantityInput').value);

  if (inputQuantity === "" || isNaN(inputQuantity) || inputQuantity <= 0) {
    console.log("Geçersiz miktar!");
  } else if (inputQuantity > wallet) {
    console.log("Bakiye yetersiz!");
  } else {
    rawMade += inputQuantity;
    wallet -= inputQuantity;
    console.log("Ham madde satın alındı: " + inputQuantity);
  }
}


/* Vergi ödeme modal'ı */
function PayTaxAll(){
  wallet -= tax;
  tax = 0;
  updateDisplays();
  updateTax();
  console.log("Bütün verginiz ödenmiştir!");
}

function PayTaxValue(){
  let inputQuantityTax = parseInt(document.querySelector('#quantityInputTax').value);

  if (inputQuantityTax === "" || isNaN(inputQuantityTax) || inputQuantityTax <= 0) {
    console.log("Geçersiz miktar!");
  } else if (inputQuantityTax > wallet) {
    console.log("Bakiye yetersiz!");
  } else {
    tax -= inputQuantityTax;
    wallet -= inputQuantityTax;
    updateTax();
    console.log("Kalan verginiz: " + tax);
  }
}

function TaxEvasion(){
  console.log("Vergi kaçırıldı, afiyet bal şeker!");
}

// Satış fiyatını güncelleme fonksiyonu
function updateSalePriceBar(salePriceValue, maxValue) {
  const percentage = (salePriceValue / maxValue) * 100;
  salePriceBar.style.width = percentage + "%";
}

function updateWareHouseBar(wareHouseValue, maxValue) {
  const percentage = (wareHouseValue / maxValue) * 100;
  wareHouseBar.style.width = percentage + "%";
}

function updateRawMadeBar(rawMadeValue, maxValue) {
  const percentage = (rawMadeValue / maxValue) * 100;
  rawMadeBar.style.width = percentage + "%";
}


 // İşçi al butonlarının rengini güncelleme 
 function updateButtonColors() {
  buyButtons.forEach(button => {
    const workPrice = parseInt(button.getAttribute("data-price"));

    if (wallet >= workPrice) {
      button.classList.add("greenButton"); // Yeşil stili ekle
      button.classList.remove("redButton"); // Kırmızı stili kaldır
    } else {
      button.classList.add("redButton"); // Kırmızı stili ekle
      button.classList.remove("greenButton"); // Yeşil stili kaldır
    }
  });
}

// İşçi al 
function buyWorker(workRate, workPrice) {
  productionRate += workRate;
  CurrWorker += 1;
  wallet -= workPrice;
  updateDisplays();
  console.log("Üretim hızı arttırıldı:", productionRate);
  updateButtonColors(); // Buton renklerini güncelle
}


function saveSalary() {

  value = parseInt(customRange.value);
  salary =     value;

  console.log("Çalışan memnuniyeti: %" + salary); 
  console.log("maaş kaydedildi!");

  setTimeout(function() {
    if(salary <= 30){
      console.log("Çalışanlar bütün ürünleri yakarak isyan çıkardı! Yarra Yering alkolünden ister misin?");
      Decrease_work = parseInt(CurrWorker/3);

      productionRate -= Decrease_work;
      CurrWorker -= Decrease_work;
      console.log(Decrease_work +" işçi kaybetttin!");
      updateDisplays();


    }
  }, (Math.floor(Math.random() * 5000) + 5000)); 
}

customRange.addEventListener("input", updateProgressBars);
function updateProgressBars() {
  const value = parseInt(customRange.value);

  // Rastgele bir sayı üret
  const randomPercentage = Math.random() * 10;

  if (value < 50) {
    progressBar2Width = value + randomPercentage + "%";
    progressBar1Width = (100 - value - randomPercentage) + "%";
  } 
  else {
    progressBar2Width = value - randomPercentage + "%";
    progressBar1Width = (100 - value + randomPercentage) + "%";
  }

  progressBar1.style.width = progressBar1Width;
  progressBar2.style.width = progressBar2Width; 
}




function buyWareHouse(wareRate, warePrice) {
  wareHouse += wareRate;
  wallet -= warePrice;
  updateDisplays();
  console.log("Depo kapasitesi arttırıldı:", wareHouse);
  updateButtonColors(); // Buton renklerini güncelle
}

/* Seviye - asset */
function buyAsset(AssetPrice,levelValue) {
  playerLevel += 1;
  wallet -= AssetPrice;
  updateDisplays();
  console.log(playerLevel+ " Seviye oldunuz!");
  updateButtonColors();
  
  switch (levelValue) {
    case 2:
      modalTax.innerText =  "80.000 ₺";
      modalBank.innerText = "40.000 ₺";
      modalWorker.innerText = "Usta işçi";
      break;
    case 3:
      modalTax.innerText =  "150.000 ₺";
      modalBank.innerText = "100.000 ₺";
      modalWorker.innerText = "Yönetici";
      break;
      case 4:
        modalTax.innerText =  "400.000 ₺";
        modalBank.innerText = "500.000 ₺";
        modalWorker.innerText = "Uzman yönetici";
        break;
      case 5:
        modalTax.innerText =  "--- ₺";
        modalBank.innerText = "--- ₺";
        modalWorker.innerText = "---";
        break;
  }
}


// Fiyatı güncelleme 
function updatePrice() {
  price = getRandomNumber();
  sale_price2.textContent = price + " ₺";
  sale_price.textContent = price + " ₺";
  updateSalePriceBar(price, 20);
}

// Rastgele fiyat üretme 
function getRandomNumber() {
  var randomNumber = Math.random();
  if (randomNumber < 0.7) {
    return Math.floor(Math.random() * 10) + 4; // 4 ile 13 arasında rastgele bir sayı
  } else {
    return Math.floor(Math.random() * 6) + 20; // 20 ile 25 arasında rastgele bir sayı
  }
}

// Timer başlatma
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  countdown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    display.textContent = minutes + " dakika " + seconds + " saniye";

    if (--timer < 0) {
      timer = duration;
      updatePrice();

    }
   
  }, Timerdifficulty);
}


// Oyunu başlat
window.onload = function () {
  var countdownDuration = 2 * 60 + 59;
  startTimer(countdownDuration, countdownDisplay);


  updatePrice();
};

function addCommas(number) {
  let strNumber = String(number);
  
  // Virgül eklemek için her üç rakamda bir döngü
  let formattedNumber = '';
  for (let i = strNumber.length - 1, j = 1; i >= 0; i--, j++) {
    formattedNumber = strNumber[i] + formattedNumber;
    if (j % 3 === 0 && i !== 0) {
      formattedNumber = '.' + formattedNumber;
    }
  }
  return formattedNumber;
}

/* Tab content menu */
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    }

    document.getElementById("defaultOpen").click();
    document.getElementById("startGame").click();
    
    AssetButtons.forEach(button => {
      button.addEventListener('click', function() {
        button.disabled = true;
      });
    });