/* eslint-disable react/prop-types */
function Card({ data, id, handleCardClick, isSelected }) {
  const dataClass = data.stat ? `card ${data.stat}` : "card";

  return (
    <div
      className={dataClass}
      onClick={() => handleCardClick(id)}
      style={{ border: isSelected ? '2px solid blue' : '2px solid transparent' }}
    >
      <div style={{ fontSize: '.8rem' }}>{data.content}</div>
    </div>
  );
}

export default Card;
