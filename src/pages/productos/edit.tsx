import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Card, Container, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import AdminLayout from '@layout/AdminLayout/AdminLayout';

export default function EditProducto() {
  const router = useRouter();
  const { id } = router.query;

  const [productoDetails, setProductoDetails] = useState(Object);

  const [productName, setProductName] = useState('');
  const [available, setAvailable] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [distributorId, setDistributorId] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}productos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductoDetails(data);
          
          setProductName(data.name);
          setAvailable(data.available);
          setStartDate(
            new Date(data.createdAt).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          );
          setDistributorId(data.stockist_id);
        })
        .catch((error) => {
          console.error('Error loading product details:', error);
        });
    }
  }, [id]);

  const handleFormSubmit = (event:any) => {
    event.preventDefault();
  
    const updatedProduct = {
      id: id,
      name: productName,
      available: available,
      createdAt: new Date(startDate), 
      stockist_id: distributorId,
    };
    if(confirm("Are you sure to update the product with id "+id+"?")){
        fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatedProduct), 
        })
        .then((response) => {
            if (response.ok) {
            alert('Successfully updated product'); 
            router.push(`/productos/client`);         
            } else {
            console.error('Error updating product:', response.status);        
            }
        })
        .catch((error) => {
            console.error('Error updating info: ', error);
        });
    }
  };

  return (
    <AdminLayout>
      <Container>
        <h1>Details of Product</h1>
        {productoDetails ? (
          <div className="col-sm-6 col-lg-4">
            <div className="position-relative mx-auto" style={{ width: '200px', height: '200px' }}>
              <Image
                style={{ objectFit: 'contain' }}
                alt={`${productoDetails.id}`}
                sizes="5vw"
                height="200"
                width="200"
                src={`/assets/img/productos/${productoDetails.id}.jpg`}
              />
            </div>
            <Card
              className="mb-4"
              style={{ '--bs-card-cap-bg': '#4875b4' } as React.CSSProperties}
            >
              <Card.Header className="d-flex justify-content-center align-items-center">
                <div className="col">
                  <div className="fs-50 fw-semibold">{productoDetails.name}</div>
                  <div className="text-black-50 small">Name</div>
                </div>
              </Card.Header>
              <Card.Body>
                                
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Available"
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Distributor ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={distributorId}
                      onChange={(e) => setDistributorId(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </Container>
    </AdminLayout>
  );
}