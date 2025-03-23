import React from "react";
import { TailGrid } from "../lib/components";
import { TailGridProps } from "@/types/tail-grid-types";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";


const App: React.FC = () => {
  type NewType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  const config: TailGridProps<NewType> = {
    actions: [
      {

        label: 'Edit',
        icon: 'edit',
        component: (row) => <Edit onClick={() => console.log(row)} />,
        onClick: (row) => { console.log(row) }
      }],
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
      {
        id: '11',
        name: 'Ivan Orange',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '12',
        name: 'Judy Pink',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '13',
        name: 'Karl Grey',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '14',
        name: 'Laura Cyan',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '15',
        name: 'Mallory Magenta',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '16',
        name: 'Niaj Brown',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '17',
        name: 'Olivia White',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '18',
        name: 'Peggy Black',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '19',
        name: 'Quentin Blue',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '20',
        name: 'Rupert Green',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '21',
        name: 'Sybil Yellow',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '22',
        name: 'Trent Orange',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '23',
        name: 'Uma Purple',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '24',
        name: 'Victor Red',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '25',
        name: 'Walter Grey',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '26',
        name: 'Xena Pink',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '27',
        name: 'Yara Cyan',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
      {
        id: '28',
        name: 'Zane Magenta',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
      },
    ],
    customFilterComponent: <Button  variant="outline" className="bg-red-500 text-white hover:bg-red-600">Custom Filter</Button>,
      filterFields: [

        {
          key: 'name',
          label: 'Name',
          type: 'select',
          placeholder: 'Search by name',
          icon: 'search',

        },],
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
