// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button, Form, Table } from "react-bootstrap";
// import { Layout } from "../../layouts/Layout";
// import { useParams } from "react-router-dom";

//  export const syllabusData = [
//   { id: 42, name: "Madhya Pradesh Civil Judge Syllabus" },
//   { id: 41, name: "Chhattisgarh Civil Judge Syllabus" },
//   { id: 40, name: "UP Judiciary (UPPCSJ) Syllabus" },
//   { id: 39, name: "Bihar Judiciary (BPSC Civil Judge Exam) Syllabus" },
  
// ];

// export const SyllabusDownload = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSyllabus, setSelectedSyllabus] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     city: "",
//   });


//   const id = useParams().id

//   console.log(id)

//   const handleShowModal = (syllabus) => {
//     setSelectedSyllabus(syllabus);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({ name: "", email: "", mobile: "", city: "" });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();z
//     console.log("Submitted Data:", formData);
//     alert(`Download link for ${selectedSyllabus.name} will be sent to ${formData.email}`);
//     handleCloseModal();
//   };

//   return (
//        <Layout header={9} footer={1}>
//     <section id="margin-top" className="ptb ptb-xs-60   py-5">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="cart_wrapper">
//               <h3 className="main-heading">Download the Syllabus for Judicial Services</h3>
//               <div className="table-responsive text-center">
//                 <Table striped bordered>
//                   <thead className="bg-dark text-white">
//                     <tr>
//                       <th style={{ textAlign: "center" }}>Name</th>
//                       <th style={{ textAlign: "center" }}>Download PDF</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {syllabusData.map((item) => (
//                       <tr key={item.id}>
//                         <td>{item.name}</td>
//                         <td>
//                           <Button variant="primary" onClick={() => handleShowModal(item)}>
//                             <img
//                               src="https://www.alec.co.in/assets/images/acrobatpdf.jpg"
//                               width="50"
//                               height="70"
//                               alt="Download PDF"
//                             />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal for user details */}
//         <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={true}>
//           <Modal.Header closeButton>
//             <Modal.Title>Enter the following information</Modal.Title>
//           </Modal.Header>
//           <Form onSubmit={handleSubmit}>
//             <Modal.Body>
//               <Form.Group className="mb-3">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mobile"
//                   placeholder="Enter your mobile number"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   placeholder="Enter your city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//               <Button variant="danger" onClick={handleCloseModal}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       </div>
//     </section>
//     </Layout>
//   );
// };

// export default SyllabusDownload;


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button, Form, Table } from "react-bootstrap";
// import { Layout } from "../../layouts/Layout";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export const SyllabusDownload = () => {
//   const [syllabusData, setSyllabusData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSyllabus, setSelectedSyllabus] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     city: "",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/syllabus/category/${id}`);
//         setSyllabusData(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleShowModal = (syllabus) => {
//     setSelectedSyllabus(syllabus);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({ name: "", email: "", mobile: "", city: "" });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send the form data to your API endpoint
//       await axios.post("http://localhost:8000/register/add", formData);
      
