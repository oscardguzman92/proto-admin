import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { Badge, Card, Container, Form, Button } from 'react-bootstrap';
import AdminLayout from '@layout/AdminLayout/AdminLayout';

export default function EditCustomer() {
  const router = useRouter(); 
  const { id } = router.query; 

  const [customerDetails, setCustomerDetails] = useState(Object);

  const [customerName, setCustomerName] = useState('');
  const [available, setAvailable] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    if (id) {       
      fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomerDetails(data);

          setCustomerName(data.name);
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
          setStoreId(data.store_id);
        })
        .catch((error) => {
          console.error('Error loading product details:', error);
        });
    }
  }, [id]);

  const handleFormSubmit = (event:any) => {
    event.preventDefault();
  
    const updatedCustomer = {
      id: id,
      name: customerName,
      available: available,
      createdAt: new Date(startDate), 
      store_id: storeId,
    };
    if(confirm("Are you sure to update the customer "+customerName+" with id "+id+"?")){
        fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}customers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatedCustomer), 
        })
        .then((response) => {
            if (response.ok) {
            alert('Successfully updated customer'); 
            router.push(`/customers/client`);         
            } else {
            console.error('Error updating customer:', response.status);        
            }
        })
        .catch((error) => {
            console.error('Error updating info: ', error);
        });
    }
  };


  return (
<AdminLayout>
    <><Container>
        <h1>Details of Customer</h1>
        {customerDetails ? 
        ( 
            <div className="col-sm-6 col-lg-4">            
                    <Card
                        className="mb-4"
                        style={{ '--bs-card-cap-bg': '#4875b4' } as React.CSSProperties}
                    >
                        <Card.Header className="d-flex justify-content-center align-items-center">
                        <div className="col">
                                    <div className="fs-50 fw-semibold">{customerDetails.name}</div>
                                    <div className="text-black-50 small">Name</div>
                                </div>
                        </Card.Header>

                        <Card.Body>   
                            <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
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
                                <Form.Label>Store id</Form.Label>
                                <Form.Control
                                type="text"
                                value={storeId}
                                onChange={(e) => setStoreId(e.target.value)}
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
         <p>Loading customers...</p>
    )}
    </Container></>
</AdminLayout>    
  );
}
