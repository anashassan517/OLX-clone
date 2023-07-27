import { signInWithPopup } from "../../firebase";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = () => {
  const handleFacebookLogin = async (response) => {
    try {
      if (response.accessToken) {
        const credential = facebookProvider.credential(response.accessToken);
        const result = await signInWithPopup(
          auth,
          facebookProvider,
          credential
        );
        const user = result.user;
        console.log(user); // You can access user information here
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FacebookLogin
      appId="664651245079947"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookLogin}
      textButton="Continue with Facebook"
      cssClass="bg-blue-500 text-white rounded-md py-2 px-4 w-64 text-center"
    />
  );
};

export default FacebookLoginButton;
