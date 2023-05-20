import LoginSection from "../Components/LoginSection";
import RegisterForm from "../Components/RegisterForm";


function Register() {
    return (
      <div className="w-2/3 h-[70vh] m-auto mt-28 flex rounded-3xl shadow-xl">
        <LoginSection></LoginSection>
        <RegisterForm></RegisterForm>
      </div>
    );
}
  
export default Register;