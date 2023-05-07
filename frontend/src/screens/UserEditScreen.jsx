import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = () => {
  const { id } = useParams()  
  const navigate = useNavigate()
  const [name, setName] = useState('')  
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


  useEffect(() => {
    if(successUpdate) {
        // redirect if user was successfully updated
        dispatch({
            type: USER_UPDATE_RESET
        })
        navigate(`/admin/userlist`)
    } else {
        if((!user && !user.name) || user._id !== id ) {
            // if user data is not available then fetch it
            dispatch(getUserDetails(id))
        } else {
            // else set user details value on UI
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
  }, [user, id, dispatch, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault() 
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }))   
  }

  
  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3' >
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            { loadingUpdate && <Loader /> }
            { errorUpdate &&  <Message variant='danger' >{errorUpdate}</Message> }
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
                    <Form.Group controlId='email' >
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='isAdmin' >
                        <Form.Check 
                        type='checkbox' 
                        label='Is Admin' 
                        value={isAdmin}
                        checked={isAdmin} 
                        onChange={(e) => setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary' >
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen