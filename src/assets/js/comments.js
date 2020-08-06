import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");

const ellipsisBtn = document.querySelectorAll(".jsEllipsisBtn");

let parentLi;
let originalText;
let content;
let text;
let menu;
let editForm;
let editInput;
let editBtn;
let deleteBtn;

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment) => {
  // comment creator, createdAt, deleteBtn 값도 가져와서 추가해야 함.
  const li = document.createElement("li");
  const div = document.createElement("div");
  // column 1 ( avatarUrl )
  // const a = document.createElement("a");
  // const img = document.createElement("img");
  // column 2 ( username, text )
  // const div2 = document.createElement("div");
  // const a2 = document.createElement("a");
  // const a2_span2 = document.createElement("span");
  // const span2 = document.createElement("span");
  // column 3 ( 아직 안함.. )
  // div.innerHTML = comment;
  // li.appendChild(div);
  // commentList.prepend(li);
  // increaseNumber();
  div.innerHTML = "Refresh the Page!";
  commentList.prepend(div);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  // api로 댓글 보내기
  sendComment(comment);
  commentInput.value = "";
};

const handleDelete = async (event) => {
  event.preventDefault();
  // console.log("댓글삭제함수");
  // console.log(event.target);
  // const target = event.target.parentNode;
  // const targetParent = target.parentNode; // <li> 나옴, type은 object
  // const commentText = targetParent.childNodes[1].childNodes[1].innerHTML;
  // 앞단에서 제거
  console.log(parentLi);
  console.log(originalText);
  commentList.removeChild(parentLi);
  // 코멘트 수 줄이기
  decreaseNumber();
  // 데이터 전송
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deletecomment`,
    method: "POST",
    data: {
      originalText,
    },
  });
  if (response.status === 200) {
    console.log(response);
  }
};

const sendEditComment = async (event) => {
  console.log("메세지 수정 전송..");
  event.preventDefault();
  text.classList.remove("showing");
  editForm.classList.add("showing");
  const editText = event.target.childNodes[0].value;
  // 앞단에서 내용 변경
  text.innerHTML = editText;
  menu.classList.add("showing");
  // 데이터 전송
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/editcomment`,
    method: "POST",
    data: {
      originalText,
      editText,
    },
  });
  if (response.status === 200) {
    console.log(response);
  }
};

async function handleEdit(event) {
  event.preventDefault();
  // console.log(parentLi); //li
  content = parentLi.childNodes[1];
  text = content.childNodes[1];
  editForm = content.childNodes[2];
  editInput = editForm.childNodes[0];
  //console.log(content, text, editForm, editInput);
  text.classList.toggle("showing");
  editForm.classList.toggle("showing");
  editForm.addEventListener("submit", sendEditComment);
}

const handleMenu = (event) => {
  // ellipsis 누를 때, 누른 것이 버튼인지 아이콘인지에 따라 달라짐.
  const eventTarget = event.target;
  parentLi = eventTarget.parentNode.parentNode; // li
  // 기존 댓글 내용
  originalText = parentLi.childNodes[1].childNodes[1].innerHTML;
  // Ellipsis btn click
  menu = parentLi.childNodes[2].childNodes[1];
  menu.classList.toggle("showing");
  // Edit & Delete Btn
  editBtn = menu.childNodes[0].childNodes[0];
  deleteBtn = menu.childNodes[1].childNodes[0];
  editBtn.addEventListener("click", handleEdit);
  deleteBtn.addEventListener("click", handleDelete);
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  for (let i = 0; i < ellipsisBtn.length; i += 1) {
    ellipsisBtn[i].addEventListener("click", handleMenu);
  }
}

if (addCommentForm) {
  init();
}
