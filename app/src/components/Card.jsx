/* eslint-disable react/prop-types */
function Card({ data, id, handleCardClick }) {
  const dataClass = data.stat ? `card ${data.stat}` : "card";

  return (
    <div
      className={dataClass}
      onClick={() => handleCardClick(id)}
      style={{ border: data.stat === 'active' ? '2px solid blue' : 'none' }}
    >
      <div style={{ fontSize: '.8rem' }}>{data.content}</div>
    </div>
  );
}

export default Card;
