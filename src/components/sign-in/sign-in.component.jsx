import React from "react";
import { connect } from "react-redux";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        emailSignInStart(email, password);
        // try {
        //     const { user } = await auth.signInWithEmailAndPassword(email, password);
        //     console.log(user);
        //     this.setState({ email: "", password: "" });
        // } catch (err) {
        //     console.error(err);
        // }
    };

    handleChange = event => {
        const { name, value } = event.target;
        console.log(name, value);

        this.setState({ [name]: value });
    };

    render() {
        const { googleSignInStart } = this.props;
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
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
