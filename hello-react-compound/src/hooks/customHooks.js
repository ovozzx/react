import { useEffect, useState } from "react";

export const useFetch = (fetch, dependencies) => {
  const [fetchedDate, setFetchedData] = useState;
  const [error, setError] = useState;

  useEffect(() => {
    (async () => {
      window.showSpinner();
      try {
        const fetchList = await fetch();
        setFetchedData(fetchList);
      } catch (e) {
        if (e.message.startsWith("{")) {
          const errors = JSON.parse(e.message).error;
          for (let err of errors) {
            // for each
            setError((prevError) => {
              return { ...prevError, [err.field]: err.defaultMessage };
              // []로 하면 key로 들어감
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
  return { fetchedDate, error, setFetchedData };
};
