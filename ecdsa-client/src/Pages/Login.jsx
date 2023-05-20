import LoginForm from "../Components/LoginForm";
import RegisterSection from "../Components/RegisterSection";


function Register() {
    return (
      <div className="w-2/3 h-[70vh] m-auto mt-28 flex rounded-3xl shadow-xl">
        <LoginForm></LoginForm>
        <RegisterSection></RegisterSection>
      </div>
    );
}
  
export default Register;