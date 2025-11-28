import { useContext, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { articleThunks } from "../../store/toolkit/slices/articleSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "../../contexts/UserContext";

export function ArticleWrite() {
  const navigation = useNavigate(); // url을 옮겨줌, js => window.location.href에 대응되는 훅
  const dispatcher = useDispatch();
  const { account } = useContext(UserContext);

  console.log("account : ", account);

  const writeRef = useRef({
    subject: undefined,
    file: undefined,
    content: undefined,
  });

  const onSaveClickHandler = () => {
    dispatcher(
      articleThunks.write(
        writeRef.current.subject.value,
        writeRef.current.file,
        writeRef.current.content.value,
        account.name,
        account.email,
        navigation.bind(this, "/")
      )
    );
  };
  /*
      write(state, action) {
      state.error = {};
      const payload = action.payload;
      console.log("쓰기", payload);
      state.body.count++;

      state.body.list.unshift({
        id: payload.id,
        number: Math.max(...state.body.list.map((art) => art.number)) + 1,
        memberVO: { email: payload.email, name: payload.name },
        crtDt: new Date().toISOString().substr(0, 10),
        subject: payload.subject,
        content: payload.content,
      });

    },*/
  // 글쓰기 다되면 이동시키기
  // navigation.bind(this, "/");
  return (
    <div>
      <div>
        <input
          type="text"
          ref={(element) => (writeRef.current.subject = element)}
        />
      </div>
      <div>
        <input
          type="file"
          ref={(element) => (writeRef.current.file = element)}
        />
      </div>
      <div>
        <textarea
          ref={(element) => (writeRef.current.content = element)}
        ></textarea>
      </div>

      <button type="button" onClick={onSaveClickHandler}>
        저장하기
      </button>
      <button type="button">취소하기</button>
    </div>
  );
}
