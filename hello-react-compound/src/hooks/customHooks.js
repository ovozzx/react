import { useEffect, useState } from "react";

export const useFetch = (fetch, dependencies) => {
  const [fetchedData, setFetchedData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // setFetchedData(undefined);
    setError(undefined);

    (async () => {
      window.showSpinner();
      try {
        const fetchResult = await fetch();
        setFetchedData(fetchResult);
      } catch (e) {
        if (e.message.startsWith("{")) {
          const errors = JSON.parse(e.message).error;
          for (let err of errors) {
            setError((prevError) => {
              return { ...prevError, [err.field]: err.defaultMessage };
            });
          }
        } else {
          setError({ internalServerError: e.message });
        }
      } finally {
        window.hideSpinner();
      }
    })();
  }, [dependencies, fetch]);

  return { fetchedData, error, setFetchedData };
};

export const usePagination = (targetRef, fetch, nowPage, done, callback) => {
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);

    // Pagination
    const observer = new IntersectionObserver((elements) => {
      elements.forEach((elem) => {
        console.log(elem);
        if (elem.isIntersecting) {
          observer.unobserve(targetRef.current);
          // fetch next page
          if (nowPage >= 0) {
            console.log("Intersect Page go!-->", nowPage);
            (async () => {
              window.showSpinner();
              try {
                const fetchResult = await fetch(nowPage + 1);
                callback(fetchResult);
              } catch (e) {
                if (e.message.startsWith("{")) {
                  const errors = JSON.parse(e.message).error;
                  for (let err of errors) {
                    setError((prevError) => {
                      return { ...prevError, [err.field]: err.defaultMessage };
                    });
                  }
                } else {
                  setError({ internalServerError: e.message });
                }
              } finally {
                window.hideSpinner();
              }
            })();
          }
        }
      });
    });

    if (!done) {
      observer.observe(targetRef.current);
    }

    // Pagination
  }, [nowPage, done, fetch, targetRef, callback]);

  return error;
};
// import { useEffect, useState } from "react";

// // fetch one / list 쪼갠다..?
// export const useFetch = (fetch, dependencies) => {
//   const [fetchedData, setFetchedData] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     // state 비워주기
//     // setFetchedData(undefined); 덮어씌우기
//     setError(undefined);
//     (async () => {
//       window.showSpinner();
//       try {
//         const fetchResult = await fetch();
//         setFetchedData(fetchResult);
//       } catch (e) {
//         if (e.message.startsWith("{")) {
//           const errors = JSON.parse(e.message).error;
//           for (let err of errors) {
//             // for each
//             setError((prevError) => {
//               return { ...prevError, [err.field]: err.defaultMessage };
//               // []로 하면 key로 들어감
//             });
//           }
//         } else {
//           setError({ internalServerError: e.message });
//         }
//       } finally {
//         window.hideSpinner();
//       }
//     })();
//   }, [dependencies, fetch]);
//   return { fetchedData, error, setFetchedData };
// };

// export const usePagination = (targetRef, fetch, nowPage, done, callback) => {
//   const [error, setError] = useState();

//   useEffect(() => {
//     // state 비워주기 (이전 에러 없앰)
//     setError(undefined);
//     // render 끝나면 실행!
//     // Pagination : view포트 밖에 있는걸 스크롤 내렸을 때 교차하는게 있는지 감지 (브라우저 기능)
//     const observer = new IntersectionObserver((elements) => {
//       elements.forEach((elem) => {
//         if (elem.isIntersecting) {
//           // fetch next page
//           //   console.log("fetch!!");
//           if (nowPage >= 0) {
//             // 괄호 찾기
//             // 구독 한번만 하게함 (구독 취소 -> 다시 구독)
//             observer.unobserve(targetRef.current);
//             (async () => {
//               window.showSpinner();
//               try {
//                 const fetchResult = await fetch(nowPage + 1);
//                 callback(fetchResult);
//               } catch (e) {
//                 if (e.message.startsWith("{")) {
//                   const errors = JSON.parse(e.message).error;
//                   for (let err of errors) {
//                     // for each
//                     setError((prevError) => {
//                       return { ...prevError, [err.field]: err.defaultMessage };
//                       // []로 하면 key로 들어감
//                     });
//                   }
//                 } else {
//                   setError({ internalServerError: e.message });
//                 }
//               } finally {
//                 window.hideSpinner();
//               }
//             })();
//           }
//         }
//       });
//     });

//     if (!done) {
//       /* articleList?.done이 true (마지막 페이지)이면 loadMoreRef도 없음 (return 문 참고)
//             -> 체크 필요 (없는 걸 observe하려고 하면 에러) */
//       observer.observe(targetRef.current /*target Element */);
//     }
//   }, [nowPage, done, fetch, targetRef, callback]); // 1개라도 바뀌면 동작

//   return error;
// };
