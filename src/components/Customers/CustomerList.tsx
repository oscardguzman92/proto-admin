import { Dropdown, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React, { createContext } from 'react'
import Image from 'next/image'
import { Customer } from '@models/customer'
import { THSort } from '@components/TableSort'
import { Badge} from 'react-bootstrap'
import { useRouter } from 'next/router'

const typeColorMap: Record<string, string> = {  
  false: '#f42',  
  true: '#7c5'
}

type TypeLabelProps = {
  type: string;
}


const TypeLabel = ({ type }: TypeLabelProps) => (
  <span
    className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
    style={{
      backgroundColor: typeColorMap[type],
      textShadow: '1px 1px 2px rgb(0 0 0 / 70%)',
      fontSize: '.7rem',
      width: '70px',
    }}
  >
    {type}
  </span>
)

type Props = {
  customers: Customer[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function CustomerList(props: Props) {
  const { customers, setSort, setOrder } = props

  const router = useRouter();

  const navigateToEdit = (customerId: number) => {
    router.push(`/customers/edit?id=${customerId}`); 
  };

  return (
    
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="id" setSort={setSort} setOrder={setOrder}>Id</THSort></th>
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>Name</THSort></th>
          <th>Available</th>
          <th className="text-center">Start Date</th> 
          <th className="text-center">Store id</th>       
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>                 
            <td>{customer.name}</td>
           <td> 
              {customer.active ? 
              <small className="ms-auto"><Badge bg="success" className="ms-auto">YES</Badge></small>
              : (
              <small className="ms-auto"><Badge bg="danger" className="ms-auto">NO</Badge></small>
              )} 
            </td>
            <td className="text-center" style={{ whiteSpace: 'pre' }}>
              {(new Date(customer.createdAt))
              .toLocaleDateString('es-ES', 
              {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              }
          )}    
          </td>
          <td>{customer.store_id}</td>           
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${customer.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                
                <Dropdown.Menu>  
                <Dropdown.Item onClick={() => navigateToEdit(customer.id)}> 
                    Info
                  </Dropdown.Item>
                  <Dropdown.Item href={`/customers/edit`}>Edit</Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    href="#/action-3"
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
