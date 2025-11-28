import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../contexts/UserContext";
import { fetchGetArticle } from "../../http/article/article";
import { useFetch } from "../../hooks/customHooks";
import { download } from "../../utils/download";
import { isResourceOwner } from "../../utils/resourceOwner";
import { articleThunks } from "../../store/toolkit/slices/articleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Confirm } from "../ui/Modal";

export default function ArticleDetail() {
  // "/detail/:articleId"
  const navigation = useNavigate();
  const { articleId } = useParams(); // {articleId: "AR-12..."}
  const dispatcher = useDispatch();

  const deleteConfirmRef = useRef();

  const [modifyDetail, setModifyDetail] = useState();

  const [isModify, setIsModify] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { account } = useContext(UserContext);
  //   const { account } = useSelector((store) => store.users);

  const fetchArticle = useCallback(fetchGetArticle.bind(this, articleId), []);

  const { fetchedData: detail, error } = useFetch(fetchArticle, isDelete);

  useEffect(() => {
    setModifyDetail({ ...detail });

    if (isDelete) {
      deleteConfirmRef.current.open();
    }
  }, [detail, isDelete]);

  return (
    <>
      <div>
        {!isModify ? (
          detail?.subject
        ) : (
          <input
            type="text"
            value={modifyDetail?.subject}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setModifyDetail((prevDetail) => {
                return { ...prevDetail, subject: value };
              });
            }}
          />
        )}
      </div>
      <div>
        {detail?.memberVO.name} ({detail?.memberVO.email})
      </div>
      {detail?.fileGroupVO && (
        <div>
          {detail.fileGroupVO.file.map(
            ({ fileDisplayName, fileDownloadCount, fileGroupId, fileId }) => (
              <div
                key={fileId}
                data-file-group-id={fileGroupId}
                data-file-id={fileId}
                data-article-id={articleId}
                onClick={download.bind(
                  this,
                  fileDisplayName,
                  `http://192.168.211.25:8080/file/${articleId}/${fileGroupId}/${fileId}`
                )}
              >
                {fileDisplayName} ({fileDownloadCount})
              </div>
            )
          )}
        </div>
      )}
      <div>
        {!isModify ? (
          detail?.content
        ) : (
          <textarea
            value={modifyDetail?.content}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setModifyDetail((prevDetail) => {
                return { ...prevDetail, content: value };
              });
            }}
          ></textarea>
        )}
      </div>
      {isResourceOwner(account, detail?.memberVO.email) && (
        <div>
          {isModify && (
            <button
              type="button"
              onClick={() => {
                dispatcher(
                  articleThunks.update(navigation.bind(this, "/"), modifyDetail)
                );
              }}
            >
              저장
            </button>
          )}
          {!isModify && (
            <button type="button" onClick={setIsModify.bind(this, true)}>
              수정
            </button>
          )}
          <button type="button" onClick={setIsDelete.bind(this, true)}>
            삭제
          </button>
          {isDelete && (
            <Confirm
              confirmRef={deleteConfirmRef}
              onClickOk={() => {
                dispatcher(
                  articleThunks.delete(
                    navigation.bind(this, "/"),
                    detail,
                    setIsDelete
                  )
                );
              }}
              onClickCancel={setIsDelete.bind(this, false)}
            >
              <div>정말 삭제하시겠습니까?</div>
            </Confirm>
          )}
        </div>
      )}
    </>
  );
}
