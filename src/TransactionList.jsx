import React from 'react';

const TransactionList = (props) => {
  const originalDate = new Date(props.date);
  const formattedDate = originalDate.toLocaleDateString('en-GB');

  return (
      (props.msg) ? <tr><td>{props.msg}</td></tr> : <tr>
        <td>{formattedDate}</td>
        <td>{props.description}</td>
        <td>{props.refno}</td>
        <td>{props.dr}</td>
        <td>{props.cr}</td>
        <td>{props.bal}</td>
      </tr>   
  );
}

export default TransactionList;
