import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productContants'


const ProductEditScreen = () => {
  const { id } = useParams()  
  const navigate = useNavigate()
  const [name, setName] = useState('')  
  const [price, setPrice] = useState(0)  
  const [image, setImage] = useState('')  
  const [brand, setBrand] = useState(false)
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate , error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
        if(successUpdate) {
            // if product is successfully updated then dispatch reset and redirect to products page
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            navigate('/admin/productlist')
        } else {
            if((!product && !product.name) || (product._id !== id) ) {
                // if product data is not available then fetch it
                dispatch(listProductDetails(id))
            } else {
                // else set product details field values on UI
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
  }, [product, id, dispatch, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault() 
    dispatch(updateProduct({ _id: id, name, price, image, brand, category, countInStock, description })) 
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }

        const { data } = await axios.post('/api/upload', formData, config)

        setImage(data)
        setUploading(false)
    } catch (error) {
        console.error(error)
        setUploading(false)
    }
  }

  
  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3' >
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            { loadingUpdate && <Loader /> }
            { errorUpdate && <Message variant='danger' >{errorUpdate}</Message> }
            { loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name' >
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type='name' 
                        placeholder='Enter Name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='price' >
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='Enter Price' 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='image' >
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='Enter Image Url' 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)}>
                        </Form.Control>
                        {/* <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >
                        </Form.File> */}
                        <Form.Control 
                            type="file" 
                            id='image-file'
                            custom
                            onChange={uploadFileHandler}
                        />    
                        { uploading && <Loader /> }
                    </Form.Group>
                    <br />    
                    <Form.Group controlId='brand' >
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='Enter Brand' 
                        value={brand} 
                        onChange={(e) => setBrand(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />    
                    <Form.Group controlId='countInStock' >
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='Enter countInstock' 
                        value={countInStock} 
                        onChange={(e) => setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />    
                    <Form.Group controlId='category' >
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='Enter category' 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />    
                    <Form.Group controlId='description' >
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='Enter Description' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <br />    
                    <Button type='submit' variant='primary' >
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen