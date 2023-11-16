/* eslint-disable react/prop-types */

function Card({ data }) {
  return (
    <div className="card">
      <div style={{fontSize: ".8rem"}}>{data.content}</div>
    </div>
  );
}
export default Card;
