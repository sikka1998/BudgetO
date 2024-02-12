import React from "react";

const Paginations = (props) => {
  console.log(props.currentPage);

  return (
    <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(props.dataLength / props.itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => props.handlePageChange(++index)}
            className={`px-3 py-1 mx-1 bg-blue-500 text-white rounded ${
              props.currentPage === index + 1 ? 'bg-blue-700' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
  );
}

export default Paginations;