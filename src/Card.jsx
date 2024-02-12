import React from 'react';

const Card = (props) => {
  return (
    <div className="flex flex-row max-w-sm rounded overflow-hidden shadow-md bg-violet-500 m-1">
      {/* <img className="w-full" src={imageUrl} alt="Card" /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{props.title}</div>
        {props.value ? <h4 className="text-gray-700 text-base font-bold">{props.value}</h4> : <h4 className='text-center'>-</h4>}
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button> */}
      </div>
    </div>
  );
};

export default Card;