//       console.log("Submitted Data:", formData);
//       alert(`Download link for ${selectedSyllabus.Coursename} will be sent to ${formData.email}`);
//       handleCloseModal();
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       alert("There was an error submitting your information. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <Layout header={9} footer={1}>
//         <section id="margin-top" className="ptb ptb-xs-60 py-5">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="cart_wrapper">
//                   <h3 className="main-heading">Loading syllabus data...</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout header={9} footer={1}>
//         <section id="margin-top" className="ptb ptb-xs-60 py-5">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="cart_wrapper">
//                   <h3 className="main-heading text-danger">Error: {error}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     );
//   }

//   if (!syllabusData.length) {
//     return (
//       <Layout header={9} footer={1}>
//         <section id="margin-top" className="ptb ptb-xs-60 py-5">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="cart_wrapper">
//                   <h3 className="main-heading">No syllabus data available</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     );
//   }

//   return (
//     <Layout header={9} footer={1}>
//       <section id="margin-top" className="ptb ptb-xs-60 py-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="cart_wrapper">
//                 <h3 className="main-heading">Download the Syllabus for Judicial Services</h3>
//                 <div className="table-responsive text-center">
//                   <Table striped bordered>
//                     <thead className="bg-dark text-white">
//                       <tr>
//                         <th style={{ textAlign: "center" }}>Name</th>
//                         <th style={{ textAlign: "center" }}>Download PDF</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {syllabusData.map((item) => (
//                         <tr key={item._id}>
//                           <td>{item.Coursename}</td>
//                           <td>
//                             <Button variant="primary" onClick={() => handleShowModal(item)}>
//                               <img
//                                 src="https://www.alec.co.in/assets/images/acrobatpdf.jpg"
//                                 width="50"
//                                 height="70"
//                                 alt="Download PDF"
//                               />
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal for user details */}
//           <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={true}>
//             <Modal.Header closeButton>
//               <Modal.Title>Enter the following information</Modal.Title>
//             </Modal.Header>
//             <Form onSubmit={handleSubmit}>
//               <Modal.Body>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="mobile"
//                     placeholder="Enter your mobile number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>City</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="city"
//                     placeholder="Enter your city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="primary" type="submit">
//                   Submit
//                 </Button>
//                 <Button variant="danger" onClick={handleCloseModal}>
//                   Close
//                 </Button>
//               </Modal.Footer>
//             </Form>
//           </Modal>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default SyllabusDownload;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import { Layout } from "../../layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SyllabusDownload = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/syllabus/category/${id}`);
        setSyllabusData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleShowModal = (syllabus) => {
    setSelectedSyllabus(syllabus);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", city: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadPdf = (pdfUrl, courseName) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${courseName}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register/add", formData);
      
      if (selectedSyllabus?.pdfUrl) {
        handleDownloadPdf(selectedSyllabus.pdfUrl, selectedSyllabus.Coursename);
      }

      alert(`Download started! Syllabus for ${selectedSyllabus.Coursename} has also been sent to ${formData.email}`);
      handleCloseModal();
    } catch (err) {
      alert("Error submitting form. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!syllabusData.length) return <EmptyView />;

  return (
    <Layout header={9} footer={1}>
      <section className="ptb ptb-xs-60 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{marginTop:"100px"}}>
              <div className="cart_wrapper">
                
                <SyllabusTable syllabusData={syllabusData} onDownloadClick={handleShowModal} />
              </div>
            </div>
          </div>

          <DownloadModal 
            show={showModal} 
            onHide={handleCloseModal} 
            onSubmit={handleSubmit}
            formData={formData}
            onInputChange={handleInputChange}
            courseName={selectedSyllabus?.Coursename}
          />
        </div>
      </section>
    </Layout>
  );
};

const SyllabusTable = ({ syllabusData, onDownloadClick }) => (
  <div className="table-responsive text-center">
        <div className="cart_wrapper">
              <h3 className="main-heading">Download the Syllabus for Judicial Services</h3>
    <Table striped bordered>
      <thead className="bg-dark text-white">
        <tr>
          <th style={{ textAlign: "center" }}>Name</th>
          <th style={{ textAlign: "center" }}>Download PDF</th>
        </tr>
      </thead>
      <tbody>
        {syllabusData.map((item) => (
          <tr key={item._id}>
            <td>{item.Coursename}</td>
            <td>
              <Button variant="link" onClick={() => onDownloadClick(item)}>
                <img
                  src="https://www.alec.co.in/assets/images/acrobatpdf.jpg"
                  width="50"
                  height="70"
                  alt="Download PDF"
                />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
     </div>
  </div>
);

const DownloadModal = ({ show, onHide, onSubmit, formData, onInputChange, courseName }) => (
  <Modal show={show} onHide={onHide} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Download {courseName} Syllabus</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={onInputChange}
            required
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" type="submit">Download</Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

const LoadingView = () => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3 className="main-heading mt-3">Loading syllabus data...</h3>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

const ErrorView = ({ error }) => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-danger">
              <h3 className="main-heading">Error loading syllabus</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

const EmptyView = () => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="main-heading">No syllabus available</h3>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default SyllabusDownload;