// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
let linkTag = searchWrapper.querySelector("a");
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

let searchBtn = document.getElementById("search-btn");
let cardContainer = document.getElementById("card-container");
let clearAllBtn = document.createElement("button");
    clearAllBtn.innerHTML = "Clear All";
    clearAllBtn.setAttribute("class"," inactive clearAllBtn btn btn-light");
    document.getElementById("clearBTN").appendChild(clearAllBtn);
        
        
    clearAllBtn.addEventListener("click", () => {
          cardContainer.innerHTML = ""
       
          for (var key in counter) {
            if (counter.hasOwnProperty(key)) {
              counter[key] = 0;
            }
          }
          let temp = document.getElementById("card-container");
          if(temp.innerHTML==""){
            clearAllBtn.classList.add("inactive");
          }
          else{
            clearAllBtn.classList.remove("inactive");
          }
      });
      
searchBtn.addEventListener("click", () => {
          clearAllBtn.classList.remove("inactive");
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
                  let setNameList = []
                  let ImgList = []
                  for (let i = 0; i < res.data.length; i++) {
                    let res_Name = (res.data[i].name).toLocaleLowerCase();
                    let Searched_Set_Name = searchedCardName.toLocaleLowerCase(); 
                    if(res_Name ==Searched_Set_Name ){
                    let set_name = res.data[i].set_name;
                    let ImgListURL = res.data[i].image_uris.small;
                    setNameList.push(set_name);
                    ImgList.push(ImgListURL);
                    }
                  }               
                  let card = new Card(ImgList,setNameList,text,++counter[text]);
                  let CardwGroupDiv; // create a new Card component
                  if(document.getElementById(text)){
                    // CardwGroupDiv = new AddCard(card,text);
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
        this.mainGroupDiv.innerHTML = "<h1>"+text+"</h1>";
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
      constructor(imgUrl,set_Name,text,ChildNo) {
          this.quantity = 1;
          console.log(imgUrl);
          this.element = document.createElement("div");
          this.element.setAttribute("class",  text + " child child"+ChildNo);
          this.element.id = text+"child"+ChildNo;
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
            document.getElementById(text+"child"+ChildNo).remove();
            counter[text]--;
            let CurrDiv = document.getElementById(text+"Container");
            if(counter[text]==0){
              CurrDiv.innerHTML = ""
              CurrDiv.remove();
              clearAllBtn.classList.add("inactive");
              counter[text] = 0;
            }
          })
          
          this.plusBtn.addEventListener("click", () => {
              this.quantity++;
              this.quantityLabel.innerHTML = this.quantity;
          });

          this.minusBtn.addEventListener("click", () => {
              if (this.quantity > 1) {
                  this.quantity--;
                  this.quantityLabel.innerHTML = this.quantity;
              }
          });
          CurrDropMenu.addEventListener("change", function() {
           let index = set_Name.indexOf(CurrDropMenu.options[CurrDropMenu.selectedIndex].text)
           CurrImg.src = imgUrl[index];

        })

          this.element.appendChild(this.deleteBtn);
          this.element.appendChild(this.image);
          this.element.appendChild(this.dropmenu);
          this.element.appendChild(this.spanElement)
          // this.element.appendChild(this.quantityLabel);
          // this.element.appendChild(this.plusBtn);
          // this.element.appendChild(this.minusBtn);
          
          }
      }