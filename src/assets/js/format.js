const videoDate = document.querySelector(".video__date");
const commentDate = document.querySelectorAll(".commentCreatedAt");

function handleDateComment() {
  //console.log(commentDate[0].innerHTML);
  const arr = [];
  const array = [];
  for (let i = 0; i < commentDate.length; i += 1) {
    arr[i] = commentDate[i].innerHTML;
    array[i] = new Date(commentDate[i].innerHTML);
  }
  //console.log(typeof array[0]); // string
}

function handleDate() {
  const dateValue = videoDate.innerHTML;
  const toDate = new Date(dateValue);
  const year = toDate.getFullYear();
  let month = toDate.getMonth() + 1;
  let day = toDate.getDate();
  let hours = toDate.getHours();
  let minutes = toDate.getMinutes();
  //formateDate(toDate);
  if (month <= 10) {
    month = `0${month}`;
  }
  if (day <= 10) {
    day = `0${day}`;
  }
  if (hours <= 10) {
    hours = `0${hours}`;
  }
  if (minutes <= 10) {
    minutes = `0${minutes}`;
  }
  const formated = `${year}년 ${month}월 ${day}일 ${hours} : ${minutes}`;
  videoDate.innerHTML = formated;
}

function init() {
  handleDate();
  handleDateComment();
}

if (videoDate) {
  init();
}
