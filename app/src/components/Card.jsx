/* eslint-disable react/prop-types */

function Card({ data, id, handleClick }) {

const dataClass = data.stat ? " active " + data.stat : "";

  return (
    <div className={"card" + dataClass} onClick={() => handleClick(id)}>
      <div style={{fontSize: ".8rem"}}>{data.content}</div>
    </div>
  );
}
export default Card;
