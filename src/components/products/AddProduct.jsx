import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

const AddProduct = (props) => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    price: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
    image: Yup.string().required("Image is required"),
  });

  const handleSubmit = (values) => {
    // Send the data to the server (localhost:8000/products)

    props.addProduct({
      name: values.name,
      price: values.price,
      description: values.description,
      image: values.image,
    });

    // redirect to the products page
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
      <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
        <h4 className="mb-10 text-2xl font-bold">Add Product</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-5">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="name"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="image"
                name="image"
                placeholder="Image"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 rounded-3xl bg-red-400 px-12 py-3 text-white hover:bg-red-500"
            >
              Add Product
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
