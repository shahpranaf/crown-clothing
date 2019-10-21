import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: "", password: "" });
    };

    handleChange = event => {
        const { name, value } = event.target;
        console.log(name, value);

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="sign-in">
                <h1> I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        name="email"
                        label="Email"
                        type="text"
                        value={this.state.email}
                    />
                    <FormInput
                        handleChange={this.handleChange}
                        name="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Submit form</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
