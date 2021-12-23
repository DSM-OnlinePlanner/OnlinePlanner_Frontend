import { useState } from "react";
import CreateGoalModal from "../../RecodeModal/Goal/CreateGoalModal";
import GoalModal from "../../RecodeModal/Goal/GoalModal";
import * as G from "../Styles";
const Goal = ({ reload, goalObj }) => {
  const { goal } = goalObj;

  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <G.Container
        onClick={() => {
          setIsModal(true);
        }}
      >
        {goal}
      </G.Container>
      {isModal && (
        <GoalModal
          goalObj={goalObj}
          activefunction={setIsModal}
          reload={reload}
        />
      )}
    </>
  );
};

export default Goal;
