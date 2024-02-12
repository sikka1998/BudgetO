import React from 'react'
import devImg from './styles/MyPhoto.png';

function About() {
    return (
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6 text-purple-700">About BudgetO</h1>
    
          {/* Introduction */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome to BudgetO</h2>
            <p className="text-gray-700">
              BudgetO is a powerful web application designed to help you manage your transaction data effectively. It provides a user-friendly interface to store, retrieve, and analyze your financial information.
            </p>
          </section>
    
          {/* Features */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc pl-8 text-gray-700">
              <li className="mb-2">Effortlessly store and manage transaction data.</li>
              <li className="mb-2">Quickly retrieve and analyze financial information.</li>
              <li className="mb-2">Conveniently upload data in CSV format.</li>
              <li>Calendar view is available to view the daily income and expense</li>
            </ul>
          </section>
    
          {/* Developer Information */}
          <section className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Developer</h2>
            <div className="flex items-center space-x-4">
              <img src={devImg} alt="Developer Avatar" className="rounded-full w-12 h-12" />
              <div>
                <p className="text-gray-700">Developed by:</p>
                <p className="font-semibold">Mohamed Sikkander Iqbal</p>
              </div>
            </div>
          </section>
        </div>
      );
}

export default About;
