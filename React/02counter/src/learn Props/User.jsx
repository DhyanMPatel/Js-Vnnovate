import PropTypes from "prop-types";

function User({ name, discription, date = "16 Feb 2025", arr }) {
    console.log(arr)
  return (
    <>
      <div>
        <h2 className="text-3xl text-green-400">{name}</h2>
        <h3 className="text-2xl text-purple-500">{discription}</h3>
        <h4 className="text-xl pb-5">Date: {date}</h4>
        <ul className="list-disc">
          {arr.map((item, index) => (
            <p key={index} className="decoration-2">{item}</p>
          ))}
        </ul>
      </div>
    </>
  );
}
User.propTypes = {
  name: PropTypes.string.isRequired,
  discription: PropTypes.string,
  date: PropTypes.string,
  arr: PropTypes.array,
};

export default User;
