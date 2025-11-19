export default function CalcHistory({ history }) {
  return (
    <>
      <ol className="calc-history">
        계산이력
        {history.map(({ id, a, b, operator, result }) => (
          <li key={id}>
            {a} {operator} {b} = {result}
          </li>
        ))}
      </ol>
    </>
  );
}
