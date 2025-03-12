import { Container, Form } from "react-bootstrap";

import './styles.css'
import { useForm } from "react-hook-form";

export default function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <Container id="signUp">
            <h1>Create Your Account</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control {...register("fname")} type="text" placeholder="Enter first name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control {...register("lname")} type="text" placeholder="Enter last name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group>
                    <Form.Check {...register("toc")} type="checkbox" label="I agree to the terms and conditions" />
                </Form.Group>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </Form>
        </Container>
    )
}