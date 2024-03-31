
let wallet = 20000;
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
let caughtCount = 0;
let sector = "kimbap";
let BankCurrLimit = 0;
let BankMaxLimit = 40000;
let TaxMaxLimit = 50000;
let countdown;

// DOM elemanlarını al
const company = document.getElementById("companyName");
const sale_price = document.getElementById("sale-price");
const sale_price2 = document.getElementById("sale-price2");
const productDisplay = document.getElementById("productDisplay");
const walletDisplay = document.getElementById("wallet");
const countdownDisplay = document.getElementById("countdown");
const PPerSec = document.getElementById("PPerSec");
const rawMadeDisplay = document.getElementById("rawMade");
const TotalWorkers = document.getElementById("totalWorkers");
const TaxDisplay = document.getElementById("tax");
const TaxDisplay2 = document.getElementById("TaxDisplay2");
const TaxMaxDisplay = document.getElementById("TaxMaxDisplay");
const LevelDisplay = document.getElementById("level");
const rawMadeBar = document.getElementById("rawMadeBar");
const wareHouseBar = document.getElementById("wareHouseBar");
const salePriceBar = document.getElementById("salePriceBar");
const customRange = document.getElementById("customRange");
const modalTax = document.getElementById("modalTax");
const modalBank = document.getElementById("modalBank");
const modalWorker = document.getElementById("modalWorker");
const modalWare = document.getElementById("modalWare");
const taxCaught = document.getElementById("taxCaught");
const Credit = document.getElementById("CurCredit");
const Credit2 = document.getElementById("CurCredit2");
const MaxCredit = document.getElementById("MaxCredit");
const SalaryText = document.getElementById("SalaryText");

const buyButtons = document.querySelectorAll(".buy-worker");
const AssetButtons = document.querySelectorAll('.AssetButton');
const updatedValueSpans = document.querySelectorAll('.itemName');


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
});

  const updatedValueSpans = document.querySelectorAll('.itemName');


  var sectorPhotoDiv = document.getElementById("sectorPhoto1");
  var sectorPhotoDiv2 = document.getElementById("sectorPhoto2");
  var sectorPhotoDiv3 = document.getElementById("sectorPhoto3");
  
  // Tüm sectorPhotoğrafları gizle
  var sectorPhotos = sectorPhotoDiv.getElementsByTagName("img");
  for (var i = 0; i < sectorPhotos.length; i++) {
      sectorPhotos[i].style.display = "none";
  }
  
  var sectorPhotos2 = sectorPhotoDiv2.getElementsByTagName("img");
  for (var i = 0; i < sectorPhotos2.length; i++) {
      sectorPhotos2[i].style.display = "none";
  }
  
  var sectorPhotos3 = sectorPhotoDiv3.getElementsByTagName("img");
  for (var i = 0; i < sectorPhotos3.length; i++) {
      sectorPhotos3[i].style.display = "none";
  }
  
  // Seçime göre doğru sectorPhotoğrafı göster
  var selectedSectorPhoto = document.getElementById(dropdownInput.value + "Foto");
  var selectedSectorPhoto2 = document.getElementById(dropdownInput.value + "Foto2");
  var selectedSectorPhoto3 = document.getElementById(dropdownInput.value + "Foto3");
  
  if (selectedSectorPhoto) {
      selectedSectorPhoto.style.display = "block";
  }
  
  if (selectedSectorPhoto2) {
      selectedSectorPhoto2.style.display = "block";
  }
  
  if (selectedSectorPhoto3) {
      selectedSectorPhoto3.style.display = "block";
  }
  

  updatedValueSpans.forEach(function(span) {
    span.textContent = dropdownInput.value;
  });

 
  
if(settings.difficulty === "normal"){
  Timerdifficulty = 1000;
}else if(settings.difficulty === "hard"){
  Timerdifficulty = 300;
}
  
// Her saniyede ürün üretme
const productionInterval = setInterval(produce, Timerdifficulty);

  document.getElementById("startBTN").click();
  TakeCredit()

}


