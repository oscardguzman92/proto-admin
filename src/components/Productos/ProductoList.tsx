import { Dropdown, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React, { createContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Producto } from '@models/producto'
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
  productos: Producto[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function ProductoList(props: Props) {
  const { productos, setSort, setOrder } = props
  const [filteredProductos, setFilteredProductos] = useState(productos); 
  
  const router = useRouter();

  const filterProductos = (filterText: string) => {
    
    console.log(filterText);
    const filtered = productos.filter((producto) =>
      producto.name.toLowerCase().includes(filterText.toLowerCase())
    );
    console.log(filtered);
    setFilteredProductos(filtered);
  };

  useEffect(() => {
    setFilteredProductos(productos); 
  }, [productos]);

  const navigateToInfo = (productId: number) => {
    router.push(`/productos/info?id=${productId}`); 
  };

  const navigateToEdit = (productId: number) => {
    router.push(`/productos/edit?id=${productId}`); 
  };

  const navigateToDelete = (productId: number) => {
    if(confirm("Are you sure to delete the product with id "+productId + " ?")) {
      fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}productos/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Successfully deleted product'); 
            router.push(`/productos/client`);          
          } else {
            console.error('Error updating product:', response.status);        
          }
        })
        .catch((error) => {
          console.error('Error deleting product: ', error);
        });
    } 
  };

  return (
  <div>
    <Form.Group>
      <Form.Control
        type="text"
        placeholder="Filter by product name"
        onChange={(e) => filterProductos(e.target.value)}
      />
    </Form.Group>
  
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="id" setSort={setSort} setOrder={setOrder}>Id</THSort></th>
          <th aria-label="Photo" />
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>Name</THSort></th>
          <th>Available</th>
          <th className="text-center">Start Date</th>        
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {filteredProductos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td> 
            <td>
              <div className="position-relative mx-auto" style={{ width: '70px', height: '70px' }}>
                <Image
                  fill
                  style={{ objectFit: 'contain' }}
                  alt={`${producto.id.toString}`}
                  sizes="5vw"
                  src={`/assets/img/productos/${producto.id}.jpg`}
                />
              </div>
            </td>         
            <td>{producto.name}</td>
           <td> 
              {producto.available ? 
              <small className="ms-auto"><Badge bg="success" className="ms-auto">YES</Badge></small>
              : (
              <small className="ms-auto"><Badge bg="danger" className="ms-auto">NO</Badge></small>
              )} 
            </td>
            <td className="text-center" style={{ whiteSpace: 'pre' }}>
              {(new Date(producto.createdAt))
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
    )}</td>
           
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${producto.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                
                <Dropdown.Menu>  
                <Dropdown.Item onClick={() => navigateToInfo(producto.id)}>
                    Info
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigateToEdit(producto.id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => navigateToDelete(producto.id)}
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
  </div>
  )
}
