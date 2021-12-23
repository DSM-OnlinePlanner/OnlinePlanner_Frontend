import apiController from "./ApiController";

export function getPlanners(setter, date) {
  const param = {
    date: date,
  };

  var arr = [];
  var num = 0;

  const loop = () =>
    apiController
      .get(`/api/planner/${num}`, { params: param })
      .then((response) => {
        if (response.data.length > 0) {
          arr = arr.concat(response.data);
          num++;
          setter(arr);
          loop();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  loop();
}

export function getRoutines(setter) {
  var arr = [];
  var num = 0;

  const loop = () =>
    apiController
      .get(`/api/routine/${num}`)
      .then((response) => {
        if (response.data.length > 0) {
          arr = arr.concat(response.data);
          num++;
          setter(arr);
          loop();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  loop();
}