function updateDisplays() {
  sale_price.innerText = price + " ₺";
  sale_price2.innerText = price + " ₺";
  walletDisplay.innerText = addCommasNeg(wallet);
  productDisplay.innerText = addCommas(product);
  rawMadeDisplay.innerText = addCommas(rawMade);
  TotalWorkers.innerText = addCommas(CurrWorker);
  PPerSec.innerText = addCommas(productionRate);
  LevelDisplay.innerText = playerLevel;
  updateTax();

  if (wallet < 0) {
    walletDisplay.classList.add('neg');
  } else {
    walletDisplay.classList.remove('neg');
  }
}
updateBank();
updateDisplays()

function produce() {
  if (Timerdifficulty !== 0) {
    if (rawMade <= 50) {
      toast("Ham madde tükendi, üretim durduruldu.", "#CC3337");
    } else if (product >= wareHouse) {
      toast("Depo doldu!", "#CC3337");
    } else if (tax >= TaxMaxLimit) {
      toast("Vergi limitini aştınız! Üretime devam edemezsiniz...", "#CC3337");
    } else {
      rawMade = Math.max(rawMade - 5 * productionRate, 0);
      product += productionRate;
      updateRawMadeBar(rawMade - product, rawMade);
      updateWareHouseBar(product, wareHouse);
      updateDisplays();
    }
  }
}

function updateTax(){
  if(tax == 0){
    TaxDisplay.innerText = "Güncel Borç bulunmamaktadır!";
    TaxDisplay2.innerText = "0 ₺";
  }
  else{
    TaxDisplay.innerText =  addCommas(tax) + " ₺";
    TaxDisplay2.innerText = addCommas(tax) + " ₺";
  }

  TaxMaxDisplay.innerText = addCommas(TaxMaxLimit) + " ₺";
}

function updateBank(){
  if(tax == 0){
    Credit.innerText = "Güncel Borç bulunmamaktadır!";
    Credit2.innerText = "0 ₺";
  }
  else{
    Credit.innerText = BankCurrLimit + " ₺";
    Credit2.innerText = BankCurrLimit + " ₺";
  }
}

// Satışı gerçekleştir
function Sell(){

  if(product == 0){
    //null
  }else{
    wallet += product * price;
  toast("Ürün satışından " + product * price +" ₺ kazanıldı", "#37CC33")
  
  switch(Timerdifficulty){
    case 1000:
      tax += product+1;
      break;
    case 300:
      tax+= product+5;
      break;
  }
  product = 0;
  updateDisplays();
  updateTax();
  }
  
}

/* Ham madde alımı */
function buyRawAll() {
  rawMade += wallet;
  toast("Ham madde alındı: "+ wallet + " ₺","#37CC33")
  wallet = 0;
  updateDisplays();
}
function buyRawHalf() {
  rawMade += parseInt(wallet / 2);
  toast("Ham madde alındı: "+ wallet / 2 + " ₺","#37CC33")
  wallet = parseInt(wallet / 2); // Bölme işlemi sonucunu kayan noktalı sayıya dönüştür
  updateDisplays();
}

function buyRawValue() {
  let inputQuantity = parseInt(document.querySelector('#quantityInput').value);

  if (inputQuantity === "" || isNaN(inputQuantity) || inputQuantity <= 0) {
    toast("Geçersiz miktar!", "#CC3337");
  } else if (inputQuantity > wallet) {
    toast("Bakiye yetersiz!", "#CC3337");
  } else {
    rawMade += inputQuantity;
    wallet -= inputQuantity;
    toast("Ham madde satın alındı: " + inputQuantity,"#37CC33");
  }
}

/* Vergi ödeme modal'ı */
function PayTaxAll(){
  wallet -= tax;
  tax = 0;
  updateDisplays();
  updateTax();
  toast("Bütün verginiz ödenmiştir!","#37CC33");
}

