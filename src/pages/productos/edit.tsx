import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importa el objeto useRouter
import { Badge, Card, Container } from 'react-bootstrap';
import Image from 'next/image';
import AdminLayout from '@layout/AdminLayout/AdminLayout';

export default function EditProducto() {
  const router = useRouter(); // Obtiene el objeto router de Next.js
  const { id } = router.query; // Obtiene el valor del parámetro "id" de la URL

  const [productoDetails, setProductoDetails] = useState(Object);

  // Simula una solicitud a la API (debes reemplazar esto con tu lógica real)
  useEffect(() => {
    if (id) {       
      fetch(`${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}productos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductoDetails(data);
        })
        .catch((error) => {
          console.error('Error loading product details:', error);
        });
    }
  }, [id]);

  return (
<AdminLayout>
    <><Container>
        <h1>Details of Product</h1>
        {productoDetails ? 
        ( 
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
                            <div className="row text-center">
                                <div className="col">
                                    <div className="fs-5 fw-semibold">{productoDetails.id}</div>
                                    <div className="text-black-50 small">id</div>
                                </div>
                               
                                <div className="vr p-0" />
                                <div className="col">
                                    <div className="fs-5 fw-semibold">
                                        {productoDetails.available ? 
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
                                            {(new Date(productoDetails.createdAt))
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
                                    <div className="text-black-50 small">Start Date</div>
                                </div>
                                <div className="vr p-0" />
                                <div className="col">
                                    <div className="fs-5 fw-semibold">
                                        <div className="fs-5 fw-semibold">
                                            {productoDetails.stockist_id}
                                        </div>
                                    </div>
                                    <div className="text-black-50 small">distribuidor id</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div> 
    ) : (
         <p>Loading products...</p>
    )}
    </Container></>
</AdminLayout>    
  );
}
