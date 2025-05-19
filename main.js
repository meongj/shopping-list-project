const items = document.querySelector(".items");
const form = document.querySelector(".new-form");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // submit이벤트 : 자동으로 리로딩 금지
  onAdd();
});

function onAdd() {
  // 1. 사용자가 입력한 텍스트 받기
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }

  // 2. 새로운 아이템 만들기 (텍스트 + 삭제)
  const item = createItem(text);
  // 3. items 컨테이너 안에 새로운 아이템 추가
  items.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });
  // 5. input 초기화
  input.value = "";
  input.focus();
}

// as-is
// function createItem(text) {
//   const itemRow = document.createElement("li");
//   itemRow.setAttribute("class", "item__row");

//   const item = document.createElement("div");
//   item.setAttribute("class", "item");

//   const span = document.createElement("span");
//   span.setAttribute("class", "item__name");
//   span.innerText = text;

//   const deleteBtn = document.createElement("button");
//   deleteBtn.setAttribute("class", "item_delete");
//   deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

//
//   // deleteBtn.addEventListener("click", () => {
//   //   items.removeChild(itemRow);
//   // });

//   const itemDivider = document.createElement("div");
//   itemDivider.setAttribute("class", "item_divider");

//   item.appendChild(span);
//   item.appendChild(deleteBtn);
//   itemRow.appendChild(item);
//   itemRow.appendChild(itemDivider);

//   return itemRow;
// }
let id = 0; // UUID 를 사용해서 유니크한 id를 만드는게 좋다
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
          <div class="item" >            
            <span class="item__name">${text}</span>
            <button class="item_delete">
              <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
          </div>
          <div class="item_divider"></div>
  `;
  id++;
  return itemRow;
}

// as-is
// addBtn.addEventListener("click", () => {
//   onAdd();
// });

// input.addEventListener("keydown", (event) => {
//   // 한글 입력 오류 -> 여러개의 keydown이 발생하여 한글자를 만들기 때문
//   // 글자가 만들어지고 있는 과정이면 무시하자
//   if (event.isComposing) {
//     return;
//   }
//   if (event.key === "Enter") {
//     onAdd();
//   }
// });

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  // i태그가 자식노드이며, dataset.id가 있다면 삭제하기
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
