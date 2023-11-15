/* eslint-disable react/prop-types */

const Card = ({ data }) => {
  return (
    <div className="card">
      <div>{data.entry}</div>
      <div style={{fontSize: ".9rem"}}>{data.nounDefinition}</div>
    </div>
  );
};
export default Card;
