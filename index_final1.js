// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const linkTag = searchWrapper.querySelector("a");
const searchBtn = document.getElementById("search-btn");
let ProceedBTN = document.getElementById("priceBTN")
let ObjectIndx = 0
let cardsCount = 0;
var Cards = [
  {
    Group: "DefaultGroup",
    cards:{}
  },
  {
    Group: "Group1",
    cards:{}},
  {
    Group: "Group2",
    cards:{}},
  {Group: "Group3",
  cards:{}},
  {Group: "Group4",
  cards:{}},
  {Group: "Group5",
  cards:{}},
  {Group: "Group6",
  cards:{}},
  {Group: "Group7",
  cards:{}},
  {Group: "Group8",
  cards:{}},
  {Group: "Group9",
  cards:{}},
  {
    Group:"BackCard"
  }
  ]
let webLink;
var counter = {
  DefaultGroup: 0,
  Group1: 0,
  Group2: 0,
  Group3: 0,
  Group4: 0,
  Group5: 0,
  Group6: 0,
  Group7: 0,
  Group8: 0,
  Group9: 0
}; 


// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  userData = userData.toLocaleLowerCase();
  let emptyArray = [];
  if (userData) {
    // icon.onclick = ()=>{
    //     webLink = `https://www.google.com/search?q=${userData}`;
    //     linkTag.setAttribute("href", webLink);
    //     linkTag.click();
    // }
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data
        .toLocaleLowerCase()
        .startsWith(userData);
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  // icon.onclick = ()=>{
  //     webLink = `https://www.google.com/search?q=${selectData}`;
  //     linkTag.setAttribute("href", webLink);
  //     linkTag.click();
  // }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}


let cardContainer = document.getElementById("card-container");
let clearAllBtn = document.createElement("button");
    clearAllBtn.innerHTML = "Clear";
    clearAllBtn.setAttribute("class"," inactive clearAllBtn btn btn-danger");
    document.getElementById("clearBTN").appendChild(clearAllBtn);
        
        
    clearAllBtn.addEventListener("click", () => {
          cardContainer.innerHTML = ""
          cardsCount = 0;
          updateCount();
          for (var key in counter) {
            if (counter.hasOwnProperty(key)) {
              counter[key] = 0;
            }
          }
          if(cardContainer.innerHTML==""){
            clearAllBtn.classList.add("inactive");
            ProceedBTN.classList.add("inactive");
            cardsCount = 0;
          }
          else{
            clearAllBtn.classList.remove("inactive");
            ProceedBTN.classList.remove("inactive");
          }
          ObjectIndx = 0;
          for (let i = 0; i < 10; i++) {
            Cards[i].cards = {}
          }
      });
      
searchBtn.addEventListener("click", () => {
          clearAllBtn.classList.remove("inactive");
          ProceedBTN.classList.remove("inactive");

          var value = inputBox.value;
          // let SelectedGroupName = groupDock.options[select.selectedIndex].value;
          searchedCardName = value;
          var e = document.getElementById("groups");
          var text = e.options[e.selectedIndex].value;
          // console.log(searchedCardName);
                    // if (!document.querySelector("#"+SelectedGroupName)) {
                    //     let grpdiv = new GroupDiv(SelectedGroupName);
                    //     cardContainer.appendChild(grpdiv.element);
                    //   }
          fetch("https://api.scryfall.com/cards/search?q=\""+searchedCardName+"\"+unique:prints+include%3Aextras")
          .then((res)=> (res.json()))
          .then((res)=>{
              if (res.data.length>0 ){
                  cardsCount++;
                  updateCount();
                  let setNameList = []
                  let ImgList = []
                  for (let i = 0; i < res.data.length; i++) {
                    let res_Name = (res.data[i].name).toLocaleLowerCase();
                    let Searched_Set_Name = searchedCardName.toLocaleLowerCase(); 
                    if(res_Name ==Searched_Set_Name){
                    let set_name = res.data[i].set_name;
                    let ImgListURL = res.data[i].image_uris.large;
                    setNameList.push(set_name);
                    ImgList.push(ImgListURL);
                    }
                  }   
                  console.log(Cards[0].cards)
                  let GroupIndx = getGroupIndex(text)
                  let ObjName = ObjectIndx+"_"+searchedCardName+"_"+setNameList[0]  
                  let BackDropdown = document.getElementById("BackDropdown");
                  let BackCard = BackDropdown.options[BackDropdown.selectedIndex].text
                  Cards[10].Back = BackCard
                  addCardJSON(GroupIndx,ObjName,1);   
                  let card = new Card(GroupIndx,ObjectIndx++,searchedCardName,ImgList,setNameList,text,++counter[text],ObjName);
                  let CardwGroupDiv; // create a new Card component
                  if(document.getElementById(text)){
                    CardwGroupDiv = document.getElementById(text).appendChild(card.element);
                  }
                  else{
                     CardwGroupDiv = new CreateGroupDiv(card,text);
                    //  cardContainer.innerHTML = ""; // clear any previous card components
                     cardContainer.appendChild(CardwGroupDiv.mainGroupDiv); // add the new Card component to the card container
              
                  }
                  }
          })
      });

      class CreateGroupDiv{
        constructor(Card,text) {
        this.mainGroupDiv = document.createElement("div")
        this.mainGroupDiv.className = "GroupContainer ";
        this.mainGroupDiv.id = text+"Container";
        let GroupContainerTitle;
        if(text == "DefaultGroup"){
          GroupContainerTitle = "Default Group"
        }
        else{
          GroupContainerTitle = text.substring(0,5) + " " + text.substring(5,6)
        }
        this.mainGroupDiv.innerHTML = "<h1 class = \"GroupHeading\">"+GroupContainerTitle+"</h1>";
        
        this.groupdiv = document.createElement("div");
        this.groupdiv.setAttribute("id", text);
        this.groupdiv.setAttribute("class","GroupDiv" );
        
       
      //   this.clearBtn = document.createElement("button");
      //   this.clearBtn.innerHTML = "Clear";
      //   this.clearBtn.setAttribute("class",text + "clearBtn btn btn-light");
      //   this.clearBtn.addEventListener("click", () => {
      //     CurrDiv.innerHTML = ""
      //     CurrDiv.remove();
      //     counter[text] = 0;

      // });

      this.groupdiv.appendChild(Card.element);
      this.mainGroupDiv.appendChild(this.groupdiv);
        // this.groupdiv.appendChild(this.clearBtn);
        }
      }
      class Card {
      constructor(GroupIndx,ObjectIndx,searchedCardName,imgUrl,set_Name,text,ChildNo,ObjName) {
          this.ObjectIndx = ObjectIndx
          this.quantity = 1;
          this.element = document.createElement("div");
          this.element.setAttribute("class",  text + " child child"+ChildNo);
          this.element.id = text+"child"+ChildNo;
          this.title = document.createElement("span");
          this.title.setAttribute("class",  "card_title_span");
          this.heading = document.createElement("h5");
          this.heading.className = "cardHeading";
          this.heading.innerHTML = searchedCardName;
          this.image = document.createElement("img");
          this.image.src = imgUrl[0];
          this.spanElement = document.createElement("span");
          this.spanElement.className = "spanElement";
          this.quantityLabel = document.createElement("label");
          this.quantityLabel.innerHTML = this.quantity;
          this.plusBtn = document.createElement("button");
          this.plusBtn.innerHTML = "+";
          this.plusBtn.setAttribute("class","btn btn-sm btn-light");
          this.minusBtn = document.createElement("button");
          this.minusBtn.innerHTML = "-";
          this.minusBtn.setAttribute("class","btn btn-sm btn-light");
          this.spanElement.appendChild(this.quantityLabel);
          this.spanElement.appendChild(this.plusBtn);
          this.spanElement.appendChild(this.minusBtn);

          this.dropmenu = document.createElement("select");
          this.dropmenu.className = "cardDropmenu"
          let CurrDropMenu = this.dropmenu;
          let CurrImg = this.image;
          for(let i=0;i<set_Name.length;i++){
            let opt = document.createElement("option")
            let img = document.createElement("img")
            img.src = imgUrl[i]
            // opt.value = set_Name[i]
            opt.setAttribute("data-img_src",imgUrl[i])
            opt.innerText = set_Name[i]
            this.dropmenu.appendChild(opt)
          }
          this.deleteBtn = document.createElement("button");
          this.deleteBtn.innerHTML = "x";
          this.deleteBtn.setAttribute("class","deleteBtn btn btn-sm btn-danger");
          
          this.deleteBtn.addEventListener("click",()=>{
            counter[text]--;
            cardsCount = cardsCount - this.quantity;
            document.getElementById(text+"child"+ChildNo).remove();
            updateCount();
            let CurrDiv = document.getElementById(text+"Container");
            if(counter[text] == 0){
              CurrDiv.innerHTML = ""
              CurrDiv.remove();
              counter[text] = 0;
            }
            if(cardsCount == 0){
              clearAllBtn.classList.add("inactive");
              ProceedBTN.classList.add("inactive");
            }
            delete Cards[GroupIndx].cards[ObjName];
            console.log(Cards[0].cards)
          })
          
          this.plusBtn.addEventListener("click", () => {
              this.quantity++;
              cardsCount++;
              Cards[GroupIndx].cards[ObjName].Quantity = this.quantity;
              updateCount();
              console.log(Cards[0].cards)
              this.quantityLabel.innerHTML = this.quantity;
          });

          this.minusBtn.addEventListener("click", () => {
              if (this.quantity > 1) {
                  this.quantity--;
                  cardsCount--;
                  console.log(Cards[0].cards)
                  Cards[GroupIndx].cards[ObjName].Quantity = this.quantity;
                  updateCount();
                  this.quantityLabel.innerHTML = this.quantity;
              }
          });
          CurrDropMenu.addEventListener("change", function() {
            let Selected_option = CurrDropMenu.options[CurrDropMenu.selectedIndex].text
           let index = set_Name.indexOf(Selected_option)
           CurrImg.src = imgUrl[index];
           addCardJSON(GroupIndx,ObjectIndx+"_"+searchedCardName+"_"+Selected_option,Cards[GroupIndx].cards[ObjName].Quantity);
           delete Cards[GroupIndx].cards[ObjName];
           ObjName = ObjectIndx+"_"+searchedCardName+"_"+Selected_option;

        })
          this.title.appendChild(this.heading);
          this.title.appendChild(this.deleteBtn);
          this.element.appendChild(this.title); 
          // this.element.appendChild(this.deleteBtn);
          this.element.appendChild(this.image);
          this.element.appendChild(this.dropmenu);
          this.element.appendChild(this.spanElement)
          // this.element.appendChild(this.quantityLabel);
          // this.element.appendChild(this.plusBtn);
          // this.element.appendChild(this.minusBtn);
          
          }
      }
BackDropdown.addEventListener("change",()=>{
  BackCard = BackDropdown.options[BackDropdown.selectedIndex].text
  Cards[10].Back = BackCard
})
function updateCount(){
  let OrderQuantity = document.getElementById("OrderQuantity");
  OrderQuantity.innerHTML = cardsCount;
  updatePrice();
  updateActivePrice();
}
function updatePrice(){
  let OrderPrice = document.getElementById("orderPrice");
  let totalPrice;
  if (cardsCount <= 9){
    totalPrice = cardsCount*2;
  }
  else if(cardsCount > 9 && cardsCount <= 49){ 
    totalPrice = cardsCount * 1.5;
  }
  else if(cardsCount > 49 && cardsCount <= 199){
    totalPrice = cardsCount * 1;
  }
  else{
    totalPrice = cardsCount * 0.75;
  }
  
  OrderPrice.innerHTML = "$" + (totalPrice); 
}
function getGroupIndex(text){
  let temp_index = text.substring(5,6)
  if(parseInt(temp_index)){
    return (parseInt(temp_index))
  }
  else{
    return 0;
  }
}
function addCardJSON(index,ObjName,Quantity){
  Cards[index].cards[ObjName] = {
    "Quantity" : Quantity
  }
}
function updateActivePrice(){
  let Oneto9 =  document.getElementById("1to9");
  let Tento49 = document.getElementById("10to49");
  let Fiftyto199 = document.getElementById("50to199");
  let Two00 = document.getElementById("200to");
  if (cardsCount <= 9){
    Oneto9.className += " ToGolden";
    Tento49.classList.remove("ToGolden");
    Fiftyto199.classList.remove("ToGolden");
    Two00.classList.remove("ToGolden");
  }
  else if(cardsCount > 9 && cardsCount <= 49){ 
    Tento49.className += " ToGolden";
    Oneto9.classList.remove("ToGolden");
    Fiftyto199.classList.remove("ToGolden");
    Two00.classList.remove("ToGolden");
  }
  else if(cardsCount > 49 && cardsCount <= 199){
    Fiftyto199.className += " ToGolden";
    Oneto9.classList.remove("ToGolden");
    Tento49.classList.remove("ToGolden");
    Two00.classList.remove("ToGolden");
  }
  else{
    Two00.className += " ToGolden";
    Oneto9.classList.remove("ToGolden");
    Tento49.classList.remove("ToGolden");
    Fiftyto199.classList.remove("ToGolden");
  }
}


ProceedBTN.addEventListener("click",() => {
  console.log(Cards);
  fetch("https://stripe-service-magic-forge.onrender.com/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({cards : Cards}),
  })
    .then((response) => response.text())
    .then((url) => (window.location.href = url))
    .catch((error) => console.error(error));
})
// function onCheckout() {
//   fetch("http://localhost:4242/create-checkout-session", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Cards
//     }),
//   })
//     .then((response) => response.text())
//     .then((url) => (window.location.href = url))
//     .catch((error) => console.error(error));
// }