import React from "react";
import { connect } from "react-redux";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signUpStart } from "../../redux/user/user.actions";

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Password don't match !!");
            return;
        }

        signUpStart({ email, password, displayName });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h1> I do not have an account</h1>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label="Name"
                        name="displayName"
                        value={displayName}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput label="Email" name="email" value={email} handleChange={this.handleChange} required />
                    <FormInput
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        type="password"
                        required
                    />
                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(
    null,
    mapDispatchToProps
)(SignUp);
