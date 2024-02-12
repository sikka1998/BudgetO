import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import { startOfDay, endOfDay, parseISO, getDate, format } from 'date-fns';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/')); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const db = new pg.Client({
  user: 'sikka',
  password: 'vi6cNBf95sg37v28yqLbkpRZk991wjyK',
  host: 'dpg-cn57b7a1hbls73916gqg-a',
  database: 'budgeto_x9sf',
  port: '5432',
});

const client = db.connect();

const app = express();
const port = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ user: 'sikka' });
});

app.post('/imports', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const result = await db.query('INSERT INTO accounting.path_config (path) VALUES ($1)', [filePath]);
    return res.status(200).json({ message: 'File uploaded successfully', file_Path: filePath });
  } catch (error) {
    console.error('Error Storing file path:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/uploads', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
  
    if (filePath.endsWith('.csv')) {
      try {
        await parseCSV(filePath);
        res.json({ message: 'Data uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error parsing or storing data', details: error.message });
      }
    }
  });

  async function parseCSV(filePath) {
    return new Promise(async (resolve, reject) => {
      const results = [];
  
      try {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (row) => {
            results.push(row);
          })
          .on('end', async () => {
            const queryText = 'INSERT INTO accounting.transactions (transaction_date, description, reference_number, debit, credit, balance) VALUES ($1, $2, $3, $4, $5, $6)';
  
            await Promise.all(
                results.map(async (row) => {
                  const {
                    'Transaction date': Transaction_date,
                    Description,
                    'Reference Number': Reference_Number,
                    Debit,
                    Credit,
                    Balance,
                  } = row;
              
                  // Convert string representations of numbers to actual numbers
                  const values = [
                    Transaction_date !== '' ? Transaction_date : null,
                    Description,
                    Reference_Number !== '' ? Reference_Number : null,
                    Debit !== '' ? parseFloat(Debit) : 0.0,
                    Credit !== '' ? parseFloat(Credit) : 0.0,
                    Balance !== '' ? parseFloat(Balance) : 0.0,
                  ];
  
                await db.query(queryText, values);
              })
            );
  
            resolve(true);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  app.post("/transactionList", async (req, res) => {
    const { date } = req.body;
    const result = await db.query(`
    WITH input_date AS (
        SELECT TO_DATE($1, 'MM/YYYY') AS specified_date
    )
    SELECT *
    FROM accounting.transactions
    WHERE transaction_date BETWEEN (
        SELECT date_trunc('MONTH', specified_date) AS first_day_of_month FROM input_date
    ) AND (
        SELECT (date_trunc('MONTH', specified_date) + INTERVAL '1 month' - INTERVAL '1 day')::DATE AS last_day_of_month FROM input_date
    );
    `, [date]);
    const dataFromDB = result.rows;
    console.log(dataFromDB);
    console.log(req.body);
    if(dataFromDB.length > 0){
        res.json(dataFromDB);
    }else{
        res.json([{message: "No Record Found"}]);
    }
  });

  app.get("/getOverviewDetails", async (req, res) => {
    try{
        const result = await calculateMonthlyBalance();
        console.log(result);
        res.status(200).json(result);
      }
    catch(error){
      console.log("Error while fetching data from db", error.message);
      res.status(500).json({code: 0, message: "Internal Server Error"});
    }
  });

  app.get("/getBasicAccountDetails", async (req, res) => {
    try{
      const result = await calculateBasicAccountDetails();
      console.log(result);
      let formattedDate = null;
      if(result.latest_transaction_date != null){
        const originalDate = new Date(result.latest_transaction_date);
        formattedDate = originalDate.toLocaleDateString('en-GB');
      }

      res.status(200).json([{title: "Last Updated Balance",
      value: result.last_updated_balance}, 
      {title: "Last Transaction On",
      value: formattedDate},
      {title: "Max Credit",
      value: result.max_credit},
      {title: "Max Debit",
      value: result.max_debit},
      {title: "Net Change",
      value: result.net_change}]);
    }
    catch(error){
      console.log(error.message);
    }
  });

  const calculateBasicAccountDetails = async () => {
    const basicData = {};
    const res = await db.query(`SELECT 
    MAX(transaction_date) as latest_transaction_date,
    MAX(debit) as max_debit,
    MAX(credit) as max_credit,
    SUM(credit) - SUM(debit) as Net_Change,
    (SELECT balance FROM accounting.transactions ORDER BY transaction_date DESC LIMIT 1) as last_updated_balance
    FROM accounting.transactions`);
    //console.log(res.rows);
    return res.rows[0];
  }

  app.get("/getCalendarDetails", async(req, res) => {
    try {
      const startDate = startOfDay(parseISO(req.query.startDate));
      const endDate = endOfDay(parseISO(req.query.endDate));
  
      const calendarDetails = await getCalendarDetails(startDate, endDate);
      console.log(calendarDetails);
      res.json(calendarDetails);
    } catch (error) {
      console.error('Error processing calendar details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  async function getCalendarDetails(startDate, endDate) {
    const result = {};
  
    try {
      const query = {
        text: 'SELECT transaction_date, debit, credit FROM accounting.transactions WHERE transaction_date >= $1 AND transaction_date <= $2',
        values: [startDate, endDate],
      };
  
      const { rows } = await db.query(query);

      //console.log(rows);
  
      rows.forEach((transaction) => {
        const dayOfMonth = getDate(new Date(transaction.transaction_date));
        //console.log(dayOfMonth);
  
        if (!result[dayOfMonth]) {
          result[dayOfMonth] = { debit: 0, credit: 0 };
        }
  
        result[dayOfMonth].debit += parseInt(transaction.debit);
        result[dayOfMonth].credit += parseInt(transaction.credit);
      });
      //console.log(result);
      return result;
    } catch (error) {
      console.error('Error fetching calendar details: ', error);
      throw error;
    }
  }

  const calculateMonthlyBalance = async () => {
    try {
      const monthlyBalances = {};
      const query1 = await db.query("SELECT transaction_date, debit, credit from accounting.transactions");
      const transactions = query1.rows;
  
      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        const monthKey = format(transactionDate, 'MMMM');
  
        if (!monthlyBalances[monthKey]) {
          monthlyBalances[monthKey] = { debit: 0, credit: 0 };
        }
  
        monthlyBalances[monthKey].debit += parseInt(transaction.debit) || 0;
        monthlyBalances[monthKey].credit += parseInt(transaction.credit) || 0;
      });
  
      return monthlyBalances;
    } catch (error) {
      console.error('Error calculating monthly balance:', error);
      throw error;
    }
  };

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
