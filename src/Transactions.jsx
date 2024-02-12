import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import Paginations from './Paginations.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import TransactionList from './TransactionList.jsx';
import './Transactions.css';

function Transactions() {
  const [date, setDate] = useState(new Date());
  const [transdata, setTransdata] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (page) => {
    dataRender();
    setCurrentPage(page);
    console.log("f"+currentPage);
  }

  const dataRender = () => {
    setCurrentItems(transdata.slice(indexOfFirstItem, indexOfLastItem));
  }
  console.log("IF" + indexOfFirstItem);
  console.log("IL" + indexOfLastItem);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
        console.log(formattedDate);
        const response = await axios.post("http://localhost:5000/transactionList", { date: formattedDate });
        console.log(response.data);
        setTransdata(response.data);
        setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchdata();
  }, [date, currentPage]);

  const handleChange = (value) => {
    setDate(value);
  };

  return (
    <Container className='mb-10'>
      <Row>
        <Col>
          <h1 className='mb-10'>Transactions</h1>
        </Col>
      </Row>
      <Row className='mb-10'>
        <Col>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label className='pr-2'><h6>Date</h6></Form.Label>
              <DatePicker
                selected={date}
                onChange={handleChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className='pt-4 mb-15'>
        <Col>
          <Table striped bordered className='table-hover'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Reference Number</th>
                <th>Dr Amount</th>
                <th>Cr Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, index) => (
                <TransactionList key={index} date={data.transaction_date} description={data.description} refno={data.reference_number} dr={data.debit} cr={data.credit} bal={data.balance} msg={data.message}/>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <footer className='flex flex-row-reverse pt-10'>
    <Paginations
      dataLength={transdata.length}
      itemsPerPage={itemsPerPage}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
    />
    </footer>
    </Container>
  );
}

export default Transactions;