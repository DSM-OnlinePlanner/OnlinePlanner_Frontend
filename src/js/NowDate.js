export function getNowDate() {
  var nowDate = localStorage.getItem("nowDate");
  var nowDateSetDate = new Date(localStorage.getItem("nowDateSetDate"));

  nowDateSetDate.setHours(nowDateSetDate.getHours() + 1);

  if (nowDate === null || nowDateSetDate < new Date()) {
    setNowDate(new Date());
    return new getNowDate();
  } else {
    return new Date(nowDate);
  }
}

export function setNowDate(date) {
  localStorage.setItem("nowDate", new Date(date));
  localStorage.setItem("nowDateSetDate", new Date());
}
