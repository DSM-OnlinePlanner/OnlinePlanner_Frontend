import { useEffect, useState } from "react";
import MemoModal from "../../RecodeModal/Memo/MemoModal";
import * as G from "../Styles";
const Memo = ({ memoObj, reload }) => {
  const { content } = memoObj;
  useEffect(() => {
    console.log(memoObj);
  }, []);
  //   content: "";
  //   email: "freedom7113@gmail.com";
  //   memoAt: "2021-09-05";
  //   memoId: 99;
  //   memoType: "TODAY";

  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <G.Container
        onClick={() => {
          setIsModal(true);
        }}
      >
        {content}
      </G.Container>
      {isModal && (
        <MemoModal
          memoObj={memoObj}
          activefunction={setIsModal}
          reload={reload}
        />
      )}
    </>
  );
};

export default Memo;
