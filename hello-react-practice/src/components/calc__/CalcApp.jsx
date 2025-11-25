export default function CalcApp() {
  const [list, setList] = useState();

  const onCalculateHandler = (a, operator, b, result) => {
    setList((prevList) => {
      const newList = [{ a, operator, b, result }, ...prevList];
      return newList;
    });
  };

  return <></>;
}
