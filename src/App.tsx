import React from "react";
import { TailGrid } from "../lib/components";


const App:React.FC = () => {
 const config = {
    actions: [],
      columns: [
        {
          key: 'name',
          header: 'Name',
          sortable: true,
        },
        {
          key: 'email',
          header: 'Email',
          sortable: true,
        },
        {
          key: 'phone',
          header: 'Phone',
          sortable: true,
        },
        {
          key: 'company',
          header: 'Company',
          sortable: true,
        },
      ],
        initialData: [
          {
            id: '1',
            name: 'John Doe',
            email: '',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'johndoemail.com',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '3',
            name: 'Bob Johnson',
            email: '',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '4',
            name: 'Alice Brown',
            email: 'johndoemail.com',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '5',
            name: 'Charlie Green',
            email: '',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '6',
            name: 'Dave White',
            email: 'johndoemail.com',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '7',
            name: 'Eve Black',
            email: '',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '8',
            name: 'Frank Blue',
            email: 'johndoemail.com',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '9',
            name: 'Grace Yellow',
            email: '',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
          {
            id: '10',
            name: 'Heidi Purple',
            email: 'johndoemail.com',
            phone: '123-456-7890',
            company: 'Acme Inc.',
          },
        ],
        filterFields: [],
        title: 'TailGrid Test',
        subtitle: 'This is a test of the TailGrid component',
      };


  return (
    <div className="container mx-auto">
      <TailGrid {...config} />
    </div>
  )
}

export default App
