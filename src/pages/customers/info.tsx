import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { Badge, Card, Container } from 'react-bootstrap';
import Image from 'next/image';
import AdminLayout from '@layout/AdminLayout/AdminLayout';

export default function EditCustomer() {
  const router = useRouter(); 
  const { id } = router.query; 

  const [customerDetails, setCustomerDetails] = useState(Object);

  useEffect(() => {
    if (id) {       
      fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomerDetails(data);
        })
        .catch((error) => {
          console.error('Error loading product details:', error);
        });
    }
  }, [id]);

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
                            <div className="row text-center">
                                <div className="col">
                                    <div className="fs-5 fw-semibold">{customerDetails.id}</div>
                                    <div className="text-black-50 small">id</div>
                                </div>
                               
                                <div className="vr p-0" />
                                <div className="col">
                                    <div className="fs-5 fw-semibold">
                                        {customerDetails.available ? 
                                        <small className="ms-auto"><Badge bg="success" className="ms-auto">YES</Badge></small>
                                        : (
                                        <small className="ms-auto"><Badge bg="danger" className="ms-auto">NO</Badge></small>
                                        )} </div>
                                    <div className="text-black-50 small">Available</div>
                                </div>
                                <div className="vr p-0" />
                                <div className="col">
                                    <div className="fs-5 fw-semibold">
                                        <div className="text-center" style={{ whiteSpace: 'pre' }}>
                                            {(new Date(customerDetails.createdAt))
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
                                    )}</div>
                                    </div>
                                    <div className="text-black-50 small">Register Date</div>
                                </div>
                                <div className="vr p-0" />
                                <div className="col">
                                    <div className="fs-5 fw-semibold">
                                        <div className="fs-5 fw-semibold">
                                            {customerDetails.store_id}
                                        </div>
                                    </div>
                                    <div className="text-black-50 small">Store id</div>
                                </div>
                            </div>
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