function PayTaxValue(){
  let inputQuantityTax = parseInt(document.querySelector('#quantityInputTax').value);

  if (inputQuantityTax === "" || isNaN(inputQuantityTax) || inputQuantityTax <= 0) {
    toast("Geçersiz miktar!","#CC3337");
  } else if (inputQuantityTax > wallet) {
    toast("Bakiye yetersiz!","#CC3337");
  } else {
    tax -= inputQuantityTax;
    wallet -= inputQuantityTax;
    updateTax();
    toast("Kalan verginiz: " + tax);
  }
}

function TaxEvasion(){
  if(playerLevel >= 2 && tax > 10000){
  if (Math.random() <= 0.6) {
    tax = 0;
    updateDisplays();
    updateTax();
    toast("Vergi kaçırıldı, afiyet bal şeker!","#37CC33");
} else {
  caughtCount++; 
  taxCaught.innerText = caughtCount;
  if (caughtCount === 1) {
    toast("Yakalandın! Kaçırdığın miktarın 2 katı borcun var artık!","#CC3337");
    wallet -= tax*2;
    updateTax();

  } else if (caughtCount === 2) {
    toast("İkinci kez yakalandın. Daha dikkatli ol!","#CC3337");
    wallet -= tax*5;
    updateTax();
    playerLevel-=1;

  } else {
    toast("Vergi kaçırdığın için hapse girdin ve işletmen kapatıldı!","#CC3337");
    toast("Oyun bitti...","#CC3337");

    timer = 0;
    wallet = 0;
    Timerdifficulty = 0;
    rawMade = 51;
  }
}
}else{
  toast("Bu kadar az vergiyi kaçıramazsınız :/");
}

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
    const workLevel = parseInt(button.getAttribute("data-level"));

    if (wallet >= workPrice && playerLevel >= workLevel) {
      button.classList.add("greenButton"); 
      button.classList.remove("redButton"); 
    } else {
      button.classList.add("redButton"); 
      button.classList.remove("greenButton"); 
    }
  });
}

// İşçi al 
function buyWorker(workRate, workPrice) {
  productionRate += workRate;
  CurrWorker += 1;
  wallet -= workPrice;
  updateDisplays();
  updateButtonColors(); 
  toast("Yeni personel alındı! Güncel çalışan sayısı: "+ CurrWorker, "#37CC33")
}

function saveSalary() {
  if(playerLevel >= 2)
  {
  value = parseInt(customRange.value);
  salary = value;

  toast("Çalışan memnuniyeti: %" + salary); 
  if(salary <= 50){
    SalaryText.innerText = "İşçiler senin hakkında kötü konuşuyor!";
  }
  else if(salary >= 60){
    SalaryText.innerText = "İşçiler halinden memnun görünüyor!";
  }

  setTimeout(function() {
    if(salary <= 30){
      toast("Çalışanlar bütün ürünleri yakarak isyan çıkardı! Yarra Yering şarabından ister misin?","#CC3337");
      Decrease_work = parseInt(CurrWorker/3);

      productionRate -= Decrease_work;
      CurrWorker -= Decrease_work;
      toast(Decrease_work +" işçi kaybetttin!","#CC3337");
      updateDisplays();


    }
  }, (Math.floor(Math.random() * 5000) + 5000)); 
  }
  else{
    toast("Bunu yapmak için 2 seviye ve üstü olmanız gerekir!","#CC3337")
  }
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
  toast("Depo kapasitesi arttırıldı: "+ wareHouse, "#37CC33");
  updateButtonColors(); // Buton renklerini güncelle
}

/* Seviye - asset */
function buyAsset(AssetPrice,levelValue) {
  playerLevel += 1;
  wallet -= AssetPrice;
  updateDisplays();
  toast(playerLevel+ " Seviye oldunuz!", "#37CC33");
  updateButtonColors();
  let randomTime = Math.floor(Math.random() * 5000) + 30000; 

  switch (levelValue) {
    case 2:
      modalTax.innerText =  "80.000 ₺";
      modalBank.innerText = "40.000 ₺";
      modalWorker.innerText = "Usta işçi";
      modalWare.innerText = "Büyük depo, Stok binası";

      TaxMaxLimit = 80000;
      BankMaxLimit  = 40000;

      setTimeout(() => {
        toast("Bir yüksek getirisi olan bir şirketi satın aldın!", "#37CC33")
        wallet += 50000;
        toast("Kazanılan miktar: +50.000 ₺", "#37CC33")
        updateDisplays();
    }, randomTime);
      break;
    case 3:
      modalTax.innerText =  "150.000 ₺";
      modalBank.innerText = "100.000 ₺";
      modalWorker.innerText = "Yönetici";
      modalWare.innerText = "Mega stok binası";

      TaxMaxLimit = 150000;
      BankMaxLimit  = 100000;

    setTimeout(() => {
        toast("Eve giderken kaza yaptın :(","#CC3337")
        wallet -= 200000;
        toast("Hastane masrafları: -20.000 ₺","#CC3337")
        updateDisplays();
    }, randomTime);


      break;
      case 4:
        modalTax.innerText =  "400.000 ₺";
        modalBank.innerText = "500.000 ₺";
        modalWorker.innerText = "Uzman yönetici";
        modalWare.innerText = "Hangar depo";
        
        TaxMaxLimit = 400000;
        BankMaxLimit  = 40000;
        break;
  }
}


// Fiyatı güncelleme 
function updatePrice() {
  price = getRandomNumber();
  sale_price2.textContent = price + " ₺";
  sale_price.textContent = price + " ₺";
  updateSalePriceBar(price, 20);
  toast("Piyasa fiyatı güncellendi! Yeni fiyat: "+ price + " ₺")

  if(BankCurrLimit != 0){
    BankCurrLimit  += BankCurrLimit* 0.1;
    updateBank();
  }
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

// Banka işlemleri 
function TakeCredit(){
  
  let inputCredit = parseInt(document.querySelector('#inputCredit').value);
  MaxCreditDisplay.innerText = addCommas(BankMaxLimit)+ " ₺";
  
  if (inputCredit === "" || isNaN(inputCredit) || inputCredit <= 0) {
    toast("Geçersiz miktar!", "#CC3337");
  } else if (inputCredit > BankMaxLimit - BankCurrLimit) {
    toast("O kadar limitiniz yok!", "#CC3337");
  } else {
    wallet += inputCredit;
    BankCurrLimit += inputCredit;
    updateBank();
    updateButtonColors();
    toast("Bankadan Kredi çekildi: " + inputCredit + " ₺", "#37CC33");
  }
}

function PayCredit(){
  
  let inputCredit = parseInt(document.querySelector('#inputCredit').value);
  
  if (inputCredit === "" || isNaN(inputCredit) || inputCredit <= 0) {
    toast("Geçersiz miktar!","#CC3337");
  } else if (inputCredit > BankMaxLimit || wallet < inputCredit) {
    toast("Limitiniz kadar ödeme yapabilirsiniz","#CC3337");
  } else {
    wallet -= inputCredit;
    BankCurrLimit -= inputCredit;
    updateBank();
    toast("Bankaya borç ödendi: " + inputCredit + " ₺","#37CC33");
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

//Oyunu bitir
function FinishGame(price){
  playerLevel += 1;
  wallet -= price;
  updateDisplays();
  toast("En yüksek seviyeye ulaştınız, Tebrikler!", "#37CC33");
}

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

function addCommasNeg(number) {
  let strNumber = String(number);
  let isNegative = strNumber.startsWith('-'); // Negatif sayı kontrolü
  
  // Negatif işareti çıkart
  if (isNegative) {
    strNumber = strNumber.slice(1);
  }
  
  let formattedNumber = '';
  for (let i = strNumber.length - 1, j = 1; i >= 0; i--, j++) {
    formattedNumber = strNumber[i] + formattedNumber;
    if (j % 3 === 0 && i !== 0) {
      formattedNumber = '.' + formattedNumber;
    }
  }
  if (isNegative) {
    formattedNumber = '-' + formattedNumber;
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


    function toast(message,color) {
      Toastify({
          text: message,
          duration: 2000,
          newWindow: false,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
              background: color,
              borderRadius: "10px",
          },
          onClick: function() {} 
      }).showToast();
  }
  